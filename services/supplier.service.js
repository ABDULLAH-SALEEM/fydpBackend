const { UserModel } = require("#models/user");

async function getAllSuppliers() {
  const data = await UserModel.find({ role: "Supplier" });
  return data;
}

function getSupplierById(id) {
  return UserModel.findOne(id);
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
};