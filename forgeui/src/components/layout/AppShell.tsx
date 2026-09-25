import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { cn } from "../../lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuToggle={() => setIsMobileNavOpen((v) => !v)} isMenuOpen={isMobileNavOpen} />

      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <aside
          className={cn(
            "w-60 shrink-0 border-r border-border md:sticky md:top-14 md:block md:h-[calc(100vh-3.5rem)]",
            isMobileNavOpen
              ? "block fixed inset-x-0 top-14 z-30 h-[calc(100vh-3.5rem)] bg-background"
              : "hidden"
          )}
        >
          <Sidebar onNavigate={() => setIsMobileNavOpen(false)} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
