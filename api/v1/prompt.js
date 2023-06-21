const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");

const { manageError } = require("#helper/response.helper");

const {
    getPromptById,
    deletePromptById,
    getAllPrompts,
    createPrompt,
    updatePromptById,
} = require("#services/prompt.service");

//#routes
router.post("/create-prompt", createPromptController);
router.get("/get-all-prompt", [jwtAuth], getAllPromptController);
router.get("/get-prompt-by-id/:id", [jwtAuth], getPromptByIdController);
router.delete("/delete-prompt-by-id/:id", [jwtAuth], deletePromptByIdController);
router.put("/update-prompt-by-id/:id", [jwtAuth], updatePromptByIdController
);

async function getAllPromptController(req, res, next) {
    try {
      const getPrompt = await getAllPrompts();
      if (!getPrompt) {
        return res.generateResponse(400, "Error in getting Prompt");
      }
      return res.generateResponse(200, "Prompt get successfully",getPrompt);
    } catch (err) {
      const error = manageError(err);
      res.generateResponse(error.code, error.message);
    }
  }

async function createPromptController(req, res, next) {
    if (!req.body) {
        return res.generateResponse(400, "Missing required fields");
    }
    try {
        const newPrompt = await createPrompt(req.body);

        if (!newPrompt) {
            return res.generateResponse(400, "Error in creating Prompt");
        }

        return res.generateResponse(
            200,
            "Prompt created successfull",
            newPrompt
        );
    } catch (err) {
        const error = manageError(err);
        res.generateResponse(error.code, error.message);
    }
}


async function getPromptByIdController(req, res, next) {
    try {
        const getPrompt = await getPromptById(req.params.id);
        if (!getPrompt) {
            return res.generateResponse(400, "Error in getting Prompt");
        }
        return res.generateResponse(200, "Prompt get successfully", getPrompt);
    } catch (err) {
        const error = manageError(err);
        res.generateResponse(error.code, error.message);
    }
}
async function deletePromptByIdController(req, res, next) {
    try {
        const deleteFaq = await deletePromptById(req.params.id);
        if (!deleteFaq) {
            return res.generateResponse(400, "Error in deleting Prompt");
        }
        return res.generateResponse(
            200,
            "Prompt deleted successfully",
            deleteFaq
        );
    } catch (err) {
        const error = manageError(err);
        res.generateResponse(error.code, error.message);
    }
}
async function updatePromptByIdController(req, res, next) {
    if (!req.body) {
        return res.generateResponse(400, "Missing required fields");
    }
    try {
        const updateFaq = await updatePromptById(req.params.id, req.body);
        if (!updateFaq) {
            return res.generateResponse(400, "Error in updating Prompt");
        }
        return res.generateResponse(
            200,
            "Prompt updated successfully",
            updateFaq
        );
    } catch (err) {
        console.log(err);
        const error = manageError(err);
        res.generateResponse(error.code, error.message);
    }
}

module.exports = router;
