const moment = require("moment");
const { OtpModel } = require("#models/otp");
const { _generateOtp } = require("#helper/utils");

function getOtpData(email) {
  OtpModel.removeExpired();
  return OtpModel.findOne({ email, expiredAt: { $gte: new Date() } }).sort({
    createdAt: -1,
  });
}

function generateOTP(email, expiry) {
  // TODO: Check if valid expiry date
  // By default add an expiry of 30 minutes
  expiry = expiry || moment().add(30, "minutes");

  const otp = _generateOtp(6);
  const otpIns = new OtpModel({ otp, email, expiredAt: expiry });
  return otpIns.save().then(() => otp);
}

function removeOtp(_id) {
  return OtpModel.deleteOne({ _id });
}

module.exports = {
  getOtpData,
  generateOTP,
  removeOtp,
};
