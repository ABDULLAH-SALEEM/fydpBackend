const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const FooterSchema = new Schema(
  {
    section1: { en:{type: Types.String},fr:{type: Types.String} },
    section2: { en:{type: Types.String},fr:{type: Types.String} },
    section3: { en:{type: Types.String},fr:{type: Types.String} },
    section4: { en:{type: Types.String},fr:{type: Types.String} },
    section5: { en:{type: Types.String},fr:{type: Types.String} },
    section6: { en:{type: Types.String},fr:{type: Types.String} },

  },
  {
    timestamps: true,
  }
);


FooterSchema.plugin(mongoosePaginate);

module.exports = {
  FooterModel: model(MODEL_NAME.FOOTER, FooterSchema),
};
