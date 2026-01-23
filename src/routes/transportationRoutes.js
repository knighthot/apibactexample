const express = require('express');
const router = express.Router();
const { getTransportation } = require('../controllers/transportationController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route   POST /get_transportation
 * @desc    Get Transportation data with limit
 * @access  Private (requires AccessKey: BACT-TRANS-2202)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: {AccessKey}
 * @body    jml: string (number of records to retrieve)
 */
router.post('/get_transportation', validateHeaders(ACCESS_KEYS.TRANSPORTATION), getTransportation);

module.exports = router;

