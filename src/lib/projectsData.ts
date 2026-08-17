import projectWeb from "@/assets/project-web.jpg";
import projectPrint from "@/assets/project-brand.jpg";
import projectProduct from "@/assets/project-product.jpg";
import projectContentSocial from "@/assets/hero-branding.jpg";

export interface ProjectEntry {
  title: string;
  description: string;
  highlight: string;
  tools: string[];
  image: string;
  href: string;
}

// Shared between ProjectsV2 (desktop card stack) and MobileProjects (mobile
// vertical list) so the two layouts can never drift apart in content. The
// four entries here are the site's only main service categories — no
// "Branding & Identiteit" entry until there's enough real branding work to
// dedicate a page to it (see ProjectPrintDesign for where that content
// currently lives instead).
export const PROJECTS: ProjectEntry[] = [
  {
    title: "Webdesign & Development",
    description:
      "Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren. Van strategie en design tot volledige front-end implementatie met de nieuwste technologieën.",
    highlight: "Performance-first",
    tools: ["React", "TypeScript", "Figma", "CMS"],
    image: projectWeb,
    href: "/webdesign",
  },
  {
    title: "Content & Social Media",
    description:
      "Visueel content die opvalt in de feed. Van social media content en fotografie tot video en reels — content die een merk laat leven op de kanalen waar het publiek al is.",
    highlight: "Content dat leeft",
    tools: ["Social Media", "Fotografie", "Video", "Content Design"],
    image: projectContentSocial,
    href: "/content-social-media",
  },
  {
    title: "Print & Design",
    description:
      "Posters, flyers en ander drukwerk dat ook offline overtuigt. Van los grafisch ontwerp tot complete campagnebeelden — vormgeving die staat, op papier en op straat.",
    highlight: "Van concept tot drukklaar",
    tools: ["Illustrator", "Photoshop", "Grafisch Ontwerp", "Drukwerk"],
    image: projectPrint,
    href: "/print-design",
  },
  {
    title: "Digitale Producten",
    description:
      "Apps en platformen die complexe processen vereenvoudigen. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn — van wireframe tot werkend product.",
    highlight: "End-to-end",
    tools: ["React", "TypeScript", "UI/UX", "Prototyping"],
    image: projectProduct,
    href: "/digitale-producten",
  },
];
