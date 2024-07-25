import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    fullName: { type: mongoose.Schema.Types.String },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: false,
    },
    profile: {
      type: mongoose.Schema.Types.String,
      required: false,
      unique: false,
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", UserModel);
