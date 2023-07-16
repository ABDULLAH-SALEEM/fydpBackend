const express = require("express");
const router = express.Router();
const { jwtAuth } = require("#middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe")(
  "sk_test_51N2Y8SBwRKNKiXUsyeDN1LBPmGc7JbXd85R2nf5MRb2Akeuc8KLQTkbuvuJF8l0j13U6ieFavK17QLPoTRRbfAru00TLBATDAU"
);
const getJwtToken = (data, expiresIn = "120d") =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { manageError } = require("#helper/response.helper");
const { _excludeExtraFields } = require("#helper/utils");
const { UserModel } = require("#models/user");
//#services
const { generateOTP, getOtpData, removeOtp } = require("#services/otp.service");
const {
  sendOtpEmail,
  sendSignupEmail,
  cancelPackage,
  purchaseFreePackage,
} = require("#services/email.service");
const {
  findUser,
  createUser,
  updateUserPassword,
  verifyIdToken,
  findAllUsers,
  updateUserData,
  updateUserTokensById,
  deleteUserById,
  getDashboardDetails,
  noOfUsers,
  getUserDataByEmail
} = require("#services/auth.service");

//#routes
router.post("/login", login);
router.post("/get-otp", getOtp);
router.post("/signup", createNewAccount);
router.get("/get-dashboard", getDashboard);
router.get("/no-of-users", noOfUsersController);
router.get("/get-user/:email",getUserByEmail)

router.get("/get-all-users", userController);
router.post("/check-email-exists", checkEmailExist);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", sendRecoveryEmail);
router.delete("/delete-otp", deleteOtp);
router.post("/update-info", [jwtAuth], updateUserInfo);
router.post("/create-password", [jwtAuth], createUserPassword);
router.get("/profile", [jwtAuth], getProfile);
router.post("/social-login", socialLogin);
router.post("/change-password", [jwtAuth], updatePassword);
router.post("/checkout", [jwtAuth], checkout);
router.post("/cancel-sub", [jwtAuth], cancelSubscription);
router.put("/update-tokens/:id", [jwtAuth], updateTokens);
router.delete("/delete-user-by-id/:id", [jwtAuth], deleteUserByIdController);

