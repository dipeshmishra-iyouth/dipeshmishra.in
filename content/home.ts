import type { Locale } from "@/lib/i18n";
import type { BrochureLabels } from "@/components/brochure-book";

// Home page copy; numbers live in lib/facts.ts.
export type HomeContent = {
  hero: {
    role: string;
    orgs: string;
    quote: string;
    portraitAlt: string;
    partner: string;
    explore: string;
  };
  proof: { id: string; value: string; label: string }[];
  ventures: {
    kicker: string;
    title: string;
    note: string;
    more: string;
    cards: { id: string; title: string; body: string; href: string }[];
  };
  store: {
    kicker: string;
    title: string;
    note: string;
    cards: string[];
    open: string;
    story: string;
    photoAlt: string;
    brochureAlt: string;
    meetingCaption: string;
    brochureCaption: string;
    brochureLabels: BrochureLabels;
  };
  bento: {
    kicker: string;
    title: string;
    quoteLabel: string;
    equation: string;
    manLabel: string;
    manTitle: string;
    manAlt: string;
    watchLabel: string;
    watchTitle: string;
    servicesLabel: string;
    servicesTitle: string;
  };
  platforms: { kicker: string; title: string; items: Record<string, string> };
  watch: { kicker: string; title: string; note: string; videos: string[] };
  vision: { kicker: string; title: string; phases: string[]; link: string };
  connect: { title: string; body: string; cta: string; ribbon: string; photoAlt: string };
};

const en: HomeContent = {
  hero: {
    role: "Founder & CEO, iYouth Pvt. Ltd.",
    orgs: "Founder, Chhattisgarh Youth Federation and Chhattisgarh Adventure Sports Association",
    quote: "Youth are not just the future of India — they are the driving force of India's present growth story.",
    portraitAlt: "Portrait of Dipesh Mishra",
    partner: "Partner with us",
    explore: "Explore the ventures",
  },
  proof: [
    { id: "stores", value: "30+", label: "live iYouth Stores" },
    { id: "since", value: "2012", label: "working with Chhattisgarh's youth since" },
    { id: "institutions", value: "3", label: "institutions founded" },
    { id: "platforms", value: "9", label: "youth platforms, 4 of them live" },
  ],
  ventures: {
    kicker: "Ventures",
    title: "Building India's Youth Economy",
    note: "One mission, three institutions: youth who are skilled, safe and self-reliant.",
    more: "Read more",
    cards: [
      {
        id: "iyouth",
        title: "#iYouthPvtLtd",
        body: "A youth-driven enterprise that creates employment, self-employment and local manufacturing. Founded 2026.",
        href: "ventures#iyouth",
      },
      {
        id: "cyf",
        title: "#ChhattisgarhYouthFederation",
        body: "Skill development, leadership and safety awareness for youth across Chhattisgarh. Founded 2012.",
        href: "ventures#cyf",
      },
      {
        id: "casa",
        title: "#AdventureSportsAssociation",
        body: "Discipline, resilience and disaster readiness through structured adventure training. Founded 2012.",
        href: "ventures#casa",
      },
      {
        id: "movement",
        title: "#AatmanirbharYuva",
        body: "आत्मनिर्भर युवा – आत्मनिर्भर छत्तीसगढ़, the people's movement run by the Youth Federation.",
        href: "ventures#cyf",
      },
    ],
  },
  store: {
    kicker: "iYouth Store",
    title: "Your store, your business, your future",
    note: "A multi-category retail store model, proven by 30+ women-run stores in Bilaspur district, in partnership with District Administration, Bilaspur. Now open to everyone 18 and over.",
    cards: [
      "30+ live stores in Bilaspur district, run by women",
      "Open to village youth, women, city entrepreneurs, families and existing shopkeepers",
      "Two formats: Basic for ₹3.50 lakh, Standard for ₹5.00 lakh",
      "You choose your own stock on iyouthstore.in",
      "Training, marketing, supply and delivery support from iYouth",
    ],
    open: "Open an iYouth Store",
    story: "Read the full story",
    photoAlt: "Women and officials cutting a red ribbon at the District Co-ordination Centre",
    brochureAlt: "Cover of the iYouth Store brochure",
    meetingCaption: "Ribbon-cutting at the District Co-ordination Centre",
    brochureCaption: "The iYouth Store brochure",
    brochureLabels: {
      open: "Open the brochure",
      close: "Close the brochure",
      page: "Brochure page",
      prev: "Previous page",
      next: "Next page",
      download: "Download PDF (5 MB)",
      prompt: "The brochure is easiest to read as a PDF on your phone. Download it?",
      notNow: "Not now",
    },
  },
  bento: {
    kicker: "Dipesh Mishra",
    title: "One model, many ways in",
    quoteLabel: "The model",
    equation: "Youth + Skill + Safety + Enterprise + Leadership = Empowered Society",
    manLabel: "About",
    manTitle: "Who Dipesh Mishra is, and what he is building",
    manAlt: "Dipesh Mishra speaking at an event",
    watchLabel: "Watch",
    watchTitle: "Chhattisgarh Adventure Sports Association",
    servicesLabel: "Services",
    servicesTitle: "Free youth counselling and entrepreneur advisory",
  },
  platforms: {
    kicker: "The iYouth platforms",
    title: "Nine platforms, four of them live",
    items: {
      "iyouth.in": "Yuvaon ka Digital Manch: one home for opportunities, guidance and support.",
      "iyouthjob.in": "Hourly, freelance and project-based work for youth.",
      "iyouthstore.in": "Village franchise stores and a marketplace for youth-driven products.",
      "cgyouth.in": "Awareness, leadership and adventure programmes.",
      "iyoutheats.in": "Food and restaurant franchises for young entrepreneurs.",
      "iyouthnews.in": "Youth-focused news, opportunities and stories.",
      "iyouthfitness.in": "Fitness centres, yoga and wellness.",
      "iyouthskill.in": "Skills in technology, arts, music, dance and life.",
      "iyouthsiksha.in": "Education, digital learning and career guidance.",
    },
  },
  watch: {
    kicker: "Watch",
    title: "In the field",
    note: "Programmes and events from the Youth Federation, the Adventure Sports Association and iYouth.",
    videos: [
      "6 March 2026 · Chhattisgarh Youth Federation",
      "Chhattisgarh Adventure Sports Association",
      "6 March 2026 · iYouth",
    ],
  },
  vision: {
    kicker: "Vision 2030",
    title: "The four phases to 2030",
    phases: [
      "District-level skill and youth activation",
      "Enterprise and distribution expansion at state level",
      "A national youth enterprise network",
      "An integrated youth economic and leadership ecosystem",
    ],
    link: "See the full journey",
  },
  connect: {
    title: "Let's build a skilled, safe and self-reliant India together",
    body: "We welcome collaboration with government institutions, NGOs, manufacturers, investors, educational institutions and youth leaders.",
    cta: "Partner with us",
    ribbon: "Youth Skill Safety Enterprise Leadership",
    photoAlt: "Dipesh Mishra",
  },
};

