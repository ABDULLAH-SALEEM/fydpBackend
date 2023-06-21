const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getChatPageById,
    deleteChatPageById,
    getAllChatPage,
    createChatPage,
    updateChatPageById,
} = require("#services/chatPage.service");

//#routes
router.post("/create-chat-page", createChatPageController);
router.get("/get-all-chat-page", getAllChatPageController);
router.get("/get-chat-page-by-id/:id", getChatPageByIdController);
router.delete("/delete-chat-page-by-id/:id", deleteChatPageByIdController);
router.put("/update-chat-page-by-id/:id", updateChatPageByIdController);

async function createChatPageController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newChatPage = await createChatPage(req.body);

    if (!newChatPage) {
      return res.generateResponse(400, "Error in creating ChatPage");
    }

    return res.generateResponse(200, "ChatPage created successfull",newChatPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllChatPageController(req, res, next) {
  try {
    const getChatPage = await getAllChatPage();
    if (!getChatPage) {
      return res.generateResponse(400, "Error in getting ChatPage");
    }
    return res.generateResponse(200, "ChatPage get successfully",getChatPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getChatPageByIdController(req, res, next) {
  try {
    const getChatPage = await getChatPageById({_id:req.params.id});
    if (!getChatPage) {
      return res.generateResponse(400, "Error in getting ChatPage");
    }
    return res.generateResponse(200, "ChatPage get successfully",getChatPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteChatPageByIdController(req, res, next) {
  try {
    const deleteChatPage = await deleteChatPageById(req.params.id);
    if (!deleteChatPage) {
      return res.generateResponse(400, "Error in deleting ChatPage");
    }
    return res.generateResponse(200, "ChatPage deleted successfully",deleteChatPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateChatPageByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateChatPage = await updateChatPageById(req.params.id, req.body);
    if (!updateChatPage) {
      return res.generateResponse(400, "Error in updating ChatPage");
    }
    return res.generateResponse(200, "ChatPage updated successfully",updateChatPage);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
