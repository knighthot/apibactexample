const { HTTP_STATUS, RESPONSE_STATUS } = require('../config/constants');

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {Array} data - Data to send
 * @param {string} message - Success message
 */
const sendSuccess = (res, data = [], message = 'Sukses') => {
  return res.status(HTTP_STATUS.OK).json({
    response: {
      status: RESPONSE_STATUS.SUCCESS,
      code: HTTP_STATUS.OK,
      message: message,
      data: data
    }
  });
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    response: {
      status: RESPONSE_STATUS.FAILED,
      code: statusCode,
      message: message,
      data: []
    }
  });
};

module.exports = {
  sendSuccess,
  sendError
};

