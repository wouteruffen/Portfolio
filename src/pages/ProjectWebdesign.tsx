import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import websiteTimo from "@/assets/website-timo.jpg";
import websiteTimoTrust from "@/assets/website-timo2-trust.jpg";
import websiteTimoReview from "@/assets/website-timo2-review.jpg";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";

const KRUIZE_DISCIPLINES = ["Webdesign", "Development", "Responsive Design", "UI/UX"];
const KRUIZE_VALUE_PROPS = ["Afspraak is afspraak", "Heldere communicatie", "Netjes opgeleverd"];

/** Depth-shadow framed screenshot — same offset-card treatment as the hero project image, reused so every Kruize visual belongs to one family. */
const FramedShot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative">
    <div
      className="absolute inset-0"
      style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
      aria-hidden="true"
    />
    <div className="relative z-[1] border border-border overflow-hidden">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  </div>
);

const ProjectWebdesign = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title="Webdesign & Development" />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-[640px]">
              <h2 className="text-3xl font-antonio font-semibold text-foreground/80 uppercase tracking-wide mb-4">Websites die werken</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Elk project begint met een duidelijke strategie. Ik ontwerp en bouw websites die niet alleen mooi zijn, maar ook converteren en resultaat opleveren.</p>
                <p>Van snelle landingspagina's tot complexe webapplicaties — alles wordt gebouwd met moderne technologieën zoals React, TypeScript en Tailwind CSS.</p>
                <p>Performance, toegankelijkheid en SEO zijn geen afterthoughts maar fundamenten van elk project.</p>
              </div>
            </motion.div>

            {/* Featured project — Bouwbedrijf Kruize */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-28 md:mt-36">
              <div className="flex justify-end mb-8">
                <a
                  href="https://bouwbedrijfkruize.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs tracking-[0.2em] font-body uppercase text-muted-foreground hover:text-brand-orange transition-colors"
                >
                  Bekijk website
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 items-end mb-10">
                <div>
                  <h3 className="font-antonio font-semibold text-foreground/80 uppercase leading-[0.9] tracking-normal text-4xl md:text-5xl lg:text-6xl">
                    Bouwbedrijf Kruize
                  </h3>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Voor Bouwbedrijf Kruize ontwierp en bouwde ik een complete website die het bedrijf, de dienstverlening en het vakmanschap helder en professioneel presenteert. Een site die vertrouwen wekt, van eerste indruk tot contactaanvraag.
                </p>
              </div>

              {/* Screenshot — untouched, own dark blue/orange identity */}
              <FramedShot
                src={websiteTimo}
                alt="Homepage van bouwbedrijfkruize.nl — website design en development door Studio Bit & Beeld"
              />

              {/* Meta strip */}
              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {[
                    { label: "Client", value: "Bouwbedrijf Kruize" },
                    { label: "Project", value: "Website" },
                    { label: "Rol", value: "Design & Development" },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-body mb-1">{item.label}</span>
                      <span className="font-antonio font-semibold uppercase tracking-wide text-foreground/80 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {KRUIZE_DISCIPLINES.map((tag) => (
                    <span key={tag} className={`${PILL_CLASS} text-[10px] uppercase tracking-[0.18em] font-body px-3 py-1.5`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust — a real photo, an experience claim, three concrete promises */}
              <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="order-2 md:order-1">
                  <FramedShot
                    src={websiteTimoTrust}
                    alt="Over ons-sectie van bouwbedrijfkruize.nl met ervaringsbadge en foto van Timo Kruize"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h4 className="font-antonio font-semibold text-foreground/80 uppercase tracking-wide text-2xl md:text-3xl mb-3">Een gezicht bij het vakmanschap</h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Voor een bouwbedrijf is vertrouwen net zo belangrijk als vakmanschap. In plaats van stockfoto's en vage beloftes koos ik voor een echte foto, een concrete ervaringsclaim en drie heldere, korte beloftes — direct zichtbaar zonder dat de bezoeker hoeft te scrollen.
                  </p>
                  <ul className="space-y-2 mt-5">
                    {KRUIZE_VALUE_PROPS.map((item) => (
                      <li key={item} className="text-foreground/80 text-sm font-body flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-orange flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Social proof — real Google reviews, surfaced rather than hidden */}
              <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h4 className="font-antonio font-semibold text-foreground/80 uppercase tracking-wide text-2xl md:text-3xl mb-3">Reviews die overtuigen sneller dan tekst</h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Echte klantervaringen overtuigen sneller dan verkooptaal. Daarom kregen de Google-reviews een vaste, prominente plek op de site zelf, in plaats van weggestopt achter een externe link.
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="font-antonio font-semibold tracking-wide text-4xl text-brand-orange">5,0</span>
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-[0.2em] leading-tight">
                      Gemiddelde<br />Google-score
                    </span>
                  </div>
                </div>
                <div>
                  <FramedShot
                    src={websiteTimoReview}
                    alt="Echte Google-review van een klant, getoond op de website van Bouwbedrijf Kruize"
                  />
                </div>
              </div>
            </motion.div>

            {/* Process */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Werkwijze</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Discovery", desc: "Doelen, doelgroep en concurrentie in kaart brengen." },
                  { step: "02", title: "Design", desc: "Wireframes en visueel ontwerp in Figma." },
                  { step: "03", title: "Development", desc: "Pixel-perfect bouwen met moderne tech stack." },
                  { step: "04", title: "Launch", desc: "Testen, optimaliseren en live zetten." },
                ].map((item) => (
                  <div key={item.step} className="border-t border-border pt-6">
                    <span className="text-brand-orange font-antonio font-semibold tracking-wide text-2xl">{item.step}</span>
                    <h3 className="font-antonio font-semibold uppercase tracking-wide text-foreground/80 text-lg mt-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-body mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Vercel", "Supabase"].map((tech) => (
                  <span key={tech} className={`${PILL_CLASS} px-4 py-2 text-sm font-body hover:border-brand-orange hover:text-brand-orange`}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold text-foreground/80 uppercase tracking-wide mb-8">
                Klaar voor een nieuwe <span className="text-brand-orange">website</span>?
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-brand-orange bg-brand-orange hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                Start Project
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: "hsl(var(--brand-orange))" }}
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <FooterV2 />
      </div>
    </>
  );
};

export default ProjectWebdesign;
