const { RatingsModel } = require("#models/ratings");
const { MODEL_NAME } = require("#constants/ModelNameEnum");
const { UserModel } = require("#models/user");

async function getAllRatings(userId) {
  const data = await RatingsModel.find({ ratingTo: userId })
    .populate("ratingTo")
    .populate("ratingFrom");
  return data;
}

async function createRating(data) {
  const newRating = await new RatingsModel({ ...data });
  const user = await UserModel.findOne({
    _id: data.ratingTo,
  });
  const averageRating = (data.rating + user.ratings) / 2;
  await UserModel.findOneAndUpdate(
    { _id: data.ratingTo },
    { ratings: Math.round(averageRating) },
    {
      new: true,
    }
  );
  return newRating.save();
}

module.exports = {
  getAllRatings,
  createRating,
};
