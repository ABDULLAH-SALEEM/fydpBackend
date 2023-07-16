const { AssignmentModel } = require("#models/assignment");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

async function getAllAssignments(userId) {
  const data = await AssignmentModel.find({ userId })
    .populate("assignedBy")
    .populate("orderId");
  return data;
}

function getAssignmentById(id) {
  return AssignmentModel.findOne(id).populate("assignedBy").populate("orderId");
}

function createAssignment(data) {
  const newAssignment = new AssignmentModel({ ...data });
  return newAssignment.save();
}

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
};
