require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk validasi header PKK
const validateHeadersPKK = (req, res, next) => {
  const contentType = req.get('Content-Type');
  const userAgent = req.get('User-Agent');
  const accessKey = req.get('AccessKey');

  if (contentType !== 'application/x-www-form-urlencoded') {
    return res.status(400).json({
      response: {
        status: 0,
        code: 400,
        message: 'Invalid Content-Type. Expected: application/x-www-form-urlencoded'
      }
    });
  }

  if (userAgent !== 'BACT') {
    return res.status(400).json({
      response: {
        status: 0,
        code: 400,
        message: 'Invalid User-Agent. Expected: BACT'
      }
    });
  }

  if (!accessKey || accessKey !== 'BACT-PKK-2201') {
    return res.status(401).json({
      response: {
        status: 0,
        code: 401,
        message: 'Invalid or missing AccessKey'
      }
    });
  }

  next();
};

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running'
  });
});

// 1. PKK Service (BSIMS to N4)
// Endpoint: POST /get_pkk
app.post('/get_pkk', validateHeadersPKK, async (req, res) => {
  try {
    const { period } = req.body;

    // Validasi request body
    if (!period) {
      return res.status(400).json({
        response: {
          status: 0,
          code: 400,
          message: 'Field "period" is required'
        }
      });
    }

    // Query data PKK berdasarkan period
    // Asumsi: period adalah string yang merepresentasikan tanggal atau range
    const pkkData = await prisma.pkkService.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    });

    // Format response sesuai spesifikasi
    const responseData = pkkData.map(pkk => ({
      nomor_pkk: pkk.nomor_pkk,
      nama_kapal: pkk.nama_kapal,
      call_sign: pkk.call_sign,
      tanda_pendaftaran_kapal: pkk.tanda_pendaftaran_kapal,
      tanggal_eta: pkk.tanggal_eta.toISOString(),
      tanggal_etd: pkk.tanggal_etd.toISOString(),
      jenis_trayek: pkk.jenis_trayek,
      timestamp: pkk.timestamp.toISOString()
    }));

    // Success response
    return res.status(200).json({
      response: {
        status: 1,
        code: 200,
        message: 'Sukses',
        data: responseData
      }
    });

  } catch (error) {
    console.error('Error in /get_pkk:', error);
    return res.status(500).json({
      response: {
        status: 0,
        code: 500,
        message: 'Internal server error',
        data: []
      }
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
