const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getCustomById,
    deleteCustomById,
    getAllCustom,
    createCustom,
    updateCustomById,
} = require("#services/custom.service");
const { sendQuotationEmail } = require("../../services/email.service");

//#routes
router.post("/create-custom", createCustomController);
router.get("/get-all-custom", getAllCustomController);
router.get("/get-custom-by-id/:id", getCustomByIdController);
router.delete("/delete-custom-by-id/:id", deleteCustomByIdController);
router.put("/update-custom-by-id/:id", updateCustomByIdController);
router.post("/send-email-reply", sendReplyController);


async function sendReplyController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    await sendQuotationEmail(req.body.email, req.body.reply);
    return res.generateResponse(200, "Reply send successfull");
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function createCustomController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newCustom = await createCustom(req.body);

    if (!newCustom) {
      return res.generateResponse(400, "Error in creating Custom");
    }

    return res.generateResponse(200, "Custom created successfull",newCustom);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllCustomController(req, res, next) {
  try {
    const getCustom = await getAllCustom();
    if (!getCustom) {
      return res.generateResponse(400, "Error in getting Custom");
    }
    return res.generateResponse(200, "Custom get successfully",getCustom);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getCustomByIdController(req, res, next) {
  try {
    const getCustom = await getCustomById({_id:req.params.id});
    if (!getCustom) {
      return res.generateResponse(400, "Error in getting Custom");
    }
    return res.generateResponse(200, "Custom get successfully",getCustom);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteCustomByIdController(req, res, next) {
  try {
    const deleteCustom = await deleteCustomById(req.params.id);
    if (!deleteCustom) {
      return res.generateResponse(400, "Error in deleting Custom");
    }
    return res.generateResponse(200, "Custom deleted successfully",deleteCustom);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateCustomByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateCustom = await updateCustomById(req.params.id, req.body);
    if (!updateCustom) {
      return res.generateResponse(400, "Error in updating Custom");
    }
    return res.generateResponse(200, "Custom updated successfully",updateCustom);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
