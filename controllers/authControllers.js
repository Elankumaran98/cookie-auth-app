import jwt from "jsonwebtoken";

import asyncHandler from "../middleware/asyncHandler.js";
import config from "../config/config.js";
import User from "../models/userModel.js";

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Create a new user
  const user = await User.create({ username, password });

  res.status(201).json({ id: user._id });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Fetch the user with the password field included
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Verify the password using the comparePassword method
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate access and refresh tokens
  const accessToken = jwt.sign({ username }, config.secretKey, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ username }, config.refreshSecretKey, {
    expiresIn: "7d",
  });

  // Set the refresh token as an HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ accessToken });
});

const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const user = jwt.verify(refreshToken, config.refreshSecretKey);
    // Generate a new access token
    const accessToken = jwt.sign(
      { username: user.username },
      config.secretKey,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default { register, login, refreshToken };
