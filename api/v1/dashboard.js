const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const { manageError } = require("#helper/response.helper");

const {
  getSellerDashboardData,
  getPurchaserDashboardData,
  getSupplierDashboardData,
  getDistributerDashboardData,
} = require("#services/dashboard.service");

//#routes
router.get("/seller-dashboard", [jwtAuth], sellerDashboardController);
router.get("/purchaser-dashboard", [jwtAuth], purchaserDashboardController);
// router.get("/supplier-dashboard", [jwtAuth], supplierDashboardController);
// router.get("/distributer-dashboard", [jwtAuth], distributerDashboardController);

async function sellerDashboardController(req, res, next) {
  try {
    const sellerDashboardData = await getSellerDashboardData(req.user.email);
    if (!sellerDashboardData) {
      return res.generateResponse(400, "Error in getting seller dashboard");
    }
    return res.generateResponse(
      200,
      "Seller dashboard get successfully",
      sellerDashboardData
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function purchaserDashboardController(req, res, next) {
  try {
    const purchaserDashboard = await getPurchaserDashboardData(
      req.user._id,
      req.user.email
    );
    if (!purchaserDashboard) {
      return res.generateResponse(400, "Error in getting purchaser dashboard");
    }
    return res.generateResponse(
      200,
      "Purchaser dashboard get successfully",
      purchaserDashboard
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
// async function supplierDashboardController(req, res, next) {}
// async function distributerDashboardController(req, res, next) {}

module.exports = router;
