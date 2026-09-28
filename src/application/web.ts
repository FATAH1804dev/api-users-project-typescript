import express from "express";
import { publicRouter } from "../route/publicAPI";
import { errorMiddleware } from "../middleware/errorMiddleware";

export const web = express();
web.use(express.json());

web.use(publicRouter);

web.use(errorMiddleware);
