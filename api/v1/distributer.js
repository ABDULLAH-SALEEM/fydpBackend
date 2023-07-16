const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  getAllDistributers,
  getDistributerById,
} = require("#services/distributer.service");

//#routes

router.get("/get-all-distributer", [jwtAuth], getAllDistributersController);
router.get(
  "/get-distributer-by-id/:id",
  [jwtAuth],
  getDistributerByIdController
);

async function getAllDistributersController(req, res, next) {
  try {
    const distributers = await getAllDistributers();
    if (!distributers) {
      return res.generateResponse(400, "Error in getting distributers");
    }
    return res.generateResponse(
      200,
      "Distributers get successfully",
      distributers
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getDistributerByIdController(req, res, next) {
  try {
    const getDistributer = await getDistributerById({ _id: req.params.id });
    if (!getDistributer) {
      return res.generateResponse(400, "Error in getting distributer");
    }
    return res.generateResponse(
      200,
      "Signle distributer get successfully",
      getDistributer
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
