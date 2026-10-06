export const NAV_LINKS = [
  "About",
  "Education",
  "Skills",
  "Projects",
  "Experience",
  "Certifications",
  "Contact",
  "Resume",
] as const;

export const FOOTER_SECTION_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Certifications",
] as const;

export const FOOTER_QUICK_LINKS = ["Resume", "Contact"] as const;

export const SOCIAL_LINKS = {
  email: "pathmanathankavinpriya@gmail.com",
  github: "https://github.com/PATHMANATHANKAVINPRIYA",
  linkedin:
    "https://www.linkedin.com/in/pathmanathan-kavin-priya-33628b23a/?originalSubdomain=lk",
  resume:
    "https://drive.google.com/uc?export=download&id=1GPvFR6F0duiFhYRpUd4YPCOGrDINt2SE",
  instagram: "https://instagram.com/kavinpriya_0429",
  whatsapp: "https://wa.me/94769893182",
  facebook:
    "https://web.facebook.com/people/Kavin-Kavin/pfbid02jAipsB86sF5o3F2xMZhB8UANEqDrmBVjbp1HvLxfwWupcemAu8tNHyVU4sC2Mknhl/",
};

export const RESUME_FILE_ID = "1GPvFR6F0duiFhYRpUd4YPCOGrDINt2SE";

export const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;

export const LOGO_LIGHT = "/logo-light.png";

export const LOGO_DARK = "/logo-dark.png";

export function sectionHref(label: string) {
  return `#${label.toLowerCase()}`;
}
