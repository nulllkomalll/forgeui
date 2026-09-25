# ForgeUI Server

A small Express + TypeScript + SQLite backend for the ForgeUI component
library site. It serves the component documentation over a REST API and
lets the Playground save a config and generate a shareable link.

## Features

- `GET /api/health` — liveness check
- `GET /api/components` — list all component docs
- `GET /api/components/:slug` — a single component's docs (404 if unknown)
- `POST /api/playground` — save a playground config, returns it with a generated `id`
- `GET /api/playground/:id` — fetch a saved config by id (404 if unknown)

## Tech stack

Express · TypeScript · better-sqlite3 · cors

SQLite was chosen deliberately: it's a single file on disk, needs no
separate server process to install or run, and `better-sqlite3`'s
synchronous API keeps the controllers simple to read and explain.

## Folder structure

```
src/
├── db/
│   ├── index.ts     # connection + schema (CREATE TABLE IF NOT EXISTS)
│   └── seed.ts       # one-time seed of component docs into the database
├── routes/            # thin Express routers, one per resource
├── controllers/        # request handling + SQL, one per resource
├── types/               # shared TypeScript interfaces
├── app.ts                # Express app: middleware + routes, no listen()
└── server.ts              # boots the schema and starts listening
```

`app.ts` and `server.ts` are split on purpose: `app.ts` builds the Express
app and can be imported by tests without opening a port; `server.ts` is the
only file that actually calls `.listen()`.

## Data model

**components** — one row per documented component (`slug` is the primary
key). `props` and `accessibility` are stored as JSON text columns, since
they're small, always read as a whole, and don't need their own tables.

**playground_configs** — one row per saved Playground snapshot: which
component, which variant/size/label, and whether it's disabled. `id` is a
generated UUID, which is what the frontend uses to build a shareable URL
like `/playground?config=<id>`.

## Running locally

```bash
npm install
cp .env.example .env
npm run seed   # creates data/forgeui.db and loads the component docs
npm run dev    # starts the API on http://localhost:4000
```

`npm run build && npm start` runs the compiled production build instead.

## Example requests

```bash
curl http://localhost:4000/api/components
curl http://localhost:4000/api/components/button

curl -X POST http://localhost:4000/api/playground \
  -H "Content-Type: application/json" \
  -d '{"component":"Button","variant":"primary","size":"md","disabled":false,"label":"Save changes"}'

curl http://localhost:4000/api/playground/<id-from-the-response-above>
```

## What's intentionally left out

No authentication, no ORM, no request validation library — request bodies
are checked by hand in the controller, which is enough for two small
endpoints and stays easy to explain. Add auth or a schema validator (e.g.
zod) only if a future feature actually needs it.
