import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
// Stand-ins for the real-work mosaic below, borrowed from the site's existing
// image set purely to block out scale, crop and composition. None of these
// are Content & Social Media client work — swap each one for real Instagram/
// content material as it becomes available (see the array below).
// TODO: Replace with final Content & Social Media project image.
import socialPlaceholderHero from "@/assets/about-portrait.jpg";
import socialPlaceholderCampaign from "@/assets/hero-branding.jpg";
import socialPlaceholderReel from "@/assets/hero-product.jpg";
import socialPlaceholderPortrait from "@/assets/hero-portrait.jpg";

const CONTENT_DISCIPLINES = [
  "Fotografie",
  "Video & reels",
  "Social posts",
  "Visuele contentvormgeving",
  "Instagram-beheer",
];

/**
 * Real-work mosaic for "Social media in de praktijk". Every entry is a
 * temporary stand-in image (see imports above) so the composition, scale
 * and spacing can already be evaluated. Swap `src` for the final asset —
 * Instagram profile/feed screenshot, single post, photography, reel/video
 * still, campaign visual or BTS shot — the layout below doesn't need to
 * change when that happens, only these four sources.
 */
const SOCIAL_WORK_IMAGES = {
  hero: { src: socialPlaceholderHero, alt: "Fotografie" }, // TODO: Replace with final Content & Social Media project image.
  campaign: { src: socialPlaceholderCampaign, alt: "Campagnebeeld" }, // TODO: Replace with final Content & Social Media project image.
  reel: { src: socialPlaceholderReel, alt: "Video- of reelbeeld" }, // TODO: Replace with final Content & Social Media project image.
  portrait: { src: socialPlaceholderPortrait, alt: "Portretfotografie" }, // TODO: Replace with final Content & Social Media project image.
};

const ProjectContentSocial = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title="Content & Social Media" />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Intro — custom approach, no fixed package */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-[640px]">
              <h2 className="text-3xl font-antonio font-semibold mb-6">Zichtbaar op de kanalen die tellen</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Geen vast contentpakket en geen standaard aantal posts per maand — ik kijk naar wat een merk, project of campagne daadwerkelijk nodig heeft en bouw de content daaromheen op.</p>
                <p>Dat kan van alles zijn: fotografie, video, reels, social posts, visuele contentvormgeving, het opzetten van een consistente visuele lijn, of het beheren van een Instagram-account.</p>
                <p>Soms is dat een eenmalig project, soms een doorlopende samenwerking. Welke disciplines samenkomen, hangt steeds af van het project.</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {CONTENT_DISCIPLINES.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-secondary/25 bg-secondary/10 text-foreground/70 px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Real work */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Social media in de praktijk</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[560px] mb-10">
                Fotografie, video en social content, samen vormgegeven tot één herkenbare lijn.
              </p>

              {/* Editorial mosaic — one dominant image, two stacked supporting
                  tiles, and a smaller offset tile below for asymmetry. Swap
                  the four sources in SOCIAL_WORK_IMAGES above; this layout
                  doesn't need to change. */}
              <div className="grid md:grid-cols-3 gap-4 md:h-[560px]">
                <div className="md:col-span-2 md:h-full">
                  <div className="aspect-[4/5] md:aspect-auto md:h-full w-full overflow-hidden">
                    <img
                      src={SOCIAL_WORK_IMAGES.hero.src}
                      alt={SOCIAL_WORK_IMAGES.hero.alt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:h-full">
                  <div className="md:flex-1 overflow-hidden">
                    <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
                      <img
                        src={SOCIAL_WORK_IMAGES.campaign.src}
                        alt={SOCIAL_WORK_IMAGES.campaign.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="md:flex-1 overflow-hidden">
                    <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
                      <img
                        src={SOCIAL_WORK_IMAGES.reel.src}
                        alt={SOCIAL_WORK_IMAGES.reel.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex justify-end">
                <div className="w-full md:w-[42%]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={SOCIAL_WORK_IMAGES.portrait.src}
                      alt={SOCIAL_WORK_IMAGES.portrait.alt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What I can help with */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Waar ik bij kan helpen</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[560px] mb-10">
                Geen project is hetzelfde. Afhankelijk van wat er nodig is, combineer ik verschillende disciplines tot een passende aanpak.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Beeld", items: ["Fotografie", "Video & reels", "Campagnecontent"] },
                  { title: "Social", items: ["Instagram-beheer", "Contentplanning", "Social posts"] },
                  { title: "Design", items: ["Templates", "Campagnevisuals", "Doorvertaling van huisstijl"] },
                ].map((block) => (
                  <div key={block.title} className="border-t border-border pt-6">
                    <h3 className="font-antonio font-semibold text-foreground text-lg mb-4">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="text-muted-foreground text-sm font-body flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold mb-8">
                Tijd om <span className="text-secondary">iets te laten zien</span>?
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-[hsl(350,58%,36%)] bg-[hsl(350,58%,36%)] hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                Start Project
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: "hsl(350,58%,36%)" }}
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

export default ProjectContentSocial;
