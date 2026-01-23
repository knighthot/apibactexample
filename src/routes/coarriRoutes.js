const express = require('express');
const router = express.Router();
const { entryCoarri } = require('../controllers/coarriController');
const { validateContentType } = require('../middleware/validateContentType');

/**
 * @route POST /entry_coarri
 * @desc Entry/Insert new COARRI data
 * @access Public (should be protected in production)
 */
router.post('/entry_coarri', validateContentType, entryCoarri);

module.exports = router;

