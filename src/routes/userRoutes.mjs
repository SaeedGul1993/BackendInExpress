import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/userController.mjs";
import { checkSchema } from "express-validator";
import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  registerUserValidationSchema,
  userLoginValidationSchema,
} from "../utils/validationSchemas/userValidationSchema.mjs";

const userRoutes = Router();

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

export default userRoutes;
