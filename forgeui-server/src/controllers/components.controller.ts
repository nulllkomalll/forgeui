import type { Request, Response } from "express";
import { db } from "../db";
import type { ComponentDoc } from "../types";

interface ComponentRow {
  slug: string;
  name: string;
  description: string;
  category: string;
  props_json: string;
  accessibility_json: string;
}

function rowToDoc(row: ComponentRow): ComponentDoc {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    props: JSON.parse(row.props_json),
    accessibility: JSON.parse(row.accessibility_json),
  };
}

export function listComponents(_req: Request, res: Response) {
  const rows = db.prepare("SELECT * FROM components ORDER BY name ASC").all() as ComponentRow[];
  res.json(rows.map(rowToDoc));
}

export function getComponent(req: Request, res: Response) {
  const { slug } = req.params;
  const row = db.prepare("SELECT * FROM components WHERE slug = ?").get(slug) as ComponentRow | undefined;

  if (!row) {
    res.status(404).json({ error: `No component found with slug "${slug}"` });
    return;
  }

  res.json(rowToDoc(row));
}
