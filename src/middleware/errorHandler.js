const { HTTP_STATUS, RESPONSE_STATUS } = require('../config/constants');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    response: {
      status: RESPONSE_STATUS.FAILED,
      code: statusCode,
      message: message,
      data: []
    }
  });
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    response: {
      status: RESPONSE_STATUS.FAILED,
      code: HTTP_STATUS.NOT_FOUND,
      message: 'Endpoint not found'
    }
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};

