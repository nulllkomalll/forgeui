import express from "express";
import cors from "cors";
import { componentsRouter } from "./routes/components.routes";
import { playgroundRouter } from "./routes/playground.routes";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/components", componentsRouter);
  app.use("/api/playground", playgroundRouter);

  // 404 for anything under /api that didn't match a route above.
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}
