const { InquiryModel } = require("#models/inquiry");

async function getAllInquiries() {
  const data = await InquiryModel.find({});
  return data;
}

function getInquiryById(id) {
  return InquiryModel.findOne(id);
}

function getInquiryByEmail(email) {
  return InquiryModel.find({ sentTo: email });
}

function createInquiry(data) {
  const newInquiry = new InquiryModel({ ...data });
  return newInquiry.save();
}

module.exports = {
  getAllInquiries,
  getInquiryById,
  getInquiryByEmail,
  createInquiry,
  //   updateAboutById,
};
