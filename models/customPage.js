const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const CustomPageSchema = new Schema(
  {
    title: { en:{type: Types.String},fr:{type: Types.String} },
    button: { en:{type: Types.String},fr:{type: Types.String} },
    description: { en:{type: Types.String},fr:{type: Types.String} },

  },
  {
    timestamps: true,
  }
);


CustomPageSchema.plugin(mongoosePaginate);

module.exports = {
  CustomPageModel: model(MODEL_NAME.CUSTOMPAGE, CustomPageSchema),
};
