import type { Locale } from "@/lib/i18n";

export type NotFoundContent = { title: string; body: string; home: string; contact: string };

export const notFoundContent: Record<Locale, NotFoundContent> = {
  en: {
    title: "Page not found",
    body: "The page may have moved, or the link may be mistyped. Start from the home page, or write to us.",
    home: "Back to home",
    contact: "Contact",
  },
  hi: {
    title: "पेज नहीं मिला",
    body: "यह पेज हट गया होगा, या लिंक में कोई अक्षर गलत होगा। मुख्य पृष्ठ से शुरू करें, या हमें लिखें।",
    home: "मुख्य पृष्ठ पर जाएँ",
    contact: "संपर्क करें",
  },
};
