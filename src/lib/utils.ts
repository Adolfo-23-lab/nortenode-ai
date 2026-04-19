import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — merge Tailwind classes with correct precedence.
 * Standard shadcn/ui helper.  Used across every primitive + motion
 * component so variants + overrides collapse cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
