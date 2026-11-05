// Institution logos in public/media; dimensions are the files' own so next/image reserves the right box.
export const LOGOS = {
  iyouth: { src: "/media/logo-iyouth.webp", alt: "iYouth Pvt. Ltd. logo", width: 482, height: 256 },
  cyf: { src: "/media/logo-cyf.webp", alt: "Chhattisgarh Youth Federation logo", width: 500, height: 453 },
  casa: { src: "/media/logo-casa.webp", alt: "Chhattisgarh Adventure Sports Association logo", width: 500, height: 535 },
} as const;

export type LogoId = keyof typeof LOGOS;
