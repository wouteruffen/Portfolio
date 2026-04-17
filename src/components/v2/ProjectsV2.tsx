import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import projectWeb from "@/assets/project-web.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectProduct from "@/assets/project-product.jpg";
// @ts-ignore
import "@fontsource/anton";

const DARK_BG = "hsl(0, 0%, 8%)";
const GRID_BG = {
  backgroundImage: `
    linear-gradient(hsl(0 0% 100% / 0.07) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 100% / 0.07) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

const projects = [
  {
    title: "Webdesign & Development",
    description: "Moderne, snelle websites die converteren. Van concept tot lancering.",
    tags: ["Responsive Design", "Interaction Design", "CMS Integratie", "SEO Optimalisatie"],
    image: projectWeb,
    href: "/webdesign",
  },
  {
    title: "Merkidentiteit",
    description: "Visuele identiteiten die blijven hangen. Logo's, huisstijlen en brandbooks.",
    tags: ["Branding", "Logo Design", "Strategie", "Brand Guidelines"],
    image: projectBrand,
    href: "/merkidentiteit",
  },
  {
    title: "Digitale Producten",
    description: "Apps en platformen die complexe problemen simpel maken.",
    tags: ["Product Design", "UI/UX", "Prototyping", "Development"],
    image: projectProduct,
    href: "/digitale-producten",
  },
];

const ProjectsV2 = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="projecten"
      className="min-h-screen py-24 relative snap-start"
      style={{ backgroundColor: DARK_BG, ...GRID_BG }}
    >
      {/* Big bold header */}
      <div className="px-6 md:px-16 lg:px-24 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-center gap-2"
        >
          <h2
            className="text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[-0.02em] text-foreground/80 uppercase text-center font-display font-extrabold"
          >
            Wat wij doen
          </h2>
          <span className="text-foreground/40 text-xs md:text-sm font-body mt-2 md:mt-4">(Services)</span>
        </motion.div>
      </div>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/* Project list — accordion style */}
      <div className="px-6 md:px-16 lg:px-24 max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-foreground/10"
              onMouseEnter={() => setExpandedIndex(i)}
              onMouseLeave={() => setExpandedIndex(null)}
            >
              {/* Row header */}
              <Link
                to={project.href}
                className="flex items-center justify-between py-8 md:py-10 group"
              >
                <div className="flex items-center gap-6 md:gap-12">
                   <span className="text-foreground/30 text-sm md:text-base font-body">
                    0{i + 1}<span className="text-secondary">.</span>
                  </span>
                  <h3 className="text-foreground text-xl md:text-3xl font-display font-extrabold uppercase tracking-wide group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>

              {/* Expandable content — slides down on hover */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 pb-10">
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden rounded-sm">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={800}
                          height={500}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col justify-center">
                        <p className="text-foreground/60 font-body text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1.5 border border-foreground/15 text-foreground/50 font-body rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsV2;
