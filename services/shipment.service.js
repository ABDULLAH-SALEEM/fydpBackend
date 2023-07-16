const { ShipmentModel } = require("#models/shipment");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

async function getAllShipments(userId) {
  const data = await ShipmentModel.find({ userId })
    .populate("assignedBy")
    .populate("orderId");
  return data;
}

function getShipmentById(id) {
  return ShipmentModel.findOne(id).populate("assignedBy").populate("orderId");
}

function createShipment(data) {
  const newAssignment = new ShipmentModel({ ...data });
  return newAssignment.save();
}

module.exports = {
  getAllShipments,
  getShipmentById,
  createShipment,
};
