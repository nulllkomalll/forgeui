import { useCallback, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

export type ShowToastInput = Omit<ToastItem, "id">;

/**
 * useToast — local, in-memory toast queue.
 *
 * const { toasts, showToast, dismissToast } = useToast();
 * showToast({ title: "Saved", variant: "success" });
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (input: ShowToastInput) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...input, id }]);
      window.setTimeout(() => dismissToast(id), 4000);
    },
    [dismissToast]
  );

  return { toasts, showToast, dismissToast };
}
