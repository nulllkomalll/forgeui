import { ReactNode, createContext, useContext, useId, useState } from "react";
import { cn } from "../../../lib/utils";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* components must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps {
  /** id of the tab that is active by default (uncontrolled). */
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

/**
 * Tabs — a set of switchable panels.
 *
 * <Tabs defaultValue="preview">
 *   <Tabs.List>
 *     <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
 *     <Tabs.Trigger value="code">Code</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Panel value="preview">...</Tabs.Panel>
 *   <Tabs.Panel value="code">...</Tabs.Panel>
 * </Tabs>
 */
export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function List({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="tablist" className={cn("flex gap-1 border-b border-border", className)}>
      {children}
    </div>
  );
}

function Trigger({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      className={cn(
        "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
        isActive
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function Panel({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab, baseId } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className="pt-4 focus-visible:outline-none"
    >
      {children}
    </div>
  );
}

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;
