const { BlogModel } = require("#models/blog");



async function getAllBlog() {
  const data=await BlogModel.find({}).sort({ priority:1 }).exec()
  return data
}

function getBlogById(id) {
  return BlogModel.findOne(id);
}

function createBlog(data) {

  const newBlog = new BlogModel({...data});
  return newBlog.save();
  
}

async function updateBlogById(id, data) {
  return await BlogModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteBlogById(id) {
  return BlogModel.findByIdAndDelete(id);

}





module.exports = {
  getBlogById,
  deleteBlogById,
  getAllBlog,
  createBlog,
  updateBlogById,
};
