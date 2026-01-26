const express = require('express');
const router = express.Router();
const { getNpe } = require('../controllers/npeController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /get_npe
 * @desc Get NPE data by no_npe
 * @access Private (requires AccessKey: BACT-NPE-2210)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-NPE-2210
 */
router.post('/get_npe', validateHeaders(ACCESS_KEYS.NPE), getNpe);

module.exports = router;

