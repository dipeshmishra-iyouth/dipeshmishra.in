import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface MagnetProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  maxOffset?: number;
  exclusive?: boolean;
  axis?: "both" | "x" | "y";
  tilt?: number;
  scale?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  onActiveChange?: (active: boolean) => void;
  wrapperClassName?: string;
  innerClassName?: string;
  style?: CSSProperties;
}

declare const Magnet: (props: MagnetProps) => ReactNode;
export default Magnet;
