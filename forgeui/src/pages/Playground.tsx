import { useMemo, useState } from "react";
import { Select } from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { Button, ButtonSize, ButtonVariant } from "../components/ui/Button";
import { Badge, BadgeVariant } from "../components/ui/Badge";
import { CodeBlock } from "../components/docs/CodeBlock";

type PlaygroundComponent = "Button" | "Badge";

interface PlaygroundConfig {
  component: PlaygroundComponent;
  variant: string;
  size: ButtonSize;
  disabled: boolean;
  label: string;
}

const buttonVariants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "destructive"];
const badgeVariants: BadgeVariant[] = ["default", "success", "warning", "destructive"];

function generateCode(config: PlaygroundConfig): string {
  if (config.component === "Button") {
    const attrs = [
      `variant="${config.variant}"`,
      config.size !== "md" ? `size="${config.size}"` : null,
      config.disabled ? "disabled" : null,
    ].filter(Boolean);
    return `<Button ${attrs.join(" ")}>\n  ${config.label}\n</Button>`;
  }
  return `<Badge variant="${config.variant}">${config.label}</Badge>`;
}

export default function Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>({
    component: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
    label: "Save changes",
  });

  const code = useMemo(() => generateCode(config), [config]);
  const availableVariants = config.component === "Button" ? buttonVariants : badgeVariants;

  const updateConfig = (patch: Partial<PlaygroundConfig>) => setConfig((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col gap-8 pb-16">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Playground</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Adjust props, see the live result, and copy the generated JSX.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
          <Select
            label="Component"
            value={config.component}
            onChange={(e) =>
              updateConfig({
                component: e.target.value as PlaygroundComponent,
                variant: e.target.value === "Button" ? "primary" : "default",
              })
            }
            options={[
              { label: "Button", value: "Button" },
              { label: "Badge", value: "Badge" },
            ]}
          />

          <Select
            label="Variant"
            value={config.variant}
            onChange={(e) => updateConfig({ variant: e.target.value })}
            options={availableVariants.map((v) => ({ label: v, value: v }))}
          />

          {config.component === "Button" && (
            <Select
              label="Size"
              value={config.size}
              onChange={(e) => updateConfig({ size: e.target.value as ButtonSize })}
              options={[
                { label: "sm", value: "sm" },
                { label: "md", value: "md" },
                { label: "lg", value: "lg" },
              ]}
            />
          )}

          {config.component === "Button" && (
            <Checkbox
              label="Disabled"
              checked={config.disabled}
              onChange={(e) => updateConfig({ disabled: e.target.checked })}
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-card p-8">
            {config.component === "Button" ? (
              <Button variant={config.variant as ButtonVariant} size={config.size} disabled={config.disabled}>
                {config.label}
              </Button>
            ) : (
              <Badge variant={config.variant as BadgeVariant}>{config.label}</Badge>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Generated code</p>
            <CodeBlock code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
