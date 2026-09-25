import { ArrowDown } from "lucide-react";

const layers = [
  { name: "Pages", detail: "Route-level components in src/pages. Compose UI components and own page-specific state." },
  { name: "Reusable UI Components", detail: "src/components/ui — Button, Input, Modal, Tabs, Toast, Card, Badge, Select, Checkbox. No page logic inside." },
  { name: "Hooks / Utilities", detail: "src/hooks and src/lib — shared behavior like useToast, and small helpers like cn()." },
  { name: "Design Tokens", detail: "CSS variables in index.css, mapped to Tailwind classes in tailwind.config.js." },
];

export default function About() {
  return (
    <div className="flex max-w-2xl flex-col gap-10 pb-16">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">About ForgeUI</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          ForgeUI is a small, production-style component library and documentation site, built to
          be explainable end-to-end — every architectural choice here has a reason.
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-sm font-semibold text-foreground">Architecture</h2>
        <div className="flex flex-col items-start gap-1">
          {layers.map((layer, i) => (
            <div key={layer.name} className="w-full">
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-sm font-medium text-foreground">{layer.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{layer.detail}</p>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Why TypeScript</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every component exports an explicit props interface. That makes the API self-documenting
            in an editor and catches misuse — like passing an invalid variant — before runtime.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Why reusable components</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Components like Card and Tabs use compound composition (Card.Header, Tabs.Trigger)
            instead of one component with a dozen props. Each piece stays small and single-purpose.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Why a feature-oriented structure</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Each UI component owns its own folder with its implementation and a barrel export
            (index.ts). Pages never contain component internals, and components never contain
            routing or page logic.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Accessibility approach</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Native semantic elements first (button, dialog roles, label/for), ARIA only to fill
            genuine gaps, and every interactive element gets a visible focus state and full keyboard
            support.
          </p>
        </div>
      </section>
    </div>
  );
}
