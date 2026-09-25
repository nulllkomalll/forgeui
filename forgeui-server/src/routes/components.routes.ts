import { Router } from "express";
import { getComponent, listComponents } from "../controllers/components.controller";

export const componentsRouter = Router();

componentsRouter.get("/", listComponents);
componentsRouter.get("/:slug", getComponent);
