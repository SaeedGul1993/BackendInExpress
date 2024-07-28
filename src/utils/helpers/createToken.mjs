import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign(
    { email: user?.email, id: user?._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export { createToken };
