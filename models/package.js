


const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const PackageSchema = new Schema(
  {
    title: { en: { type: Types.String }, fr: { type: Types.String } },
    help: { en: { type: Types.String }, fr: { type: Types.String } },

    type: { type: [Types.String], enum: ["monthly", "yearly"] },
    salePrice: { type: [Types.Number] },
    buyPrice: { type: [Types.Number] },
    tokens: { type: [Types.Number] },
    price: { type: [Types.String] },
    words: { type: [Types.Number] },
    description: { en: { type: Types.String }, fr: { type: Types.String } },
    save: { en: { type: Types.String }, fr: { type: Types.String } },

  },
  {
    timestamps: true,
  }
);


PackageSchema.plugin(mongoosePaginate);

module.exports = {
  PackageModel: model(MODEL_NAME.PACKAGE, PackageSchema),
};
