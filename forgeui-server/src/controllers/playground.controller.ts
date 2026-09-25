import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db";
import type { CreatePlaygroundConfigInput, PlaygroundConfig } from "../types";

interface PlaygroundRow {
  id: string;
  component: string;
  variant: string;
  size: string;
  disabled: number;
  label: string;
  created_at: string;
}

function rowToConfig(row: PlaygroundRow): PlaygroundConfig {
  return {
    id: row.id,
    component: row.component,
    variant: row.variant,
    size: row.size,
    disabled: Boolean(row.disabled),
    label: row.label,
    createdAt: row.created_at,
  };
}

/** Narrow, dependency-free validation — enough to reject bad requests without a schema library. */
function validateInput(body: unknown): { value: CreatePlaygroundConfigInput } | { errors: string[] } {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  if (typeof b.component !== "string" || b.component.trim() === "") errors.push("component is required");
  if (typeof b.variant !== "string" || b.variant.trim() === "") errors.push("variant is required");
  if (typeof b.size !== "string" || b.size.trim() === "") errors.push("size is required");
  if (typeof b.label !== "string" || b.label.trim() === "") errors.push("label is required");
  if (typeof b.disabled !== "boolean") errors.push("disabled must be a boolean");

  if (errors.length > 0) return { errors };

  return {
    value: {
      component: b.component as string,
      variant: b.variant as string,
      size: b.size as string,
      label: b.label as string,
      disabled: b.disabled as boolean,
    },
  };
}

export function createPlaygroundConfig(req: Request, res: Response) {
  const result = validateInput(req.body);

  if ("errors" in result) {
    res.status(400).json({ error: "Invalid playground config", details: result.errors });
    return;
  }

  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const { component, variant, size, disabled, label } = result.value;

  db.prepare(`
    INSERT INTO playground_configs (id, component, variant, size, disabled, label, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, component, variant, size, disabled ? 1 : 0, label, createdAt);

  const config: PlaygroundConfig = { id, component, variant, size, disabled, label, createdAt };
  res.status(201).json(config);
}

export function getPlaygroundConfig(req: Request, res: Response) {
  const { id } = req.params;
  const row = db.prepare("SELECT * FROM playground_configs WHERE id = ?").get(id) as PlaygroundRow | undefined;

  if (!row) {
    res.status(404).json({ error: `No playground config found with id "${id}"` });
    return;
  }

  res.json(rowToConfig(row));
}
