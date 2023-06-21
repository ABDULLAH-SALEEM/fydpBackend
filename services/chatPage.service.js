


const { ChatPageModel } = require("#models/chatPage");



async function getAllChatPage() {
  const data=await ChatPageModel.find({})
  return data
}

function getChatPageById(id) {
  return ChatPageModel.findOne(id);
}

function createChatPage(data) {

  const newChatPage = new ChatPageModel({...data});
  return newChatPage.save();
  
}

async function updateChatPageById(id, data) {
  return await ChatPageModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteChatPageById(id) {
  return ChatPageModel.findByIdAndDelete(id);

}





module.exports = {
  getChatPageById,
  deleteChatPageById,
  getAllChatPage,
  createChatPage,
  updateChatPageById,
};
