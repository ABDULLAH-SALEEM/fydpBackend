const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");

const {
  getFaqById,
  deleteFaqById,
  getAllFaq,
  createFaq,
  updateFaqById,
} = require("#services/faq.service");

//#routes
router.post("/create-faq", createFaqController);
router.get("/get-all-faq", getAllFaqController);
router.get("/get-faq-by-id/:id", getFaqByIdController);
router.delete("/delete-faq-by-id/:id", deleteFaqByIdController);
router.put("/update-faq-by-id/:id", updateFaqByIdController);

async function createFaqController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newFaq = await createFaq(req.body);

    if (!newFaq) {
      return res.generateResponse(400, "Error in creating faq");
    }

    return res.generateResponse(200, "Faq created successfull",newFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllFaqController(req, res, next) {
  try {
    const getFaq = await getAllFaq();
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting faq");
    }
    return res.generateResponse(200, "Faq get successfully",getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getFaqByIdController(req, res, next) {
  try {
    const getFaq = await getAllFaq(req.params.id);
    if (!getFaq) {
      return res.generateResponse(400, "Error in getting faq");
    }
    return res.generateResponse(200, "Faq get successfully",getFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteFaqByIdController(req, res, next) {
  try {
    const deleteFaq = await deleteFaqById(req.params.id);
    if (!deleteFaq) {
      return res.generateResponse(400, "Error in deleting faq");
    }
    return res.generateResponse(200, "Faq deleted successfully",deleteFaq);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateFaqByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateFaq = await updateFaqById(req.params.id, req.body);
    if (!updateFaq) {
      return res.generateResponse(400, "Error in updating faq");
    }
    return res.generateResponse(200, "Faq updated successfully",updateFaq);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
