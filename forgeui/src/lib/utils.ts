/**
 * Joins class names together, filtering out falsy values.
 * A small, dependency-free stand-in for `clsx`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
