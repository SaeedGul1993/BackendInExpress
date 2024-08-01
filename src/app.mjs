import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import mongoose from "mongoose";
import notesRoutes from "./routes/notesRoutes.mjs";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.mjs";
import paymentRoutes from "./routes/paymentRoutes.mjs";

dotenv.config();
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`DB is connected.`);
  })
  .catch((error) => {
    console.log(`DB is not connected.`, error);
  });
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(notesRoutes);
app.use(blogRoutes);
app.use(paymentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