async function deleteUserByIdController(req, res, next) {
  try {
    const deleteUser = await deleteUserById(req.params.id);
    if (!deleteUser) {
      return res.generateResponse(400, "Error in deleting User");
    }
    return res.generateResponse(200, "User deleted successfully", deleteUser);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function updateTokens(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateTokens = await updateUserTokensById(req.params.id, req.body);
    if (!updateTokens) {
      return res.generateResponse(400, "Error in updating Tokens");
    }
    return res.generateResponse(
      200,
      "Tokens updated successfully",
      updateTokens
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function cancelSubscription(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    Stripe.subscriptions.del(
      user.subscriptionId,
      async function (err, confirmation) {
        if (err) {
          return res.generateResponse(400, "Error in cancelling sbscription");
        } else {
          await cancelPackage(user.email, req.query.language);
          return res.generateResponse(
            200,
            "Your request to cancel subscription is recived"
          );
        }
      }
    );
  } catch (err) {
    return res.generateResponse(400, "Error in cancelling sbscription");
  }
}
async function checkout(req, res) {
  console.log("body", req.body.details);
  const body = req.body.details;
  console.log(body);
  const user = await UserModel.findOne({ _id: req.user._id });
  console.log(user);
  // if (user.subscriptionId!="free" || user.subscriptionId) {
  //   Stripe.subscriptions.del(
  //     user.subscriptionId,
  //     async function (err, confirmation) {
  //       if (err) {
  //         console.log(400, "Error in cancelling sbscription");
  //       } else {
  //         console.log(200, "Your request to cancel subscription is recieved");
  //       }
  //     }
  //   );
  // }
  if (body?.price[0] === "0") {
    try {
      const date = new Date();
      // console.log("user",user)
      const check = date - user.packageExpireOn;
      // console.log("check",check)

      if (check > 0) {
        const packageExpireOn = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
        const update = await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          {
            tokens: body.tokens[0],
            packageExpireOn,
            packageBoughtOn: date,
            subscriptionId: "free",
            plan: {
              en: "Free",
              type: "monthly",
              fr: "Gratuit",
            },
          },
          { new: true }
        );
        await purchaseFreePackage(user.email, req.query.language);
        return res.generateResponse(200, "Package Buy Successfully", update);
      } else {
        return res.generateResponse(200, "wait one month");
      }
    } catch (err) {
      return res.generateResponse(400, "Error in updating User");
    }
  } else {
    try {
      let session;
      const findcustomer = await Stripe.customers.list({
        email: req.user.email,
      });
      if (findcustomer.data.length > 0) {
        const customer = findcustomer.data[0];
        const lineItems = [{ price: body.price[body.index], quantity: 1 }];
        session = await Stripe.checkout.sessions.create({
          line_items: lineItems,
          customer: customer?.id,
          mode: "subscription",
          success_url: "https://jacques-assistant.com/chats",
          cancel_url: "https://jacques-assistant.com/packages",
        });
      } else {
        const customer = await Stripe.customers.create({
          name: req.user.firstName + " " + req.user.lastName,
          email: req.user.email,
        });
        session = await Stripe.checkout.sessions.create({
          line_items: lineItems,
          customer: customer?.id,
          mode: "subscription",
          success_url: "http://localhost:3000/chats",
          cancel_url: "http://localhost:3000/faq",
        });
      }
      res.send(
        JSON.stringify({
          url: session.url,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
}
async function userController(req, res, next) {
  try {
    const geUsers = await findAllUsers();
    if (!geUsers) {
      return res.generateResponse(400, "Error in getting Users");
    }
    return res.generateResponse(200, "Users get successfully", geUsers);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getDashboard(req, res) {
  try {
    const geUsers = await getDashboardDetails();
    if (!geUsers) {
      return res.generateResponse(400, "Error in getting dashboard details");
    }
    return res.generateResponse(
      200,
      "Dashboard details get successfully",
      geUsers
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function noOfUsersController(req, res) {
  try {
    const geUsers = await noOfUsers();
    if (!geUsers) {
      return res.generateResponse(400, "Error in getting users details");
    }
    return res.generateResponse(200, "Users details get successfully", geUsers);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function updatePassword(req, res, next) {
  if (!req.user || !req.user.verified) {
    return res.generateResponse(401, "User not found or verified");
  }
  if (!req.body.password) {
    return res.generateResponse(401, "missing required field");
  }
  try {
    const updatedUser = await updateUserPassword(req.user._id, {
      password: UserModel.encryptPassword(req.body.password),
    });
    if (updatedUser) {
      return res.generateResponse(
        200,
        "User password updated successfully",
        {}
      );
    } else {
      return res.generateResponse(401, "error updating user");
    }
  } catch (err) {
    console.log(err);
  }
}

async function login(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) {
      return res.generateResponse(400, "Invalid email or password");
    }
    // Validate password
    if (!user.authenticatePassword(req.body.password)) {
      return res.generateResponse(400, "Invalid email or password");
    }

    const token = getJwtToken({ user: { _id: user._id, email: user.email } });
    res.generateResponse(200, "Account Login Successfully", {
      token,
      user: _excludeExtraFields(user.toJSON(), [
        "password",
        "updatedAt",
        "createdAt",
      ]),
    });
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getOtp(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const user = await findUser({ email: req.body.email });
    if (user?.email) {
      return res.generateResponse(400, "This email already exists");
    }
    const otp = await generateOTP(req.body.email);
    console.log(otp);
    await sendOtpEmail(req.body.email, otp);
    res.generateResponse(200, "OTP Sended, Please check email.");
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function createNewAccount(req, res, next) {
  if (!req.body.otp) {
    return res.generateResponse(400, "Missing required fields");
  }

  try {
    const otpInstance = await getOtpData(req.body.email);

    if (!otpInstance || !otpInstance.authenticateOtp(req.body.otp)) {
      return res.generateResponse(400, "Invalid or expired otp");
    }
    await removeOtp(otpInstance._id);

    const userData = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: UserModel.encryptPassword(req.body.password),
      companyName: req.body.companyName,
      number: req.body.number,
      role: req.body.role,
      verified: true,
    };
    const newUser = await createUser(userData);

    if (!newUser) {
      return res.generateResponse(400, "Error in creating user");
    }
    const token = getJwtToken({
      user: { _id: newUser._id, email: newUser.email },
    });

    return res.generateResponse(200, "User created successfull", {
      token,
      user: _excludeExtraFields(newUser.toJSON(), [
        "password",
        "updatedAt",
        "createdAt",
      ]),
    });
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function verifyOtp(req, res, next) {
  // Validate request body
  if (!req.body.email || !req.body.otp) {
    return res.generateResponse(400, "Missing required fields");
  }

  try {
    const otpInstance = await getOtpData(req.body.email);

    if (!otpInstance || !otpInstance.authenticateOtp(req.body.otp)) {
      return res.generateResponse(400, "Invalid or expired otp");
    }
    await removeOtp(otpInstance._id);
    if (req.body.isLoginOtp) {
      // handle login
      const user = await findUser({ email: req.body.email });
      //  Generate JWT login token
      const token = getJwtToken({ user: { _id: user._id, email: user.email } });
      res.generateResponse(200, "Account Login Successfully", {
        token,
        user: _excludeExtraFields(user.toJSON(), [
          "password",
          "updatedAt",
          "createdAt",
        ]),
      });
    } else {
      const token = getJwtToken({ otpVerify: true, email: req.body.email });
      res.generateResponse(200, "OTP verification successfull", { token });
    }
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function deleteOtp(req, res, next) {
  if (!req.body.email) {
    return res.generateResponse(400, "Missing required fields");
  }

  try {
    const otpInstance = await getOtpData(req.body.email);

    if (!otpInstance) {
      return res.generateResponse(400, "Invalid or expired otp");
    }
    await removeOtp(otpInstance._id);
    res.generateResponse(200, "OTP removed successfull");
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function checkEmailExist(req, res, next) {
  // Validate request body
  if (!req.body.email) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const user = await findUser({ email: req.body.email });
    if (user && !req.query.isAccRecovery) {
      return res.generateResponse(400, "User already exixsts");
    }
    if (!user && req.query.isAccRecovery) {
      return res.generateResponse(400, "Account not found");
    }
    const otp = await generateOTP(req.body.email);
    console.log("otptotptos", otp);
    await sendOtpEmail(req.body.email, otp, req.query.language);
    res.generateResponse(200, "Otp send please check email.");
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateUserInfo(req, res, next) {
  if (!req.user || !req.user.verified) {
    return res.generateResponse(401, "User not found or verified");
  }

  try {
    const updatedUser = await updateUserData(
      req.user._id,
      Object.assign(req.body)
    );

    if (!updatedUser) {
      return res.generateResponse(401, "Error in updating user data");
    }
    res.generateResponse(
      200,
      "User data created Successfully",
      Object.assign(updatedUser)
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function sendRecoveryEmail(req, res, next) {
  // Validate request body
  if (!req.body.email) {
    return res.generateResponse(400, "Missing required fields");
  }

  try {
    const user = await findUser({ email: req.body.email });

    if (!user) {
      return res.generateResponse(400, "Account not found");
    }

    const otp = await generateOTP(req.body.email);
    await sendOtpEmail(req.body.email, otp, req.query.language);
    res.generateResponse(200, "Recovery email with otp sended, Please check.");
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function createUserPassword(req, res, next) {
  // Validate request body
  if ((!req.body.password, !req.body.token)) {
    return res.generateResponse(400, "Missing required fields");
  }

  if (!req.auth.otpVerify || !req.auth.email) {
    return res.generateResponse(400, "Invalid token to create password");
  }

  try {
    const user = await findUser({ email: req.auth.email });

    // if (user) {
    //   return res.generateResponse(401, "Account already created");
    // }

    if (!user && req.query.isAccRecovery) {
      return res.generateResponse(401, "Account not found");
    }

    if (user && req.query.isAccRecovery) {
      const updatedUser = await updateUserPassword(user._id, {
        password: UserModel.encryptPassword(req.body.password),
      });

      return res.generateResponse(
        200,
        "User password updated successfully",
        {}
      );
    }

    // Create new user
    const customer = await Stripe.customers.create({
      name: req.body.firstname + " " + req.body.lastname,
      email: req.body.email,
    });

    const userData = {
      email: req.auth.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: UserModel.encryptPassword(req.body.password),
      verified: true,
      socialLogin: false,
    };
    const newUser = await createUser(userData);

    if (!newUser) {
      return res.generateResponse(400, "Error in creating user");
    }

    const token = getJwtToken({
      user: { _id: newUser._id, email: newUser.email },
    });
    await sendSignupEmail(newUser.email, req.query.language);

    return res.generateResponse(200, "User created successfull", {
      token,
      user: _excludeExtraFields(newUser.toJSON(), [
        "password",
        "updatedAt",
        "createdAt",
      ]),
    });
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getProfile(req, res, next) {
  try {
    if (!req.user) {
      return res.generateResponse(401, `Error in getting user data`);
    }

    res.generateResponse(200, "User profile getting Successfully", {
      user: _excludeExtraFields(req.user.toJSON(), [
        "password",
        "updatedAt",
        "createdAt",
      ]),
    });
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getUserByEmail(req, res, next) {
  try {
    if (!req.params) {
      return res.generateResponse(401, `Error in getting user data`);
    }

    const user=await getUserDataByEmail(req.params.email)

    res.generateResponse(
      200,
      "user get successfully",
      user
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


async function socialLogin(req, res, next) {
  // Validate request body
  if (!req.body.token) {
    return res.generateResponse(400, "Token not found");
  }

  try {
    console.log(req.body.token);
    const { email, email_verified, name } = await verifyIdToken(req.body.token);

    const user = await findUser({ email: email });
    if (user && !user.socialLogin) {
      return res.generateResponse(
        400,
        "You are already registered with this email. Please use your email and password to login."
      );
    }

    if (user && email_verified && user.socialLogin) {
      const token = getJwtToken({ user: { _id: user._id, email: user.email } });
      res.generateResponse(200, "Account Login Successfully", {
        token,
        user: _excludeExtraFields(user.toJSON(), [
          "password",
          "updatedAt",
          "createdAt",
        ]),
      });
    }
    if (email_verified && !user) {
      const nameSplit = name.split(" ");
      const userData = {
        email: email,
        verified: true,
        socialLogin: true,
        firstname: nameSplit[0],
        lastname: nameSplit[1],
      };

      const newUser = await createUser(userData);
      const customer = await Stripe.customers.create({
        name: userData.firstname + " " + userData.lastname,
        email: userData.email,
      });
      if (!newUser) {
        return res.generateResponse(400, "Error in creating user");
      }

      const token = getJwtToken({
        user: { _id: newUser._id, email: newUser.email },
      });
      return res.generateResponse(200, "User created successfull", {
        token,
        user: _excludeExtraFields(newUser.toJSON(), [
          "password",
          "updatedAt",
          "createdAt",
        ]),
      });
    }
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
