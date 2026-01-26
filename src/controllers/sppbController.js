const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');

/**
 * Get SPPB data by nomor_sppb
 * @route POST /get_sppb
 */
const getSppb = async (req, res) => {
  try {
    const { nomor_sppb } = req.body;

    // Validasi required field
    if (!nomor_sppb) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Field "nomor_sppb" is required');
    }

    // Cari data SPPB
    const sppbData = await prisma.sppbService.findFirst({
      where: { nomor_sppb }
    });

    if (!sppbData) {
      return sendError(res, HTTP_STATUS.NOT_FOUND, `SPPB with nomor_sppb "${nomor_sppb}" not found`);
    }

    // Format response
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Sukses',
        data: {
          nomor_sppb: sppbData.nomor_sppb,
          tanggal_sppb: sppbData.tanggal_sppb.toISOString().split('T')[0],
          nomor_kontainer: sppbData.nomor_kontainer,
          nomor_bl: sppbData.nomor_bl,
          timestamp: sppbData.timestamp.toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Error in getSppb:', error);
    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

module.exports = {
  getSppb
};

