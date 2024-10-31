import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Middleware to check JWT token
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const respObj = {
      status: false,
      message: "Access denied. No Token!",
    };

    return res.status(401).send(respObj);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const errObj = {
        status: false,
        message: "Token expired! Pleas log in again.",
      };

      return res.status(401).json(errObj);
    } else {
      const errObj = {
        status: false,
        message: "Invalid Token!",
      };

      return res.status(403).json(errObj);
    }
  }
};
