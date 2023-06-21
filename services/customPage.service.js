


const { CustomPageModel } = require("#models/customPage");



async function getAllCustomPage() {
  const data=await CustomPageModel.find({})
  return data
}

function getCustomPageById(id) {
  return CustomPageModel.findOne(id);
}

function createCustomPage(data) {

  const newCustomPage = new CustomPageModel({...data});
  return newCustomPage.save();
  
}

async function updateCustomPageById(id, data) {
  return await CustomPageModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteCustomPageById(id) {
  return CustomPageModel.findByIdAndDelete(id);

}





module.exports = {
  getCustomPageById,
  deleteCustomPageById,
  getAllCustomPage,
  createCustomPage,
  updateCustomPageById,
};
