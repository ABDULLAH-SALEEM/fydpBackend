


const { BlogPageModel } = require("#models/blogPage");



async function getAllBlogPage() {
  const data=await BlogPageModel.find({})
  return data
}

function getBlogPageById(id) {
  return BlogPageModel.findOne(id);
}

function createBlogPage(data) {

  const newBlogPage = new BlogPageModel({...data});
  return newBlogPage.save();
  
}

async function updateBlogPageById(id, data) {
  return await BlogPageModel.findOneAndUpdate({ _id:id }, {...data}, {
    new: true,
  });
}


function deleteBlogPageById(id) {
  return BlogPageModel.findByIdAndDelete(id);

}





module.exports = {
  getBlogPageById,
  deleteBlogPageById,
  getAllBlogPage,
  createBlogPage,
  updateBlogPageById,
};
