const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const FaqSchema = new Schema(
  {
    en: { question:{type: Types.String},answer:{type: Types.String} },
    fr: { question:{type: Types.String},answer:{type: Types.String} },    
    priority:{type:Types.Number}

  },
  {
    timestamps: true,
  }
);


FaqSchema.plugin(mongoosePaginate);

module.exports = {
  FaqModel: model(MODEL_NAME.FAQ, FaqSchema),
};
