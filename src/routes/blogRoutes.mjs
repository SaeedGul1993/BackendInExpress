import { Router } from "express";
import { checkSchema } from "express-validator";
import { createBlogValidationSchema } from "../utils/validationSchemas/blogValidationSchema.mjs";
import { verifyTokenMiddleware } from "../utils/middlewares/verifyTokenMiddleware.mjs";
import { createBlogController } from "../controllers/blogController.mjs";
import { uploadMulter } from "../config/multer.config.mjs";

const blogRoutes = Router();

blogRoutes.post(
  "/api/add-blogs",
  uploadMulter.single("blogImage"),
  checkSchema(createBlogValidationSchema),
  verifyTokenMiddleware,
  createBlogController
);

export default blogRoutes;
