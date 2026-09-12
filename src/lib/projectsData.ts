import projectWeb from "@/assets/Webdesign 1600x1000.png";
import projectIdentity from "@/assets/Branding 1600x1000.png";
import projectPrint from "@/assets/MOCKUP BRANDING - DONE.png";
import projectContentSocial from "@/assets/Social Media 1600x1000.png";
import type { Language } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";

export interface ProjectEntry {
  title: string;
  description: string;
  tools: string[];
  image: string;
  href: string;
}

// Shared between ProjectsV2 (desktop card stack) and MobileProjects (mobile
// vertical list) so the two layouts can never drift apart in content, in
// either language. Images/hrefs are language-independent; copy comes from
// the central translations so this list is always in sync with the rest of
// the site's detected language. "Digitale Producten" (still live at
// /digitale-producten, see ProjectProduct) was dropped from this list in
// favor of Design & Identiteit rather than deleted — it can be relinked
// here later if needed.
export const getProjects = (language: Language): ProjectEntry[] => {
  const t = translations[language].projects;
  return [
    { ...t.webdesign, image: projectWeb, href: "/webdesign" },
    { ...t.designIdentity, image: projectIdentity, href: "/design-identity" },
    { ...t.printDesign, image: projectPrint, href: "/print-design" },
    { ...t.contentSocial, image: projectContentSocial, href: "/content-social-media" },
  ];
};
