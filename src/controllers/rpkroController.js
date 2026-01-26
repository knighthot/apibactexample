const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');
const { parseDateTime } = require('../utils/dateHelper');

/**
 * Entry/Insert new RPKRO data
 * @route POST /entry_rpkro
 */
const entryRpkro = async (req, res) => {
  try {
    const {
      nomor_rpkro,
      nomor_ppk,
      nomor_ppkb,
      nomor_layanan,
      kode_dermaga,
      tanggal_rencana,
      jam_rencana,
      npkb_nomor,
      nomor_rkbm_muat,
      nomor_rkbm_bongkar,
      kegiatan_bongkar,
      kegiatan_muat,
      komoditi,
      nomor_gudang,
      keterangan,
      tanggal_mulai_tambat,
      jam_mulai_tambat,
      tanggal_selesai_tambat,
      jam_selesai_tambat,
      kade_meter_awal,
      kade_meter_akhir
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      nomor_rpkro: 'RPKRO Number',
      nomor_ppk: 'PPK Number',
      nomor_ppkb: 'PPKB Number',
      nomor_layanan: 'Service Number',
      kode_dermaga: 'Berth Code',
      tanggal_rencana: 'Plan Date',
      jam_rencana: 'Plan Time',
      npkb_nomor: 'NPKB Number',
      nomor_rkbm_muat: 'RKBM Loading Number',
      nomor_rkbm_bongkar: 'RKBM Discharge Number',
      kegiatan_bongkar: 'Discharge Activity',
      kegiatan_muat: 'Loading Activity',
      tanggal_mulai_tambat: 'Start Berthing Date',
      jam_mulai_tambat: 'Start Berthing Time',
      tanggal_selesai_tambat: 'End Berthing Date',
      jam_selesai_tambat: 'End Berthing Time',
      kade_meter_awal: 'Start Kade Meter',
      kade_meter_akhir: 'End Kade Meter'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, `Field "${field}" (${label}) is required`);
      }
    }

    // Parse dates
    const tanggalRencanaDateTime = parseDateTime(`${tanggal_rencana} ${jam_rencana}`);
    const tglMulaiTambatDateTime = parseDateTime(`${tanggal_mulai_tambat} ${jam_mulai_tambat}`);
    const tglSelesaiTambatDateTime = parseDateTime(`${tanggal_selesai_tambat} ${jam_selesai_tambat}`);

    // Validasi tanggal
    if (tglSelesaiTambatDateTime <= tglMulaiTambatDateTime) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, 'End berthing date/time must be after start berthing date/time');
    }

    // Parse data
    const parsedData = {
      nomor_rpkro,
      nomor_ppk,
      nomor_ppkb,
      nomor_layanan,
      kode_dermaga,
      tanggal_rencana: tanggalRencanaDateTime,
      npkb_nomor,
      nomor_rkbm_muat,
      nomor_rkbm_bongkar,
      kegiatan_bongkar,
      kegiatan_muat,
      komoditi: komoditi || null,
      nomor_gudang: nomor_gudang || null,
      keterangan: keterangan || null,
      tanggal_mulai_tambat: tglMulaiTambatDateTime,
      tanggal_selesai_tambat: tglSelesaiTambatDateTime,
      kade_meter_awal: parseFloat(kade_meter_awal),
      kade_meter_akhir: parseFloat(kade_meter_akhir)
    };

    // Insert data
    const newRpkro = await prisma.rpkroService.create({
      data: parsedData
    });

    // Response sesuai spesifikasi
    return res.status(HTTP_STATUS.OK).json({
      response: {
        status: 1,
        code: HTTP_STATUS.OK,
        message: 'Sukses',
        data: {
          entry_rpkro: {
            msg: {
              statusCode: '01',
              statusMessage: 'Sukses, RPKRO berhasil diupdate',
              NomorRpkRo: newRpkro.nomor_rpkro,
              timestamp: newRpkro.timestamp.toISOString()
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('Error in entryRpkro:', error);
    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

module.exports = {
  entryRpkro
};

