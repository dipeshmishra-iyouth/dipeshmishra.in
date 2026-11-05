import type { Locale } from "@/lib/i18n";

// Services as listed on the previous site.
export type ServiceCard = {
  id: "counselling" | "advisory";
  title: string;
  lead: string;
  items: string[];
  extraTitle: string;
  extra: string[];
  cta: string;
};

export type ServicesContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; note: string; photoAlt: string };
  cards: ServiceCard[];
};

const en: ServicesContent = {
  meta: {
    title: "Services",
    description: "Free youth counselling and entrepreneur advisory with Dipesh Mishra: career clarity, skill pathways, business models and growth roadmaps.",
  },
  hero: {
    kicker: "Services",
    title: "Free counselling and business advisory",
    note: "Support for youth finding their direction and entrepreneurs building their business.",
    photoAlt: "Dipesh Mishra speaking to a group",
  },
  cards: [
    {
      id: "counselling",
      title: "Free Youth Counselling",
      lead: "Guidance at the right time changes life direction.",
      items: [
        "Career clarity",
        "Skill pathway identification",
        "Entrepreneurship awareness",
        "Personal confidence building",
        "Leadership development",
        "Motivation and goal setting",
        "Social responsibility",
        "Safety awareness",
      ],
      extraTitle: "Ways to take part",
      extra: ["One-on-one session", "Group workshop", "Online", "Offline"],
      cta: "Ask for counselling",
    },
    {
      id: "advisory",
      title: "Entrepreneur Advisory & Business Consulting",
      lead: "Support for entrepreneurs at different stages.",
      items: [
        "Idea validation",
        "Business model structuring",
        "Brand development strategy",
        "Manufacturing and white-label guidance",
        "Distribution network planning",
        "Growth and expansion roadmap",
        "Rural and micro-enterprise setup",
      ],
      extraTitle: "Business coaching includes",
      extra: ["Strategic planning", "Execution framework", "Market positioning", "System and process building", "Long-term growth strategy"],
      cta: "Ask for advisory",
    },
  ],
};

const hi: ServicesContent = {
  meta: {
    title: "सेवाएँ",
    description: "दीपेश मिश्रा के साथ निःशुल्क युवा परामर्श और उद्यमी सलाह: करियर की स्पष्टता, कौशल की राह, व्यवसाय मॉडल और विकास की रूपरेखा।",
  },
  hero: {
    kicker: "सेवाएँ",
    title: "निःशुल्क परामर्श और व्यवसाय सलाह",
    note: "अपनी दिशा खोजते युवाओं और अपना व्यवसाय खड़ा करते उद्यमियों के लिए सहयोग।",
    photoAlt: "समूह से बात करते हुए दीपेश मिश्रा",
  },
  cards: [
    {
      id: "counselling",
      title: "निःशुल्क युवा परामर्श",
      lead: "सही समय पर मिला मार्गदर्शन जीवन की दिशा बदल देता है।",
      items: [
        "करियर की स्पष्टता",
        "कौशल की राह की पहचान",
        "उद्यमिता जागरूकता",
        "आत्मविश्वास निर्माण",
        "नेतृत्व विकास",
        "प्रेरणा और लक्ष्य निर्धारण",
        "सामाजिक दायित्व",
        "सुरक्षा जागरूकता",
      ],
      extraTitle: "जुड़ने के तरीके",
      extra: ["एक-से-एक सत्र", "समूह कार्यशाला", "ऑनलाइन", "ऑफलाइन"],
      cta: "परामर्श के लिए लिखें",
    },
    {
      id: "advisory",
      title: "उद्यमी सलाह और व्यवसाय परामर्श",
      lead: "अलग-अलग पड़ाव पर उद्यमियों का साथ।",
      items: [
        "स्टार्टअप विचार की जाँच",
        "व्यवसाय मॉडल की रूपरेखा",
        "ब्रांड विकास रणनीति",
        "निर्माण और व्हाइट-लेबल मार्गदर्शन",
        "वितरण नेटवर्क की योजना",
        "विकास और विस्तार की रूपरेखा",
        "ग्रामीण और सूक्ष्म उद्यम की शुरुआत",
      ],
      extraTitle: "व्यवसाय कोचिंग में शामिल",
      extra: ["रणनीतिक योजना", "क्रियान्वयन ढाँचा", "बाज़ार में स्थिति", "प्रणाली और प्रक्रिया निर्माण", "दीर्घकालिक विकास रणनीति"],
      cta: "सलाह के लिए लिखें",
    },
  ],
};

export const servicesContent: Record<Locale, ServicesContent> = { en, hi };
