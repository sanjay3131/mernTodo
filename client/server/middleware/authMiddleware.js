import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Not authorized, token failed", error: error.message });
  }
};
