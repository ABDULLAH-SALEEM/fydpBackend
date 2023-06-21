const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const BlogPageSchema = new Schema(
  {
    title: { en:{type: Types.String},fr:{type: Types.String} },
    description: { en:{type: Types.String},fr:{type: Types.String} },

  },
  {
    timestamps: true,
  }
);


BlogPageSchema.plugin(mongoosePaginate);

module.exports = {
  BlogPageModel: model(MODEL_NAME.BLOGPAGE, BlogPageSchema),
};
