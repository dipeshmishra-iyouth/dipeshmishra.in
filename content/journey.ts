import type { Locale } from "@/lib/i18n";

// Timeline copy; dates are the confirmed founding years.
export type JourneyContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; note: string };
  eras: { id: "vision" | "y2026" | "y2012"; label: string }[];
  eraNav: string;
  next: string;
  vision: { year: string; title: string; phases: string[] };
  y2026: { year: string; title: string; body: string; photoAlt: string };
  y2012: { year: string; title: string; body: string };
  cta: { title: string; label: string };
};

const en: JourneyContent = {
  meta: {
    title: "Journey",
    description: "From the founding of the Chhattisgarh Youth Federation and Adventure Sports Association in 2012 to iYouth Pvt. Ltd. in 2026 and the Vision 2030 roadmap.",
  },
  hero: { kicker: "Journey", title: "From 2012 to Vision 2030", note: "Fourteen years of youth work, and the four phases ahead." },
  eras: [
    { id: "vision", label: "Vision 2030" },
    { id: "y2026", label: "2026" },
    { id: "y2012", label: "2012" },
  ],
  eraNav: "Jump to a year",
  next: "Next",
  vision: {
    year: "2030",
    title: "Vision 2030",
    phases: [
      "District-level skill and youth activation",
      "Enterprise and distribution expansion at state level",
      "A national youth enterprise network",
      "An integrated youth economic and leadership ecosystem",
    ],
  },
  y2026: {
    year: "2026",
    title: "iYouth Pvt. Ltd. founded",
    body: "iYouth Store launched in partnership with District Administration, Bilaspur. More than 30 stores are live, and iyouthjob.in and iyouthstore.in are running.",
    photoAlt: "Women and officials cutting a red ribbon at the District Co-ordination Centre",
  },
  y2012: {
    year: "2012",
    title: "Chhattisgarh Youth Federation and Chhattisgarh Adventure Sports Association founded",
    body: "The start of the Aatmanirbhar Yuva movement, and of structured adventure and safety training for youth.",
  },
  cta: { title: "Work with us toward 2030", label: "Partner with us" },
};

const hi: JourneyContent = {
  meta: {
    title: "यात्रा",
    description: "2012 में छत्तीसगढ़ यूथ फेडरेशन और एडवेंचर स्पोर्ट्स एसोसिएशन की स्थापना से 2026 में आईयूथ प्रा. लि. और विज़न 2030 की रूपरेखा तक।",
  },
  hero: { kicker: "यात्रा", title: "2012 से विज़न 2030 तक", note: "चौदह साल का युवा कार्य, और आगे के चार चरण।" },
  eras: [
    { id: "vision", label: "विज़न 2030" },
    { id: "y2026", label: "2026" },
    { id: "y2012", label: "2012" },
  ],
  eraNav: "किसी वर्ष पर जाएँ",
  next: "आगे",
  vision: {
    year: "2030",
    title: "विज़न 2030",
    phases: [
      "ज़िला स्तर पर कौशल और युवा सक्रियता",
      "राज्य स्तर पर उद्यम और वितरण का विस्तार",
      "राष्ट्रीय युवा उद्यम नेटवर्क",
      "एकीकृत युवा आर्थिक और नेतृत्व तंत्र",
    ],
  },
  y2026: {
    year: "2026",
    title: "आईयूथ प्रा. लि. की स्थापना",
    body: "जिला प्रशासन, बिलासपुर के साथ साझेदारी में आईयूथ स्टोर की शुरुआत। 30 से अधिक स्टोर चालू हैं, और iyouthjob.in तथा iyouthstore.in सक्रिय हैं।",
    photoAlt: "जिला समन्वय केंद्र में महिलाएँ और अधिकारी लाल फीता काटते हुए",
  },
  y2012: {
    year: "2012",
    title: "छत्तीसगढ़ यूथ फेडरेशन और छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन की स्थापना",
    body: "आत्मनिर्भर युवा अभियान की शुरुआत, और युवाओं के लिए संरचित एडवेंचर व सुरक्षा प्रशिक्षण की भी।",
  },
  cta: { title: "2030 की ओर हमारे साथ चलें", label: "साथ जुड़ें" },
};

export const journeyContent: Record<Locale, JourneyContent> = { en, hi };
