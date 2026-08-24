import User from "../models/userModel.js";
import { AppError } from "../middleware/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import cookieOption from "../config/cookieOption.js";

export const loginUser = async (email, password, expectedRole) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  if (user.role !== expectedRole) {
    throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);

  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  // res.cookie("token", token, cookieOption);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
