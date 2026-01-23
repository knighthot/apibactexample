const express = require('express');
const router = express.Router();
const { entryCodeco } = require('../controllers/codecoController');
const { validateContentType } = require('../middleware/validateContentType');

/**
 * @route POST /entry_codeco
 * @desc Entry/Insert new CODECO data
 * @access Public (should be protected in production)
 */
router.post('/entry_codeco', validateContentType, entryCodeco);

module.exports = router;

