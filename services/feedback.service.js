


const { FeedbackModel } = require("#models/feedback");



async function getAllFeedback() {
  const data=await FeedbackModel.find({}).sort({ createdAt:-1 }).exec()
  return data
}

function getFeedbackById(id) {
  return FeedbackModel.findOne(id);
}

function createFeedback(data) {
  const newFeedback = new FeedbackModel(data);
  return newFeedback.save();
  
}
function sendFeedback(data) {
  console.log("you need to send mail on this data",data)
  return true;
  
}
async function updateFeedbackById(id, data) {
  return await FeedbackModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}
function deleteFeedbackById(id) {
  return FeedbackModel.findByIdAndDelete(id);
}


module.exports = {
  getFeedbackById,
  deleteFeedbackById,
  getAllFeedback,
  createFeedback,
  updateFeedbackById,
  sendFeedback
};
