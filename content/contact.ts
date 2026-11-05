import type { Locale } from "@/lib/i18n";
import type { Topic } from "@/lib/contact-topics";

export type ContactContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; note: string };
  details: { email: string; phone: string; whatsapp: string; address: string };
  form: {
    name: string;
    email: string;
    phone: string;
    optional: string;
    topic: string;
    topics: Record<Topic, string>;
    message: string;
    submit: string;
    sending: string;
  };
  errors: { name: string; email: string; phone: string; topic: string; message: string; rate: string; send: string };
  success: { title: string; body: string };
};

const en: ContactContent = {
  meta: {
    title: "Contact",
    description: "Write to Dipesh Mishra's office about partnerships, youth counselling, business advisory, the iYouth Store or media.",
  },
  hero: {
    kicker: "Contact",
    title: "Let's work together",
    note: "We welcome collaborations, partnerships and ideas that empower youth, entrepreneurship, leadership and social development.",
  },
  details: { email: "Email", phone: "Phone", whatsapp: "WhatsApp", address: "Address" },
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    topic: "Topic",
    topics: {
      partnership: "Partnership",
      counselling: "Counselling",
      advisory: "Business advisory",
      store: "iYouth Store",
      media: "Media",
      other: "Other",
    },
    message: "Message",
    submit: "Send message",
    sending: "Sending…",
  },
  errors: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number, or leave it empty.",
    topic: "Please choose a topic.",
    message: "Please write at least 10 characters.",
    rate: "Too many messages from this connection. Please try again in an hour.",
    send: "We could not send your message. Please try again, or write to us by email.",
  },
  success: { title: "Thank you.", body: "Dipesh's office will reply within 2 working days." },
};

const hi: ContactContent = {
  meta: {
    title: "संपर्क",
    description: "साझेदारी, युवा परामर्श, व्यवसाय सलाह, आईयूथ स्टोर या मीडिया के बारे में दीपेश मिश्रा के कार्यालय को लिखें।",
  },
  hero: {
    kicker: "संपर्क",
    title: "आइए, साथ काम करें",
    note: "हम ऐसे सहयोग, साझेदारियों और विचारों का स्वागत करते हैं जो युवाओं, उद्यमिता, नेतृत्व और सामाजिक विकास को सशक्त करें।",
  },
  details: { email: "ईमेल", phone: "फ़ोन", whatsapp: "व्हाट्सऐप", address: "पता" },
  form: {
    name: "नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    optional: "वैकल्पिक",
    topic: "विषय",
    topics: {
      partnership: "साझेदारी",
      counselling: "परामर्श",
      advisory: "व्यवसाय सलाह",
      store: "आईयूथ स्टोर",
      media: "मीडिया",
      other: "अन्य",
    },
    message: "संदेश",
    submit: "संदेश भेजें",
    sending: "भेजा जा रहा है…",
  },
  errors: {
    name: "कृपया अपना नाम लिखें।",
    email: "कृपया सही ईमेल पता लिखें।",
    phone: "कृपया सही फ़ोन नंबर लिखें, या खाली छोड़ दें।",
    topic: "कृपया एक विषय चुनें।",
    message: "कृपया कम से कम 10 अक्षर लिखें।",
    rate: "इस कनेक्शन से बहुत अधिक संदेश आ चुके हैं। कृपया एक घंटे बाद फिर कोशिश करें।",
    send: "आपका संदेश भेजा नहीं जा सका। कृपया फिर कोशिश करें, या हमें ईमेल करें।",
  },
  success: { title: "धन्यवाद।", body: "दीपेश के कार्यालय से 2 कार्य दिवसों के भीतर आपको उत्तर मिलेगा।" },
};

export const contactContent: Record<Locale, ContactContent> = { en, hi };
