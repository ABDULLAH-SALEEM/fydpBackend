


const { HomeModel } = require("#models/home");



async function getAllHome() {
  const data=await HomeModel.find({})
  return data
}

function getHomeById(id) {
  return HomeModel.findOne(id);
}

function createHome(data) {

  const newHome = new HomeModel({...data});
  return newHome.save();
  
}

async function updateHomeById(id, data) {
  return await HomeModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteHomeById(id) {
  return HomeModel.findByIdAndDelete(id);

}





module.exports = {
  getHomeById,
  deleteHomeById,
  getAllHome,
  createHome,
  updateHomeById,
};
