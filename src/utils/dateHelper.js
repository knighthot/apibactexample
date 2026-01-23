/**
 * Validasi format period (yyyymmdd)
 * @param {string} period - Period string dalam format yyyymmdd
 * @returns {boolean} - True jika format valid
 */
const isValidPeriodFormat = (period) => {
  const periodRegex = /^\d{8}$/;
  return periodRegex.test(period);
};

/**
 * Parse period string ke Date object
 * @param {string} period - Period string dalam format yyyymmdd
 * @returns {Date|null} - Date object atau null jika invalid
 */
const parsePeriod = (period) => {
  if (!isValidPeriodFormat(period)) {
    return null;
  }

  const year = period.substring(0, 4);
  const month = period.substring(4, 6);
  const day = period.substring(6, 8);
  
  const date = new Date(`${year}-${month}-${day}`);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date;
};

/**
 * Get start of day (00:00:00.000)
 * @param {Date} date - Date object
 * @returns {Date} - Start of day
 */
const getStartOfDay = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

/**
 * Get end of day (23:59:59.999)
 * @param {Date} date - Date object
 * @returns {Date} - End of day
 */
const getEndOfDay = (date) => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
};

/**
 * Format Date to 'yyyy-mm-dd HH:mm:ss'
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
const formatDateTime = (date) => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

/**
 * Parse datetime string to Date object
 * Supports formats: 'yyyy-mm-dd HH:mm:ss', ISO format
 * @param {string} dateTimeStr - DateTime string
 * @returns {Date|null} - Date object atau null jika invalid
 */
const parseDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return null;

  // Try to parse as ISO format first
  let date = new Date(dateTimeStr);

  // If invalid, try to parse 'yyyy-mm-dd HH:mm:ss' format
  if (isNaN(date.getTime())) {
    // Replace space with 'T' to make it ISO compatible
    const isoFormat = dateTimeStr.replace(' ', 'T');
    date = new Date(isoFormat);
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
};

module.exports = {
  isValidPeriodFormat,
  parsePeriod,
  getStartOfDay,
  getEndOfDay,
  formatDateTime,
  parseDateTime
};

