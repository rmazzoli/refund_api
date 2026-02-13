import {Request, Response} from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import {z} from "zod";
import { AppError } from "@/utils/AppError";

class RefundsController {
  async create(req: Request, res: Response) {
    /*const bodySchema = z.object({
      orderId: z.string().trim().min(1, { message: "Order ID is required" }),
      reason: z.string().trim().min(5, { message: "Reason must be at least 5 characters long" }),
    });

    const { orderId, reason } = bodySchema.parse(req.body);

    // Check if the order exists in the database
    const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existingOrder) {
      throw new AppError("Order not found", 404);
    }
    // Create the refund request in the database
    await prisma.refund.create({
      data: {
        orderId,
        reason,
      },
    });*/

    res.status(201).json({message: "Refund request created successfully (this is a placeholder response)"});
  }
 }

export {RefundsController}