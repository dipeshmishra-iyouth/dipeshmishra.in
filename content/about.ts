import type { Locale } from "@/lib/i18n";

// About page copy, edited from the bio and pillars on the previous site.
export type AboutContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; roles: string; portraitAlt: string };
  bio: { paragraphs: string[]; quote: string; fieldAlt: string; fieldCaption: string };
  beliefs: { kicker: string; title: string; pillars: { title: string; points: string[] }[] };
  model: { kicker: string; equation: string };
  roles: { kicker: string; title: string; more: string; cards: { id: string; role: string; name: string; href: string }[] };
  cta: { title: string; body: string; label: string };
};

const en: AboutContent = {
  meta: {
    title: "About",
    description:
      "Dipesh Mishra is a youth-focused entrepreneur and institution builder: Founder & CEO of iYouth Pvt. Ltd. and Founder of the Chhattisgarh Youth Federation and the Chhattisgarh Adventure Sports Association.",
  },
  hero: {
    kicker: "About",
    title: "Dipesh Mishra",
    roles: "Founder & CEO, iYouth Pvt. Ltd. · Founder, Chhattisgarh Youth Federation and Chhattisgarh Adventure Sports Association",
    portraitAlt: "Dipesh Mishra by the sea",
  },
  bio: {
    paragraphs: [
      "Dipesh Mishra has founded several institutions for young people. He wants youth who are skilled, confident, safe and able to earn their own living, and who in turn strengthen their families, communities and the country.",
      "At iYouth Pvt. Ltd., where he is Founder and CEO, he builds youth-centred brands and business models that create jobs and self-employment. The work combines manufacturing, distribution networks and local participation, so the opportunities can scale.",
      "He founded the Chhattisgarh Youth Federation, which runs leadership programmes, skill training, awareness campaigns and social responsibility platforms for young people. The Chhattisgarh Adventure Sports Association, also founded by him, uses adventure sports to build discipline, mental strength, resilience and safety awareness.",
      "For him, enterprise, skills, safety, women-led business and youth leadership belong to one mission: self-reliant youth and a stronger India.",
    ],
    quote: "Youth are not just the future of India — they are the driving force of India's present growth story.",
    fieldAlt: "Dipesh Mishra pointing ahead during a site visit with a group",
    fieldCaption: "On a site visit",
  },
  beliefs: {
    kicker: "What he believes",
    title: "Four pillars of one model",
    pillars: [
      {
        title: "Youth Skill Empowerment",
        points: ["Skill development programmes", "Entrepreneurship training", "Leadership workshops", "Confidence building"],
      },
      {
        title: "Youth Safety & Structured Growth",
        points: ["Adventure safety protocols", "Disaster management training", "Community safety awareness", "Responsible youth engagement"],
      },
      {
        title: "Enterprise & Employment Creation",
        points: ["Youth-led business models", "Women-led enterprise units", "Micro distribution networks", "Local manufacturing promotion"],
      },
      {
        title: "Women Empowerment",
        points: ["Skill-based income opportunities", "Rural women's business participation", "Financial independence", "Leadership development"],
      },
    ],
  },
  model: { kicker: "The model", equation: "Youth + Skill + Safety + Enterprise + Leadership = Empowered Society" },
  roles: {
    kicker: "Institutions",
    title: "Where the work happens",
    more: "Read more",
    cards: [
      { id: "iyouth", role: "Founder & CEO", name: "iYouth Pvt. Ltd.", href: "ventures#iyouth" },
      { id: "cyf", role: "Founder", name: "Chhattisgarh Youth Federation", href: "ventures#cyf" },
      { id: "casa", role: "Founder", name: "Chhattisgarh Adventure Sports Association", href: "ventures#casa" },
    ],
  },
  cta: {
    title: "Let's build a skilled, safe and self-reliant India together",
    body: "We welcome collaboration with government institutions, NGOs, manufacturers, investors, educational institutions and youth leaders.",
    label: "Partner with us",
  },
};

