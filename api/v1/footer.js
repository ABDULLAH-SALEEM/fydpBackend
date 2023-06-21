const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getFooterById,
    deleteFooterById,
    getAllFooter,
    createFooter,
    updateFooterById,
} = require("#services/footer.service");

//#routes
router.post("/create-footer", createFooterController);
router.get("/get-all-footer", getAllFooterController);
router.get("/get-footer-by-id/:id", getFooterByIdController);
router.delete("/delete-footer-by-id/:id", deleteFooterByIdController);
router.put("/update-footer-by-id/:id", updateFooterByIdController);

async function createFooterController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newFooter = await createFooter(req.body);

    if (!newFooter) {
      return res.generateResponse(400, "Error in creating Footer");
    }

    return res.generateResponse(200, "Footer created successfull",newFooter);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllFooterController(req, res, next) {
  try {
    const getFooter = await getAllFooter();
    if (!getFooter) {
      return res.generateResponse(400, "Error in getting Footer");
    }
    return res.generateResponse(200, "Footer get successfully",getFooter);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getFooterByIdController(req, res, next) {
  try {
    const getFooter = await getFooterById({_id:req.params.id});
    if (!getFooter) {
      return res.generateResponse(400, "Error in getting Footer");
    }
    return res.generateResponse(200, "Footer get successfully",getFooter);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteFooterByIdController(req, res, next) {
  try {
    const deleteFooter = await deleteFooterById(req.params.id);
    if (!deleteFooter) {
      return res.generateResponse(400, "Error in deleting Footer");
    }
    return res.generateResponse(200, "Footer deleted successfully",deleteFooter);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateFooterByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateFooter = await updateFooterById(req.params.id, req.body);
    if (!updateFooter) {
      return res.generateResponse(400, "Error in updating Footer");
    }
    return res.generateResponse(200, "Footer updated successfully",updateFooter);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
