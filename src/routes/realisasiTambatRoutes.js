const express = require('express');
const router = express.Router();
const { entryRealisasiTambat } = require('../controllers/realisasiTambatController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /entry_realisasi_tambat
 * @desc Entry/Insert new Realisasi Tambat data
 * @access Private (requires AccessKey: BACT-TAMBAT-2207)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-TAMBAT-2207
 */
router.post('/entry_realisasi_tambat', validateHeaders(ACCESS_KEYS.REALISASI_TAMBAT), entryRealisasiTambat);

module.exports = router;

