import { CheckCircle2, X, XCircle, Info } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { ToastItem } from "../../../hooks/useToast";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const iconColors = {
  success: "text-emerald-500",
  error: "text-destructive",
  info: "text-primary",
};

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

/** A single toast notification. Rendered by <ToastViewport>. */
export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = icons[toast.variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-lg",
        "animate-in"
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColors[toast.variant])} aria-hidden="true" />
      <div className="flex-1 text-sm">
        <p className="font-medium text-foreground">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-muted-foreground">{toast.description}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
