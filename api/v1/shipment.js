const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  getAllShipments,
  getShipmentById,
  createShipment,
} = require("#services/shipment.service");

//#routes
router.post("/create-shipment", [jwtAuth], createShipmentController);
router.get("/get-all-shipment", [jwtAuth], getAllShipmentsController);
router.get("/get-shipment-by-id/:id", [jwtAuth], getShipmentByIdController);

async function createShipmentController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newShipment = await createShipment(req.body);

    if (!newShipment) {
      return res.generateResponse(400, "Error in creating shipment");
    }
    return res.generateResponse(
      200,
      "Shipment created successfull",
      newShipment
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAllShipmentsController(req, res, next) {
  try {
    const shipments = await getAllShipments(req.user._id);
    if (!shipments) {
      return res.generateResponse(400, "Error in getting shipments");
    }
    return res.generateResponse(200, "Shipments get successfully", shipments);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getShipmentByIdController(req, res, next) {
  try {
    const getShipment = await getShipmentById({ _id: req.params.id });
    if (!getShipment) {
      return res.generateResponse(400, "Error in getting shipment");
    }
    return res.generateResponse(
      200,
      "Signle shipment get successfully",
      getShipment
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
