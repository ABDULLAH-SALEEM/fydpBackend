const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getAboutById,
    deleteAboutById,
    getAllAbout,
    createAbout,
    updateAboutById,
} = require("#services/about.service");

//#routes
router.post("/create-about", createAboutController);
router.get("/get-all-about", getAllAboutController);
router.get("/get-about-by-id/:id", getAboutByIdController);
router.delete("/delete-about-by-id/:id", deleteAboutByIdController);
router.put("/update-about-by-id/:id", updateAboutByIdController);

async function createAboutController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newAbout = await createAbout(req.body);

    if (!newAbout) {
      return res.generateResponse(400, "Error in creating About");
    }

    return res.generateResponse(200, "About created successfull",newAbout);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllAboutController(req, res, next) {
  try {
    const getAbout = await getAllAbout();
    if (!getAbout) {
      return res.generateResponse(400, "Error in getting About");
    }
    return res.generateResponse(200, "About get successfully",getAbout);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAboutByIdController(req, res, next) {
  try {
    const getAbout = await getAboutById({_id:req.params.id});
    if (!getAbout) {
      return res.generateResponse(400, "Error in getting About");
    }
    return res.generateResponse(200, "About get successfully",getAbout);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteAboutByIdController(req, res, next) {
  try {
    const deleteAbout = await deleteAboutById(req.params.id);
    if (!deleteAbout) {
      return res.generateResponse(400, "Error in deleting About");
    }
    return res.generateResponse(200, "About deleted successfully",deleteAbout);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateAboutByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateAbout = await updateAboutById(req.params.id, req.body);
    if (!updateAbout) {
      return res.generateResponse(400, "Error in updating About");
    }
    return res.generateResponse(200, "About updated successfully",updateAbout);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
