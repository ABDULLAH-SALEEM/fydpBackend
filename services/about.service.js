


const { AboutModel } = require("#models/about");



async function getAllAbout() {
  const data=await AboutModel.find({})
  return data
}

function getAboutById(id) {
  return AboutModel.findOne(id);
}

function createAbout(data) {

  const newFooter = new AboutModel({...data});
  return newFooter.save();
  
}

async function updateAboutById(id, data) {
  return await AboutModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteAboutById(id) {
  return AboutModel.findByIdAndDelete(id);

}





module.exports = {
  getAboutById,
  deleteAboutById,
  getAllAbout,
  createAbout,
  updateAboutById,
};
