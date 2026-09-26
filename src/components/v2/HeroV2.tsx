import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface HeroV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const HeroV2 = ({ scrollContainerRef }: HeroV2Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress: heroScroll } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(heroScroll, [0, 1], [0, -80]);
  const bgScale = useTransform(heroScroll, [0, 1], [1, 0.96]);
  const darkOverlayOpacity = useTransform(heroScroll, [0, 0.65], [0, 0.88]);
  const contentOpacity = useTransform(heroScroll, [0, 0.35], [1, 0]);

  return (
    // The outer section is 300vh tall so the sticky panel below can stay
    // pinned for the whole scroll-jack duration, but only that inner 100vh
    // panel is ever actually visible — the rest of this box is empty space
    // sitting in front (in scroll order / z-index) of whatever comes next.
    // Without pointer-events:none here, that empty space would still
    // hit-test as this section and swallow clicks meant for content behind
    // it. The inner sticky panel opts back into pointer-events since it's
    // the part that's genuinely on screen.
    <section ref={sectionRef} style={{ minHeight: "300vh", zIndex: 1 }} className="relative pointer-events-none">
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-auto">

      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ y: bgY, scale: bgScale, height: "110%", top: "-5%", width: "100%", position: "absolute" }}
        >
          <img
            src={heroPortrait}
            alt="Creative portrait"
            className="w-full h-full object-cover"
            width={960}
            height={1200}
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: darkOverlayOpacity }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--cream)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--cream)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div className="absolute inset-0" style={{ opacity: contentOpacity }}>

      {/* Bottom-left description — unprefixed values below are the tablet
          (md, 768–1023) size/spacing (left inset now matches the navbar's
          own md:px-12); `lg:` restores the exact original desktop values.
          Narrower width + tighter line-height (not just a smaller font)
          keeps the block reading as a compact caption at tablet rather
          than a shrunk copy of the wide desktop paragraph. `lg:bottom-6`
          reuses the bottom info bar's own bottom-6 anchor (below) so the
          two sit on the same baseline at desktop, instead of the text
          floating higher on its own offset.
          lg:max-w is derived, not arbitrary: left-24 (96px) + the Start
          Project button's own measured box (~405px incl. its right-24
          inset) + a ~46px gap leaves calc(100vw-643px) as the widest the
          text can go without ever touching the button, so it's clamped to
          that up to a 32rem (three-line) cap — safe at the narrowest lg
          viewport (1024px) and reaches three lines from ~1155px up. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-16 lg:bottom-6 landscape-mobile:bottom-auto left-6 md:left-12 lg:left-24 landscape-mobile:left-[max(1rem,env(safe-area-inset-left))] landscape-mobile:top-32 z-10 max-w-[260px] lg:max-w-[min(32rem,calc(100vw-643px))] landscape-mobile:max-w-[170px]"
      >
        <p className="text-cream/80 text-sm leading-snug lg:text-lg lg:leading-relaxed landscape-mobile:text-[10px] landscape-mobile:leading-tight font-body">
          <span className="text-cream font-semibold">{t.hero.taglineBold}</span>{" "}
          {t.hero.taglineRest}
        </p>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 landscape-mobile:bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-6 md:left-12 lg:left-24 landscape-mobile:left-[max(1rem,env(safe-area-inset-left))] right-6 md:right-12 lg:right-24 landscape-mobile:right-[max(1rem,env(safe-area-inset-right))] flex justify-end items-end text-[10px] text-cream/30 font-body tracking-[0.15em] uppercase z-20"
      >
        {/* Start Project CTA — sized per breakpoint instead of scaled
            uniformly. The unprefixed values are the tablet (md, 768–1023)
            size, since Hero never renders below md anyway; `lg:` restores
            the exact original desktop proportions (px-16/py-5/text-2xl/
            border-[3px]/26px icon) untouched. Without this split, the fixed
            desktop sizing — built for lg+ container widths — ate almost the
            full tablet content width. landscape-mobile shrinks it further
            still, since it has the row to itself. */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 lg:gap-4 landscape-mobile:gap-1.5 px-6 py-3 lg:px-16 lg:py-5 landscape-mobile:px-4 landscape-mobile:py-2 rounded-full border-2 lg:border-[3px] landscape-mobile:border-2 border-brand-orange bg-brand-orange/10 text-brand-orange font-body font-medium text-sm lg:text-2xl landscape-mobile:text-[10px] tracking-[0.1em] uppercase transition-all duration-300 hover:bg-brand-orange hover:text-black hover:border-brand-orange"
        >
          Start Project
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-brand-orange group-hover:text-black">
            <ArrowUpRight className="w-4 h-4 lg:w-[26px] lg:h-[26px] landscape-mobile:w-3 landscape-mobile:h-3" strokeWidth={2.5} />
          </span>
        </a>
      </motion.div>

      </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;
