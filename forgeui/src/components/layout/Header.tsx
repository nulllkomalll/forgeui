import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Flame, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "../../lib/utils";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("forgeui-theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("forgeui-theme", theme);
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")) };
}

export function Header({ onMenuToggle, isMenuOpen }: { onMenuToggle: () => void; isMenuOpen: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-md p-1.5 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="flex items-center gap-1.5 font-semibold text-foreground">
          <Flame className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
          ForgeUI
        </Link>
      </div>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {[
          { to: "/components", label: "Components" },
          { to: "/playground", label: "Playground" },
          { to: "/about", label: "About" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleTheme}
        className="rounded-md p-1.5 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </header>
  );
}
