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
      category,
      kd_transaksi,
      ref_transaksi,
      kd_dok_inout,
      car,
      no_dok_inout,
      tgl_dok_inout,
      no_pengajuan,
      tgl_pengajuan,
      nm_angkut,
      call_sign,
      spj_no,
      spj_date,
      no_voy_flight,
      jml_total,
      jml_out,
      gate_in,
      gate_out,
      kd_pelabuhan,
      kd_gudang,
      kd_tps,
      kd_pbm,
      kd_shipping,
      kd_shipping_line,
      kd_status,
      kd_kelompok,
      no_cont,
      uk_cont,
      jns_cont,
      jns_cont_nm,
      fl_cont_kosong,
      fl_cont_kosong_nm,
      no_bl_awb,
      tgl_bl_awb,
      no_bc11,
      tgl_bc11,
      no_pos_bc11,
      no_segel_bc,
      id_consignee,
      consignee,
      bruto,
      volume,
      ref_id_detil
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
      jns_cont: 'Container Type',
      no_bl_awb: 'BL/AWB Number'
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

    // Parse tanggal-tanggal yang ada
    const parsedData = {
      ref_number,
      id_gatepass,
      transportation_id,
      no_kendaraan,
      category,
      kd_transaksi,
      ref_transaksi: ref_transaksi || null,
      kd_dok_inout: kd_dok_inout || null,
      car: car || null,
      no_dok_inout: no_dok_inout || null,
      tgl_dok_inout: tgl_dok_inout ? parseDateTime(tgl_dok_inout) : null,
      no_pengajuan: no_pengajuan || null,
      tgl_pengajuan: tgl_pengajuan ? parseDateTime(tgl_pengajuan) : null,
      nm_angkut: nm_angkut || null,
      call_sign: call_sign || null,
      spj_no: spj_no || null,
      spj_date: spj_date ? parseDateTime(spj_date) : null,
      no_voy_flight: no_voy_flight || null,
      jml_total: jml_total ? parseInt(jml_total) : null,
      jml_out: jml_out ? parseInt(jml_out) : null,
      gate_in: gate_in ? parseDateTime(gate_in) : null,
      gate_out: gate_out ? parseDateTime(gate_out) : null,
      kd_pelabuhan: kd_pelabuhan || null,
      kd_gudang: kd_gudang || null,
      kd_tps: kd_tps || null,
      kd_pbm: kd_pbm || null,
      kd_shipping: kd_shipping || null,
      kd_shipping_line: kd_shipping_line || null,
      kd_status: kd_status || null,
      kd_kelompok: kd_kelompok || null,
      no_cont,
      uk_cont,
      jns_cont,
      jns_cont_nm: jns_cont_nm || null,
      fl_cont_kosong: fl_cont_kosong || null,
      fl_cont_kosong_nm: fl_cont_kosong_nm || null,
      no_bl_awb,
      tgl_bl_awb: tgl_bl_awb ? parseDateTime(tgl_bl_awb) : null,
      no_bc11: no_bc11 || null,
      tgl_bc11: tgl_bc11 ? parseDateTime(tgl_bc11) : null,
      no_pos_bc11: no_pos_bc11 || null,
      no_segel_bc: no_segel_bc || null,
      id_consignee: id_consignee || null,
      consignee: consignee || null,
      bruto: bruto ? parseFloat(bruto) : null,
      volume: volume ? parseFloat(volume) : null,
      ref_id_detil: ref_id_detil || null
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
        status_tercatat = 'GATE_IN_RECORDED';
      } else if (newCodeco.gate_out) {
        status_tercatat = 'GATE_OUT_RECORDED';
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

module.exports = {
  entryCodeco
};

