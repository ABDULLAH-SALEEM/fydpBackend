const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const QuotationSchema = new Schema(
  {
    quotationId: {
      type: Types.ObjectId,
      required: true,
      ref: MODEL_NAME.QUOTATION,
    },
    userId: { type: Types.String },
    orderFrom: { type: Types.String },
    status: { type: Types.String, default: "confirmed" },
    orderHistory: [{ owner: Types.String, date: Types.String }],
  },
  {
    timestamps: true,
  }
);

QuotationSchema.plugin(mongoosePaginate);

module.exports = {
  OrderModel: model(MODEL_NAME.ORDER, QuotationSchema),
};
