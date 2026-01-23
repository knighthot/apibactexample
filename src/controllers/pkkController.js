const { prisma } = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const {
  parsePeriod,
  getStartOfDay,
  getEndOfDay,
  formatDateTime,
  isValidPeriodFormat,
  parseDateTime
} = require('../utils/dateHelper');

/**
 * Get PKK data by period
 * @route POST /get_pkk
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPkkByPeriod = async (req, res) => {
  try {
    const { period } = req.body;

    // Validasi request body
    if (!period) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Field "period" is required'
      );
    }

    // Validasi format period (yyyymmdd)
    if (!isValidPeriodFormat(period)) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Invalid period format. Expected format: yyyymmdd (e.g., 20260120)'
      );
    }

    // Parse period ke Date
    const periodDate = parsePeriod(period);
    if (!periodDate) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Invalid date in period'
      );
    }

    // Set start dan end of day untuk filter
    const startOfDay = getStartOfDay(periodDate);
    const endOfDay = getEndOfDay(periodDate);

    // Query data PKK berdasarkan period (filter by tanggal_eta)
    const pkkData = await prisma.pkkService.findMany({
      where: {
        tanggal_eta: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: {
        tanggal_eta: 'asc'
      }
    });

    // Format response sesuai spesifikasi
    const responseData = pkkData.map(pkk => ({
      nomor_pkk: pkk.nomor_pkk,
      nama_kapal: pkk.nama_kapal,
      call_sign: pkk.call_sign,
      tanda_pendaftaran_kapal: pkk.tanda_pendaftaran_kapal,
      tanggal_eta: formatDateTime(pkk.tanggal_eta),
      tanggal_etd: formatDateTime(pkk.tanggal_etd),
      jenis_trayek: pkk.jenis_trayek,
      timestamp: pkk.timestamp.toISOString()
    }));

    // Success response
    return sendSuccess(res, responseData, 'Sukses');

  } catch (error) {
    console.error('Error in getPkkByPeriod:', error);
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

/**
 * Entry/Insert new PKK data
 * @route POST /entry_pkk
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const entryPkk = async (req, res) => {
  try {
    const {
      nomor_pkk,
      nama_kapal,
      call_sign,
      tanda_pendaftaran_kapal,
      tanggal_eta,
      tanggal_etd,
      jenis_trayek
    } = req.body;

    // Validasi required fields
    const requiredFields = {
      nomor_pkk: 'PKK Number',
      nama_kapal: 'Vessel Name',
      call_sign: 'Call Sign',
      tanda_pendaftaran_kapal: 'Ship Registry No',
      tanggal_eta: 'ETA DateTime',
      tanggal_etd: 'ETD DateTime',
      jenis_trayek: 'Jenis Trayek'
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

    // Parse tanggal_eta dan tanggal_etd
    const etaDate = parseDateTime(tanggal_eta);
    const etdDate = parseDateTime(tanggal_etd);

    if (!etaDate) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Invalid tanggal_eta format. Expected: yyyy-mm-dd HH:mm:ss or ISO format'
      );
    }

    if (!etdDate) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Invalid tanggal_etd format. Expected: yyyy-mm-dd HH:mm:ss or ISO format'
      );
    }

    // Validasi ETD harus setelah ETA
    if (etdDate <= etaDate) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'tanggal_etd must be after tanggal_eta'
      );
    }

    // Check if nomor_pkk already exists
    const existingPkk = await prisma.pkkService.findUnique({
      where: { nomor_pkk }
    });

    if (existingPkk) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        `PKK with nomor_pkk "${nomor_pkk}" already exists`
      );
    }

    // Insert data ke database
    const newPkk = await prisma.pkkService.create({
      data: {
        nomor_pkk,
        nama_kapal,
        call_sign,
        tanda_pendaftaran_kapal,
        tanggal_eta: etaDate,
        tanggal_etd: etdDate,
        jenis_trayek
      }
    });

    // Format response
    const responseData = {
      nomor_pkk: newPkk.nomor_pkk,
      nama_kapal: newPkk.nama_kapal,
      call_sign: newPkk.call_sign,
      tanda_pendaftaran_kapal: newPkk.tanda_pendaftaran_kapal,
      tanggal_eta: formatDateTime(newPkk.tanggal_eta),
      tanggal_etd: formatDateTime(newPkk.tanggal_etd),
      jenis_trayek: newPkk.jenis_trayek,
      timestamp: newPkk.timestamp.toISOString()
    };

    // Success response
    return sendSuccess(res, [responseData], 'Data PKK berhasil disimpan');

  } catch (error) {
    console.error('Error in entryPkk:', error);

    // Handle Prisma unique constraint error
    if (error.code === 'P2002') {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'PKK with this nomor_pkk already exists'
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
  getPkkByPeriod,
  entryPkk
};

