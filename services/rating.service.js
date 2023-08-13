const { RatingsModel } = require("#models/ratings");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

async function getAllRatings(userId) {
  const data = await RatingsModel.find({ ratingTo: userId })
    .populate("ratingTo")
    .populate("ratingFrom");
  return data;
}

function createRating(data) {
  const newRating = new RatingsModel({ ...data });
  return newRating.save();
}

module.exports = {
  getAllRatings,
  createRating,
};
