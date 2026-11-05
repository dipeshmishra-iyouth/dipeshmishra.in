import { facts } from "@/lib/facts";
import { MessageIcon } from "./icons";

/** The site's only floating element. */
export function WhatsAppFab({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${facts.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fab-ping fixed bottom-5 right-5 z-30 inline-flex size-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition-transform duration-[var(--duration-fast)] hover:scale-105 active:scale-95"
    >
      <MessageIcon size={24} />
    </a>
  );
}
