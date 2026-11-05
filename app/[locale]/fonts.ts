import { Inter, Noto_Sans_Devanagari, Poppins, Tiro_Devanagari_Hindi } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const notoDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-deva",
  display: "swap",
});

// Tiro ships a single weight; headings use it at 400 rather than synthesised bold.
export const tiro = Tiro_Devanagari_Hindi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: "600",
  variable: "--font-poppins",
  display: "swap",
});

export const fontVariables = [inter, notoDeva, tiro, poppins].map((f) => f.variable).join(" ");
