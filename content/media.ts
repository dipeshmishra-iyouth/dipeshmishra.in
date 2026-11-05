import type { Locale } from "@/lib/i18n";

// Media captions. Files are in public/media; add an entry here and a file there to extend a tab.
export type MediaItem = { id: string; src: string; width: number; height: number; alt: string; caption: string };

export type MediaContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; note: string };
  tabsLabel: string;
  tabs: { photos: string; videos: string; documents: string };
  photos: MediaItem[];
  documents: MediaItem[];
  lightbox: { open: string; close: string; prev: string; next: string };
};

const en: MediaContent = {
  meta: {
    title: "Media",
    description: "Photos, videos and documents from Dipesh Mishra's work with youth, the Chhattisgarh Youth Federation, the Adventure Sports Association and iYouth.",
  },
  hero: { kicker: "Media", title: "Photos, videos and documents", note: "From the field, the meeting room and the iYouth Store brochure." },
  tabsLabel: "Media type",
  tabs: { photos: "Photos", videos: "Videos", documents: "Documents" },
  photos: [
    { id: "ribbon", src: "/media/gallery/ribbon-cutting.webp", width: 1400, height: 788, alt: "Women and officials cutting a red ribbon at the District Co-ordination Centre", caption: "Ribbon-cutting at the District Co-ordination Centre" },
    { id: "speaking-close", src: "/media/gallery/speaking-close.webp", width: 1400, height: 788, alt: "Dipesh Mishra speaking into a microphone to a gathering", caption: "Dipesh Mishra addressing a gathering" },
    { id: "portrait", src: "/media/dipesh-portrait.webp", width: 853, height: 1280, alt: "Portrait of Dipesh Mishra", caption: "Dipesh Mishra" },
    { id: "handshake", src: "/media/gallery/handshake.webp", width: 1400, height: 788, alt: "Dipesh Mishra shaking hands with an officer in front of an iYouth Store banner", caption: "Handshake at an iYouth Store event" },
    { id: "field-walk", src: "/media/gallery/field-walk.webp", width: 1400, height: 933, alt: "Dipesh Mishra pointing ahead during a site visit with a group", caption: "On a site visit" },
    { id: "sea", src: "/media/dipesh-sea.webp", width: 819, height: 1024, alt: "Dipesh Mishra by the sea", caption: "Dipesh Mishra by the sea" },
    { id: "speaking-gesture", src: "/media/gallery/speaking-gesture.webp", width: 1400, height: 788, alt: "Dipesh Mishra speaking to a group, hand raised", caption: "Dipesh Mishra speaking to a group" },
    { id: "roundtable", src: "/media/gallery/roundtable.webp", width: 1400, height: 788, alt: "A round-table discussion with the iYouth Store brochure on display behind", caption: "Round-table discussion" },
  ],
  documents: [
    { id: "brochure-1", src: "/media/brochure/page-1.webp", width: 1020, height: 1320, alt: "iYouth Store brochure, page 1: Cover and store formats", caption: "Brochure page 1: Cover and store formats" },
    { id: "brochure-2", src: "/media/brochure/page-2.webp", width: 1020, height: 1320, alt: "iYouth Store brochure, page 2: Bilaspur pilot and who can open a store", caption: "Brochure page 2: Bilaspur pilot and who can open a store" },
    { id: "brochure-3", src: "/media/brochure/page-3.webp", width: 1020, height: 1320, alt: "iYouth Store brochure, page 3: Choosing inventory and iYouth support", caption: "Brochure page 3: Choosing inventory and iYouth support" },
    { id: "brochure-4", src: "/media/brochure/page-4.webp", width: 1020, height: 1320, alt: "iYouth Store brochure, page 4: The iYouth Store journey", caption: "Brochure page 4: The iYouth Store journey" },
  ],
  lightbox: { open: "Open photo", close: "Close", prev: "Previous photo", next: "Next photo" },
};

