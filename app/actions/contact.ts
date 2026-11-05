"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/contact-schema";
import type { ContactField, ContactState } from "@/lib/contact-topics";
import { facts } from "@/lib/facts";
import { allow } from "@/lib/rate-limit";

const FIELDS = ["name", "email", "phone", "topic", "message"] as const;
const DEFAULT_FROM = "Website <noreply@send.dipeshmishra.in>";

const read = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

async function deliver(values: Record<string, string>): Promise<boolean> {
  const to = process.env.CONTACT_TO ?? facts.email;
  const subject = `Website enquiry (${values.topic}) from ${values.name.replace(/\s+/g, " ")}`;
  const text = [`Name: ${values.name}`, `Email: ${values.email}`, `Phone: ${values.phone || "-"}`, `Topic: ${values.topic}`, "", values.message].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      console.error("Contact form: RESEND_API_KEY is not set");
      return false;
    }
    console.info(`[contact:dev] to ${to}\n${subject}\n${text}`);
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM ?? DEFAULT_FROM, to: [to], reply_to: values.email, subject, text }),
  });
  if (!res.ok) console.error(`Contact form: Resend answered ${res.status}`);
  return res.ok;
}

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden field. Answer "sent" so they learn nothing.
  if (read(data, "website")) return { status: "sent" };

  const values = Object.fromEntries(FIELDS.map((f) => [f, read(data, f)]));
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => i.path[0] as ContactField))];
    return { status: "error", fields, values };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allow(ip)) return { status: "error", fields: [], reason: "rate", values };

  return (await deliver(parsed.data)) ? { status: "sent" } : { status: "error", fields: [], reason: "send", values };
}
