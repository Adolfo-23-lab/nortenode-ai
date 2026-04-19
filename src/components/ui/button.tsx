import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[var(--color-signal-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] " +
  "disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-signal-500)] text-white shadow-[0_10px_40px_-12px_rgba(47,130,247,0.55)] hover:bg-[var(--color-signal-400)] hover:shadow-[0_14px_50px_-10px_rgba(47,130,247,0.7)] active:scale-[0.98]",
        outline:
          "border border-white/12 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/20",
        ghost:
          "text-white/80 hover:text-white hover:bg-white/[0.06]",
        glass:
          "bg-white/[0.06] text-white border border-white/12 backdrop-blur-xl hover:bg-white/[0.1] hover:border-white/20",
        ember:
          "bg-[var(--color-ember-500)] text-[var(--color-ink-0)] hover:bg-[var(--color-ember-400)] shadow-[0_10px_40px_-12px_rgba(240,106,46,0.55)]",
        subtle:
          "bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-12 px-7 text-base",
        xl:      "h-14 px-9 text-base font-semibold",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
