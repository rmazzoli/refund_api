import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

interface ITokenPayload {
  sub: string;
  role: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {  
  try { 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError("Token is missing", 401);
    }  
    const [, token] = authHeader.split(" ");

    const {role, sub: user_id} = verify(token, authConfig.jwt.jwtSecret) as ITokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };