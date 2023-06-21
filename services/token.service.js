


const { TokenModel } = require("#models/token");



async function getAllTokens() {
  const data=await TokenModel.findOne({})
  return data
}

function getTokenskById(id) {
  return TokenModel.findOne(id);
}

function createToken(data) {
  const newToken = new TokenModel(data);
  return newToken.save();
  
}

async function updateTokenById(id, data) {
  return await TokenModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}
function deleteTokenById(id) {
  return TokenModel.findByIdAndDelete(id);
}


module.exports = {
  getTokenskById,
  deleteTokenById,
  getAllTokens,
  createToken,
  updateTokenById,
};
