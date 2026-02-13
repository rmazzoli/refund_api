import { Request, Response } from 'express';
import {z} from 'zod';
import { prisma } from '@/database/prisma';
import { hash, compare } from 'bcrypt';
import { AppError } from '@/utils/AppError';
import { authConfig } from '@/configs/auth';
import {sign} from 'jsonwebtoken';

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    });

    const {email, password} = bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    }); 

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const { jwtSecret, jwtExpiresIn } = authConfig.jwt;
    const token = sign({role: user.role}, jwtSecret, {
      subject: user.id,
      expiresIn: jwtExpiresIn,
    });



    response.json({ token, user: { ...user, password: undefined } });
    
  }

}

  export { SessionsController };