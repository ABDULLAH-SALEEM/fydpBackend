const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const AssignmentSchema = new Schema(
  {
    orderId: {
      type: Types.ObjectId,
      ref: MODEL_NAME.ORDER,
    },
    userId: { type: Types.String },
    deadline: { type: Types.String },
    assignedBy: {
      type: Types.ObjectId,
      ref: MODEL_NAME.USER,
    },
  },
  {
    timestamps: true,
  }
);

AssignmentSchema.plugin(mongoosePaginate);

module.exports = {
  AssignmentModel: model(MODEL_NAME.ASSIGNMENT, AssignmentSchema),
};
