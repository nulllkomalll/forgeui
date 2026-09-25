import { DocLayout } from "../components/docs/DocLayout";
import { Input } from "../components/ui/Input";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("input")!;

const usage = `<Input label="Email" placeholder="you@example.com" />
<Input label="Password" type="password" helperText="At least 8 characters" />
<Input label="Username" errorText="This username is taken" />`;

export default function InputDocs() {
  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Input label="Email" placeholder="you@example.com" />
          <Input label="Password" type="password" helperText="At least 8 characters" />
          <Input label="Username" defaultValue="komal" errorText="This username is taken" />
          <Input label="Disabled" disabled placeholder="Can't edit this" />
        </div>
      }
    />
  );
}
