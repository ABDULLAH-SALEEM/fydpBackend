const moment = require("moment");

function _pickAllowedFields(data = {}, allowedFields = []) {
  const allowedData = {};

  allowedFields.forEach((field) => {
    allowedData[field] = data[field];
  });

  return allowedData;
}

function _excludeExtraFields(data = {}, extraFields = []) {
  const allowedData = Object.assign(data, {});

  extraFields.forEach((field) => {
    delete allowedData[field];
  });

  return allowedData;
}

function _checkRequiredMissingFields(data = {}, requiredFields = []) {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!data[field]) missingFields.push(field);
  });

  return missingFields;
}

function _generateOtp(digitsLength = 6) {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < digitsLength; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function _timeDiffInMinutes(startTime, endTime) {
  startTime = moment(startTime);
  endTime = moment(endTime);
  const duration = moment.duration(endTime.diff(startTime));
  return duration.asMinutes();
}

function _roundDecimals(val, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

module.exports = {
  _pickAllowedFields,
  _excludeExtraFields,
  _checkRequiredMissingFields,
  _generateOtp,
  _timeDiffInMinutes,
  _roundDecimals,
};
