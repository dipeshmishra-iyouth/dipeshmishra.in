import type { Locale } from "@/lib/i18n";
import type { LogoId } from "@/lib/logos";

// Vision, mission and objectives as published on the previous site.
export type Institution = {
  id: LogoId;
  name: string;
  founded: string;
  registration?: string;
  note?: string;
  vision: string;
  mission: string;
  objectives: string[];
  coreFocus?: string[];
};

export type VenturesContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; note: string };
  labels: { founded: string; vision: string; mission: string; objectives: string; coreFocus: string };
  institutions: Institution[];
  platforms: { title: string; note: string };
};

const REGISTERED_EN = "Registered under the Chhattisgarh Society Registration Act, 1973";
const REGISTERED_HI = "छत्तीसगढ़ सोसायटी रजिस्ट्रीकरण अधिनियम, 1973 के अंतर्गत पंजीकृत";

const en: VenturesContent = {
  meta: {
    title: "Ventures",
    description:
      "Three institutions with one mission: iYouth Pvt. Ltd., the Chhattisgarh Youth Federation and the Chhattisgarh Adventure Sports Association, plus nine youth platforms.",
  },
  hero: {
    kicker: "Ventures",
    title: "Building India's Youth Economy",
    note: "One mission, three institutions: youth who are skilled, safe and self-reliant.",
  },
  labels: { founded: "Founded", vision: "Vision", mission: "Mission", objectives: "Objectives", coreFocus: "Core focus" },
  institutions: [
    {
      id: "iyouth",
      name: "iYouth Pvt. Ltd.",
      founded: "2026",
      vision:
        "To build a youth-driven enterprise ecosystem that generates employment, promotes self-employment and strengthens local manufacturing.",
      mission: "Empowering youth through entrepreneurship, employment generation and sustainable business opportunities.",
      objectives: [
        "Develop scalable youth-centric brands",
        "Promote private-label and white-label manufacturing",
        "Create district-level distribution networks",
        "Enable women-led and youth-led enterprises",
        "Generate sustainable livelihood opportunities",
      ],
      coreFocus: [
        "Enterprise development",
        "Manufacturing and distribution",
        "Skill-based micro businesses",
        "Women entrepreneurship",
        "Youth empowerment",
      ],
    },
    {
      id: "cyf",
      name: "Chhattisgarh Youth Federation",
      founded: "2012",
      registration: REGISTERED_EN,
      note: "Runs the people's movement आत्मनिर्भर युवा – आत्मनिर्भर छत्तीसगढ़, to help the youth of Chhattisgarh become self-reliant, confident and capable.",
      vision: "Skilled, Safe & Empowered Youth.",
      mission: "Empowering youth through structured skill development, leadership training, safety awareness and confidence building.",
      objectives: [
        "To make youth confident",
        "To create safe and secure environments",
        "To increase social awareness",
        "To develop youth for nation-building",
        "To strengthen leadership at the grassroots",
      ],
    },
    {
      id: "casa",
      name: "Chhattisgarh Adventure Sports Association",
      founded: "2012",
      registration: REGISTERED_EN,
      vision: "Confident, Fearless & Adventure-Ready Youth.",
      mission: "To develop discipline, resilience, mental strength and safety awareness through structured adventure programmes.",
      objectives: [
        "Develop adventure destinations",
        "Provide specialised training in adventure sports and disaster management",
        "Promote adventure tourism",
        "Organise professional events and competitions",
        "Build physical and mental strength among youth",
      ],
    },
  ],
  platforms: { title: "Nine platforms, four of them live", note: "The other five are on the way." },
};

