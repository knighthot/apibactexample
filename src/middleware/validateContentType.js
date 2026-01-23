const { HEADERS, HTTP_STATUS, RESPONSE_STATUS } = require('../config/constants');

/**
 * Middleware untuk validasi Content-Type saja (tanpa AccessKey)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateContentType = (req, res, next) => {
  const contentType = req.get('Content-Type');

  // Validasi Content-Type
  if (contentType !== HEADERS.CONTENT_TYPE) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      response: {
        status: RESPONSE_STATUS.FAILED,
        code: HTTP_STATUS.BAD_REQUEST,
        message: `Invalid Content-Type. Expected: ${HEADERS.CONTENT_TYPE}`,
        data: []
      }
    });
  }

  next();
};

module.exports = { validateContentType };

