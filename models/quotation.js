const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const QuotationSchema = new Schema(
  {
    tax: { type: Types.Number },
    unitPrice: { type: Types.Number },
    notes: { type: Types.String },
    product: { type: Types.String },
    amount: { type: Types.Number },
    quantity: { type: Types.Number },
    userId: { type: Types.String },
    sentTo: { type: Types.String },
    status: { type: Types.String, default: "created" },
  },
  {
    timestamps: true,
  }
);

QuotationSchema.plugin(mongoosePaginate);

module.exports = {
  QuotationModel: model(MODEL_NAME.QUOTATION, QuotationSchema),
};
