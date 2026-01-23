const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');
const { parseDateTime } = require('../utils/dateHelper');

/**
 * Entry/Insert new COARRI data
 * @route POST /entry_coarri
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const entryCoarri = async (req, res) => {
  try {
    const {
      ref_number,
      nm_angkut,
      call_sign,
      no_voy_flight,
      kd_pbm,
      jml_total,
      jml_out,
      category,
      kd_transaksi,
      no_cont,
      uk_cont,
      jns_cont,
      fl_cont_kosong,
      no_segel_bc,
      no_dok_inout,
      tgl_dok_inout,
      no_bc11,
      tgl_bc11,
      no_bl_awb,
      bruto,
      id_consignee,
      kd_pelabuhan,
      kd_gudang,
      kd_tps,
      kd_status
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      ref_number: 'Ref Number',
      category: 'Category',
      kd_transaksi: 'Transaction Code',
      no_cont: 'Container Number',
      uk_cont: 'Container Size',
      jns_cont: 'Container Type'
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

    // Parse data
    const parsedData = {
      ref_number,
      nm_angkut: nm_angkut || null,
      call_sign: call_sign || null,
      no_voy_flight: no_voy_flight || null,
      kd_pbm: kd_pbm || null,
      jml_total: jml_total ? parseInt(jml_total) : null,
      jml_out: jml_out ? parseInt(jml_out) : null,
      category,
      kd_transaksi,
      no_cont,
      uk_cont,
      jns_cont,
      fl_cont_kosong: fl_cont_kosong || null,
      no_segel_bc: no_segel_bc || null,
      no_dok_inout: no_dok_inout || null,
      tgl_dok_inout: tgl_dok_inout ? parseDateTime(tgl_dok_inout) : null,
      no_bc11: no_bc11 || null,
      tgl_bc11: tgl_bc11 ? parseDateTime(tgl_bc11) : null,
      no_bl_awb: no_bl_awb || null,
      bruto: bruto ? parseFloat(bruto) : null,
      id_consignee: id_consignee || null,
      kd_pelabuhan: kd_pelabuhan || null,
      kd_gudang: kd_gudang || null,
      kd_tps: kd_tps || null,
      kd_status: kd_status || null
    };

    // Insert data ke database
    const newCoarri = await prisma.coarriService.create({
      data: parsedData
    });

    // Tentukan status tercatat berdasarkan kd_status
    // Status Reference:
    // 1 = Bongkar
    // 2 = Muat
    // 3 = Keluar
    // 4 = Masuk
    let status_tercatat = 'RECORDED';
    
    if (newCoarri.kd_status) {
      const statusMap = {
        '1': 'BONGKAR',
        '2': 'MUAT',
        '3': 'KELUAR',
        '4': 'MASUK'
      };
      status_tercatat = statusMap[newCoarri.kd_status] || 'RECORDED';
    }

    // Format response sesuai spesifikasi
    const responseData = {
      ref_number: newCoarri.ref_number,
      status_tercatat: status_tercatat,
      timestamp: newCoarri.created_at.toISOString()
    };

    // Success response
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Sukses',
        data: responseData
      }
    });

  } catch (error) {
    console.error('Error in entryCoarri:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'COARRI with this ref_number already exists'
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
  entryCoarri
};

