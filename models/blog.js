const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const BlogSchema = new Schema(
  {
    title: { en: { type: Types.String }, fr: { type: Types.String } },
    blog: { en: { type: Types.String }, fr: { type: Types.String } },
    authorName: { en: { type: Types.String }, fr: { type: Types.String } },
    authorDescription: { en: { type: Types.String }, fr: { type: Types.String } },
    issueDate: { type: Types.Date  },
    priority:{type:Types.Number}

  },
  {
    timestamps: true,
  }
);


BlogSchema.plugin(mongoosePaginate);

module.exports = {
  BlogModel: model(MODEL_NAME.BLOG, BlogSchema),
};
