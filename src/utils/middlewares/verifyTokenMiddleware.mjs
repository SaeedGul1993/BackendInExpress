import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../db/secretKey.mjs";
import { User } from "../../db/userModel.mjs";

const verifyTokenMiddleware = async (request, response, next) => {
  const getHeader = request.header("Authorization");
  const fetchToken = getHeader.replace("Bearer ", "");
  if (!fetchToken) response.status(401).send({ message: "UnAuthorized!." });
  try {
    const verifyToken = jwt.verify(fetchToken, SECRET_KEY);
    const fetchUser = await User.findById(verifyToken?.id);
    if (!fetchUser) response.status(401).send({ message: "UnAuthorized!." });
    request.user = fetchUser;
    request.token = fetchToken;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(400).json({ message: "Invalid token." });
    } else if (err instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: "Token expired." });
    } else {
      return response.status(500).json({ message: "Internal server error." });
    }
  }
};

export { verifyTokenMiddleware };
