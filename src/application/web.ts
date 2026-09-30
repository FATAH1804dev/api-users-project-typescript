import express from "express";
import { publicRouter } from "../route/publicAPI.ts";
import { errorMiddleware } from "../middleware/errorMiddleware.ts";
import { apiRouter } from "../route/API.ts";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(apiRouter);

web.use(errorMiddleware);
