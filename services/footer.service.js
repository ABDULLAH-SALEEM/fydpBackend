


const { FooterModel } = require("#models/footer");



async function getAllFooter() {
  const data=await FooterModel.find({})
  return data
}

function getFooterById(id) {
  return FooterModel.findOne(id);
}

function createFooter(data) {

  const newFooter = new FooterModel({...data});
  return newFooter.save();
  
}

async function updateFooterById(id, data) {
  return await FooterModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteFooterById(id) {
  return FooterModel.findByIdAndDelete(id);

}





module.exports = {
  getFooterById,
  deleteFooterById,
  getAllFooter,
  createFooter,
  updateFooterById,
};
