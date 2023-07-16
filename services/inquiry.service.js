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

function getInquiryByUser(id) {
  return InquiryModel.find({ userId: id });
}

function createInquiry(data) {
  const newInquiry = new InquiryModel({ ...data });
  return newInquiry.save();
}

async function updateInquiry(id, data) {
  return await InquiryModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    {
      new: true,
    }
  );
}

module.exports = {
  getAllInquiries,
  getInquiryById,
  getInquiryByEmail,
  createInquiry,
  getInquiryByUser,
  updateInquiry,
};
