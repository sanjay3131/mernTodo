import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // "None" for cross-origin cookies in production
    });
  } catch (error) {
    console.error(`Token generation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Token generation failed",
    });
  }
};
