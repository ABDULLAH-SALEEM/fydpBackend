const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");
const { jwtAuth } = require("#middlewares/jwtAuth");

const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("#services/product.service");

//#routes
router.post("/create-product", [jwtAuth], createProductController);
router.get("/get-all-products", [jwtAuth], getAllProductsController);
router.get(
  "/get-user-products/:userId",
  [jwtAuth],
  getAllUserProductsController
);

router.put("/update-product/:id", [jwtAuth], updateProductController);

async function createProductController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    req.body.userId = req.user._id;
    const newProduct = await createProduct(req.body);

    if (!newProduct) {
      return res.generateResponse(400, "Error in creating newProduct");
    }
    return res.generateResponse(200, "Product created successfull", newProduct);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAllUserProductsController(req, res, next) {
  try {
    const products = await getAllProducts(req.params.userId);
    if (!products) {
      return res.generateResponse(400, "Error in getting products");
    }
    return res.generateResponse(200, "Products get successfully", products);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function getAllProductsController(req, res, next) {
  try {
    const products = await getAllProducts(req.user._id);
    if (!products) {
      return res.generateResponse(400, "Error in getting products");
    }
    return res.generateResponse(200, "Products get successfully", products);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

async function updateProductController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.generateResponse(400, "Error in updating product");
    }
    return res.generateResponse(
      200,
      "Product updated successfully",
      updatedProduct
    );
  } catch (err) {
    console.log(err);
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = router;
