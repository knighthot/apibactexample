const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');

/**
 * Get NPE data by no_npe
 * @route POST /get_npe
 */
const getNpe = async (req, res) => {
  try {
    const { no_npe, tg_npe, no_peb, no_cont, size, nama_kapal, no_voy_flight } = req.body;

    // Validasi required field
    if (!no_npe) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Field "no_npe" is required');
    }

    // Cari data NPE
    const npeData = await prisma.npeService.findFirst({
      where: { no_npe }
    });

    if (!npeData) {
      return sendError(res, HTTP_STATUS.NOT_FOUND, `NPE with no_npe "${no_npe}" not found`);
    }

    // Format response
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Sukses',
        data: {
          npe_status: 'DITERIMA',
          no_npe: npeData.no_npe,
          tg_npe: npeData.tg_npe.toISOString().split('T')[0],
          no_peb: npeData.no_peb,
          no_cont: npeData.no_cont,
          size: npeData.size,
          nama_kapal: npeData.nama_kapal,
          no_voy_flight: npeData.no_voy_flight,
          timestamp: npeData.timestamp.toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Error in getNpe:', error);
    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

module.exports = {
  getNpe
};

