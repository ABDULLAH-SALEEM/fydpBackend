


const { CustomModel } = require("#models/custom");



async function getAllCustom() {
  const data=await CustomModel.find({}).sort({ createdAt:-1 }).exec()
  return data
}

function getCustomById(id) {
  return CustomModel.findOne(id);
}

function createCustom(data) {

  const newCustom = new CustomModel({...data});
  return newCustom.save();
  
}

async function updateCustomById(id, data) {
  return await CustomModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteCustomById(id) {
  return CustomModel.findByIdAndDelete(id);

}





module.exports = {
  getCustomById,
  deleteCustomById,
  getAllCustom,
  createCustom,
  updateCustomById,
};
