const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    updateOrder,
} = require("#services/order.service");

//#routes
router.post("/create-order", [jwtAuth], createOrderController);
router.get("/get-all-orders", [jwtAuth], getAllOrdersController);
router.get("/get-user-orders", [jwtAuth], getUserOrdersController);
// router.get("/get-quotation-sender/:id", [jwtAuth], getQuotationSenderController)
router.get("/get-order-by-id/:id", [jwtAuth], getOrderByIdController);
// router.get("/get-quotation-by-email", [jwtAuth], getQuotationByEmailController);
router.put("/update-order-by-id/:id",[jwtAuth], updateOrderByIdController);

async function createOrderController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    req.body.userId = req.user._id;
    const newQuotation = await createOrder(req.body);

    if (!newQuotation) {
      return res.generateResponse(400, "Error in creating order");
    }
    return res.generateResponse(
      200,
      "Order created successfull",
      newQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllOrdersController(req, res, next) {
  try {
    const orderFrom=req.user.email
    const quotations = await getAllOrders(orderFrom);
    if (!quotations) {
      return res.generateResponse(400, "Error in getting orders");
    }
    return res.generateResponse(200, "orders get successfully", quotations);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getUserOrdersController(req, res, next) {
  try {
    const getQuotation = await getOrderByUser(req.user._id);
    if (!getQuotation) {
      return res.generateResponse(400, "Error in getting order");
    }
    return res.generateResponse(
      200,
      " order get successfully",
      getQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getOrderByIdController(req, res, next) {
  try {
    const getQuotation = await getOrderById({ _id: req.params.id });
    if (!getQuotation) {
      return res.generateResponse(400, "Error in getting order");
    }
    return res.generateResponse(
      200,
      "Signle order get successfully",
      getQuotation
    );
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

// async function getQuotationByEmailController(req, res, next) {
//   try {
//     const getQuotation = await getQuotationByEmail(req.user.email);
//     if (!getQuotation) {
//       return res.generateResponse(400, "Error in getting quotation");
//     }
//     return res.generateResponse(
//       200,
//       "Quotation get successfully",
//       getQuotation
//     );
//   } catch (err) {
//     const error = manageError(err);
//     res.generateResponse(error.code, error.message);
//   }
// }

async function updateOrderByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updatedQuotation = await updateOrder(req.params.id, req.body);
    if (!updatedQuotation) {
      return res.generateResponse(400, "Error in updating quotation");
    }
    return res.generateResponse(
      200,
      "Quotation updated successfully",
      updatedQuotation
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

// async function getQuotationSenderController(req, res, next) {
//   try {
//     if (!req.params) {
//       return res.generateResponse(401, `Error in getting user data`);
//     }

//     const user=await getQuotationSender(req.params.id)

//     res.generateResponse(
//       200,
//       "user get successfully",
//       user
//     );
//   } catch (err) {
//     const error = manageError(err);
//     res.generateResponse(error.code, error.message);
//   }
// }

module.exports = router;
