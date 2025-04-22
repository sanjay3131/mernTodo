import mongoose, { Aggregate } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { generateToken } from "../genetareToken/generateToken.js";
import { uploadImage } from "../config/imageUpload.js";
// register
const register = async (req, res) => {
  let { email, password, username, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // If a file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadImage(req.file.path);
      profilePic = result.secure_url; // Override with the uploaded file URL
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      profilePic, // Save the image URL to the user's profile
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);

    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// logout

const logout = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// check auth
const checkAuth = async (req, res) => {
  try {
    let user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    user = await User.findById(req.user._id).populate("todos", "title");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login, logout, checkAuth };
