import {Request, Response} from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import bcrypt from "bcrypt";
import {z} from "zod";
import { AppError } from "@/utils/AppError";

class UsersController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(2, {message: "Nome é obrigatório e deve conter pelo menos 2 caracteres"}),
      email: z.string().trim().email({message: "E-mail inválido"}).toLowerCase(),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee),      
    });

    const {name, email, password, role} = bodySchema.parse(req.body);

    // Check if user with the same email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });  
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    }); 

      res.status(201).json();
    }

    async index(req: Request, res: Response){
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      res.json(users);
    }
}

export {UsersController}