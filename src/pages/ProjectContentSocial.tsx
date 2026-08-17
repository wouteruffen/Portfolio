import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
// Real Instagram feed screenshots for the mosaic below — actual accounts,
// not stock/unrelated imagery. Case-study copy (client/account names) isn't
// finalized yet, so nothing here is labeled beyond a generic description.
// Cropped via object-position (see JSX) to hide the phone status bar /
// Instagram nav chrome rather than the content itself.
// TODO: Replace/relabel once the accounts behind these are confirmed.
import socialFeedDominant from "@/assets/social-media/IMG_0312.jpg";
import socialFeedSupport from "@/assets/social-media/IMG_0308.jpg";
import socialFeedOffset from "@/assets/social-media/IMG_0310.jpg";

const CONTENT_DISCIPLINES = [
  "Fotografie",
  "Video & reels",
  "Social posts",
  "Visuele contentvormgeving",
  "Instagram-beheer",
];

/**
 * Real-work mosaic for "Social media in de praktijk" — three actual
 * Instagram feed screenshots (different accounts) standing in until
 * case-study copy is finalized. `object-bottom` on each <img> crops the
 * phone status bar / Instagram nav chrome off the top rather than the
 * content grid itself.
 */
const FEED_SCREENSHOTS = {
  dominant: { src: socialFeedDominant, alt: "Screenshot van een Instagram-feed met content en fotografie" },
  support: { src: socialFeedSupport, alt: "Screenshot van een Instagram-feed met eventcontent" },
  offset: { src: socialFeedOffset, alt: "Screenshot van een Instagram-feed met projectfoto's" },
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
                Een blik op de feeds en content die ik vormgeef en beheer.
              </p>

              {/* Editorial mosaic — dominant feed screenshot, one support
                  beside it, a third offset below-left with whitespace to
                  its right. Source images are pre-cropped (see the PNG ->
                  JPG export) to remove the phone status bar / Instagram nav
                  chrome, so a plain object-cover is enough here. */}
              <div className="grid md:grid-cols-3 md:grid-rows-[520px] gap-4">
                <div className="md:col-span-2 md:h-full">
                  <div className="aspect-[4/5] md:aspect-auto md:h-full w-full overflow-hidden">
                    <img
                      src={FEED_SCREENSHOTS.dominant.src}
                      alt={FEED_SCREENSHOTS.dominant.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:col-span-1 md:h-full">
                  <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
                    <img
                      src={FEED_SCREENSHOTS.support.src}
                      alt={FEED_SCREENSHOTS.support.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <div className="w-full md:w-[42%]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={FEED_SCREENSHOTS.offset.src}
                      alt={FEED_SCREENSHOTS.offset.alt}
                      className="w-full h-full object-cover"
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
