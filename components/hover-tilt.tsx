"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import TiltedCard from "./tilted-card";

// Tilt only for a real, precise hover pointer and only when motion is welcome.
// Everywhere else (phones, tablets, reduced motion) the photo is rendered as a plain static frame.
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const canTilt = () => window.matchMedia(QUERY).matches;

type HoverTiltProps = { aspect: string; radius?: number; children: ReactNode; className?: string };

export function HoverTilt({ aspect, radius = 20, children, className = "" }: HoverTiltProps) {
  const tilt = useSyncExternalStore(subscribe, canTilt, () => false);
  const frame = { aspectRatio: aspect, width: "100%" };

  if (!tilt) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ ...frame, borderRadius: radius }}>
        {children}
      </div>
    );
  }
  return (
    <TiltedCard
      className={className}
      containerWidth="100%"
      containerHeight="auto"
      imageWidth="100%"
      imageHeight="100%"
      radius={radius}
      rotateAmplitude={5}
      scaleOnHover={1.02}
      glare={0.4}
      shadow={0.3}
      parallax={0}
      showTooltip={false}
      intro={false}
      floating={false}
      gyroscope={false}
      style={frame}
    >
      {children}
    </TiltedCard>
  );
}
