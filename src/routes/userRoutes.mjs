import bodyParser from "body-parser";
import { Router } from "express";
import { checkSchema } from "express-validator";
import { uploadMulter } from "../config/multer.config.mjs";
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  registerController,
  uploadUserProfileController,
} from "../controllers/userController.mjs";
import { verifyTokenMiddleware } from "../utils/middlewares/verifyTokenMiddleware.mjs";
import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  registerUserValidationSchema,
  userLoginValidationSchema,
} from "../utils/validationSchemas/userValidationSchema.mjs";

const userRoutes = Router();
userRoutes.use(bodyParser.urlencoded({ extended: true }));
userRoutes.post(
  "/api/register",
  checkSchema(registerUserValidationSchema),
  registerController
);
userRoutes.post(
  "/api/login",
  checkSchema(userLoginValidationSchema),
  loginController
);

userRoutes.post(
  "/api/forgot-password",
  checkSchema(forgotPasswordValidationSchema),
  forgotPasswordController
);

userRoutes.post(
  "/api/change-password",
  checkSchema(changePasswordValidationSchema),
  changePasswordController
);

userRoutes.post(
  "/api/upload-profile",
  verifyTokenMiddleware,
  uploadMulter.single("profile"),
  uploadUserProfileController
);

export default userRoutes;
