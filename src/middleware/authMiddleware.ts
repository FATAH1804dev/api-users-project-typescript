import type { Request, Response, NextFunction } from "express";
import { prisma } from "../application/database";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get("X-API-TOKEN");
  if (token) {
    const checkUser = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (checkUser) {
      req.user = checkUser;
      return next();
    }
  }
  res
    .status(401)
    .json({
      errors: "unauthorized",
    })
    .end();
};
