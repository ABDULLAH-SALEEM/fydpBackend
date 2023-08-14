const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const { getAllRatings, createRating } = require("#services/rating.service");

//#routes
router.post("/create-rating", [jwtAuth], createRatingController);
router.get("/get-all-rating/:id", [jwtAuth], getAllRatingsController);

async function createRatingController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newRating = await createRating(req.body);

    if (!newRating) {
      return res.generateResponse(400, "Error in creating rating");
    }
    return res.generateResponse(200, "Rating created successfull", newRating);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAllRatingsController(req, res, next) {
  try {
    const ratings = await getAllRatings(req.params.id);
    if (!ratings) {
      return res.generateResponse(400, "Error in getting ratings");
    }
    return res.generateResponse(200, "Ratings get successfully", ratings);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
