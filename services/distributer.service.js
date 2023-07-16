const { UserModel } = require("#models/user");

async function getAllDistributers() {
  const data = await UserModel.find({ role: "Distributer" });
  return data;
}

function getDistributerById(id) {
  return UserModel.findOne(id);
}

module.exports = {
  getAllDistributers,
  getDistributerById,
};