const hi: AboutContent = {
  meta: {
    title: "परिचय",
    description:
      "दीपेश मिश्रा युवाओं पर केंद्रित उद्यमी और संस्था-निर्माता हैं: आईयूथ प्रा. लि. के संस्थापक एवं सीईओ तथा छत्तीसगढ़ यूथ फेडरेशन और छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन के संस्थापक।",
  },
  hero: {
    kicker: "परिचय",
    title: "दीपेश मिश्रा",
    roles: "संस्थापक एवं सीईओ, आईयूथ प्रा. लि. · संस्थापक, छत्तीसगढ़ यूथ फेडरेशन एवं छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन",
    portraitAlt: "समुद्र किनारे दीपेश मिश्रा",
  },
  bio: {
    paragraphs: [
      "दीपेश मिश्रा ने युवाओं के लिए कई संस्थाएँ खड़ी की हैं। उनका लक्ष्य ऐसे युवा तैयार करना है जो कुशल, आत्मविश्वासी, सुरक्षित और आर्थिक रूप से स्वतंत्र हों, और जिनसे परिवार, समाज और देश मज़बूत हों।",
      "आईयूथ प्रा. लि. के संस्थापक एवं सीईओ के रूप में वे युवाओं पर केंद्रित ब्रांड और व्यवसाय मॉडल बना रहे हैं, जो रोज़गार और स्वरोज़गार पैदा करें। इस काम में निर्माण, वितरण नेटवर्क और ज़मीनी भागीदारी साथ चलती हैं, ताकि अवसरों का विस्तार हो सके।",
      "उन्होंने छत्तीसगढ़ यूथ फेडरेशन की स्थापना की, जो युवाओं के लिए नेतृत्व कार्यक्रम, कौशल प्रशिक्षण, जागरूकता अभियान और सामाजिक दायित्व के मंच चलाता है। उन्हीं की स्थापित छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन एडवेंचर खेलों के ज़रिये अनुशासन, मानसिक मज़बूती, दृढ़ता और सुरक्षा की सीख देती है।",
      "उनके लिए उद्यम, कौशल, सुरक्षा, महिला-नेतृत्व वाला व्यवसाय और युवा नेतृत्व एक ही लक्ष्य के हिस्से हैं: आत्मनिर्भर युवा और सशक्त भारत।",
    ],
    quote: "युवा सिर्फ़ भारत का भविष्य नहीं हैं — वे भारत की आज की विकास गाथा की प्रेरक शक्ति हैं।",
    fieldAlt: "लोगों के समूह के साथ स्थल भ्रमण के दौरान आगे इशारा करते दीपेश मिश्रा",
    fieldCaption: "स्थल भ्रमण के दौरान",
  },
  beliefs: {
    kicker: "उनकी सोच",
    title: "एक मॉडल के चार स्तंभ",
    pillars: [
      {
        title: "युवा कौशल सशक्तिकरण",
        points: ["कौशल विकास कार्यक्रम", "उद्यमिता प्रशिक्षण", "नेतृत्व कार्यशालाएँ", "आत्मविश्वास निर्माण"],
      },
      {
        title: "युवा सुरक्षा और संरचित विकास",
        points: ["एडवेंचर सुरक्षा नियम", "आपदा प्रबंधन प्रशिक्षण", "सामुदायिक सुरक्षा जागरूकता", "ज़िम्मेदार युवा भागीदारी"],
      },
      {
        title: "उद्यम और रोज़गार सृजन",
        points: ["युवा-नेतृत्व वाले व्यवसाय मॉडल", "महिला-नेतृत्व वाली उद्यम इकाइयाँ", "छोटे वितरण नेटवर्क", "स्थानीय निर्माण को बढ़ावा"],
      },
      {
        title: "महिला सशक्तिकरण",
        points: ["कौशल आधारित आय के अवसर", "ग्रामीण महिलाओं की व्यवसाय में भागीदारी", "आर्थिक स्वतंत्रता", "नेतृत्व विकास"],
      },
    ],
  },
  model: { kicker: "मॉडल", equation: "युवा + कौशल + सुरक्षा + उद्यम + नेतृत्व = सशक्त समाज" },
  roles: {
    kicker: "संस्थाएँ",
    title: "जहाँ काम होता है",
    more: "और पढ़ें",
    cards: [
      { id: "iyouth", role: "संस्थापक एवं सीईओ", name: "आईयूथ प्रा. लि.", href: "ventures#iyouth" },
      { id: "cyf", role: "संस्थापक", name: "छत्तीसगढ़ यूथ फेडरेशन", href: "ventures#cyf" },
      { id: "casa", role: "संस्थापक", name: "छत्तीसगढ़ एडवेंचर स्पोर्ट्स एसोसिएशन", href: "ventures#casa" },
    ],
  },
  cta: {
    title: "आइए, साथ मिलकर कुशल, सुरक्षित और आत्मनिर्भर भारत बनाएँ",
    body: "हम सरकारी संस्थाओं, एनजीओ, निर्माताओं, निवेशकों, शैक्षणिक संस्थानों और युवा नेताओं के साथ सहयोग का स्वागत करते हैं।",
    label: "साथ जुड़ें",
  },
};

export const aboutContent: Record<Locale, AboutContent> = { en, hi };
