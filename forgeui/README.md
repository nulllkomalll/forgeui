# ForgeUI

Small, accessible components. Built for real products.

ForgeUI is a compact React + TypeScript component library with a documentation
website and a live playground, built as a portfolio project — every piece is
small enough to read end-to-end and explain in an interview.

## Features

- 9 reusable UI components: Button, Input, Modal, Tabs, Toast, Card, Badge, Select, Checkbox
- A documentation site with live previews, copyable usage code, a props table,
  and accessibility notes for each component
- An interactive playground for tweaking props and copying generated JSX
- Light/dark theme, persisted to `localStorage`
- Fully typed with TypeScript — no `any`
- No backend, no auth, no external API calls — everything runs on local data

## Tech stack

React · TypeScript · Vite · Tailwind CSS · React Router · Lucide icons

## Folder structure

```
src/
├── components/
│   ├── ui/            # Button, Input, Modal, Tabs, Toast, Card, Badge, Select, Checkbox
│   ├── layout/         # AppShell, Header, Sidebar, Footer
│   └── docs/            # CodeBlock, DocLayout — shared by every *Docs page
├── pages/               # One file per route
├── hooks/               # useToast
├── lib/                 # cn() class-name helper
├── data/                # componentDocs.ts — data-driven documentation content
├── App.tsx              # Route definitions
└── main.tsx             # Entry point
```

## Architecture decisions

- **Pages compose components.** Route files in `src/pages` assemble UI
  components and own page-specific state; UI components never contain routing
  or page logic.
- **Compound components where it helps.** `Card` and `Tabs` expose
  sub-components (`Card.Header`, `Tabs.Trigger`) instead of one component with
  a dozen boolean props.
- **Data-driven docs.** Every component's description, props table, and
  accessibility notes live in `componentDocs.ts`, so adding a new documented
  component doesn't require touching the page layout.
- **No state-management library.** Everything is `useState` / `useMemo` /
  `useCallback`, scoped to the component that needs it.

## Accessibility

Semantic HTML first (`<button>`, `<label htmlFor>`, native `role="dialog"`
patterns), ARIA only where semantics need help, visible focus rings on every
interactive element, and full keyboard support for Modal and Tabs.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build;
`npm run lint` runs ESLint.

## Example usage

```tsx
import { Button } from "./components/ui/Button";

<Button variant="primary">Save changes</Button>
<Button variant="destructive" size="sm">Delete</Button>
```
