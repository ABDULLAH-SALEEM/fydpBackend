const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const OtpSchema = new Schema(
  {
    otp: { type: Types.String },
    email: { type: Types.String },
    expiredAt: { type: Types.Date },
  },
  {
    timestamps: true,
    methods: {
      authenticateOtp: function (otp) {
        return bcrypt.compareSync(otp, this.otp);
      },
    },
    statics: {
      removeExpired: function () {
        return this.deleteMany({ expiredAt: { $lt: new Date() } });
      },
    },
  }
);

OtpSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.otp = bcrypt.hashSync(this.otp, salt);
  next();
});

module.exports = {
  OtpModel: model(MODEL_NAME.OTP, OtpSchema),
};
