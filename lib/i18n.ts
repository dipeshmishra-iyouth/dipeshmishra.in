export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Swap the leading locale segment of a pathname, e.g. /en/about -> /hi/about. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = isLocale(first ?? "") ? rest : [first, ...rest].filter(Boolean);
  return `/${[to, ...tail].join("/")}`.replace(/\/$/, "") || `/${to}`;
}
