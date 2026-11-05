"use client";

import { useActionState } from "react";
import { sendContact } from "@/app/actions/contact";
import type { ContactContent } from "@/content/contact";
import { TOPICS, type ContactField, type ContactState, type Topic } from "@/lib/contact-topics";

type ContactFormProps = { copy: Pick<ContactContent, "form" | "errors" | "success">; initialTopic: Topic };

const INPUT =
  "mt-1 block min-h-11 w-full rounded-xl border border-ink-400 bg-white px-4 py-2 text-ink-900 transition-colors duration-[var(--duration-quick)] hover:border-ink-700 focus:border-saffron-700 aria-[invalid=true]:animate-[field-shake_300ms_ease-in-out] aria-[invalid=true]:border-saffron-800 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-saffron-800";

const IDLE: ContactState = { status: "idle" };

export function ContactForm({ copy, initialTopic }: ContactFormProps) {
  const [state, action, pending] = useActionState(sendContact, IDLE);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-peach-50 p-8">
        <svg className="check-draw mb-4 size-14 text-teal-700" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="24" cy="24" r="21" />
          <polyline points="14 25 21 32 34 17" />
        </svg>
        <p className="font-serif text-display-m text-ink-900">{copy.success.title}</p>
        <p className="mt-2 text-lg">{copy.success.body}</p>
      </div>
    );
  }

  const failed = state.status === "error" ? state : undefined;
  const value = (key: string) => failed?.values[key] ?? "";
  const invalid = (field: ContactField) => failed?.fields.includes(field) ?? false;
  const note = (field: ContactField) =>
    invalid(field) && (
      <p id={`${field}-err`} role="alert" className="mt-1 text-sm font-semibold text-saffron-800">
        {copy.errors[field]}
      </p>
    );
  const a11y = (field: ContactField) => ({ "aria-invalid": invalid(field), "aria-describedby": invalid(field) ? `${field}-err` : undefined });

  return (
    <form action={action} noValidate className="space-y-5 rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8">
      <div>
        <label htmlFor="name" className="font-semibold text-ink-900">
          {copy.form.name}
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={80} defaultValue={value("name")} className={INPUT} {...a11y("name")} />
        {note("name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="font-semibold text-ink-900">
            {copy.form.email}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={120} defaultValue={value("email")} className={INPUT} {...a11y("email")} />
          {note("email")}
        </div>
        <div>
          <label htmlFor="phone" className="font-semibold text-ink-900">
            {copy.form.phone} <span className="font-normal text-ink-500">({copy.form.optional})</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={20} defaultValue={value("phone")} className={INPUT} {...a11y("phone")} />
          {note("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="topic" className="font-semibold text-ink-900">
          {copy.form.topic}
        </label>
        <select id="topic" name="topic" defaultValue={value("topic") || initialTopic} className={INPUT} {...a11y("topic")}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {copy.form.topics[topic]}
            </option>
          ))}
        </select>
        {note("topic")}
      </div>
      <div>
        <label htmlFor="message" className="font-semibold text-ink-900">
          {copy.form.message}
        </label>
        <textarea id="message" name="message" rows={6} required minLength={10} maxLength={2000} defaultValue={value("message")} className={INPUT} {...a11y("message")} />
        {note("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {failed?.reason && (
        <p role="alert" className="font-semibold text-saffron-800">
          {copy.errors[failed.reason]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-saffron-700 px-6 py-3 text-[15px] font-semibold text-white transition-[background-color,transform] duration-[var(--duration-quick)] hover:bg-saffron-800 active:scale-[0.98] disabled:opacity-60"
      >
        {pending && <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-full border-2 border-white/40 border-t-white motion-safe:animate-spin" />}
        {pending ? copy.form.sending : copy.form.submit}
      </button>
    </form>
  );
}
