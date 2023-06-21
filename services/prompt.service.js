


const { PromptModel } = require("#models/prompts");



async function getAllPrompts() {
  const data=await PromptModel.find({}).sort({ priority:1 }).exec()
  return data
}

function getPromptById(id) {
  return PromptModel.findOne({_id:id});
}

function createPrompt(data) {
  const newPrompt = new PromptModel(data);
  return newPrompt.save();
  
}

async function updatePromptById(id, data) {
  return await PromptModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}
function deletePromptById(id) {
  return PromptModel.findByIdAndDelete(id);
}


module.exports = {
  getPromptById,
  deletePromptById,
  getAllPrompts,
  createPrompt,
  updatePromptById,
};
