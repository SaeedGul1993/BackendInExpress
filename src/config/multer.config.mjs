import multer from "multer";

const uploadMulter = multer({
  storage: multer.diskStorage({}),
  limits: { fieldSize: 5000 },
});

export { uploadMulter };
