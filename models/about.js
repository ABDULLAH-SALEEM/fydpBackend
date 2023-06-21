const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const AboutSchema = new Schema(
  {
    start: { en:{type: Types.String},fr:{type: Types.String} },
    middle: [{
        _id: {
            type: String,
            select: false 
          },
        head:{ en:{type: Types.String},fr:{type: Types.String} },
        body:{ en:{type: Types.String},fr:{type: Types.String} },
    }],
    end: { en:{type: Types.String},fr:{type: Types.String} },

  },
  {
    timestamps: true,
  }
);


AboutSchema.plugin(mongoosePaginate);

module.exports = {
  AboutModel: model(MODEL_NAME.ABOUT, AboutSchema),
};
