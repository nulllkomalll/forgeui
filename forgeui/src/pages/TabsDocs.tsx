import { DocLayout } from "../components/docs/DocLayout";
import { Tabs } from "../components/ui/Tabs";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("tabs")!;

const usage = `<Tabs defaultValue="preview">
  <Tabs.List>
    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
    <Tabs.Trigger value="code">Code</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="preview">...</Tabs.Panel>
  <Tabs.Panel value="code">...</Tabs.Panel>
</Tabs>`;

export default function TabsDocs() {
  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <Tabs defaultValue="account" className="w-full">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
            <Tabs.Trigger value="team">Team</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="account">
            <p className="text-sm text-muted-foreground">Manage your name, email, and password.</p>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <p className="text-sm text-muted-foreground">View invoices and update your payment method.</p>
          </Tabs.Panel>
          <Tabs.Panel value="team">
            <p className="text-sm text-muted-foreground">Invite teammates and manage their roles.</p>
          </Tabs.Panel>
        </Tabs>
      }
    />
  );
}
