import { db, initSchema } from "./index";
import type { ComponentDoc } from "../types";

// Mirrors the frontend's componentDocs.ts — this is the source of truth
// once the backend is running; the frontend's local copy is its offline fallback.
const componentDocs: ComponentDoc[] = [
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
    ],
    accessibility: [
      "label is associated with the field via htmlFor / id.",
      "Helper and error text are linked with aria-describedby.",
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
    ],
    accessibility: [
      'role="dialog" and aria-modal="true" mark the overlay for assistive technology.',
      "Focus moves into the dialog on open and is trapped inside it with Tab / Shift+Tab.",
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Switches between panels of related content without leaving the page.",
    category: "Navigation",
    props: [
      { name: "defaultValue", type: "string", description: "id of the tab that is active by default." },
    ],
    accessibility: [
      'Triggers use role="tab" inside a role="tablist"; panels use role="tabpanel".',
      "Only the active trigger is in the tab order (roving tabindex).",
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    description: "A short-lived notification shown after an action, such as a save or an error.",
    category: "Feedback",
    props: [
      { name: "title", type: "string", description: "Primary message." },
      { name: "variant", type: '"success" | "error" | "info"', default: '"info"', description: "Determines the icon and color." },
    ],
    accessibility: [
      'Each toast uses role="status" and aria-live="polite" so it is announced without interrupting.',
      "Toasts auto-dismiss after 4 seconds and can also be dismissed manually.",
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "A bordered container for grouping related content, composed of Header, Title, Description, and Content.",
    category: "Layout",
    props: [
      { name: "className", type: "string", description: "Extra classes applied to the outer container." },
    ],
    accessibility: [
      "Card is a plain, semantic container — it carries no implicit ARIA role.",
    ],
  },
];

function seed() {
  initSchema();

  const insert = db.prepare(`
    INSERT INTO components (slug, name, description, category, props_json, accessibility_json)
    VALUES (@slug, @name, @description, @category, @props_json, @accessibility_json)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      category = excluded.category,
      props_json = excluded.props_json,
      accessibility_json = excluded.accessibility_json
  `);

  const insertMany = db.transaction((docs: ComponentDoc[]) => {
    for (const doc of docs) {
      insert.run({
        slug: doc.slug,
        name: doc.name,
        description: doc.description,
        category: doc.category,
        props_json: JSON.stringify(doc.props),
        accessibility_json: JSON.stringify(doc.accessibility),
      });
    }
  });

  insertMany(componentDocs);
  console.log(`Seeded ${componentDocs.length} components into ${process.env.DB_PATH ?? "./data/forgeui.db"}`);
}

seed();
