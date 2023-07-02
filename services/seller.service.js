const { UserModel } = require("#models/user");

async function getAllSellers() {
  const data = await UserModel.find({ role: "Seller" });
  return data;
}

function getSellerById(id) {
  return UserModel.findOne(id);
}

module.exports = {
  getAllSellers,
  getSellerById,
};
