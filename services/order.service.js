const { OrderModel } = require("#models/order");
const { UserModel } = require("#models/user");

async function getAllOrders(orderFrom) {
  const data = await OrderModel.find({orderFrom});
  return data;
}

function getOrderById(id) {
  return OrderModel.findOne(id);
}

// function getQuotationByEmail(email) {
//   return QuotationModel.find({ sentTo: email });
// }

function getOrderByUser(id) {
  return OrderModel.find({ userId: id });
}

function createOrder(data) {
  const newOrder = new OrderModel({ ...data });
  return newOrder.save();
}

async function updateOrder(id, data) {
  return await OrderModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    {
      new: true,
    }
  );
}

// function getQuotationSender(id) {
//   return UserModel.findOne({ _id: id });
// }


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    updateOrder
  
};
