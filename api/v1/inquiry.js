const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  getAllInquiries,
  getInquiryById,
  getInquiryByEmail,
  createInquiry,
  getInquiryByUser,
  updateInquiry
} = require("#services/inquiry.service");

//#routes
router.post("/create-inquiry", [jwtAuth], createInquiryController);
router.get("/get-all-inquiries", [jwtAuth], getAllInquiriesController);
router.get("/get-user-inquiries", [jwtAuth], getUserInquiriesController);
router.get("/get-inquiry-by-id/:id", [jwtAuth], getInquiryByIdController);
router.get("/get-inquiry-by-email", [jwtAuth], getInquiryByEmailController);
router.put("/update-inquiry-by-id/:id",[jwtAuth], updateInquiryByIdController);

async function createInquiryController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    req.body.userId = req.user._id;
    req.body.email=req.user.email;
    req.body.name=`${req.user.firstname} ${req.user.lastname}`
    const newInquiry = await createInquiry(req.body);

    if (!newInquiry) {
      return res.generateResponse(400, "Error in creating inquiry");
    }
    return res.generateResponse(200, "Inquiry created successfull", newInquiry);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllInquiriesController(req, res, next) {
  try {
    const inquiries = await getAllInquiries();
    if (!inquiries) {
      return res.generateResponse(400, "Error in getting Inquiry");
    }
    return res.generateResponse(200, "Inquiry get successfully", inquiries);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getUserInquiriesController(req, res, next) {
  try {
    const getInquiry = await getInquiryByUser(req.user._id);
    if (!getInquiry) {
      return res.generateResponse(400, "Error in getting Inquiry");
    }
    return res.generateResponse(200, " inquiries get successfully", getInquiry);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getInquiryByIdController(req, res, next) {
  try {
    const getInquiry = await getInquiryById({ _id: req.params.id });
    console.log(getInquiry)
    if (!getInquiry) {
      return res.generateResponse(400, "Error in getting Inquiry");
    }
    return res.generateResponse(200, "Signle inquiries get successfully", getInquiry);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getInquiryByEmailController(req, res, next) {
  try {
    const getInquiry = await getInquiryByEmail(req.user.email);
    if (!getInquiry) {
      return res.generateResponse(400, "Error in getting Inquiry");
    }
    return res.generateResponse(200, "Inquiries get successfully", getInquiry);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


async function updateInquiryByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updatedInquiry = await updateInquiry(req.params.id, req.body);
    if (!updatedInquiry) {
      return res.generateResponse(400, "Error in updating quotation");
    }
    return res.generateResponse(
      200,
      "Quotation updated successfully",
      updatedInquiry
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
