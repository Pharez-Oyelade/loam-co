import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { loginUser } from "../services/loginService.js";
import cookieOption from "../config/cookieOption.js";

// login user
export const customerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password, "customer");

  res.cookie("token", result.token, cookieOption);

  res.status(StatusCodes.OK).json(result.user);
});

// admin login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password, "admin");

  res.cookie("token", result.token, cookieOption);

  res.status(StatusCodes.OK).json(result.user);
});

// register customer
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", StatusCodes.BAD_REQUEST);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError("User already exists", StatusCodes.CONFLICT);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, cookieOption);
  res.status(StatusCodes.CREATED).json({ success: true, user });
});

// logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOption);

  res.status(StatusCodes.OK).json({ success: true, message: "Logged out" });
});

// get me
export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(StatusCodes.OK).json({ success: true, user });
});
