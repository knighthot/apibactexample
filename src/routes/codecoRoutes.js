const express = require('express');
const router = express.Router();
const { entryCodeco, updateCodeco } = require('../controllers/codecoController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /entry_codeco
 * @desc Entry/Insert new CODECO data
 * @access Private (requires AccessKey: BACT-CODECO-2205)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-CODECO-2205
 */
router.post('/entry_codeco', validateHeaders(ACCESS_KEYS.CODECO), entryCodeco);

/**
 * @route POST /update_codeco
 * @desc Update CODECO kd_status by ref_number
 * @access Private (requires AccessKey: BACT-CODECO-2205)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-CODECO-2205
 */
router.post('/update_codeco', validateHeaders(ACCESS_KEYS.CODECO), updateCodeco);

module.exports = router;

