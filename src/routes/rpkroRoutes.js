const express = require('express');
const router = express.Router();
const { entryRpkro } = require('../controllers/rpkroController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

/**
 * @route POST /entry_rpkro
 * @desc Entry/Insert new RPKRO data
 * @access Private (requires AccessKey: BACT-RPKRO-2208)
 * @headers Content-Type: application/x-www-form-urlencoded
 *          User-Agent: BACT
 *          AccessKey: BACT-RPKRO-2208
 */
router.post('/entry_rpkro', validateHeaders(ACCESS_KEYS.RPKRO), entryRpkro);

module.exports = router;

