import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err?.message ?? err}`);

  // Mongoose validation error
  if (err?.name === "ValidationError") {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: err.message,
    });
  }

  // Mongoose duplicate key
  if (err?.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: "A record with that value already exists",
    });
  }

  // JWT errors
  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }

  const statusCode = err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err?.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
