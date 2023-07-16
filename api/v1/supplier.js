const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {  getAllSuppliers, getSupplierById } = require("#services/supplier.service");

//#routes

router.get("/get-all-supplier", [jwtAuth], getAllSuppliersController);
router.get("/get-supplier-by-id/:id", [jwtAuth], getSupplierByIdController);

async function getAllSuppliersController(req, res, next) {
  try {
    const supplier = await getAllSuppliers();
    if (!supplier) {
      return res.generateResponse(400, "Error in getting sellers");
    }
    return res.generateResponse(200, "Suppliers get successfully", supplier);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getSupplierByIdController(req, res, next) {
  try {
    const getSupplier = await getSupplierById({ _id: req.params.id });
    if (!getSupplier) {
      return res.generateResponse(400, "Error in getting supplier");
    }
    return res.generateResponse(
      200,
      "Signle supplier get successfully",
      getSupplier
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
