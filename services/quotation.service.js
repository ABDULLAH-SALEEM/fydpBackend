const { QuotationModel } = require("#models/quotation");
const { UserModel } = require("#models/user");

async function getAllQuotations() {
  const data = await QuotationModel.find({});
  return data;
}

function getQuotationById(id) {
  return QuotationModel.findOne(id);
}

function getQuotationByEmail(email) {
  return QuotationModel.find({ sentTo: email });
}

function getQuotationByUser(id) {
  return QuotationModel.find({ userId: id });
}

function createQuotation(data) {
  const newQuotation = new QuotationModel({ ...data });
  return newQuotation.save();
}

async function updateQuotation(id, data) {
  return await QuotationModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    {
      new: true,
    }
  );
}

function getQuotationSender(id) {
  return UserModel.findOne({ _id: id });
}


module.exports = {
  createQuotation,
  getQuotationByUser,
  getQuotationByEmail,
  getQuotationById,
  getAllQuotations,
  updateQuotation,
  getQuotationSender,
};
