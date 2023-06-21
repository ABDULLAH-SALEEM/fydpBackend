


const { FaqModel } = require("#models/faq");



async function getAllFaq() {
  const data=await FaqModel.find({}).sort({ priority:1 }).exec()
  return data
}

function getFaqById(id) {
  return FaqModel.findOne(id);
}

function createFaq(data) {
  const userData = data
  const newFaq = new FaqModel(userData);
  return newFaq.save();
  
}

async function updateFaqById(id, data) {
  return await FaqModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}
function deleteFaqById(id) {
  return FaqModel.findByIdAndDelete(id);
}


module.exports = {
  getFaqById,
  deleteFaqById,
  getAllFaq,
  createFaq,
  updateFaqById,
};
