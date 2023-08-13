const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const RatingSchema = new Schema(
  {
    ratingTo: {
      type: Types.ObjectId,
      ref: MODEL_NAME.USER,
    },
    ratingFrom: {
      type: Types.ObjectId,
      ref: MODEL_NAME.USER,
    },
    rating: { type: Types.Number },
  },
  {
    timestamps: true,
  }
);

RatingSchema.plugin(mongoosePaginate);

module.exports = {
  RatingsModel: model(MODEL_NAME.RATINGS, RatingSchema),
};
