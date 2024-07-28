import mongoose from "mongoose";

const BlogModel = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", BlogModel);
