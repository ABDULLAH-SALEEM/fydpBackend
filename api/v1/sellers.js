const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const { getAllSellers, getSellerById } = require("#services/seller.service");

//#routes

router.get("/get-all-sellers", [jwtAuth], getAllSellersController);
router.get("/get-seller-by-id/:id", [jwtAuth], getSellerByIdController);

async function getAllSellersController(req, res, next) {
  try {
    const sellers = await getAllSellers();
    if (!sellers) {
      return res.generateResponse(400, "Error in getting sellers");
    }
    return res.generateResponse(200, "sellers get successfully", sellers);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getSellerByIdController(req, res, next) {
  try {
    const getSeller = await getSellerById({ _id: req.params.id });
    if (!getSeller) {
      return res.generateResponse(400, "Error in getting seller");
    }
    return res.generateResponse(
      200,
      "Signle seller get successfully",
      getSeller
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
