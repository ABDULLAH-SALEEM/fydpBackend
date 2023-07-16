const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const ShipmentSchema = new Schema(
  {
    orderId: {
      type: Types.ObjectId,
      ref: MODEL_NAME.ORDER,
    },
    userId: { type: Types.String },
    deadline: { type: Types.String },
    from: { type: Types.String },
    to: { type: Types.String },
    assignedBy: {
      type: Types.ObjectId,
      ref: MODEL_NAME.USER,
    },
  },
  {
    timestamps: true,
  }
);

ShipmentSchema.plugin(mongoosePaginate);

module.exports = {
  ShipmentModel: model(MODEL_NAME.SHIPMENT, ShipmentSchema),
};
