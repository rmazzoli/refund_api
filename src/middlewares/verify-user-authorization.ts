import {Request, Response, NextFunction} from 'express';
import { AppError } from '@/utils/AppError';

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return next(new AppError('User role not found', 401));
    }    
    if (!role.includes(userRole)) {
      return next(new AppError('User not authorized to access this resource', 403));
    }
    next();
  }
}

export { verifyUserAuthorization };