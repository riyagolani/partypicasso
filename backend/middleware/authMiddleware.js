import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Authentication Middleware
export const authenticate = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return response.status(401).send({ message: "Invalid token" });
  }
};
