import {Request, Response} from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import {z} from "zod";
import { AppError } from "@/utils/AppError";

const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation"]);

class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, "Name is required"),
      category: CategoriesEnum,
      amount: z.number().positive("Amount must be a positive number"),
      filename: z.string().trim().min(1, "Filename is required"), 
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    if(!req.user?.id){
      throw new AppError("User not authenticated", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user.id,
      },
    });
    
    res.status(201).json(refund);
  }

  async index(req: Request, res: Response) {    
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

   const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name:{
            contains: name.trim(),
          }
      },      
    },
    include: {user: { select: {name: true, email: true} }
    }
    });

    const totalCount = await prisma.refunds.count({
      where: {
        user: {
          name:{
            contains: name.trim(),
          }
      },      
    },
    });

    const totalPages = Math.ceil(totalCount / perPage);    

    res.json({
      data: refunds,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        perPage,
      },
    });    
  }

  async show(req: Request, res: Response) {   
    const paramsSchema = z.object({
      id: z.string().uuid("Invalid refund ID format"),
    });
    
    const { id } = paramsSchema.parse(req.params);
    const refund = await prisma.refunds.findUnique({
      where: { id },
      include: { user: { select: {name: true, email: true} } }
    });
    res.json(refund);
  }
 }

export {RefundsController}