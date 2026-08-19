import projectWeb from "@/assets/project-web.jpg";
import projectIdentity from "@/assets/design-identity/image.jpg";
import projectPrint from "@/assets/print/a2-screen-1.jpg";
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
// vertical list) so the two layouts can never drift apart in content. These
// four entries are the site's current main service categories. "Digitale
// Producten" (still live at /digitale-producten, see ProjectProduct) was
// dropped from this list in favor of Design & Identiteit rather than deleted —
// it can be relinked here later if needed.
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
    title: "Design & Identiteit",
    description:
      "Visuele identiteiten die consistent overkomen op elk oppervlak. Van logo en typografie tot kleursystemen en brand guidelines — een merk dat overal hetzelfde verhaal vertelt.",
    highlight: "Eén merk, overal consistent",
    tools: ["Logo Design", "Huisstijl", "Typografie", "Brand Guidelines"],
    image: projectIdentity,
    href: "/design-identity",
  },
  {
    title: "Print & Campaign Design",
    description:
      "Posters, flyers en ander drukwerk dat ook offline overtuigt. Van los grafisch ontwerp tot complete campagnebeelden — vormgeving die staat, op papier en op straat.",
    highlight: "Van concept tot drukklaar",
    tools: ["Illustrator", "Photoshop", "Grafisch Ontwerp", "Drukwerk"],
    image: projectPrint,
    href: "/print-design",
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
];
