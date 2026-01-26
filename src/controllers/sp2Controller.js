const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');
const { parseDateTime } = require('../utils/dateHelper');

/**
 * Entry/Insert new SP2 data
 * @route POST /entry_sp2
 */
const entrySp2 = async (req, res) => {
  try {
    const {
      ref_number,
      nomor_sp2,
      nomor_do_pelayaran,
      nomor_kontainer,
      nomor_bl,
      iso_code,
      pemilik_kontainer,
      nama_penerima,
      npwp_penerima,
      perusahaan_trucking,
      stid_truk,
      nopol_truk,
      nama_supir,
      pin_gate,
      tgl_awal_berlaku,
      tgl_akhir_berlaku,
      batas_waktu_storage,
      nomor_sppb,
      status_segel_bc,
      status_admin_pelayaran,
      status_uang_jaminan,
      status_storage,
      depo_pengembalian,
      jenis_pengeluaran,
      lokasi_kontainer,
      status_hold,
      status_gate
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      ref_number: 'Reference Number',
      nomor_sp2: 'SP2 Number',
      nomor_kontainer: 'Container Number',
      pin_gate: 'PIN Gate'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, `Field "${field}" (${label}) is required`);
      }
    }

    // Parse dates
    const tglAwalBerlakuDate = tgl_awal_berlaku ? parseDateTime(tgl_awal_berlaku) : null;
    const tglAkhirBerlakuDate = tgl_akhir_berlaku ? parseDateTime(tgl_akhir_berlaku) : null;
    const batasWaktuStorageDate = batas_waktu_storage ? parseDateTime(batas_waktu_storage) : null;

    // Parse data
    const parsedData = {
      ref_number,
      nomor_sp2,
      nomor_do_pelayaran: nomor_do_pelayaran || null,
      nomor_kontainer,
      nomor_bl: nomor_bl || null,
      iso_code: iso_code || null,
      pemilik_kontainer: pemilik_kontainer || null,
      nama_penerima: nama_penerima || null,
      npwp_penerima: npwp_penerima || null,
      perusahaan_trucking: perusahaan_trucking || null,
      stid_truk: stid_truk || null,
      nopol_truk: nopol_truk || null,
      nama_supir: nama_supir || null,
      pin_gate,
      tgl_awal_berlaku: tglAwalBerlakuDate,
      tgl_akhir_berlaku: tglAkhirBerlakuDate,
      batas_waktu_storage: batasWaktuStorageDate,
      nomor_sppb: nomor_sppb || null,
      status_segel_bc: status_segel_bc || null,
      status_admin_pelayaran: status_admin_pelayaran || null,
      status_uang_jaminan: status_uang_jaminan || null,
      status_storage: status_storage || null,
      depo_pengembalian: depo_pengembalian || null,
      jenis_pengeluaran: jenis_pengeluaran || null,
      lokasi_kontainer: lokasi_kontainer || null,
      status_hold: status_hold || null,
      status_gate: status_gate || null
    };

    // Insert data
    const newSp2 = await prisma.sp2Service.create({
      data: parsedData
    });

    // Response sesuai spesifikasi
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Data SP2 Berhasil Disimpan',
        data: {
          ref_number: newSp2.ref_number,
          nomor_sp2: newSp2.nomor_sp2,
          pin_gate: newSp2.pin_gate,
          timestamp: newSp2.timestamp.toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Error in entrySp2:', error);
    
    if (error.code === 'P2002') {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, 'SP2 with this ref_number already exists');
    }
    
    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

module.exports = {
  entrySp2
};

