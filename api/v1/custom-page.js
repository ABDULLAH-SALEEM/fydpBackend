const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getCustomPageById,
    deleteCustomPageById,
    getAllCustomPage,
    createCustomPage,
    updateCustomPageById,
} = require("#services/customPage.service");

//#routes
router.post("/create-custom-page", createCustomPageController);
router.get("/get-all-custom-page", getAllCustomPageController);
router.get("/get-custom-page-by-id/:id", getCustomPageByIdController);
router.delete("/delete-custom-page-by-id/:id", deleteCustomPageByIdController);
router.put("/update-custom-page-by-id/:id", updateCustomPageByIdController);

async function createCustomPageController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newCustomPage = await createCustomPage(req.body);

    if (!newCustomPage) {
      return res.generateResponse(400, "Error in creating CustomPage");
    }

    return res.generateResponse(200, "CustomPage created successfull",newCustomPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllCustomPageController(req, res, next) {
  try {
    const getCustomPage = await getAllCustomPage();
    if (!getCustomPage) {
      return res.generateResponse(400, "Error in getting CustomPage");
    }
    return res.generateResponse(200, "CustomPage get successfully",getCustomPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getCustomPageByIdController(req, res, next) {
  try {
    const getCustomPage = await getCustomPageById({_id:req.params.id});
    if (!getCustomPage) {
      return res.generateResponse(400, "Error in getting CustomPage");
    }
    return res.generateResponse(200, "CustomPage get successfully",getCustomPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteCustomPageByIdController(req, res, next) {
  try {
    const deleteCustomPage = await deleteCustomPageById(req.params.id);
    if (!deleteCustomPage) {
      return res.generateResponse(400, "Error in deleting CustomPage");
    }
    return res.generateResponse(200, "CustomPage deleted successfully",deleteCustomPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateCustomPageByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateCustomPage = await updateCustomPageById(req.params.id, req.body);
    if (!updateCustomPage) {
      return res.generateResponse(400, "Error in updating CustomPage");
    }
    return res.generateResponse(200, "CustomPage updated successfully",updateCustomPage);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
