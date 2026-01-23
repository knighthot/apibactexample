const express = require('express');
const router = express.Router();
const { getPkkByPeriod, entryPkk } = require('../controllers/pkkController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route   POST /get_pkk
 * @desc    Get PKK data by period (yyyymmdd)
 * @access  Private (requires AccessKey: BACT-PKK-2201)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-PKK-2201
 * @body    period: string (yyyymmdd format, e.g., 20260120)
 */
router.post('/get_pkk', validateHeaders(ACCESS_KEYS.PKK), getPkkByPeriod);

/**
 * @route   POST /entry_pkk
 * @desc    Insert new PKK data
 * @access  Private (requires AccessKey: BACT-PKK-2201)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-PKK-2201
 * @body    nomor_pkk: string (required)
 *          nama_kapal: string (required)
 *          call_sign: string (required)
 *          tanda_pendaftaran_kapal: string (required)
 *          tanggal_eta: string (required, format: yyyy-mm-dd HH:mm:ss)
 *          tanggal_etd: string (required, format: yyyy-mm-dd HH:mm:ss)
 *          jenis_trayek: string (required)
 */
router.post('/entry_pkk', validateHeaders(ACCESS_KEYS.PKK), entryPkk);

module.exports = router;

