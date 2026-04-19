import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.04] text-white/80",
        signal:  "border-[color:var(--color-signal-500)]/40 bg-[color:var(--color-signal-500)]/10 text-[color:var(--color-signal-300)]",
        ember:   "border-[color:var(--color-ember-500)]/40 bg-[color:var(--color-ember-500)]/10 text-[color:var(--color-ember-400)]",
        jade:    "border-[color:var(--color-jade-500)]/40 bg-[color:var(--color-jade-500)]/10 text-[color:var(--color-jade-400)]",
        outline: "border-white/16 text-white/80",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
