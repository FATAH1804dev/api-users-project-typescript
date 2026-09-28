import express from "express";
import { publicRouter } from "../route/publicAPI";

export const web = express();
web.use(express.json());

web.use(publicRouter);