const hi: VenturesContent = {
  meta: {
    title: "संस्थाएँ",
    description:
      "एक लक्ष्य, तीन संस्थाएँ: आईयूथ प्रा. लि., छत्तीसगढ़ यूथ फेडरेशन और छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन, साथ में नौ युवा प्लेटफ़ॉर्म।",
  },
  hero: {
    kicker: "संस्थाएँ",
    title: "भारत की युवा अर्थव्यवस्था का निर्माण",
    note: "एक लक्ष्य, तीन संस्थाएँ: कुशल, सुरक्षित और आत्मनिर्भर युवा।",
  },
  labels: { founded: "स्थापना", vision: "दृष्टि", mission: "ध्येय", objectives: "उद्देश्य", coreFocus: "मुख्य क्षेत्र" },
  institutions: [
    {
      id: "iyouth",
      name: "आईयूथ प्रा. लि.",
      founded: "2026",
      vision: "एक युवा-संचालित उद्यम तंत्र बनाना, जो रोज़गार पैदा करे, स्वरोज़गार को बढ़ावा दे और स्थानीय निर्माण को मज़बूत करे।",
      mission: "उद्यमिता, रोज़गार सृजन और टिकाऊ व्यावसायिक अवसरों के ज़रिये युवाओं को सशक्त बनाना।",
      objectives: [
        "बड़े स्तर तक पहुँचने वाले युवा-केंद्रित ब्रांड विकसित करना",
        "प्राइवेट-लेबल और व्हाइट-लेबल निर्माण को बढ़ावा देना",
        "ज़िला स्तर के वितरण नेटवर्क बनाना",
        "महिला-नेतृत्व और युवा-नेतृत्व वाले उद्यमों को सक्षम बनाना",
        "टिकाऊ आजीविका के अवसर पैदा करना",
      ],
      coreFocus: [
        "उद्यम विकास",
        "निर्माण और वितरण",
        "कौशल आधारित सूक्ष्म व्यवसाय",
        "महिला उद्यमिता",
        "युवा सशक्तिकरण",
      ],
    },
    {
      id: "cyf",
      name: "छत्तीसगढ़ यूथ फेडरेशन",
      founded: "2012",
      registration: REGISTERED_HI,
      note: "जन-अभियान आत्मनिर्भर युवा – आत्मनिर्भर छत्तीसगढ़ का संचालन, ताकि छत्तीसगढ़ के युवा आत्मनिर्भर, आत्मविश्वासी और सक्षम बनें।",
      vision: "कुशल, सुरक्षित और सशक्त युवा।",
      mission: "संरचित कौशल विकास, नेतृत्व प्रशिक्षण, सुरक्षा जागरूकता और आत्मविश्वास निर्माण के ज़रिये युवाओं को सशक्त बनाना।",
      objectives: [
        "युवाओं को आत्मविश्वासी बनाना",
        "सुरक्षित वातावरण तैयार करना",
        "सामाजिक जागरूकता बढ़ाना",
        "राष्ट्र निर्माण के लिए युवाओं को तैयार करना",
        "ज़मीनी स्तर पर नेतृत्व को मज़बूत करना",
      ],
    },
    {
      id: "casa",
      name: "छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन",
      founded: "2012",
      registration: REGISTERED_HI,
      vision: "आत्मविश्वासी, निडर और एडवेंचर के लिए तैयार युवा।",
      mission: "संरचित एडवेंचर कार्यक्रमों से अनुशासन, दृढ़ता, मानसिक मज़बूती और सुरक्षा जागरूकता विकसित करना।",
      objectives: [
        "एडवेंचर स्थल विकसित करना",
        "एडवेंचर खेलों और आपदा प्रबंधन में विशेष प्रशिक्षण देना",
        "एडवेंचर पर्यटन को बढ़ावा देना",
        "पेशेवर आयोजन और प्रतियोगिताएँ कराना",
        "युवाओं में शारीरिक और मानसिक शक्ति बढ़ाना",
      ],
    },
  ],
  platforms: { title: "नौ प्लेटफ़ॉर्म, जिनमें चार चालू", note: "बाकी पाँच आने वाले हैं।" },
};

export const venturesContent: Record<Locale, VenturesContent> = { en, hi };
