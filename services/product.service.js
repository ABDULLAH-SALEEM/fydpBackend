const { ProductModel } = require("#models/product");

async function getAllProducts(userId) {
  const data = await ProductModel.find({ userId });
  return data;
}

function createProduct(data) {
  const newOrder = new ProductModel({ ...data });
  return newOrder.save();
}

async function updateProduct(id, data) {
  return await ProductModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    {
      new: true,
    }
  );
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
};
