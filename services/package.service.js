const { PackageModel } = require("#models/package");
const { TokenModel } = require("../models/token");

async function getAllPackage() {
  const data = await PackageModel.find({});
  return data;
}

function getPackagekById(id) {
  return PackageModel.findOne(id);
}

async function createPackage(data) {
  let tokens=[]
  const token = await TokenModel.findOne({});
  tokens[0] = (data.buyPrice[0] / token.price) * token.token;
  tokens[1] = (data.buyPrice[1] / token.price) * token.token;

  data.tokens = tokens;
  const newPackage = new PackageModel(data);
  return newPackage.save();
}

async function updatePackageById(id, data) {
  let tokens=[]
    const token = await TokenModel.findOne({});
    tokens[0] = (data.buyPrice[0] / token.price) * token.token;
    tokens[1] = (data.buyPrice[1] / token.price) * token.token;    data.tokens = tokens;
   
  return await PackageModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    {
      new: true,
    }
  );
}
function deletePackageById(id) {
  return PackageModel.findByIdAndDelete(id);
}

module.exports = {
  getPackagekById,
  deletePackageById,
  getAllPackage,
  createPackage,
  updatePackageById,
};
