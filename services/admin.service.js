const { AdminModel } = require("#models/admin");

function findAdmin(filter) {
    return AdminModel.findOne(filter);
}

module.exports = {
    findAdmin,
};