const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
} = require("#services/assignment.service");

//#routes
router.post("/create-assignment", [jwtAuth], createAssignmentController);
router.get("/get-all-assignment", [jwtAuth], getAllAssignmentsController);
router.get("/get-assignment-by-id/:id", [jwtAuth], getAssignmentByIdController);

async function createAssignmentController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newAssignment = await createAssignment(req.body);

    if (!newAssignment) {
      return res.generateResponse(400, "Error in creating assignment");
    }
    return res.generateResponse(
      200,
      "Assignment created successfull",
      newAssignment
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAllAssignmentsController(req, res, next) {
  try {
    const assignments = await getAllAssignments(req.user._id);
    if (!assignments) {
      return res.generateResponse(400, "Error in getting assignments");
    }
    return res.generateResponse(
      200,
      "Assignments get successfully",
      assignments
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAssignmentByIdController(req, res, next) {
  try {
    const getAssignment = await getAssignmentById({ _id: req.params.id });
    if (!getAssignment) {
      return res.generateResponse(400, "Error in getting assignment");
    }
    return res.generateResponse(
      200,
      "Signle assignment get successfully",
      getAssignment
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
