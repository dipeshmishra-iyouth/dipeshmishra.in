// Zod-free pieces of the contact form, so the client bundle does not carry the validator.
export const TOPICS = ["partnership", "counselling", "advisory", "store", "media", "other"] as const;
export type Topic = (typeof TOPICS)[number];

export const isTopic = (value: unknown): value is Topic => TOPICS.includes(value as Topic);

export type ContactField = "name" | "email" | "phone" | "topic" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; fields: ContactField[]; reason?: "rate" | "send"; values: Record<string, string> };
