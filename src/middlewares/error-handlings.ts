import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { z } from "zod";

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: "error",
      message: err.format()
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
