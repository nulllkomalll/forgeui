import { DocLayout } from "../components/docs/DocLayout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("card")!;

const usage = `<Card>
  <Card.Header>
    <Card.Title>Usage</Card.Title>
    <Card.Description>API requests this month</Card.Description>
  </Card.Header>
  <Card.Content>1,204 / 5,000</Card.Content>
</Card>`;

export default function CardDocs() {
  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <Card className="w-full max-w-sm">
          <Card.Header>
            <Card.Title>Team plan</Card.Title>
            <Card.Description>Renews on Nov 4, 2026</Card.Description>
          </Card.Header>
          <Card.Content className="flex items-center justify-between">
            <span>$49/month</span>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </Card.Content>
        </Card>
      }
    />
  );
}
