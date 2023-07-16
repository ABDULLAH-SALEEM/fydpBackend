const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const ProductSchema = new Schema(
  {
    name: { type: Types.String },
    unit: { type: Types.String },
    quantity: { type: Types.Number },
    userId: { type: Types.String },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = {
  ProductModel: model(MODEL_NAME.PRODUCT, ProductSchema),
};
