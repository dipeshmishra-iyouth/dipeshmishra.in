import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

const COOKIE = "NEXT_LOCALE";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return;

  const saved = request.cookies.get(COOKIE)?.value ?? "";
  const prefersHindi = /^hi\b/i.test(request.headers.get("accept-language") ?? "");
  const locale = isLocale(saved) ? saved : prefersHindi ? "hi" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the image optimiser and any file with an extension.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
