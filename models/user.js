const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const UserSchema = new Schema(
  {
    firstname: { type: Types.String },
    lastname: { type: Types.String },
    email: {
      type: Types.String,
      lowercase: true,
      unique: true,
      required: true,
    },
    ratings: { type: Types.String, default:''  },
    companyName: { type: Types.String },
    address: { type: Types.String },
    number: { type: Types.Number },
    password: { type: Types.String },
    role: { type: Types.String },
    verified: { type: Types.Boolean, default: false },
    socialLogin: { type: Types.Boolean, default: false },
  },
  {
    timestamps: true,
    methods: {
      authenticatePassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    statics: {
      encryptPassword: function (password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      },
    },
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.plugin(mongoosePaginate);

module.exports = {
  UserModel: model(MODEL_NAME.USER, UserSchema),
};
