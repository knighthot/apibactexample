const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { parseDateTime } = require('../utils/dateHelper');

/**
 * Entry/Insert new CODECO data
 * @route POST /entry_codeco
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const entryCodeco = async (req, res) => {
  try {
    const {
      ref_number,
      id_gatepass,
      transportation_id,
      no_kendaraan,
      car,
      spj_no,
      spj_date,
      gate_in,
      gate_out,
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
      consignee,
      kd_pelabuhan,
      kd_gudang,
      kd_tps,
      kd_status
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      ref_number: 'Ref Number',
      id_gatepass: 'Gatepass ID',
      transportation_id: 'Transportation ID',
      no_kendaraan: 'Vehicle Number',
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

    // Validasi ref_number tidak boleh duplikat
    const existingCodeco = await prisma.codecoService.findFirst({
      where: { ref_number }
    });

    if (existingCodeco) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        `CODECO with ref_number "${ref_number}" already exists`
      );
    }

    // Parse tanggal-tanggal yang ada
    const parsedData = {
      ref_number,
      id_gatepass,
      transportation_id,
      no_kendaraan,
      car: car || null,
      spj_no: spj_no || null,
      spj_date: spj_date ? parseDateTime(spj_date) : null,
      gate_in: gate_in ? parseDateTime(gate_in) : null,
      gate_out: gate_out ? parseDateTime(gate_out) : null,
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
      consignee: consignee || null,
      kd_pelabuhan: kd_pelabuhan || null,
      kd_gudang: kd_gudang || null,
      kd_tps: kd_tps || null,
      kd_status: kd_status || null
    };

    // Insert data ke database
    const newCodeco = await prisma.codecoService.create({
      data: parsedData
    });

    // Tentukan status tercatat berdasarkan kd_status
    // Status Reference:
    // 1 = Bongkar
    // 2 = Muat
    // 3 = Keluar
    // 4 = Masuk
    let status_tercatat = 'RECORDED';

    if (newCodeco.kd_status) {
      const statusMap = {
        '1': 'BONGKAR',
        '2': 'MUAT',
        '3': 'KELUAR',
        '4': 'MASUK'
      };
      status_tercatat = statusMap[newCodeco.kd_status] || 'RECORDED';
    } else {
      // Fallback: jika kd_status tidak ada, gunakan logika gate_in/gate_out
      if (newCodeco.gate_in && !newCodeco.gate_out) {
        status_tercatat = 'GATE_IN';
      } else if (newCodeco.gate_out) {
        status_tercatat = 'GATE_OUT_';
      }
    }

    // Format response sesuai spesifikasi
    const responseData = {
      ref_number: newCodeco.ref_number,
      status_tercatat: status_tercatat,
      timestamp: newCodeco.created_at.toISOString()
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
    console.error('Error in entryCodeco:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'CODECO with this ref_number already exists'
      );
    }

    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

/**
 * Update CODECO data (kd_status) by ref_number
 * @route POST /update_codeco
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateCodeco = async (req, res) => {
  try {
    const { ref_number, kd_status } = req.body;

    // Validasi required fields
    if (!ref_number) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Field "ref_number" is required'
      );
    }

    if (!kd_status) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Field "kd_status" is required'
      );
    }

    // Cek apakah data dengan ref_number ada
    const existingCodeco = await prisma.codecoService.findFirst({
      where: { ref_number }
    });

    if (!existingCodeco) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        `CODECO with ref_number "${ref_number}" not found`
      );
    }

    // Update kd_status
    const updatedCodeco = await prisma.codecoService.update({
      where: { id: existingCodeco.id },
      data: { kd_status }
    });

    // Tentukan status code berdasarkan kd_status
    // Status Reference:
    // 1 = Bongkar
    // 2 = Muat
    // 3 = Keluar
    // 4 = Masuk
    const statusMap = {
      '1': 'BONGKAR',
      '2': 'MUAT',
      '3': 'KELUAR',
      '4': 'MASUK'
    };
    const status_code = statusMap[kd_status] || kd_status;

    // Format response sesuai spesifikasi
    const responseData = {
      ref_number: updatedCodeco.ref_number,
      kd_status: updatedCodeco.kd_status,
      updated_at: updatedCodeco.updated_at.toISOString().split('T')[0] + ' ' +
                  updatedCodeco.updated_at.toISOString().split('T')[1].split('.')[0],
      updated_by: 'SYSTEM_N4',
      timestamp: updatedCodeco.updated_at.toISOString()
    };

    // Success response
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Perubahan Status codeco berhasil disimpan',
        data: responseData
      }
    });

  } catch (error) {
    console.error('Error in updateCodeco:', error);
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

module.exports = {
  entryCodeco,
  updateCodeco
};

