const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");
const { sendFeedbackEmail } = require("#services/email.service");

const {
  getFeedbackById,
  deleteFeedbackById,
  getAllFeedback,
  createFeedback,
  updateFeedbackById,
  sendFeedback
} = require("#services/feedback.service");

//#routes
router.post("/create-feedback", createFeedbackController);
router.post("/send-feedback", sendFeedbackController);
router.get("/get-all-feedback", [jwtAuth], getAllFeedbackController);
router.get("/get-feedback-by-id/:id", [jwtAuth], getFeedbackByIdController);
router.delete(
  "/delete-feedback-by-id/:id",
  [jwtAuth],
  deleteFeedbackByIdController
);
router.put(
  "/update-feedback-by-id/:id",
  [jwtAuth],
  updateFeedbackByIdController
);

async function createFeedbackController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newFeedback = await createFeedback(req.body);

    if (!newFeedback) {
      return res.generateResponse(400, "Error in creating Feedback");
    }

    return res.generateResponse(
      200,
      "Feedback created successfull",
      newFeedback
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function sendFeedbackController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const sentFeedback = await sendFeedback(req.body);
    console.log(req.body.email, req.body.feedback)
    await sendFeedbackEmail(req.body.email, req.body.feedback);

    if (!sentFeedback) {
      return res.generateResponse(400, "Error in sending Feedback");
    }

    return res.generateResponse(200, "Feedback send successfull", sentFeedback);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllFeedbackController(req, res, next) {
  try {
    const getFaq = await getAllFeedback();
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting Feedback");
    }
    return res.generateResponse(200, "Feedback get successfully", getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getFeedbackByIdController(req, res, next) {
  try {
    const getFaq = await getAllFeedback(req.params.id);
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting Feedback");
    }
    return res.generateResponse(200, "Feedback get successfully", getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteFeedbackByIdController(req, res, next) {
  try {
    const deleteFaq = await deleteFeedbackById(req.params.id);
    if (!deleteFaq) {
      return res.generateResponse(400, "Error in deleting Feedback");
    }
    return res.generateResponse(
      200,
      "Feedback deleted successfully",
      deleteFaq
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateFeedbackByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateFaq = await updateFeedbackById(req.params.id, req.body);
    if (!updateFaq) {
      return res.generateResponse(400, "Error in updating Feedback");
    }
    return res.generateResponse(
      200,
      "Feedback updated successfully",
      updateFaq
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
