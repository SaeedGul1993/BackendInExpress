import { Router } from "express";
import {
  addNoteController,
  fetchNotesController,
} from "../controllers/noteController.mjs";
import { verifyTokenMiddleware } from "../utils/middlewares/verifyTokenMiddleware.mjs";
import { checkSchema } from "express-validator";
import { addNoteValidationSchema } from "../utils/validationSchemas/noteValidationSchema.mjs";

const notesRoutes = Router();

notesRoutes.post(
  "/api/add-notes",
  verifyTokenMiddleware,
  checkSchema(addNoteValidationSchema),
  addNoteController
);

notesRoutes.get("/api/notes", verifyTokenMiddleware, fetchNotesController);

export default notesRoutes;
