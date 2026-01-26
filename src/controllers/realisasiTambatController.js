const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');
const { parseDateTime } = require('../utils/dateHelper');

/**
 * Entry/Insert new Realisasi Tambat data
 * @route POST /entry_realisasi_tambat
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const entryRealisasiTambat = async (req, res) => {
  try {
    const {
      nomor_pkk,
      nomor_ppk,
      no_ppkb_tambat,
      tgl_mulai_tambat,
      jam_mulai_tambat,
      tgl_selesai_tambat,
      jam_selesai_tambat,
      dermaga,
      kade_awal,
      kade_akhir,
      gt,
      biaya_tetap,
      biaya_variabel,
      presentase,
      biaya,
      etmal,
      nomor_pkk_tugboat
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      nomor_pkk: 'PKK Number',
      nomor_ppk: 'PPK Number',
      no_ppkb_tambat: 'PPKB Tambat Number',
      tgl_mulai_tambat: 'Start Berthing Date',
      jam_mulai_tambat: 'Start Berthing Time',
      tgl_selesai_tambat: 'End Berthing Date',
      jam_selesai_tambat: 'End Berthing Time',
      dermaga: 'Berth Name',
      kade_awal: 'Start Kade',
      kade_akhir: 'End Kade',
      gt: 'Gross Tonnage',
      biaya_tetap: 'Fixed Cost',
      biaya_variabel: 'Variable Cost',
      presentase: 'Percentage',
      biaya: 'Total Cost',
      etmal: 'Etmal'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return sendError(
          res,
          HTTP_STATUS.BAD_REQUEST,
          `Field "${field}" (${label}) is required`
        );
      }
    }

    // Gabungkan tanggal dan jam untuk tgl_mulai_tambat
    const tglMulaiTambatDateTime = parseDateTime(`${tgl_mulai_tambat} ${jam_mulai_tambat}`);
    
    // Gabungkan tanggal dan jam untuk tgl_selesai_tambat
    const tglSelesaiTambatDateTime = parseDateTime(`${tgl_selesai_tambat} ${jam_selesai_tambat}`);

    // Validasi tgl_selesai_tambat harus setelah tgl_mulai_tambat
    if (tglSelesaiTambatDateTime <= tglMulaiTambatDateTime) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'End berthing date/time must be after start berthing date/time'
      );
    }

    // Parse data
    const parsedData = {
      nomor_pkk,
      nomor_ppk,
      no_ppkb_tambat,
      tgl_mulai_tambat: tglMulaiTambatDateTime,
      tgl_selesai_tambat: tglSelesaiTambatDateTime,
      dermaga,
      gt: parseFloat(gt),
      biaya: parseFloat(biaya),
      nomor_pkk_tugboat: nomor_pkk_tugboat || null
    };

    // Insert data ke database
    const newRealisasiTambat = await prisma.realisasiTambat.create({
      data: parsedData
    });

    // Format response sesuai spesifikasi
    const responseData = {
      nomor_ppk: newRealisasiTambat.nomor_ppk,
      no_ppkb_tambat: newRealisasiTambat.no_ppkb_tambat,
      timestamp: newRealisasiTambat.timestamp.toISOString()
    };

    // Success response
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Data Realisasi Tambat Berhasil Disimpan',
        data: responseData
      }
    });

  } catch (error) {
    console.error('Error in entryRealisasiTambat:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Realisasi Tambat with this data already exists'
      );
    }

    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

module.exports = {
  entryRealisasiTambat
};

