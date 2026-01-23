module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // API Access Keys
  ACCESS_KEYS: {
    PKK: 'BACT-PKK-2201',
    TRANSPORTATION: 'BACT-TRANS-2202',
    SPPB: 'BACT-SPPB-2203',
    SP2: 'BACT-SP2-2204',
    CODECO: 'BACT-CODECO-2205',
    COARRI: 'BACT-COARRI-2206',
    REALISASI_TAMBAT: 'BACT-TAMBAT-2207',
    RPKRO: 'BACT-RPKRO-2208',
    SUBMIT_MANIFEST: 'BACT-MANIFEST-2209',
    NPE: 'BACT-NPE-2210'
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

