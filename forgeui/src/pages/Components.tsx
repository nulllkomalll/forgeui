import { Link } from "react-router-dom";
import { componentDocs } from "../data/componentDocs";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export default function Components() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Components</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {componentDocs.length} components, documented with live previews, props, and
          accessibility notes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {componentDocs.map((doc) => (
          <Link key={doc.slug} to={`/components/${doc.slug}`}>
            <Card className="h-full p-4 transition-colors hover:border-primary/50">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">{doc.name}</h2>
                <Badge>{doc.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