const hi: MediaContent = {
  meta: {
    title: "मीडिया",
    description: "दीपेश मिश्रा के युवा कार्य, छत्तीसगढ़ यूथ फेडरेशन, एडवेंचर स्पोर्ट्स एसोसिएशन और आईयूथ की तस्वीरें, वीडियो और दस्तावेज़।",
  },
  hero: { kicker: "मीडिया", title: "तस्वीरें, वीडियो और दस्तावेज़", note: "ज़मीन से, बैठकों से और आईयूथ स्टोर की ब्रोशर से।" },
  tabsLabel: "मीडिया का प्रकार",
  tabs: { photos: "तस्वीरें", videos: "वीडियो", documents: "दस्तावेज़" },
  photos: [
    { id: "ribbon", src: "/media/gallery/ribbon-cutting.webp", width: 1400, height: 788, alt: "जिला समन्वय केंद्र में महिलाएँ और अधिकारी लाल फीता काटते हुए", caption: "जिला समन्वय केंद्र में फीता काटने का क्षण" },
    { id: "speaking-close", src: "/media/gallery/speaking-close.webp", width: 1400, height: 788, alt: "माइक पर लोगों को संबोधित करते हुए दीपेश मिश्रा", caption: "लोगों को संबोधित करते दीपेश मिश्रा" },
    { id: "portrait", src: "/media/dipesh-portrait.webp", width: 853, height: 1280, alt: "दीपेश मिश्रा का चित्र", caption: "दीपेश मिश्रा" },
    { id: "handshake", src: "/media/gallery/handshake.webp", width: 1400, height: 788, alt: "आईयूथ स्टोर के बैनर के सामने एक अधिकारी से हाथ मिलाते हुए दीपेश मिश्रा", caption: "आईयूथ स्टोर कार्यक्रम में अभिवादन" },
    { id: "field-walk", src: "/media/gallery/field-walk.webp", width: 1400, height: 933, alt: "लोगों के समूह के साथ स्थल भ्रमण के दौरान आगे इशारा करते दीपेश मिश्रा", caption: "स्थल भ्रमण के दौरान" },
    { id: "sea", src: "/media/dipesh-sea.webp", width: 819, height: 1024, alt: "समुद्र किनारे दीपेश मिश्रा", caption: "समुद्र किनारे दीपेश मिश्रा" },
    { id: "speaking-gesture", src: "/media/gallery/speaking-gesture.webp", width: 1400, height: 788, alt: "हाथ उठाकर समूह से बात करते हुए दीपेश मिश्रा", caption: "समूह से बात करते दीपेश मिश्रा" },
    { id: "roundtable", src: "/media/gallery/roundtable.webp", width: 1400, height: 788, alt: "पीछे आईयूथ स्टोर की ब्रोशर के साथ गोलमेज़ चर्चा", caption: "गोलमेज़ चर्चा" },
  ],
  documents: [
    { id: "brochure-1", src: "/media/brochure/page-1.webp", width: 1020, height: 1320, alt: "आईयूथ स्टोर ब्रोशर, पन्ना 1: कवर और स्टोर फॉर्मेट", caption: "ब्रोशर पन्ना 1: कवर और स्टोर फॉर्मेट" },
    { id: "brochure-2", src: "/media/brochure/page-2.webp", width: 1020, height: 1320, alt: "आईयूथ स्टोर ब्रोशर, पन्ना 2: बिलासपुर पायलट और कौन खोल सकता है", caption: "ब्रोशर पन्ना 2: बिलासपुर पायलट और कौन खोल सकता है" },
    { id: "brochure-3", src: "/media/brochure/page-3.webp", width: 1020, height: 1320, alt: "आईयूथ स्टोर ब्रोशर, पन्ना 3: इन्वेंटरी चयन और iYouth सहयोग", caption: "ब्रोशर पन्ना 3: इन्वेंटरी चयन और iYouth सहयोग" },
    { id: "brochure-4", src: "/media/brochure/page-4.webp", width: 1020, height: 1320, alt: "आईयूथ स्टोर ब्रोशर, पन्ना 4: iYouth Store यात्रा", caption: "ब्रोशर पन्ना 4: iYouth Store यात्रा" },
  ],
  lightbox: { open: "तस्वीर खोलें", close: "बंद करें", prev: "पिछली तस्वीर", next: "अगली तस्वीर" },
};

export const mediaContent: Record<Locale, MediaContent> = { en, hi };
