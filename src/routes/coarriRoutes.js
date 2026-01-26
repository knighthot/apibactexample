const express = require('express');
const router = express.Router();
const { entryCoarri, updateCoarri } = require('../controllers/coarriController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /entry_coarri
 * @desc Entry/Insert new COARRI data
 * @access Private (requires AccessKey: BACT-COARRI-2206)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-COARRI-2206
 */
router.post('/entry_coarri', validateHeaders(ACCESS_KEYS.COARRI), entryCoarri);

/**
 * @route POST /update_coarri
 * @desc Update COARRI kd_status by ref_number
 * @access Private (requires AccessKey: BACT-COARRI-2206)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-COARRI-2206
 */
router.post('/update_coarri', validateHeaders(ACCESS_KEYS.COARRI), updateCoarri);

module.exports = router;

