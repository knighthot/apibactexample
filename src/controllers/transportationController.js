const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Get Transportation data by jml (jumlah/limit) or search by no_kendaraan
 * @route POST /get_transportation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransportation = async (req, res) => {
  try {
    const { jml, no_kendaraan } = req.body;

    let transportationData;

    // Jika ada no_kendaraan, search by no_kendaraan
    if (no_kendaraan) {
      transportationData = await prisma.transportationService.findMany({
        where: {
          no_kendaraan: {
            contains: no_kendaraan,
            mode: 'insensitive' // Case-insensitive search
          }
        },
        orderBy: {
          timestamp: 'desc'
        }
      });
    }
    // Jika ada jml, ambil data dengan limit
    else if (jml) {
      // Validasi jml harus berupa angka
      const limit = parseInt(jml);
      if (isNaN(limit) || limit <= 0) {
        return sendError(
          res,
          HTTP_STATUS.BAD_REQUEST,
          'Field "jml" must be a positive number'
        );
      }

      transportationData = await prisma.transportationService.findMany({
        take: limit,
        orderBy: {
          timestamp: 'desc'
        }
      });
    }
    // Jika tidak ada parameter, ambil semua data (default limit 100)
    else {
      transportationData = await prisma.transportationService.findMany({
        take: 100,
        orderBy: {
          timestamp: 'desc'
        }
      });
    }

    // Format response sesuai spesifikasi
    const responseData = transportationData.map(trans => ({
      no_kendaraan: trans.no_kendaraan,
      nama_perusahaan: trans.nama_perusahaan,
      nama_perorangan: trans.nama_perorangan,
      available: trans.available,
      masa_expired: trans.masa_expired.toISOString().split('T')[0], // Format: yyyy-mm-dd
      timestamp: trans.timestamp.toISOString()
    }));

    // Success response
    return sendSuccess(res, responseData, 'Sukses');

  } catch (error) {
    console.error('Error in getTransportation:', error);
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

module.exports = {
  getTransportation
};

