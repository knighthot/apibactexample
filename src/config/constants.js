// Pastikan dotenv sudah di-load di index.js/app.js utama Anda
// atau bisa tambahkan: require('dotenv').config(); di baris paling atas file ini jika perlu.

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // API Access Keys (Mengambil dari .env)
  ACCESS_KEYS: {
    PKK: process.env.ACCESS_KEY_PKK,
    TRANSPORTATION: process.env.ACCESS_KEY_TRANSPORTATION,
    SPPB: process.env.ACCESS_KEY_SPPB,
    SP2: process.env.ACCESS_KEY_SP2,
    CODECO: process.env.ACCESS_KEY_CODECO,
    COARRI: process.env.ACCESS_KEY_COARRI,
    REALISASI_TAMBAT: process.env.ACCESS_KEY_TAMBAT,
    RPKRO: process.env.ACCESS_KEY_RPKRO,
    SUBMIT_MANIFEST: process.env.ACCESS_KEY_MANIFEST,
    NPE: process.env.ACCESS_KEY_NPE
  },

  // Expected Headers
  HEADERS: {
    CONTENT_TYPE: 'application/x-www-form-urlencoded',
    USER_AGENT: 'BACT'
  },

  // Response Status
  RESPONSE_STATUS: {
    SUCCESS: 1,
    FAILED: 0
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  }
};