import { cn } from "@/lib/utils";

/**
 * Film-grain overlay.  Pairs with MeshAurora to break up banding in
 * large blurred gradients and give the surface a "shot on film" feel.
 */
export function NoiseTexture({
  className,
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className,
      )}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.18 0'/></filter><rect width='260' height='260' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
