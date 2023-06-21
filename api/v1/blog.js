const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getBlogById,
    deleteBlogById,
    getAllBlog,
    createBlog,
    updateBlogById,
} = require("#services/blog.service");

//#routes
router.post("/create-blog", createBlogController);
router.get("/get-all-blog", getAllBlogController);
router.get("/get-blog-by-id/:id", getBlogByIdController);
router.delete("/delete-blog-by-id/:id", deleteBlogByIdController);
router.put("/update-blog-by-id/:id", updateBlogByIdController);

async function createBlogController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newBlog = await createBlog(req.body);

    if (!newBlog) {
      return res.generateResponse(400, "Error in creating Blog");
    }

    return res.generateResponse(200, "Blog created successfull",newBlog);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllBlogController(req, res, next) {
  try {
    const getBlog = await getAllBlog();
    if (!getBlog) {
      return res.generateResponse(400, "Error in getting Blog");
    }
    return res.generateResponse(200, "Blog get successfully",getBlog);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getBlogByIdController(req, res, next) {
  try {
    const getBlog = await getBlogById({_id:req.params.id});
    if (!getBlog) {
      return res.generateResponse(400, "Error in getting Blog");
    }
    return res.generateResponse(200, "Blog get successfully",getBlog);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteBlogByIdController(req, res, next) {
  try {
    const deleteBlog = await deleteBlogById(req.params.id);
    if (!deleteBlog) {
      return res.generateResponse(400, "Error in deleting Blog");
    }
    return res.generateResponse(200, "Blog deleted successfully",deleteBlog);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateBlogByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateBlog = await updateBlogById(req.params.id, req.body);
    if (!updateBlog) {
      return res.generateResponse(400, "Error in updating Blog");
    }
    return res.generateResponse(200, "Blog updated successfully",updateBlog);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
