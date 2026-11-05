import { notFound } from "next/navigation";

// Any unknown path under a locale lands here so it renders the localized not-found page with a 404 status.
export default function UnknownPath() {
  notFound();
}
