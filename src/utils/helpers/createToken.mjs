import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../db/secretKey.mjs";

const createToken = (user) => {
  return jwt.sign({ email: user?.email, id: user?._id }, SECRET_KEY, {
    expiresIn: "1d",
  });
};

export { createToken };
