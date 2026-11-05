"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Starts the write-on animation only once the signature has actually loaded, so it never just pops in. */
export function SignatureInk({ className }: { className: string }) {
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // A preloaded or cached image can finish before hydration, when onLoad has already been missed.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <Image
      src="/media/signature.webp"
      alt=""
      width={1081}
      height={325}
      ref={img}
      priority
      onLoad={() => setLoaded(true)}
      data-loaded={loaded || undefined}
      className={`sig-draw ${className}`}
    />
  );
}
