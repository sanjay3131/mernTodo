import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controller/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protectedRoute, logout);
router.get("/checkauth", protectedRoute, checkAuth);
export default router;
