const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: Types.String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: { type: Types.String },
  },
  {
    timestamps: true,
    methods: {
      authenticatePassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    statics: {
      encryptPassword: function (password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      }
    },
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

AdminSchema.plugin(mongoosePaginate);

module.exports = {
  AdminModel: model(MODEL_NAME.ADMIN, AdminSchema)
};
