import express from "express";
import {
  getAllBlogs,
  getNewestBlogs,
  getLatestBlogs,
  getDetailBlog,
  getBlogsBySearch,
} from "../app/Controllers/BlogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/newest", getNewestBlogs);
router.get("/latest", getLatestBlogs);
router.get("/:id", getDetailBlog);
router.post("/search", getBlogsBySearch);

export default router;
