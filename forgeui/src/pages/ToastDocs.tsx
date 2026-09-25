import { DocLayout } from "../components/docs/DocLayout";
import { Button } from "../components/ui/Button";
import { ToastViewport } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("toast")!;

const usage = `const { toasts, showToast, dismissToast } = useToast();

showToast({
  title: "Changes saved",
  variant: "success",
});

<ToastViewport toasts={toasts} onDismiss={dismissToast} />`;

export default function ToastDocs() {
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <>
          <Button
            size="sm"
            onClick={() => showToast({ title: "Changes saved", variant: "success" })}
          >
            Trigger success
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast({ title: "Deploy failed", description: "Build exited with code 1.", variant: "error" })}
          >
            Trigger error
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast({ title: "New version available", variant: "info" })}
          >
            Trigger info
          </Button>
          <ToastViewport toasts={toasts} onDismiss={dismissToast} />
        </>
      }
    />
  );
}
