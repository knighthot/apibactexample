const express = require('express');
const router = express.Router();
const { entrySp2 } = require('../controllers/sp2Controller');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /entry_sp2
 * @desc Entry/Insert new SP2 data
 * @access Private (requires AccessKey: BACT-SP2-2204)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-SP2-2204
 */
router.post('/entry_sp2', validateHeaders(ACCESS_KEYS.SP2), entrySp2);

module.exports = router;

