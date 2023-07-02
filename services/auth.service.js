const { UserModel } = require("#models/user");
const { _pickAllowedFields } = require("#helper/utils");
const { getAuth, app } = require("#common/firebase");
const Stripe = require('stripe')("sk_test_51N2Y8SBwRKNKiXUsyeDN1LBPmGc7JbXd85R2nf5MRb2Akeuc8KLQTkbuvuJF8l0j13U6ieFavK17QLPoTRRbfAru00TLBATDAU");
const {
  cancelPackage,
} = require("#services/email.service");

function getAllUsers(filter) {
  return UserModel.find(filter).select([
    "-password",
    "-__v",
    "-updatedAt",
    "-createdAt"
  ]);
}
function updateUserData(_id, data) {
  const userData = _pickAllowedFields(data, [
    "firstname",
    "lastname",
    "isActive",
  ]);
  // Update user
  return UserModel.findOneAndUpdate({ _id }, userData, {
    new: true,
    runValidators: true,
  }).select(["-password", "-__v", "-updatedAt", "-createdAt"]);

}
function findUser(filter) {
  return UserModel.findOne(filter);
}
function findAllUsers() {
  return UserModel.find({});
}
function createUser(data) {
  const userData = _pickAllowedFields(data, [
    "email",
    "password",
    "verified",
    "socialLogin",
    "firstname",
    "lastname",
    "tokens",
    "role",
    "number",
    "companyName"
  ]);

  const newUser = new UserModel(userData);

  // Save new user
  return newUser.save();
}

function updateUserPassword(_id, data) {
  const userData = _pickAllowedFields(data, ["password"]);
  // Update user
  return UserModel.findOneAndUpdate({ _id }, userData, {
    new: true,
    runValidators: true
  }).select(["-password", "-__v", "-updatedAt", "-createdAt"]);
}
async function verifyIdToken(token) {
  try {
    const checkRevoked = true;
    const resp = await getAuth(app).verifyIdToken(token, checkRevoked);
    return resp;
  } catch (err) {
    console.log(err);
  }
}
async function updateUserTokensById(id, data) {
  const findUser = await UserModel.findOne({ _id: id })
  let updatedTokens;
  if (data.action === "add") {
    updatedTokens = Number(findUser.tokens) + Number(data.tokens)
  }
  else {
    updatedTokens = Number(findUser.tokens) - Number(data.tokens)
  }
  if (updatedTokens < 0) {
    updatedTokens = 0
  }
  return await UserModel.findOneAndUpdate({ _id: id }, { tokens: updatedTokens }, { new: true })

}
async function deleteUserById(id) {
  const user = await UserModel.findById(id)
  if (user.subscriptionId) {
    Stripe.subscriptions.del(
      user.subscriptionId,
      async function (err, confirmation) {
        if (err) {
          console.log(400, "Error in cancelling sbscription");
        } else {
          console.log(200, "Your request to cancel subscription is recieved");
        }
      }
    );
  }
  return UserModel.findByIdAndDelete(id);
}


async function getDashboardDetails(filter) {


 const userDetails= await UserModel.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: {
            $cond: { if: { $gt: ['$tokens', 0] }, then: 1, else: 0 }
          }
        },
        nonActiveUsers: {
          $sum: {
            $cond: { if: { $lt: ['$tokens', 1] }, then: 1, else: 0 }
          }
        }
      }
    }
  ])

  const usersBasedOnSubscription =await  UserModel.aggregate([
    {
      $group: {
        _id: {
          planName: "$plan.en",
          planType: "$plan.type"
        },
        count: { $sum: 1 }
      }
    }
   
  ]);
  const top10ConsumersInTimeFrame =await UserModel.find().sort({ burnTokens: -1 }).limit(10).exec();

  const output={usersBasedOnSubscription,userDetails,top10ConsumersInTimeFrame}
  

  return output
}


async function noOfUsers() {
  const endDate = new Date()
  const dayStartDate= new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  const weekStartDate=new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStartDate=new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate());
  const yearStartDate=new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate()); // 1 year ago
  console.log(dayStartDate)

  console.log(weekStartDate)
  console.log(monthStartDate)

console.log(yearStartDate)

  const daily =await  UserModel.countDocuments({
    createdAt: {
      $gte: dayStartDate,
      $lt: endDate
    }
  });
  const weekly =await  UserModel.countDocuments({
    createdAt: {
      $gte: weekStartDate,
      $lt: endDate
    }
  });
  const monthly =await  UserModel.countDocuments({
    createdAt: {
      $gte: monthStartDate,
      $lt: endDate
    }
  });
  const yearly =await  UserModel.countDocuments({
    createdAt: {
      $gte: yearStartDate,
      $lt: endDate
    }
  });
  const output={daily,weekly,monthly,yearly}

return output
}



module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUserPassword,
  verifyIdToken,
  findAllUsers,
  updateUserData,
  updateUserTokensById,
  deleteUserById,
  getDashboardDetails,
  noOfUsers
};
