import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Card — a bordered content container.
 *
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Usage</Card.Title>
 *     <Card.Description>Requests this month</Card.Description>
 *   </Card.Header>
 *   <Card.Content>1,204 / 5,000</Card.Content>
 * </Card>
 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Header({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 border-b border-border p-4", className)} {...props}>
      {children}
    </div>
  );
}

function Title({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-semibold text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

function Description({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

function Content({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 text-sm text-foreground", className)} {...props}>
      {children}
    </div>
  );
}

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
