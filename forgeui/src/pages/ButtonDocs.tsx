import { DocLayout } from "../components/docs/DocLayout";
import { Button } from "../components/ui/Button";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("button")!;

const usage = `<Button variant="primary">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive" size="sm">Delete</Button>`;

export default function ButtonDocs() {
  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <>
          <Button>Save changes</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="sm">Small</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </>
      }
    />
  );
}
