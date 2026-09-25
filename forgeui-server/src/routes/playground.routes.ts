import { Router } from "express";
import { createPlaygroundConfig, getPlaygroundConfig } from "../controllers/playground.controller";

export const playgroundRouter = Router();

playgroundRouter.post("/", createPlaygroundConfig);
playgroundRouter.get("/:id", getPlaygroundConfig);
