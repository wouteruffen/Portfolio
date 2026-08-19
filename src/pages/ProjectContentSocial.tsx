import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";
// Real client work — native-resolution final artwork (1080x1350 / 1080x1920,
// Instagram's own post/story dimensions) rather than screenshots of a phone
// feed. That distinction is deliberate: a screenshot of a feed grid is a
// photo of small thumbnails, so blowing one up to hero size in a layout
// always looks soft, no matter which export you pick. These are the actual
// source files, so they stay sharp at real display size.
import djTalentroomPost from "@/assets/social-media/DJ Contest.jpg";
import djTalentroomStay from "@/assets/social-media/DJ TALENTROOM 2 .jpg";
import djTalentroomBigNews from "@/assets/social-media/STORY - COMING SOON .jpg";
import gronings from "@/assets/social-media/GRONINGS FINEST POST.jpg";
import kopjek1 from "@/assets/social-media/KOPJEK_CLUBTOUR_ARTWORK.jpg";
import kopjek2 from "@/assets/social-media/KOPJEK_CLUBTOUR_ARTWORK2.jpg";
import kopjek3 from "@/assets/social-media/KOPJEK_CLUBTOUR_ARTWORK3.jpg";
import kopjek4 from "@/assets/social-media/KOPJEK_CLUBTOUR_ARTWORK4.jpg";
import levi from "@/assets/social-media/LEVI - MOOVLINE.jpg";
import tonightFlip from "@/assets/social-media/TONIGHT WE FLIP BAR FIXY.jpg";

// Row-major order for a 2x2 grid: Groningen / Utrecht on top,
// Leiden / Zwolle underneath — this array order is also what mobile falls
// back to when the grid collapses to a single column, so it doubles as the
// intended reading order at every breakpoint.
const KOPJEK_GRID = [
  { src: kopjek4, city: "Groningen" },
  { src: kopjek1, city: "Utrecht" },
  { src: kopjek2, city: "Leiden" },
  { src: kopjek3, city: "Zwolle" },
];

const DISCIPLINES = [
  "Campagnebeelden",
  "Social posts & stories",
  "Terugkerende sjablonen",
  "Aankondigingen",
  "Eventfotografie",
];

/**
 * Same depth-shadow frame treatment used across the other subpages (see
 * FramedDoc in ProjectDesignIdentity) — recreated locally rather than
 * imported so this page doesn't reach into another subpage's file.
 */
