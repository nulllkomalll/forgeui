\# ForgeUI



A modern, reusable React + TypeScript component library and interactive documentation platform.



ForgeUI demonstrates reusable UI components, documentation pages, component previews, and an interactive playground backed by a lightweight REST API.



\## Features



\* Reusable React + TypeScript UI components

\* Component documentation and live examples

\* Interactive playground

\* Responsive documentation layout

\* Reusable layout and UI components

\* Toast notifications and custom React hooks

\* REST API for component data

\* SQLite persistence

\* Express + TypeScript backend



\## Tech Stack



\### Frontend



\* React

\* TypeScript

\* Vite

\* React Router

\* Tailwind CSS



\### Backend



\* Node.js

\* Express

\* TypeScript

\* SQLite

\* better-sqlite3



\## Project Structure



```text

ForgeUI/

├── forgeui/              # React + TypeScript frontend

│   └── src/

│       ├── components/   # Reusable UI, layout and docs components

│       ├── data/         # Component documentation data

│       ├── hooks/        # Custom React hooks

│       ├── lib/          # Shared utilities

│       └── pages/        # Application pages

│

└── forgeui-server/       # Express + TypeScript backend

&#x20;   └── src/

&#x20;       ├── db/           # Database and seed logic

&#x20;       ├── routes/       # API routes

&#x20;       └── server.ts     # Server entry point

```



\## Getting Started



\### 1. Clone the repository



```bash

git clone https://github.com/nulllkomalll/forgeui.git

cd forgeui

```



\### 2. Start the backend



```bash

cd forgeui-server

npm install

npm run seed

npm run dev

```



The backend runs on:



```text

http://localhost:4000

```



\### 3. Start the frontend



Open another terminal:



```bash

cd forgeui/forgeui

npm install

npm run dev

```



The frontend runs on:



```text

http://localhost:5173

```



\## Architecture



```text

Browser

&#x20;  │

&#x20;  ▼

React + TypeScript

&#x20;  │

&#x20;  ├── Pages

&#x20;  ├── Reusable UI Components

&#x20;  ├── Layout Components

&#x20;  ├── Custom Hooks

&#x20;  └── Utilities

&#x20;  │

&#x20;  ▼

REST API

&#x20;  │

&#x20;  ▼

Express + TypeScript

&#x20;  │

&#x20;  ▼

SQLite

```



\## Purpose



ForgeUI was built as a frontend-focused project to explore component-driven architecture, reusable React components, TypeScript, routing, state management, and frontend-to-backend API integration.



