import { Router } from "express";
import { checkSchema, body } from "express-validator";
import { verifyTokenMiddleware } from "../utils/middlewares/verifyTokenMiddleware.mjs";
import { addPaymentController } from "../controllers/paymentController.mjs";
import { createPaymentCardValidator } from "../utils/validationSchemas/paymentCardValidator.mjs";

const paymentRoutes = Router();

paymentRoutes.post(
  "/api/create-payment",
  checkSchema(createPaymentCardValidator),
  verifyTokenMiddleware,
  addPaymentController
);

export default paymentRoutes;
