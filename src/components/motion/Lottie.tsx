"use client";

import dynamic from "next/dynamic";
import * as React from "react";

// lottie-react has to run client-side because it touches `window`.
// Dynamic import with SSR disabled keeps the server bundle small and
// prevents hydration mismatches.
const LottiePlayer = dynamic(() => import("lottie-react"), { ssr: false });

export interface LottieProps {
  /** URL to a Lottie JSON under `/public/assets/`. */
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Lottie({
  src,
  loop = true,
  autoplay = true,
  className,
  style,
}: LottieProps) {
  const [data, setData] = React.useState<unknown>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setData(json); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [src]);

  if (!data) {
    return <div className={className} style={style} aria-hidden="true" />;
  }

  return (
    <LottiePlayer
      animationData={data}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
}
