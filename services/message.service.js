const { MessageModel } = require("#models/messages");
const { UserModel } = require("#models/user");

const { openAI } = require("../helper/chatgpt.helper");
const decrementTokens = require("../helper/message.helper");

async function getAllMessages() {
  const data = await MessageModel.find({}).sort({ createdAt: -1 }).exec();
  return data;
}

function getMessageById(id) {
  return MessageModel.find({ _id: id });
}
function getMessagesByUserId(id) {
  return MessageModel.find({ userId: id }).sort({ updatedAt: -1 });
}

async function createMessage(newData, user, id = false) {
  let data;
  if (id) {
    data = await MessageModel.findOne({ _id: id });
  }
  if (data) {
    const msg = [newData.chatHistory[newData.chatHistory.length - 2],
    newData.chatHistory[newData.chatHistory.length - 1]]
    const updatedTokens = data.tokens + newData.tokens
    await decrementTokens(user._id, newData.tokens)
    return await MessageModel.findOneAndUpdate(
      { _id: id },
      { $push: { chatHistory: [...msg] }, tokens: updatedTokens },
      {
        new: true,
      }
    );
  } else {
    console.log(newData.chatHistory)
    const msg = [newData.chatHistory[newData.chatHistory.length - 2],
    newData.chatHistory[newData.chatHistory.length - 1]]
    const body = {
      userId: user._id,
      chatHistory: msg,
      tokens: newData.tokens,
      title:newData.chatHistory[0].content
    }
    await decrementTokens(user._id, newData.tokens)
    const newMessage = new MessageModel(body);
    return newMessage.save();
  }
}
function deleteChatByChatId(id) {
  return MessageModel.findByIdAndDelete(id);
}

function deleteChatByUserId(id) {
  return MessageModel.deleteMany({ userId: id });
}

async function updateChatTitleByChatId(id, data) {
  return await MessageModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}

module.exports = {
  getMessageById,
  getAllMessages,
  createMessage,
  getMessagesByUserId,
  deleteChatByChatId,
  updateChatTitleByChatId,
  deleteChatByUserId
};
