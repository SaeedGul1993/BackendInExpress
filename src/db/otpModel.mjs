import mongoose from "mongoose";

const OtpModel = new mongoose.Schema({
  otp: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  expireTime: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
});

export const Otp = mongoose.model("Otp", OtpModel);
