import { Link } from "react-router-dom";
import { ArrowRight, Blocks, Keyboard, Puzzle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Checkbox } from "../components/ui/Checkbox";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6 pt-4 sm:pt-10">
        <Badge variant="default" className="w-fit">
          v0.1 · in active development
        </Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Small, accessible components.
          <br />
          Built for real products.
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          ForgeUI is a compact React and TypeScript component set with documentation and a live
          playground — built to be read, extended, and explained line by line.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/components">
            <Button size="lg">
              Explore components
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link to="/playground">
            <Button size="lg" variant="outline">
              Open playground
            </Button>
          </Link>
        </div>
      </section>

      <section aria-label="Component preview">
        <Card className="p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-muted-foreground">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Save changes</Button>
                <Button size="sm" variant="secondary">
                  Cancel
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>

              <p className="mt-2 text-xs font-medium text-muted-foreground">Checkbox</p>
              <Checkbox label="Email me about product updates" defaultChecked />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">Card</p>
              <Card>
                <Card.Header>
                  <Card.Title>API requests</Card.Title>
                  <Card.Description>Current billing period</Card.Description>
                </Card.Header>
                <Card.Content className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-foreground">1,204</span>
                  <span className="text-muted-foreground">/ 5,000</span>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Card>
      </section>

      <section aria-label="What ForgeUI is built on" className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Blocks className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Built with React + TypeScript</h2>
          <p className="text-sm text-muted-foreground">
            Every component ships with explicit prop types, sensible defaults, and no implicit
            `any`.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Keyboard className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Accessible by default</h2>
          <p className="text-sm text-muted-foreground">
            Semantic elements, visible focus states, and correct ARIA relationships come standard,
            not bolted on.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Puzzle className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Composable APIs</h2>
          <p className="text-sm text-muted-foreground">
            Compound components like Card and Tabs compose small pieces instead of one prop-heavy
            component.
          </p>
        </div>
      </section>

      <section aria-label="Architecture" className="border-t border-border pt-10">
        <h2 className="text-sm font-semibold text-foreground">How it's structured</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Pages compose UI components. UI components stay free of page-specific logic. Documentation
          content is data-driven, defined once in{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">componentDocs.ts</code>.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-1">Pages</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
          <span className="rounded-md border border-border px-2 py-1">UI Components</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
          <span className="rounded-md border border-border px-2 py-1">Hooks / Utils</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
          <span className="rounded-md border border-border px-2 py-1">Design tokens</span>
        </div>
      </section>
    </div>
  );
}
