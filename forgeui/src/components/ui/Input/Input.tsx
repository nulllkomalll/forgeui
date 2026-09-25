import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "../../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label rendered above the field. */
  label?: string;
  /** Helper text shown below the field. */
  helperText?: string;
  /** Marks the field as invalid and shows the message in the destructive color. */
  errorText?: string;
}

/**
 * Input — a labeled text field.
 *
 * <Input label="Email" placeholder="you@example.com" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, errorText, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const describedBy = errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!errorText}
          aria-describedby={describedBy}
          className={cn(
            "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:opacity-50 disabled:pointer-events-none",
            errorText && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {errorText ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-destructive">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
