import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const componentLinks = [
  { to: "/components/button", label: "Button" },
  { to: "/components/input", label: "Input" },
  { to: "/components/modal", label: "Modal" },
  { to: "/components/tabs", label: "Tabs" },
  { to: "/components/toast", label: "Toast" },
  { to: "/components/card", label: "Card" },
];

function NavItem({ to, children, end }: { to: string; children: ReactNode; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "block rounded-md px-3 py-1.5 text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Documentation" className="flex h-full flex-col gap-6 overflow-y-auto p-4" onClick={onNavigate}>
      <div>
        <NavItem to="/components" end>
          Overview
        </NavItem>
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">Components</p>
        <div className="flex flex-col gap-0.5">
          {componentLinks.map((link) => (
            <NavItem key={link.to} to={link.to}>
              {link.label}
            </NavItem>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <NavItem to="/playground">Playground</NavItem>
        <NavItem to="/about">About</NavItem>
      </div>
    </nav>
  );
}
