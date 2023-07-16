const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  createQuotation,
  getQuotationByUser,
  getQuotationByEmail,
  getQuotationById,
  getAllQuotations,
  updateQuotation,
  getQuotationSender
} = require("#services/quotation.service");

//#routes
router.post("/create-quotation", [jwtAuth], createQuotationController);
router.get("/get-all-quotation", [jwtAuth], getAllQuotationsController);
router.get("/get-user-quotation", [jwtAuth], getUserQuotationsController);
router.get("/get-quotation-sender/:id", [jwtAuth], getQuotationSenderController)
router.get("/get-quotation-by-id/:id", [jwtAuth], getQuotationByIdController);
router.get("/get-quotation-by-email", [jwtAuth], getQuotationByEmailController);
router.put("/update-quotation-by-id/:id",[jwtAuth], updateQuotationByIdController);

async function createQuotationController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    req.body.userId = req.user._id;
    const newQuotation = await createQuotation(req.body);

    if (!newQuotation) {
      return res.generateResponse(400, "Error in creating newQuotation");
    }
    return res.generateResponse(
      200,
      "Quotation created successfull",
      newQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllQuotationsController(req, res, next) {
  try {
    const quotations = await getAllQuotations();
    if (!quotations) {
      return res.generateResponse(400, "Error in getting quotations");
    }
    return res.generateResponse(200, "Ouotations get successfully", quotations);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getUserQuotationsController(req, res, next) {
  try {
    const getQuotation = await getQuotationByUser(req.user._id);
    if (!getQuotation) {
      return res.generateResponse(400, "Error in getting quotation");
    }
    return res.generateResponse(
      200,
      " Quotation get successfully",
      getQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getQuotationByIdController(req, res, next) {
  try {
    const getQuotation = await getQuotationById({ _id: req.params.id });
    if (!getQuotation) {
      return res.generateResponse(400, "Error in getting quotation");
    }
    return res.generateResponse(
      200,
      "Signle quotation get successfully",
      getQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getQuotationByEmailController(req, res, next) {
  try {
    const getQuotation = await getQuotationByEmail(req.user.email);
    if (!getQuotation) {
      return res.generateResponse(400, "Error in getting quotation");
    }
    return res.generateResponse(
      200,
      "Quotation get successfully",
      getQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function updateQuotationByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updatedQuotation = await updateQuotation(req.params.id, req.body);
    if (!updatedQuotation) {
      return res.generateResponse(400, "Error in updating quotation");
    }
    return res.generateResponse(
      200,
      "Quotation updated successfully",
      updatedQuotation
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getQuotationSenderController(req, res, next) {
  try {
    if (!req.params) {
      return res.generateResponse(401, `Error in getting user data`);
    }

    const user=await getQuotationSender(req.params.id)

    res.generateResponse(
      200,
      "user get successfully",
      user
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
