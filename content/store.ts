import type { Locale } from "@/lib/i18n";

// iYouth Store model from the current brochure (public/media/brochure/iyouth-store-brochure.pdf, Nov 2026).
// The Hindi follows the brochure's own wording.
export type StoreContent = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: string; sub: string; badge: string; apply: string; download: string; photoAlt: string };
  pilot: { kicker: string; title: string; body: string; liveLabel: string; doneTitle: string; done: string[]; openTitle: string; open: string[] };
  model: { kicker: string; title: string; lead: string; items: { icon: string; title: string; body: string }[] };
  formats: {
    kicker: string;
    title: string;
    lead: string;
    head: [string, string, string];
    rows: [string, string, string][];
    summary: { name: string; sum: string }[];
    difference: string;
    disclaimer: string;
  };
  who: { kicker: string; title: string; lead: string; people: { title: string; body: string }[]; needsTitle: string; needs: { title: string; body: string }[] };
  inventory: { kicker: string; title: string; lead: string; steps: { title: string; body: string }[]; kitTitle: string; kit: string };
  steps: { kicker: string; title: string; items: { title: string; body: string }[] };
  support: { kicker: string; title: string; lead: string; items: { title: string; body: string }[] };
  faq: { kicker: string; title: string; items: { q: string; a: string }[] };
  proof: { title: string; body: string; photoAlt: string; caption: string };
  cta: { title: string; apply: string; helpline: string };
};

