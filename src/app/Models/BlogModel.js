import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    metas: {
      type: String,
      required: true,
    },
    latest: {
      type: Boolean,
    },
    newest: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blogs", BlogSchema);

export default BlogModel;
