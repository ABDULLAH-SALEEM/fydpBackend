const { UserModel } = require("#models/user");
const { OrderModel } = require("#models/order");
const { InquiryModel } = require("#models/inquiry");
const { QuotationModel } = require("#models/quotation");
const { RatingsModel } = require("../models/ratings");

async function getSellerDashboardData(email,id) {
  const orderDetails = await OrderModel.aggregate([
    {
      $match: {
        orderFrom: email,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const inquiryDetails = await InquiryModel.aggregate([
    {
      $match: {
        sentTo: email,
      },
    },
    {
      $group: {
        _id: null,
        totalInquiries: { $sum: 1 },
        answeredInquiries: {
          $sum: {
            $cond: [{ $eq: ["$status", "Answered"] }, 1, 0],
          },
        },
        unansweredInquiries: {
          $sum: {
            $cond: [{ $eq: ["$status", "Unanswered"] }, 1, 0],
          },
        },
      },
    },
  ]);
  const fiveStart = await RatingsModel.find({
    ratingTo: id,
    rating: 5,
  }).countDocuments();
  const fourStart = await RatingsModel.find({
    ratingTo: id,
    rating: 4,
  }).countDocuments();
  const threeStart = await RatingsModel.find({
    ratingTo: id,
    rating: 3,
  }).countDocuments();
  const twoStart = await RatingsModel.find({
    ratingTo: id,
    rating: 2,
  }).countDocuments();

  const ratings = {
    fiveStarCount: fiveStart,
    fourStarCount: fourStart,
    threeStarCount: threeStart,
    twoStarCount: twoStart,
  };

  const output = { orderDetails, inquiryDetails, ratings };
  return output;
}

async function getPurchaserDashboardData(id, email) {
  console.log(id);
  const totalSellers = await UserModel.find({
    role: "Seller",
  }).countDocuments();
  const totalInquiries = await InquiryModel.find({
    userId: id,
  }).countDocuments();
  const totalOrders = await OrderModel.find({ userId: id }).countDocuments();
  const totalQuotation = await QuotationModel.find({
    sentTo: email,
  }).countDocuments();

  const orderDetails = await OrderModel.aggregate([
    {
      $match: {
        userId: id.toString(),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const inquiryDetails = await InquiryModel.aggregate([
    {
      $match: {
        userId: id.toString(),
      },
    },
    {
      $group: {
        _id: null,
        totalInquiries: { $sum: 1 },
        answeredInquiries: {
          $sum: {
            $cond: [{ $eq: ["$status", "Answered"] }, 1, 0],
          },
        },
        unansweredInquiries: {
          $sum: {
            $cond: [{ $eq: ["$status", "Unanswered"] }, 1, 0],
          },
        },
      },
    },
  ]);

  const output = {
    totalSellers,
    totalInquiries,
    totalOrders,
    totalQuotation,
    orderDetails,
    inquiryDetails,
  };
  return output;
}

async function getSupplierDashboardData() {
  const data = await UserModel.find({ role: "Distributer" });
  return data;
}

async function getDistributerDashboardData() {
  const data = await UserModel.find({ role: "Distributer" });
  return data;
}

module.exports = {
  getSellerDashboardData,
  getPurchaserDashboardData,
  getSupplierDashboardData,
  getDistributerDashboardData,
};
