// Single source for numbers, dates and contact details.
export const facts = {
  liveStores: 30,
  foundedCyfCasa: 2012,
  foundedIyouth: 2026,
  email: "dipeshmishra.iyouth@gmail.com",
  phone: "+91 79878 52989",
  whatsapp: "917987852989",
  storeHelpline: "+91 75090 66690",
  social: {
    facebook: "https://www.facebook.com/dipeshmishra.India",
    instagram: "https://www.instagram.com/dipeshmishra.in",
    x: "https://x.com/dipeshmishra_in",
    youtube: "https://youtube.com/@iyouthstore",
  },
  videos: ["iNveuMb11fQ", "phzfPvxWDNA", "KnfENxxa0L0"],
} as const;

export type PlatformStatus = "live" | "soon";

export const platforms: { domain: string; status: PlatformStatus }[] = [
  { domain: "iyouth.in", status: "live" },
  { domain: "iyouthjob.in", status: "live" },
  { domain: "iyouthstore.in", status: "live" },
  { domain: "cgyouth.in", status: "live" },
  { domain: "iyoutheats.in", status: "soon" },
  { domain: "iyouthnews.in", status: "soon" },
  { domain: "iyouthfitness.in", status: "soon" },
  { domain: "iyouthskill.in", status: "soon" },
  { domain: "iyouthsiksha.in", status: "soon" },
];
