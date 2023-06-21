const express = require("express");
const router = express.Router();
const { manageError } = require("#helper/response.helper");

const {
    getBlogPageById,
    deleteBlogPageById,
    getAllBlogPage,
    createBlogPage,
    updateBlogPageById,
} = require("#services/blogPage.service");

//#routes
router.post("/create-blog-page", createBlogPageController);
router.get("/get-all-blog-page", getAllBlogPageController);
router.get("/get-blog-page-by-id/:id", getBlogPageByIdController);
router.delete("/delete-blog-page-by-id/:id", deleteBlogPageByIdController);
router.put("/update-blog-page-by-id/:id", updateBlogPageByIdController);

async function createBlogPageController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const newBlogPage = await createBlogPage(req.body);

    if (!newBlogPage) {
      return res.generateResponse(400, "Error in creating BlogPage");
    }

    return res.generateResponse(200, "BlogPage created successfull",newBlogPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getAllBlogPageController(req, res, next) {
  try {
    const getBlogPage = await getAllBlogPage();
    if (!getBlogPage) {
      return res.generateResponse(400, "Error in getting BlogPage");
    }
    return res.generateResponse(200, "BlogPage get successfully",getBlogPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function getBlogPageByIdController(req, res, next) {
  try {
    const getBlogPage = await getBlogPageById({_id:req.params.id});
    if (!getBlogPage) {
      return res.generateResponse(400, "Error in getting BlogPage");
    }
    return res.generateResponse(200, "BlogPage get successfully",getBlogPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function deleteBlogPageByIdController(req, res, next) {
  try {
    const deleteBlogPage = await deleteBlogPageById(req.params.id);
    if (!deleteBlogPage) {
      return res.generateResponse(400, "Error in deleting BlogPage");
    }
    return res.generateResponse(200, "BlogPage deleted successfully",deleteBlogPage);
  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}
async function updateBlogPageByIdController(req, res, next) {
  if (!req.body) {
    return res.generateResponse(400, "Missing required fields");
  }
  try {
    const updateBlogPage = await updateBlogPageById(req.params.id, req.body);
    if (!updateBlogPage) {
      return res.generateResponse(400, "Error in updating BlogPage");
    }
    return res.generateResponse(200, "BlogPage updated successfully",updateBlogPage);
  } catch (err) {
    console.log(err)
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}


module.exports = router;
