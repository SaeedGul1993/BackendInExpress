import { matchedData, validationResult } from "express-validator";
import { User } from "../db/userModel.mjs";
import { createToken } from "../utils/helpers/createToken.mjs";
import {
  comparePassword,
  hashPassword,
} from "../utils/helpers/hashPassword.mjs";
import { generateOtp } from "../utils/helpers/generateOtp.mjs";
import { Otp } from "../db/otpModel.mjs";
import { createSendGridConnection } from "../config/sendGrid.config.mjs";
import { forgotPasswordMailerBody } from "../utils/emailTemplates/forgotEmailTemplate.mjs";
import { uploadFileOnCloudnary } from "../utils/fileUpload/uploadFileOnCloudnary.mjs";

const registerController = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  const existingUser = await User.findOne({ email: data?.email });
  if (existingUser)
    return response.status(400).send({ message: "User already exist!." });
  try {
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    const createUser = await newUser.save();
    const token = createToken(createUser);
    return response.status(201).send({
      message: "User Registered Successfully",
      data: createUser,
      token,
    });
  } catch (error) {
    console.log(error, "error");
    return response.sendStatus(500);
  }
};

const loginController = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  const existingUser = await User.findOne({ email: data?.email });
  if (!existingUser)
    return response.status(404).send({ message: "User not found." });
  const matchPassword = comparePassword(data?.password, existingUser?.password);
  console.log(matchPassword, "matchPassword");
  if (!matchPassword)
    return response.status(400).send({ message: "Invalid credentials" });
  const token = createToken(existingUser);
  return response.status(201).send({
    message: "User Login Successfully",
    data: existingUser,
    token,
  });
};

const forgotPasswordController = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  console.log("data", data);
  const { email } = data;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return response.status(404).send({ message: "User not found." });
    let otp = await generateOtp();
    let otpBody = {
      otp,
      userId: existingUser?._id,
      expireTime: new Date(Date.now() + 2 * 60 * 1000),
    };
    console.log("otp", otpBody);
    await Otp.create(otpBody);
    let mailerBody = forgotPasswordMailerBody(existingUser, otp);
    createSendGridConnection().sendMail(mailerBody, (error, _response) => {
      if (error) {
        console.log("mailer error", error);
        return;
      }
      console.log("mail response", _response);
      return response.status(200).send({ message: "Otp has been send." });
    });
  } catch (error) {
    console.log("error in forgot-password", error);
    return response.sendStatus(500);
  }
};

const changePasswordController = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  const { email, otp, password } = data;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return response.status(404).send({ message: "User not found." });
    const checkOtp = await Otp.findOne({ otp });
    if (!checkOtp)
      return response.status(400).send({ message: "Otp is invalid." });
    const checkOtpExpiry = checkOtp.expireTime < new Date();
    if (checkOtpExpiry)
      return response.status(400).send({ message: "Otp has expired." });
    existingUser.password = hashPassword(password);
    await User.updateOne({ email }, existingUser);
    return response
      .status(200)
      .send({ message: "Password changed successfully" });
  } catch (error) {
    console.log("error in change-password", error);
    return response.sendStatus(500);
  }
};

const uploadUserProfileController = async (request, response) => {
  const {
    file: { path },
    user,
  } = request;
  try {
    const uploadFile = await uploadFileOnCloudnary(path);
    user.profile = uploadFile?.secure_url;
    await User.updateOne({ email: user?.email }, user);
    return response.status(200).send({
      message: "Profile Uploaded Successfully.",
      data: { url: uploadFile?.secure_url },
    });
  } catch (error) {
    console.log("error in upload profile", error);
    return response.sendStatus(500);
  }
};

export {
  loginController,
  registerController,
  forgotPasswordController,
  changePasswordController,
  uploadUserProfileController,
};
