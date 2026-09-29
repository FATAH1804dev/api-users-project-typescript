import express from "express";
import { userController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContactController } from "../controller/contactController";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

//users api
apiRouter.get("/api/users/current", userController.get);
apiRouter.patch("/api/users/current", userController.update);
apiRouter.delete("/api/users/current", userController.out);

//contacts api
apiRouter.post("/api/contacts", ContactController.create);
