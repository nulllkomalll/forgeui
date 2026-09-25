import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = process.env.DB_PATH ?? "./data/forgeui.db";

// Ensure the containing folder exists before SQLite tries to open the file.
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

/**
 * Creates the schema if it doesn't exist yet. Safe to call on every boot.
 *
 * `props` and `accessibility` are stored as JSON text — SQLite has no native
 * array/object type, and the payloads are small and always read as a whole,
 * so a JSON column is simpler here than a normalized props table.
 */
export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS components (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      props_json TEXT NOT NULL,
      accessibility_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS playground_configs (
      id TEXT PRIMARY KEY,
      component TEXT NOT NULL,
      variant TEXT NOT NULL,
      size TEXT NOT NULL,
      disabled INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}
