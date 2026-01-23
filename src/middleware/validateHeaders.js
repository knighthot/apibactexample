const { HEADERS, HTTP_STATUS, RESPONSE_STATUS } = require('../config/constants');

/**
 * Middleware factory untuk validasi headers
 * @param {string} requiredAccessKey - Access key yang diharapkan untuk endpoint tertentu
 * @returns {Function} Express middleware function
 */
const validateHeaders = (requiredAccessKey) => {
  return (req, res, next) => {
    const contentType = req.get('Content-Type');
    const userAgent = req.get('User-Agent');
    const accessKey = req.get('AccessKey');

    // Validasi Content-Type
    if (contentType !== HEADERS.CONTENT_TYPE) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        response: {
          status: RESPONSE_STATUS.FAILED,
          code: HTTP_STATUS.BAD_REQUEST,
          message: `Invalid Content-Type. Expected: ${HEADERS.CONTENT_TYPE}`
        }
      });
    }

    // Validasi User-Agent
    if (userAgent !== HEADERS.USER_AGENT) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        response: {
          status: RESPONSE_STATUS.FAILED,
          code: HTTP_STATUS.BAD_REQUEST,
          message: `Invalid User-Agent. Expected: ${HEADERS.USER_AGENT}`
        }
      });
    }

    // Validasi AccessKey
    if (!accessKey || accessKey !== requiredAccessKey) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        response: {
          status: RESPONSE_STATUS.FAILED,
          code: HTTP_STATUS.UNAUTHORIZED,
          message: 'Invalid or missing AccessKey'
        }
      });
    }

    next();
  };
};

module.exports = validateHeaders;

