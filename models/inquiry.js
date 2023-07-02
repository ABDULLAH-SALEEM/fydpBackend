const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const InquirySchema = new Schema(
  {
    name:{type:Types.String},
    email:{type:Types.String},
    status:{type:Types.String, default:"Unanswered"},
    product:{type:Types.String},
    quantity:{type:Types.String},
    address:{type:Types.String},
    phoneNumber:{type:Types.String},
    req:{type:Types.String},
    userId:{type:Types.String},
    sentTo:{type:Types.String},
  },
  {
    timestamps: true,
  }
);


InquirySchema.plugin(mongoosePaginate);

module.exports = {
  InquiryModel: model(MODEL_NAME.INQUIRIES, InquirySchema),
};
