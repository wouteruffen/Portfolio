import projectWeb from "@/assets/project-web.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectProduct from "@/assets/project-product.jpg";
import projectCampagne from "@/assets/hero-branding.jpg";

export interface ProjectEntry {
  title: string;
  description: string;
  highlight: string;
  tools: string[];
  image: string;
  href: string;
}

// Shared between ProjectsV2 (desktop card stack) and MobileProjects (mobile
// vertical list) so the two layouts can never drift apart in content.
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
    title: "Merkidentiteit",
    description:
      "Visuele identiteiten die herkenbaar blijven en een krachtig verhaal vertellen. Van logo-ontwerp en kleurpalet tot complete huisstijl en uitgebreid brandbook.",
    highlight: "Van concept tot brandbook",
    tools: ["Figma", "Illustrator", "Branding", "Strategie"],
    image: projectBrand,
    href: "/merkidentiteit",
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
  {
    title: "Campagne Design",
    description:
      "Opvallende visuele campagnes die aandacht trekken en een boodschap scherp overbrengen. Print, social media en digitale uitingen — consistent en op maat gemaakt.",
    highlight: "Art Direction",
    tools: ["Photoshop", "Illustrator", "Art Direction", "Campagne"],
    image: projectCampagne,
    href: "/merkidentiteit",
  },
];
