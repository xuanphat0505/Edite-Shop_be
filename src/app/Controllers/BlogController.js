import BlogModel from "../Models/BlogModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    return res
      .status(200)
      .json({ success: true, message: "get blogs success", data: blogs });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};

export const getNewestBlogs = async (req, res) => {
  try {
    const newestBlogs = await BlogModel.find({ newest: true });
    return res
      .status(200)
      .json({ success: true, message: "get blogs success", data: newestBlogs });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};

export const getLatestBlogs = async (req, res) => {
  try {
    const latestBlogs = await BlogModel.find({ latest: true });
    return res
      .status(200)
      .json({ success: true, message: "get blogs success", data: latestBlogs });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};

export const getDetailBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const detailBlog = await BlogModel.findById(id);
    return res.status(200).json({ success: true, data: detailBlog });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};

export const getBlogsBySearch = async (req, res) => {
  const { title } = req.body;
  try {
    const blogs = await BlogModel.find({
      title: { $regex: new RegExp(title, "i") },
    });
    if (blogs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No blogs were found matching your selection.",
      });
    }
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: true, error: error.message });
  }
};