const hi: HomeContent = {
  hero: {
    role: "संस्थापक एवं सीईओ, आईयूथ प्रा. लि.",
    orgs: "संस्थापक, छत्तीसगढ़ यूथ फेडरेशन एवं छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन",
    quote: "युवा सिर्फ़ भारत का भविष्य नहीं हैं — वे भारत की आज की विकास गाथा की प्रेरक शक्ति हैं।",
    portraitAlt: "दीपेश मिश्रा का चित्र",
    partner: "साथ जुड़ें",
    explore: "संस्थाओं को जानें",
  },
  proof: [
    { id: "stores", value: "30+", label: "चालू आईयूथ स्टोर" },
    { id: "since", value: "2012", label: "से छत्तीसगढ़ के युवाओं के साथ काम" },
    { id: "institutions", value: "3", label: "संस्थाओं की स्थापना" },
    { id: "platforms", value: "9", label: "युवा प्लेटफ़ॉर्म, जिनमें 4 चालू" },
  ],
  ventures: {
    kicker: "संस्थाएँ",
    title: "भारत की युवा अर्थव्यवस्था का निर्माण",
    note: "एक लक्ष्य, तीन संस्थाएँ: कुशल, सुरक्षित और आत्मनिर्भर युवा।",
    more: "और पढ़ें",
    cards: [
      {
        id: "iyouth",
        title: "#आईयूथ_प्रा_लि",
        body: "रोज़गार, स्वरोज़गार और स्थानीय निर्माण को बढ़ावा देने वाला युवा-संचालित उद्यम। स्थापना 2026।",
        href: "ventures#iyouth",
      },
      {
        id: "cyf",
        title: "#छत्तीसगढ़_यूथ_फेडरेशन",
        body: "छत्तीसगढ़ भर के युवाओं के लिए कौशल विकास, नेतृत्व और सुरक्षा जागरूकता। स्थापना 2012।",
        href: "ventures#cyf",
      },
      {
        id: "casa",
        title: "#एडवेंचर_स्पोर्ट्स_एसोसिएशन",
        body: "संरचित एडवेंचर प्रशिक्षण से अनुशासन, दृढ़ता और आपदा-तत्परता। स्थापना 2012।",
        href: "ventures#casa",
      },
      {
        id: "movement",
        title: "#आत्मनिर्भर_युवा",
        body: "आत्मनिर्भर युवा – आत्मनिर्भर छत्तीसगढ़, यूथ फेडरेशन द्वारा संचालित जन-अभियान।",
        href: "ventures#cyf",
      },
    ],
  },
  store: {
    kicker: "आईयूथ स्टोर",
    title: "अपना स्टोर • अपना व्यवसाय • अपना भविष्य",
    note: "मल्टी-कैटेगरी रिटेल स्टोर मॉडल, जिसे बिलासपुर जिले में महिलाओं द्वारा संचालित 30+ स्टोर ने सिद्ध किया है, जिला प्रशासन, बिलासपुर के साथ साझेदारी में। अब 18 वर्ष या उससे अधिक हर किसी के लिए।",
    cards: [
      "बिलासपुर जिले में महिलाओं द्वारा संचालित 30+ सक्रिय स्टोर",
      "गाँव के युवा, महिलाएँ, शहरी उद्यमी, परिवार और मौजूदा दुकानदार, सभी के लिए",
      "दो फॉर्मेट: बेसिक ₹3.50 लाख, स्टैंडर्ड ₹5.00 लाख",
      "अपना स्टॉक आप खुद iyouthstore.in पर चुनें",
      "iYouth से प्रशिक्षण, मार्केटिंग, आपूर्ति और डिलीवरी सहयोग",
    ],
    open: "आईयूथ स्टोर खोलें",
    story: "पूरी कहानी पढ़ें",
    photoAlt: "जिला समन्वय केंद्र में महिलाएँ और अधिकारी लाल फीता काटते हुए",
    brochureAlt: "आईयूथ स्टोर ब्रोशर का कवर",
    meetingCaption: "जिला समन्वय केंद्र में फीता काटने का क्षण",
    brochureCaption: "आईयूथ स्टोर ब्रोशर",
    brochureLabels: {
      open: "ब्रोशर खोलें",
      close: "ब्रोशर बंद करें",
      page: "ब्रोशर पन्ना",
      prev: "पिछला पन्ना",
      next: "अगला पन्ना",
      download: "PDF डाउनलोड करें (5 MB)",
      prompt: "फ़ोन पर ब्रोशर PDF में पढ़ना सबसे आसान है। क्या आप इसे डाउनलोड करना चाहेंगे?",
      notNow: "अभी नहीं",
    },
  },
  bento: {
    kicker: "दीपेश मिश्रा",
    title: "एक मॉडल, जुड़ने के कई रास्ते",
    quoteLabel: "मॉडल",
    equation: "युवा + कौशल + सुरक्षा + उद्यम + नेतृत्व = सशक्त समाज",
    manLabel: "परिचय",
    manTitle: "दीपेश मिश्रा कौन हैं और क्या बना रहे हैं",
    manAlt: "किसी कार्यक्रम में बोलते हुए दीपेश मिश्रा",
    watchLabel: "देखें",
    watchTitle: "छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन",
    servicesLabel: "सेवाएँ",
    servicesTitle: "निःशुल्क युवा परामर्श और उद्यमी सलाह",
  },
  platforms: {
    kicker: "आईयूथ प्लेटफ़ॉर्म",
    title: "नौ प्लेटफ़ॉर्म, जिनमें चार चालू",
    items: {
      "iyouth.in": "युवाओं का डिजिटल मंच: अवसर, मार्गदर्शन और सहयोग एक ही जगह।",
      "iyouthjob.in": "युवाओं के लिए घंटे, फ्रीलांस और प्रोजेक्ट आधारित काम।",
      "iyouthstore.in": "गाँव के फ्रेंचाइज़ी स्टोर और युवाओं के उत्पादों का बाज़ार।",
      "cgyouth.in": "जागरूकता, नेतृत्व और एडवेंचर कार्यक्रम।",
      "iyoutheats.in": "युवा उद्यमियों के लिए फ़ूड और रेस्तराँ फ्रेंचाइज़ी।",
      "iyouthnews.in": "युवाओं के लिए समाचार, अवसर और प्रेरक कहानियाँ।",
      "iyouthfitness.in": "फ़िटनेस सेंटर, योग और वेलनेस।",
      "iyouthskill.in": "तकनीक, कला, संगीत, नृत्य और जीवन-कौशल।",
      "iyouthsiksha.in": "शिक्षा, डिजिटल लर्निंग और करियर मार्गदर्शन।",
    },
  },
  watch: {
    kicker: "देखें",
    title: "ज़मीन से",
    note: "यूथ फेडरेशन, एडवेंचर स्पोर्ट्स एसोसिएशन और आईयूथ के कार्यक्रम और आयोजन।",
    videos: [
      "6 मार्च 2026 · छत्तीसगढ़ यूथ फेडरेशन",
      "छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन",
      "6 मार्च 2026 · आईयूथ",
    ],
  },
  vision: {
    kicker: "विज़न 2030",
    title: "2030 तक के चार चरण",
    phases: [
      "ज़िला स्तर पर कौशल और युवा सक्रियता",
      "राज्य स्तर पर उद्यम और वितरण का विस्तार",
      "राष्ट्रीय युवा उद्यम नेटवर्क",
      "एकीकृत युवा आर्थिक और नेतृत्व तंत्र",
    ],
    link: "पूरी यात्रा देखें",
  },
  connect: {
    title: "आइए, साथ मिलकर कुशल, सुरक्षित और आत्मनिर्भर भारत बनाएँ",
    body: "हम सरकारी संस्थाओं, एनजीओ, निर्माताओं, निवेशकों, शैक्षणिक संस्थानों और युवा नेताओं के साथ सहयोग का स्वागत करते हैं।",
    cta: "साथ जुड़ें",
    ribbon: "युवा कौशल सुरक्षा उद्यम नेतृत्व",
    photoAlt: "दीपेश मिश्रा",
  },
};

export const homeContent: Record<Locale, HomeContent> = { en, hi };
