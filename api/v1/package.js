

const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");

const {
  getPackageById,
  deletePackageById,
  getAllPackage,
  createPackage,
  updatePackageById,
} = require("#services/package.service");

//#routes
router.post("/create-package", createPackageController);
router.get("/get-all-package", getAllPackageController);
router.get("/get-package-by-id/:id", getPackageByIdController);
router.delete("/delete-package-by-id/:id", deletePackageByIdController);
router.put("/update-package-by-id/:id", updatePackageByIdController);

async function createPackageController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newPackage = await createPackage(req.body);

    if (!newPackage) {
      return res.generateResponse(400, "Error in creating Package");
    }

    return res.generateResponse(200, "Package created successfull",newPackage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllPackageController(req, res, next) {
  try {
    const getFaq = await getAllPackage();
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting Package");
    }
    return res.generateResponse(200, "Package get successfully",getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getPackageByIdController(req, res, next) {
  try {
    const getFaq = await getAllPackage(req.params.id);
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting Package");
    }
    return res.generateResponse(200, "Package get successfully",getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deletePackageByIdController(req, res, next) {
  try {
    const deleteFaq = await deletePackageById(req.params.id);
    if (!deleteFaq) {
      return res.generateResponse(400, "Error in deleting Package");
    }
    return res.generateResponse(200, "Package deleted successfully",deleteFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updatePackageByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateFaq = await updatePackageById(req.params.id, req.body);
    if (!updateFaq) {
      return res.generateResponse(400, "Error in updating Package");
    }
    return res.generateResponse(200, "Package updated successfully",updateFaq);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
