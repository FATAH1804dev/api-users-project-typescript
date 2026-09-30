import express from "express";
import { userController } from "../controller/userController.ts";

export const publicRouter = express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
