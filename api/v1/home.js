const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getHomeById,
    deleteHomeById,
    getAllHome,
    createHome,
    updateHomeById,
} = require("#services/home.service");

//#routes
router.post("/create-home", createHomeController);
router.get("/get-all-home", getAllHomeController);
router.get("/get-home-by-id/:id", getHomeByIdController);
router.delete("/delete-home-by-id/:id", deleteHomeByIdController);
router.put("/update-home-by-id/:id", updateHomeByIdController);

async function createHomeController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newHome = await createHome(req.body);

    if (!newHome) {
      return res.generateResponse(400, "Error in creating Home");
    }

    return res.generateResponse(200, "Home created successfull",newHome);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllHomeController(req, res, next) {
  try {
    const getHome = await getAllHome();
    if (!getHome) {
      return res.generateResponse(400, "Error in getting Home");
    }
    return res.generateResponse(200, "Home get successfully",getHome);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getHomeByIdController(req, res, next) {
  try {
    const getHome = await getHomeById({_id:req.params.id});
    if (!getHome) {
      return res.generateResponse(400, "Error in getting Home");
    }
    return res.generateResponse(200, "Home get successfully",getHome);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteHomeByIdController(req, res, next) {
  try {
    const deleteHome = await deleteHomeById(req.params.id);
    if (!deleteHome) {
      return res.generateResponse(400, "Error in deleting Home");
    }
    return res.generateResponse(200, "Home deleted successfully",deleteHome);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateHomeByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateHome = await updateHomeById(req.params.id, req.body);
    if (!updateHome) {
      return res.generateResponse(400, "Error in updating Home");
    }
    return res.generateResponse(200, "Home updated successfully",updateHome);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