const en: StoreContent = {
  meta: {
    title: "iYouth Store",
    description:
      "A multi-category retail store you run yourself. Proven by 30+ women-run stores in Bilaspur district and now open to everyone 18 and over, in two formats from ₹3.50 lakh.",
  },
  hero: {
    kicker: "iYouth Store",
    title: "अपना स्टोर • अपना व्यवसाय • अपना भविष्य",
    sub: "Your store, your business, your future. Village or city, young man or woman: anyone 18 or over can open an iYouth Store.",
    badge: "In partnership with District Administration, Bilaspur and the Chhattisgarh Youth Federation.",
    apply: "Apply on iyouthstore.in",
    download: "Download the brochure (PDF, 5 MB)",
    photoAlt: "Cover of the iYouth Store brochure",
  },
  pilot: {
    kicker: "Bilaspur pilot",
    title: "Tested in the villages first",
    body: "iYouth Store is not a new experiment. Under the Bilaspur pilot, more than 30 iYouth Stores already run in villages across Bilaspur district, all of them run by women.",
    liveLabel: "live iYouth Stores in Bilaspur district",
    doneTitle: "Pilot phase (complete)",
    done: ["Run by women entrepreneurs in Bilaspur's villages", "30+ stores running well", "The model has proved it works"],
    openTitle: "Now open to everyone",
    open: ["Young men in villages", "Women in villages", "Entrepreneurs in Bilaspur city", "Anyone who wants to run a store"],
  },
  model: {
    kicker: "The model",
    title: "Why an iYouth Store",
    lead: "A multi-category retail business model, built by iYouth Pvt. Ltd., that gives an entrepreneur independence, backing and a modern store.",
    items: [
      { icon: "bag", title: "Multi-category retail", body: "Products from many categories under one roof." },
      { icon: "file", title: "Your choice of inventory", body: "You pick what to stock, to suit your local market." },
      { icon: "monitor", title: "Modern store setup", body: "A professionally designed store." },
      { icon: "phone", title: "Online and offline sales", body: "Sell in the shop and through digital channels." },
      { icon: "book", title: "Training and guidance", body: "Training, marketing and business guidance from opening day on." },
      { icon: "users", title: "Central supply", body: "Products and supply arranged centrally by iYouth." },
    ],
  },
  formats: {
    kicker: "Two formats",
    title: "Choose your store format",
    lead: "Both formats give you a full multi-category retail store. Choose the one that fits your budget.",
    head: ["", "Basic Store", "Standard Store"],
    rows: [
      ["Total investment", "₹3.50 lakh", "₹5.00 lakh"],
      ["Store setup", "₹1.50 lakh", "₹2.00 lakh"],
      ["Inventory budget", "₹2.00 lakh", "₹3.00 lakh"],
      ["Furniture and shelving", "Included", "Premium"],
      ["Computer and printer", "Included", "Included"],
      ["Electrical work and fan", "Included", "Included"],
      ["Painting and finishing", "Standard", "Premium"],
      ["Store branding and signage", "Included", "Enhanced"],
      ["Shop front", "Transparent curtain or partition", "Glass front or enclosure"],
      ["Air conditioner", "Not included", "Included"],
      ["Banner and posters", "Included", "Included"],
      ["Store fixtures", "Included", "Premium"],
    ],
    summary: [
      { name: "Basic Store", sum: "₹1.50 lakh setup + ₹2.00 lakh inventory = ₹3.50 lakh" },
      { name: "Standard Store", sum: "₹2.00 lakh setup + ₹3.00 lakh inventory = ₹5.00 lakh" },
    ],
    difference: "The Standard Store adds a premium setup, a glass front, an air conditioner and a larger inventory budget. The product categories are the same.",
    disclaimer:
      "This is a business opportunity. Sales and profit depend on the local market, customer demand, product choice, how the store is run and the owner's effort. No fixed income or profit is guaranteed.",
  },
  who: {
    kicker: "Who can open one",
    title: "No special qualification needed",
    lead: "You need no special qualification or experience, only the will, some capital and the drive to run a business. iYouth teaches you the rest.",
    people: [
      { title: "Young people in villages", body: "Aged 18 to 35, who want to start a business in their own village." },
      { title: "Women entrepreneurs", body: "Homemakers or working women who want to be self-reliant." },
      { title: "City entrepreneurs", body: "People in Bilaspur city who want to open a modern retail store." },
      { title: "Educated youth", body: "Those who would rather set up their own business than take a job." },
      { title: "Families", body: "A husband and wife can run the store together." },
      { title: "Existing shopkeepers", body: "Those who want to turn their shop into a multi-category retail store." },
    ],
    needsTitle: "Minimum requirements",
    needs: [
      { title: "Space", body: "Your own or a rented shop, at least 150 to 200 sq ft." },
      { title: "Capital", body: "₹3.50 lakh for the Basic Store or ₹5.00 lakh for the Standard Store." },
      { title: "Commitment", body: "The drive to run a business and the readiness to work hard." },
      { title: "Age", body: "18 or older." },
    ],
  },
  inventory: {
    kicker: "Your inventory",
    title: "You decide what your shop sells",
    lead: "Nobody else decides your stock. Through the company website you choose products to suit your local market and customers.",
    steps: [
      { title: "Choose a store format", body: "Basic or Standard, as you need." },
      { title: "Get your login", body: "iYouth gives you a login ID and password." },
      { title: "Log in on the website", body: "See the product categories on iyouthstore.in." },
      { title: "Choose products", body: "Pick the products and quantities you need." },
      { title: "Finalise your inventory", body: "iYouth processes the order and supplies it." },
    ],
    kitTitle: "Multi-category sample kit (required)",
    kit: "So that every iYouth Store is a full multi-category store, each one must keep at least one sample product from every main category. iYouth provides this kit. You then spend the rest of your inventory budget on products of your choice. The Basic Store has an inventory budget of up to ₹2 lakh and the Standard Store up to ₹3 lakh.",
  },
  steps: {
    kicker: "The journey",
    title: "Nine steps from application to opening",
    items: [
      { title: "Application", body: "First contact and application." },
      { title: "Business discussion", body: "Choose your store format." },
      { title: "Verification", body: "Required checks and process." },
      { title: "Registration", body: "Register the store and pay the amount." },
      { title: "Store setup", body: "The store is set up." },
      { title: "Inventory selection", body: "Choose stock through your login." },
      { title: "Supply", body: "Stock is supplied and the store arranged." },
      { title: "Launch", body: "Training, promotion and the store launch." },
      { title: "Ongoing support", body: "Sales and business support." },
    ],
  },
  support: {
    kicker: "Support",
    title: "You are not on your own",
    lead: "After the store opens, iYouth keeps providing training, guidance, marketing and business support.",
    items: [
      { title: "Store setup support", body: "Full help to set up the store." },
      { title: "Product and supply support", body: "Steady help with product supply." },
      { title: "Store management training", body: "Practical training in running the store." },
      { title: "Sales training", body: "Training to build selling skills." },
      { title: "Online and offline sales guidance", body: "Guidance on selling in both." },
      { title: "Digital marketing support", body: "Help with promoting the store online." },
      { title: "Delivery support", body: "Delivery help where it is available." },
      { title: "Inventory and replacement support", body: "As per company policy." },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Before you apply",
    items: [
      { q: "Do I need experience to open a store?", a: "No. You need no special qualification or experience. iYouth trains you." },
      { q: "How much money do I need?", a: "₹3.50 lakh for the Basic Store or ₹5.00 lakh for the Standard Store, including setup and inventory." },
      { q: "Who decides what my store sells?", a: "You do. After the required sample kit, you choose the rest of your stock on iyouthstore.in." },
      { q: "Is my income guaranteed?", a: "No. This is a business opportunity, and sales and profit depend on your market, your choices and your effort." },
      { q: "Is this a government scheme?", a: "No. iYouth Store is run by iYouth Pvt. Ltd., a private company." },
    ],
  },
  proof: {
    title: "stores are live in Bilaspur district",
    body: "Women-run stores are open in villages including Khairi, Moru (Takhatpur), Chatouna, Belgahana and Khurdur. Now it is your turn.",
    photoAlt: "Women and officials cutting a red ribbon at the District Co-ordination Centre",
    caption: "Ribbon-cutting at the District Co-ordination Centre",
  },
  cta: { title: "Start your iYouth Store today", apply: "Apply on iyouthstore.in", helpline: "Helpline" },
};

const hi: StoreContent = {
  meta: {
    title: "आईयूथ स्टोर",
    description:
      "अपना मल्टी-कैटेगरी रिटेल स्टोर। बिलासपुर जिले में महिलाओं द्वारा संचालित 30+ स्टोर से सिद्ध मॉडल, अब 18 वर्ष या उससे अधिक हर किसी के लिए, ₹3.50 लाख से शुरू दो फॉर्मेट में।",
  },
  hero: {
    kicker: "आईयूथ स्टोर",
    title: "अपना स्टोर • अपना व्यवसाय • अपना भविष्य",
    sub: "गाँव हो या शहर, युवा हो या महिला: हर कोई खोल सकता है अपना iYouth Store।",
    badge: "जिला प्रशासन, बिलासपुर और छत्तीसगढ़ यूथ फेडरेशन के साथ साझेदारी में।",
    apply: "iyouthstore.in पर आवेदन करें",
    download: "ब्रोशर डाउनलोड करें (PDF, 5 MB)",
    photoAlt: "आईयूथ स्टोर ब्रोशर का कवर",
  },
  pilot: {
    kicker: "बिलासपुर पायलट",
    title: "एक जीती-जागती हकीकत",
    body: "iYouth Store कोई नया प्रयोग नहीं है। बिलासपुर जिले में पायलट प्रोजेक्ट के अंतर्गत पहले से 30 से अधिक iYouth Store सफलतापूर्वक संचालित हो रहे हैं। ये स्टोर जिले के अलग-अलग गाँवों में महिलाओं द्वारा चलाए जा रहे हैं।",
    liveLabel: "सक्रिय iYouth Store, बिलासपुर जिले में",
    doneTitle: "पायलट फेज़ (पूर्ण)",
    done: ["बिलासपुर जिले के गाँवों में महिला उद्यमियों द्वारा संचालित", "30+ स्टोर सफलतापूर्वक चल रहे हैं", "मॉडल की व्यावहारिकता सिद्ध"],
    openTitle: "अब सभी के लिए खुला",
    open: ["गाँव के युवा पुरुष", "गाँव की महिलाएँ", "बिलासपुर शहर के उद्यमी", "कोई भी इच्छुक व्यक्ति"],
  },
  model: {
    kicker: "मॉडल",
    title: "iYouth Store क्यों?",
    lead: "iYouth Pvt. Ltd. द्वारा तैयार मल्टी-कैटेगरी रिटेल बिज़नेस मॉडल, जो उद्यमी को स्वतंत्रता, सहयोग और आधुनिक रिटेल का संयोजन देता है।",
    items: [
      { icon: "bag", title: "मल्टी-कैटेगरी रिटेल", body: "एक ही स्टोर में अनेक श्रेणियों के उत्पाद।" },
      { icon: "file", title: "इन्वेंटरी चयन की स्वतंत्रता", body: "अपनी पसंद और बाज़ार के अनुसार चयन।" },
      { icon: "monitor", title: "आधुनिक स्टोर सेटअप", body: "आधुनिक एवं व्यावसायिक स्टोर डिज़ाइन।" },
      { icon: "phone", title: "ऑनलाइन + ऑफलाइन बिक्री", body: "डिजिटल और पारंपरिक दोनों माध्यमों से बिक्री।" },
      { icon: "book", title: "प्रशिक्षण और मार्गदर्शन", body: "शुरुआत से लेकर संचालन तक प्रशिक्षण, मार्केटिंग और बिज़नेस मार्गदर्शन।" },
      { icon: "users", title: "केंद्रीकृत आपूर्ति", body: "केंद्रीकृत उत्पाद आपूर्ति व्यवस्था।" },
    ],
  },
  formats: {
    kicker: "दो फॉर्मेट",
    title: "स्टोर फॉर्मेट चुनें",
    lead: "दोनों फॉर्मेट में उद्यमी को एक पूर्ण मल्टी-कैटेगरी रिटेल स्टोर मिलता है। अपनी क्षमता के अनुसार चुनें।",
    head: ["", "बेसिक स्टोर", "स्टैंडर्ड स्टोर"],
    rows: [
      ["कुल निवेश", "₹3.50 लाख", "₹5.00 लाख"],
      ["स्टोर सेटअप", "₹1.50 लाख", "₹2.00 लाख"],
      ["इन्वेंटरी बजट", "₹2.00 लाख", "₹3.00 लाख"],
      ["फर्नीचर और शेल्फ़िंग", "शामिल", "प्रीमियम"],
      ["कंप्यूटर और प्रिंटर", "शामिल", "शामिल"],
      ["बिजली का काम और पंखा", "शामिल", "शामिल"],
      ["पेंटिंग और फ़िनिशिंग", "स्टैंडर्ड", "प्रीमियम"],
      ["स्टोर ब्रांडिंग और साइनबोर्ड", "शामिल", "बेहतर"],
      ["दुकान का सामने का हिस्सा", "पारदर्शी पर्दा या पार्टीशन", "ग्लास फ्रंट या एनक्लोज़र"],
      ["एयर कंडीशनर (AC)", "शामिल नहीं", "शामिल"],
      ["बैनर और पोस्टर", "शामिल", "शामिल"],
      ["स्टोर फ़िक्स्चर", "शामिल", "प्रीमियम"],
    ],
    summary: [
      { name: "बेसिक स्टोर", sum: "₹1.50 लाख सेटअप + ₹2.00 लाख इन्वेंटरी = ₹3.50 लाख" },
      { name: "स्टैंडर्ड स्टोर", sum: "₹2.00 लाख सेटअप + ₹3.00 लाख इन्वेंटरी = ₹5.00 लाख" },
    ],
    difference: "मुख्य अंतर: स्टैंडर्ड स्टोर में प्रीमियम सेटअप, ग्लास फ्रंट और AC के साथ अधिक इन्वेंटरी बजट मिलता है। उत्पाद श्रेणियाँ मूलतः समान रहेंगी।",
    disclaimer:
      "यह एक बिज़नेस अवसर है। बिक्री एवं लाभ स्थानीय बाज़ार, ग्राहक माँग, उत्पाद चयन, संचालन और उद्यमी के प्रयास पर निर्भर करेंगे। किसी निश्चित आय या लाभ की गारंटी नहीं है।",
  },
  who: {
    kicker: "कौन खोल सकता है",
    title: "यह अवसर सभी के लिए है",
    lead: "iYouth Store खोलने के लिए कोई विशेष योग्यता या अनुभव की आवश्यकता नहीं है। बस एक दृढ़ इच्छाशक्ति, थोड़ी सी पूँजी और व्यवसाय करने का जज़्बा चाहिए। iYouth आपको बाकी सब सिखाएगा।",
    people: [
      { title: "गाँव के युवा", body: "18-35 वर्ष के युवा जो अपने गाँव में ही व्यवसाय शुरू करना चाहते हैं।" },
      { title: "महिला उद्यमी", body: "गृहिणी हो या कामकाजी, हर महिला जो आत्मनिर्भर बनना चाहती है।" },
      { title: "शहरी उद्यमी", body: "बिलासपुर शहर में रहने वाले जो एक मॉडर्न रिटेल स्टोर खोलना चाहते हैं।" },
      { title: "पढ़े-लिखे युवा", body: "जो नौकरी की बजाय अपना खुद का व्यवसाय स्थापित करना चाहते हैं।" },
      { title: "परिवार के साथ", body: "पति-पत्नी या परिवार मिलकर भी यह स्टोर चला सकते हैं।" },
      { title: "मौजूदा दुकानदार", body: "जो अपनी दुकान को मल्टी-कैटेगरी रिटेल स्टोर में अपग्रेड करना चाहते हैं।" },
    ],
    needsTitle: "न्यूनतम आवश्यकताएँ",
    needs: [
      { title: "स्थान", body: "अपनी या किराए की दुकान (कम से कम 150-200 sq ft)।" },
      { title: "पूँजी", body: "बेसिक स्टोर के लिए ₹3.50 लाख या स्टैंडर्ड स्टोर के लिए ₹5.00 लाख।" },
      { title: "इच्छाशक्ति", body: "व्यवसाय करने का जज़्बा और मेहनत करने की तैयारी।" },
      { title: "उम्र", body: "18 वर्ष या उससे अधिक।" },
    ],
  },
  inventory: {
    kicker: "आपकी इन्वेंटरी",
    title: "आपकी इन्वेंटरी, आपकी पसंद",
    lead: "आपको किसी और की मर्ज़ी से नहीं चलना, आप खुद तय करते हैं कि आपकी दुकान में क्या बिकेगा। कंपनी की वेबसाइट के माध्यम से आप अपने स्थानीय बाज़ार और ग्राहक माँग के अनुसार उत्पाद चुन सकते हैं।",
    steps: [
      { title: "स्टोर फॉर्मेट चुनें", body: "बेसिक या स्टैंडर्ड, अपनी आवश्यकता के अनुसार।" },
      { title: "लॉगिन ID प्राप्त करें", body: "iYouth द्वारा लॉगिन ID और पासवर्ड।" },
      { title: "वेबसाइट पर लॉगिन करें", body: "iyouthstore.in पर उपलब्ध उत्पाद श्रेणियाँ देखें।" },
      { title: "उत्पाद चुनें", body: "अपनी आवश्यकता के अनुसार उत्पाद और मात्रा चुनें।" },
      { title: "इन्वेंटरी फ़ाइनल करें", body: "कंपनी द्वारा ऑर्डर प्रोसेसिंग एवं आपूर्ति।" },
    ],
    kitTitle: "अनिवार्य मल्टी-कैटेगरी सैंपल किट",
    kit: "iYouth Store किसी एक कैटेगरी की दुकान न बनकर मल्टी-कैटेगरी रिटेल स्टोर के रूप में संचालित हो, इसके लिए सभी प्रमुख उत्पाद श्रेणियों से कम-से-कम एक-एक सैंपल रखना अनिवार्य होगा। यह किट कंपनी द्वारा उपलब्ध कराई जाएगी। इसके बाद शेष इन्वेंटरी बजट से उद्यमी अपनी पसंद के उत्पाद चुन सकता/सकती है। बेसिक स्टोर में ₹2 लाख तक और स्टैंडर्ड स्टोर में ₹3 लाख तक की इन्वेंटरी।",
  },
  steps: {
    kicker: "यात्रा",
    title: "आवेदन से व्यवसाय की शुरुआत तक नौ कदम",
    items: [
      { title: "आवेदन", body: "प्रारंभिक संपर्क एवं आवेदन।" },
      { title: "बिज़नेस चर्चा", body: "स्टोर फॉर्मेट का चयन।" },
      { title: "सत्यापन", body: "आवश्यक सत्यापन एवं प्रक्रिया।" },
      { title: "रजिस्ट्रेशन", body: "स्टोर रजिस्ट्रेशन एवं राशि जमा।" },
      { title: "स्टोर सेटअप", body: "स्टोर स्थापना कार्य।" },
      { title: "इन्वेंटरी चयन", body: "लॉगिन के माध्यम से इन्वेंटरी चयन।" },
      { title: "आपूर्ति", body: "इन्वेंटरी आपूर्ति और स्टोर की व्यवस्था।" },
      { title: "लॉन्च", body: "प्रशिक्षण, प्रचार और स्टोर लॉन्च।" },
      { title: "निरंतर सहयोग", body: "बिक्री और बिज़नेस सहयोग।" },
    ],
  },
  support: {
    kicker: "सहयोग",
    title: "iYouth का निरंतर बिज़नेस सपोर्ट",
    lead: "स्टोर की शुरुआत के बाद भी iYouth उद्यमी को आवश्यक प्रशिक्षण, मार्गदर्शन, मार्केटिंग एवं बिज़नेस सपोर्ट देता है। स्टोर खोलने के बाद आप अकेले नहीं हैं।",
    items: [
      { title: "स्टोर सेटअप सपोर्ट", body: "स्टोर स्थापना में पूर्ण सहयोग।" },
      { title: "प्रोडक्ट और सप्लाई सपोर्ट", body: "उत्पाद आपूर्ति में निरंतर सहायता।" },
      { title: "स्टोर मैनेजमेंट ट्रेनिंग", body: "स्टोर प्रबंधन का व्यावहारिक प्रशिक्षण।" },
      { title: "सेल्स ट्रेनिंग", body: "बिक्री कौशल विकास हेतु प्रशिक्षण।" },
      { title: "ऑनलाइन और ऑफलाइन बिक्री मार्गदर्शन", body: "ऑनलाइन एवं ऑफलाइन बिक्री मार्गदर्शन।" },
      { title: "डिजिटल मार्केटिंग सपोर्ट", body: "डिजिटल प्रचार में व्यावसायिक सहायता।" },
      { title: "डिलीवरी सपोर्ट", body: "जहाँ उपलब्ध हो, वहाँ डिलीवरी सहायता।" },
      { title: "इन्वेंटरी और रिप्लेसमेंट सपोर्ट", body: "लागू कंपनी नीति के अनुसार।" },
    ],
  },
  faq: {
    kicker: "सवाल",
    title: "आवेदन से पहले",
    items: [
      { q: "क्या स्टोर खोलने के लिए अनुभव चाहिए?", a: "नहीं। कोई विशेष योग्यता या अनुभव नहीं चाहिए। iYouth आपको सब सिखाएगा।" },
      { q: "कितनी पूँजी चाहिए?", a: "बेसिक स्टोर के लिए ₹3.50 लाख या स्टैंडर्ड स्टोर के लिए ₹5.00 लाख, सेटअप और इन्वेंटरी मिलाकर।" },
      { q: "मेरी दुकान में क्या बिकेगा, यह कौन तय करेगा?", a: "आप। अनिवार्य सैंपल किट के बाद बाकी उत्पाद आप iyouthstore.in पर खुद चुनते हैं।" },
      { q: "क्या आय की गारंटी है?", a: "नहीं। यह एक बिज़नेस अवसर है; बिक्री और लाभ आपके बाज़ार, चयन और मेहनत पर निर्भर करते हैं।" },
      { q: "क्या यह सरकारी योजना है?", a: "नहीं। iYouth Store, iYouth Pvt. Ltd. नाम की प्राइवेट कंपनी द्वारा चलाया जाता है।" },
    ],
  },
  proof: {
    title: "स्टोर बिलासपुर जिले में चालू हैं",
    body: "खैरी, मोरू (तखतपुर), चटौना, बेलगहना और खुर्दूर सहित कई गाँवों में महिलाओं द्वारा संचालित स्टोर खुल चुके हैं। जब गाँव की महिलाएँ यह कर सकती हैं, तो आप क्यों नहीं?",
    photoAlt: "जिला समन्वय केंद्र में महिलाएँ और अधिकारी लाल फीता काटते हुए",
    caption: "जिला समन्वय केंद्र में फीता काटने का क्षण",
  },
  cta: { title: "आज ही अपना iYouth Store शुरू करें", apply: "iyouthstore.in पर आवेदन करें", helpline: "हेल्पलाइन" },
};

export const storeContent: Record<Locale, StoreContent> = { en, hi };
