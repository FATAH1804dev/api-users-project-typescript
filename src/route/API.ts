import express from "express";
import { userController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", userController.get);
