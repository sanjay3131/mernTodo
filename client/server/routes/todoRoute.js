import express from "express";
import {
  deleteTodo,
  editTodo,
  getSingleTodo,
  getUserTodos,
  postTodo,
} from "../controller/todoController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/post", protectedRoute, postTodo);
router.get("/todos", protectedRoute, getUserTodos);
router.get("/todo/:id", protectedRoute, getSingleTodo);
router.put("/todo/:id", protectedRoute, editTodo);
router.delete("/todo/:id", protectedRoute, deleteTodo);
export default router;
