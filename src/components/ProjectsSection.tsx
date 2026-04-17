import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projectWeb from "@/assets/project-web.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectProduct from "@/assets/project-product.jpg";
import MarqueeText from "@/components/MarqueeText";

const projects = [
  {
    title: "Webdesign & Development",
    description: "Moderne, snelle websites die converteren. Van concept tot lancering.",
    tags: ["React", "Design", "UX"],
    image: projectWeb,
    href: "/webdesign",
  },
  {
    title: "Merkidentiteit",
    description: "Visuele identiteiten die blijven hangen. Logo's, huisstijlen en brandbooks.",
    tags: ["Branding", "Logo", "Strategie"],
    image: projectBrand,
    href: "/merkidentiteit",
  },
  {
    title: "Digitale Producten",
    description: "Apps en platformen die complexe problemen simpel maken.",
    tags: ["Product", "UI/UX", "Development"],
    image: projectProduct,
    href: "/digitale-producten",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projecten" className="min-h-screen py-24 relative snap-start">
      {/* Retro grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(25 95% 55%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(25 95% 55%) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />
      {/* Marquee banner */}
      <div className="border-y border-border py-6 mb-16">
        <MarqueeText
          text="Featured Works©"
          speed={15}
          className="text-[12vw] md:text-[8vw] font-display font-extrabold text-foreground leading-none"
        />
      </div>

      {/* Subtitle row */}
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center text-xs text-muted-foreground font-body uppercase tracking-[0.2em] border-b border-border pb-4">
          <span>© Projecten プロジェクト</span>
          <span>(SBB® — 03)</span>
          <span className="hidden md:block">Creative Development</span>
        </div>
      </div>

      {/* Description + CTA */}
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <p className="text-muted-foreground font-body leading-relaxed">
            Elk project is een kans om design en technologie te combineren —
            gedurfde ideeën vormen tot <strong className="text-foreground">strakke digitale ervaringen</strong>,
            gebouwd met intentie, snelheid en visuele helderheid.
          </p>
        </motion.div>
      </div>

      {/* Project grid */}
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <Link to={project.href} className="block cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-4 relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
              </div>
              <span className="text-xs text-muted-foreground font-body">0{i + 1}</span>
              <h3 className="text-xl font-display font-extrabold text-foreground group-hover:text-primary transition-colors mt-1">
                {project.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm font-body">{project.description}</p>
              <div className="flex gap-2 flex-wrap mt-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 border border-border text-muted-foreground font-body">
                    {tag}
                  </span>
                ))}
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second marquee — reverse direction */}
      <div className="border-y border-border py-4 mt-16">
        <MarqueeText
          text="Web · Branding · Product · Design · Code"
          speed={25}
          reverse
          className="text-2xl md:text-4xl font-display font-extrabold text-muted-foreground/30 leading-none"
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
