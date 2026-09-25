export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: "Actions" | "Inputs" | "Overlays" | "Navigation" | "Feedback" | "Layout";
  props: PropDoc[];
  accessibility: string[];
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    description: "The primary action element, used for form submission, dialogs, and standalone actions.",
    category: "Actions",
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"primary"', description: "Visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls height, padding, and font size." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a spinner and disables the button." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "onClick", type: "(event) => void", description: "Called when the button is activated." },
      { name: "children", type: "ReactNode", description: "Button label content." },
    ],
    accessibility: [
      "Renders a native <button> element, so it is focusable and activatable by keyboard by default.",
      "Focus is always visible via a ring, never suppressed.",
      "isLoading sets disabled so the action cannot be triggered twice.",
    ],
  },
  {
    slug: "input",
    name: "Input",
    description: "A labeled text field for single-line user input.",
    category: "Inputs",
    props: [
      { name: "label", type: "string", description: "Visible label rendered above the field." },
      { name: "helperText", type: "string", description: "Supporting text shown below the field." },
      { name: "errorText", type: "string", description: "Error message; also sets aria-invalid." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
    ],
    accessibility: [
      "label is associated with the field via htmlFor / id, generated automatically with useId when not supplied.",
      "Helper and error text are linked with aria-describedby.",
      "aria-invalid is set automatically when errorText is present.",
    ],
  },
  {
    slug: "modal",
    name: "Modal",
    description: "An overlay dialog for focused tasks or confirmations, rendered in a portal.",
    category: "Overlays",
    props: [
      { name: "isOpen", type: "boolean", description: "Whether the modal is visible." },
      { name: "onClose", type: "() => void", description: "Called on Escape, overlay click, or the close button." },
      { name: "title", type: "string", description: "Rendered in the header and used as the accessible name." },
      { name: "children", type: "ReactNode", description: "Modal body content." },
      { name: "footer", type: "ReactNode", description: "Optional footer, typically action buttons." },
    ],
    accessibility: [
      'role="dialog" and aria-modal="true" mark the overlay for assistive technology.',
      "Focus moves into the dialog on open and is trapped inside it with Tab / Shift+Tab.",
      "Escape closes the dialog; background scroll is locked while open.",
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Switches between panels of related content without leaving the page.",
    category: "Navigation",
    props: [
      { name: "defaultValue", type: "string", description: "id of the tab that is active by default." },
      { name: "Tabs.Trigger value", type: "string", description: "Identifies which panel a trigger controls." },
      { name: "Tabs.Panel value", type: "string", description: "Identifies which trigger a panel is controlled by." },
    ],
    accessibility: [
      'Triggers use role="tab" inside a role="tablist"; panels use role="tabpanel".',
      "Only the active trigger is in the tab order (roving tabindex via tabIndex={-1}/{0}).",
      "aria-selected and aria-controls keep the relationship explicit for screen readers.",
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    description: "A short-lived notification shown after an action, such as a save or an error.",
    category: "Feedback",
    props: [
      { name: "title", type: "string", description: "Primary message." },
      { name: "description", type: "string", description: "Optional supporting detail." },
      { name: "variant", type: '"success" | "error" | "info"', default: '"info"', description: "Determines the icon and color." },
    ],
    accessibility: [
      'Each toast uses role="status" and aria-live="polite" so it is announced without interrupting.',
      "Toasts auto-dismiss after 4 seconds and can also be dismissed manually.",
      "The dismiss button has an explicit aria-label.",
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "A bordered container for grouping related content, composed of Header, Title, Description, and Content.",
    category: "Layout",
    props: [
      { name: "className", type: "string", description: "Extra classes applied to the outer container." },
      { name: "children", type: "ReactNode", description: "Card.Header, Card.Content, or any content." },
    ],
    accessibility: [
      "Card is a plain, semantic container — it carries no implicit ARIA role.",
      "Use a real heading element inside Card.Title so the section is navigable by screen reader users.",
    ],
  },
];

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find((doc) => doc.slug === slug);
}
