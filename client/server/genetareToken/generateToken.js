import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "none",
      secure: true, // Ensure secure cookies in production
    };

    res.cookie("token", token, cookieOptions);
  } catch (error) {
    console.error(`Token generation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Token generation failed",
    });
  }
};
