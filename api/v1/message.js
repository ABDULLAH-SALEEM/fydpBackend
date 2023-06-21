

const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");

const {
    getMessageById,
    getAllMessages,
    createMessage,
    getMessagesByUserId,
    deleteChatByChatId,
    updateChatTitleByChatId,
    deleteChatByUserId
} = require("#services/message.service");

//#routes
router.post("/create-message",[jwtAuth], createMessageController);
router.get("/get-all-message",[jwtAuth], getAllMessageController);
router.get("/get-message-by-id/:id",[jwtAuth], getMessageByIdController);
router.get("/get-message-by-user-id",[jwtAuth], getMessageByUserIdController);
router.delete("/delete-chat-by-chat-id/:id",[jwtAuth], deleteChatByChatIdController);
router.delete("/delete-chat-by-user-id",[jwtAuth], deleteChatByUserIdController);
router.put("/update-chat-title-by-chat-id/:id",[jwtAuth], updateChatTitleByChatIdController);

async function updateChatTitleByChatIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const update = await updateChatTitleByChatId(req.params.id, req.body);
    if (!update) {
      return res.generateResponse(400, "Error in updating Title");
    }
    return res.generateResponse(
      200,
      "Title updated successfully",
      update
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteChatByChatIdController(req, res, next) {
  try {
    const deleteChat = await deleteChatByChatId(req.params.id);
    if (!deleteChat) {
      return res.generateResponse(400, "Error in deleting Chat");
    }
    return res.generateResponse(200, "Chat deleted successfully",deleteChat);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteChatByUserIdController(req, res, next) {

  try {
    const deleteChat = await deleteChatByUserId(req.user._id);
    if (!deleteChat) {
      return res.generateResponse(400, "Error in deleting Chats");
    }
    return res.generateResponse(200, "Chats deleted successfully",deleteChat);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function createMessageController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newMessage = await createMessage(req.body,req.user,req.body.id);

    if (!newMessage) {
      return res.generateResponse(400, "Error in creating Message");
    }

    return res.generateResponse(200, "Message created successfull",newMessage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllMessageController(req, res, next) {
  try {
    const getMessages = await getAllMessages();
    if (!getMessages) {
      return res.generateResponse(400, "Error in getting Message");
    }
    return res.generateResponse(200, "Message get successfully",getMessages);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getMessageByIdController(req, res, next) {
  try {
    const getMessages = await getMessageById(req.params.id);
    if (!getMessages) {
      return res.generateResponse(400, "Error in getting Message");
    }
    return res.generateResponse(200, "Message get successfully",getMessages);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getMessageByUserIdController(req, res, next) {
    try {
      const getMessages = await getMessagesByUserId(req.user._id);
      if (!getMessages) {
        return res.generateResponse(400, "Error in getting Message");
      }
      return res.generateResponse(200, "Message get successfully",getMessages);
    } catch (err) {
      const error = manageError(err);
      res.generateResponse(error.code, error.message);
    }
  }



module.exports = router;