const Shot = ({ src, alt, caption, aspectClass }: { src: string; alt: string; caption?: string; aspectClass: string }) => (
  <div>
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
        aria-hidden="true"
      />
      <div className={`relative z-[1] border border-border overflow-hidden ${aspectClass}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover block" loading="lazy" />
      </div>
    </div>
    {caption && <p className="mt-3 text-xs font-body uppercase tracking-[0.15em] text-muted-foreground">{caption}</p>}
  </div>
);

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
            {/* Intro — thesis statement, no image; the real work below carries the page */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-[640px]">
              <h2 className="text-3xl font-antonio font-semibold mb-6">Content die een merk laat leven</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Social media vraagt om meer dan losse plaatjes. Het draait om een visuele lijn die zich laat vertalen naar elk formaat — feed, story, aankondiging — zonder de herkenbaarheid te verliezen.</p>
                <p>Hieronder een selectie van content die ik ontwierp voor merken in de nachtcultuur: van terugkerende campagnesystemen tot content die zich aanpast aan uiteenlopende formaten.</p>
              </div>
            </motion.div>

            {/* Kopjek Clubtour — the opening campaign showcase. A clean 2x2 of
                the four city posters, all the same size: they share the exact
                same native 1080x1350 aspect ratio, so a plain grid keeps every
                tile aligned without any cropping trade-off. Plain fr-based
                grid-cols-2 — the same mechanism as every other multi-image
                row on this page — fills the full page container edge to
                edge. The only size reduction from the original is a wider
                column gap at lg (a native grid property, not a width
                constraint), which lands each tile around ~90% of its
                original size while the section itself stays full-width. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Uitgelichte campagne</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">Een terugkerend sjabloon voor een clubtour</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                Voor de Kopjek Clubtour ontwierp ik één visueel sjabloon — typografie, 3D-vorm, indeling — dat per stad een eigen kleurstelling kreeg. Vier steden, hetzelfde sjabloon, elk met een eigen kleur en line-up.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-x-40">
                {KOPJEK_GRID.map((item) => (
                  <Shot
                    key={item.city}
                    src={item.src}
                    alt={`Kopjek Clubtour aankondiging voor ${item.city}, zelfde sjabloon in eigen kleurstelling`}
                    caption={item.city}
                    aspectClass="aspect-[4/5]"
                  />
                ))}
              </div>
            </motion.div>

            {/* Overview — different brands, different worlds. Plain grid row,
                all three items direct grid children with no per-item wrapper
                or margin, so they share the same row-start alignment and top
                edge exactly — no stagger. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">In de praktijk</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">Andere merken, andere sferen</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                Niet elk merk vraagt om dezelfde toon. Van een moody editorial aankondiging tot warme releasefotografie en een speelse typografische wending — de aanpak verschuift mee met wat het merk nodig heeft.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <Shot
                  src={gronings}
                  alt="Gronings Finest — moody editorial eventaankondiging"
                  caption="Gronings Finest"
                  aspectClass="aspect-[4/5]"
                />
                <Shot
                  src={levi}
                  alt="Levi — Moovline releasefeest, fotografie-gedreven aankondiging"
                  caption="Levi — Moovline"
                  aspectClass="aspect-[4/5]"
                />
                <Shot
                  src={tonightFlip}
                  alt="FIXY Bar — 'Tonight we flip', omgedraaide typografie als visuele wending"
                  caption="Bar FIXY — Flip"
                  aspectClass="aspect-[4/5]"
                />
              </div>
            </motion.div>

            {/* Closing case — one story, three formats. Same composition as
                elsewhere on the page, positioned last as the final strong
                portfolio piece before the CTA. Back to the original fr-based
                3fr/1fr grid, full page-container width. The only reduction
                from the original oversized version is a wider column gap at
                lg — both tracks shrink proportionally (still exactly 3:1),
                landing around ~85-90% of the original size. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Campagne → formaten</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">Eén verhaal, verteld in drie momenten</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                Voor FIXY's DJ Talentroom liep de aankondiging op via stories — "stay tuned", "big news soon" — voordat de feed-post de line-up onthulde. Zelfde visuele systeem, drie momenten, drie formaten.
              </p>
              <div className="grid md:grid-cols-[3fr_1fr] gap-6 md:gap-8 lg:gap-x-36">
                <Shot
                  src={djTalentroomPost}
                  alt="FIXY DJ Talentroom — feed post met line-up onthulling"
                  caption="Feed post — line-up onthuld"
                  aspectClass="aspect-[4/5]"
                />
                <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-8">
                  <Shot
                    src={djTalentroomStay}
                    alt="FIXY DJ Talentroom — story teaser 'stay tuned'"
                    caption="Story — teaser"
                    aspectClass="aspect-[9/16]"
                  />
                  <Shot
                    src={djTalentroomBigNews}
                    alt="FIXY DJ Talentroom — story aankondiging 'big news soon'"
                    caption="Story — aankondiging"
                    aspectClass="aspect-[9/16]"
                  />
                </div>
              </div>
            </motion.div>

            {/* How I approach this — compact, portfolio-flavored rather than a service menu */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Hoe ik dit aanpak</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[560px] mb-6">
                Geen vast contentpakket en geen vaste hoeveelheid posts per maand — ik kijk naar wat een merk, avond of campagne nodig heeft en bouw de content daaromheen op.
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((item) => (
                  <span key={item} className={`${PILL_CLASS} px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]`}>
                    {item}
                  </span>
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
