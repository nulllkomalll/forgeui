import { ReactNode } from "react";
import { Badge } from "../ui/Badge";
import type { ComponentDoc } from "../../data/componentDocs";
import { CodeBlock } from "./CodeBlock";

export function DocLayout({ doc, preview, usageCode }: { doc: ComponentDoc; preview: ReactNode; usageCode: string }) {
  return (
    <div className="flex flex-col gap-10 pb-16">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-foreground">{doc.name}</h1>
          <Badge>{doc.category}</Badge>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">{doc.description}</p>
      </div>

      <section aria-labelledby="preview-heading">
        <h2 id="preview-heading" className="mb-3 text-xs font-medium text-muted-foreground">
          Preview
        </h2>
        <div className="flex min-h-32 flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6">
          {preview}
        </div>
      </section>

      <section aria-labelledby="usage-heading">
        <h2 id="usage-heading" className="mb-3 text-xs font-medium text-muted-foreground">
          Usage
        </h2>
        <CodeBlock code={usageCode} />
      </section>

      <section aria-labelledby="props-heading">
        <h2 id="props-heading" className="mb-3 text-xs font-medium text-muted-foreground">
          Props
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-xs text-muted-foreground">
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((prop) => (
                <tr key={prop.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-xs text-foreground">{prop.name}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{prop.type}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{prop.default ?? "—"}</td>
                  <td className="px-4 py-2 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="a11y-heading">
        <h2 id="a11y-heading" className="mb-3 text-xs font-medium text-muted-foreground">
          Accessibility
        </h2>
        <ul className="flex flex-col gap-2">
          {doc.accessibility.map((note, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
