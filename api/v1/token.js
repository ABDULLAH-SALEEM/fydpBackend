

const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");

const {
  getTokensById,
  deleteTokenById,
  getAllTokens,
  
  createToken,
  updateTokenById,
} = require("#services/token.service");

//#routes
router.post("/create-token", createTokenController);
router.get("/get-all-token", getAllTokenController);
router.get("/get-token-by-id/:id", getTokenByIdController);
router.delete("/delete-token-by-id/:id", deleteTokenByIdController);
router.put("/update-token-by-id/:id", updateTokenByIdController);

async function createTokenController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newToken = await createToken(req.body);

    if (!newToken) {
      return res.generateResponse(400, "Error in creating Token");
    }

    return res.generateResponse(200, "Token created successfull",newToken);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllTokenController(req, res, next) {
  try {
    const getToken = await getAllTokens();
    if (!getToken) {
      return res.generateResponse(400, "Error in getting Token");
    }
    return res.generateResponse(200, "Token get successfully",getToken);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getTokenByIdController(req, res, next) {
  try {
    const getToken = await getAllTokens(req.params.id);
    if (!getToken) {
      return res.generateResponse(400, "Error in getting Token");
    }
    return res.generateResponse(200, "Token get successfully",getToken);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteTokenByIdController(req, res, next) {
  try {
    const deleteToken = await deleteTokenById(req.params.id);
    if (!deleteToken) {
      return res.generateResponse(400, "Error in deleting Token");
    }
    return res.generateResponse(200, "Token deleted successfully",deleteToken);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateTokenByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateToken = await updateTokenById(req.params.id, req.body);
    if (!updateToken) {
      return res.generateResponse(400, "Error in updating Token");
    }
    return res.generateResponse(200, "Token updated successfully",updateToken);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
