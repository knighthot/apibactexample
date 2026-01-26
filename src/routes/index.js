const express = require('express');
const router = express.Router();

// Import route modules
const pkkRoutes = require('./pkkRoutes');
const transportationRoutes = require('./transportationRoutes');
const codecoRoutes = require('./codecoRoutes');
const coarriRoutes = require('./coarriRoutes');
const realisasiTambatRoutes = require('./realisasiTambatRoutes');
const rpkroRoutes = require('./rpkroRoutes');
const sppbRoutes = require('./sppbRoutes');
const npeRoutes = require('./npeRoutes');
const sp2Routes = require('./sp2Routes');
// TODO: Import other service routes here
// const sppbRoutes = require('./sppbRoutes');
// const sp2Routes = require('./sp2Routes');
// etc..

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API BACT Integration is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount service routes
router.use('/', pkkRoutes);
router.use('/', transportationRoutes);
router.use('/', codecoRoutes);
router.use('/', coarriRoutes);
router.use('/', realisasiTambatRoutes);
router.use('/', rpkroRoutes);
router.use('/', sppbRoutes);
router.use('/', npeRoutes);
router.use('/', sp2Routes);
// TODO: Mount other service routes here
// router.use('/', sppbRoutes);
// router.use('/', sp2Routes);
// etc...

module.exports = router;

