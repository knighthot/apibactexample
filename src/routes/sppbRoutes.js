const express = require('express');
const router = express.Router();
const { getSppb } = require('../controllers/sppbController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /get_sppb
 * @desc Get SPPB data by nomor_sppb
 * @access Private (requires AccessKey: BACT-SPPB-2203)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-SPPB-2203
 */
router.post('/get_sppb', validateHeaders(ACCESS_KEYS.SPPB), getSppb);

module.exports = router;

