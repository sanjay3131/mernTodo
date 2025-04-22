import { Todo } from "../models/todosModel.js";
import { User } from "../models/userModel.js";

// post todo

const postTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const todo = await Todo.create({
      title,
      description,
      user: user._id,
    });
    user.todos.push(todo._id);
    await user.save();

    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// geta single todo
const getSingleTodo = async (req, res) => {
  try {
    const singleTodo = await Todo.findById(req.params.id);
    if (!singleTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).json({
      success: true,
      singleTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//edit todo
const editTodo = async (req, res) => {
  const author = req.user;
  try {
    const { title, description, status } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    if (todo.user.toString() !== author._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to edit this todo",
      });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status || todo.status;
    await todo.save();
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// delete todo
const deleteTodo = async (req, res) => {
  const author = req.user;
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: author._id,
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get user todos
const getUserTodos = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const todos = await Todo.find({ user: user._id });

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { postTodo, getUserTodos, getSingleTodo, editTodo, deleteTodo };
