import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";

const ACCENT = "#FF4A2A";

const PALETTE = [
  { name: "Accent",     hsl: "hsl(16, 100%, 57%)",  hex: "#FF4A2A" },
  { name: "Deep Black", hsl: "hsl(0, 0%, 5%)",       hex: "#0D0D0D" },
  { name: "Off-White",  hsl: "hsl(40, 30%, 88%)",    hex: "#E6DFD0" },
  { name: "Dark Grey",  hsl: "hsl(0, 0%, 18%)",      hex: "#2E2E2E" },
  { name: "Mid Grey",   hsl: "hsl(0, 0%, 55%)",      hex: "#8C8C8C" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const AccentBar = ({ height = "h-2", className = "" }: { height?: string; className?: string }) => (
  <div className={`${height} ${className}`} style={{ background: ACCENT }} />
);

const BrandLogo = ({ size = "text-5xl md:text-7xl" }: { size?: string }) => (
  <div className="flex flex-col items-start leading-[0.95]">
    <span className={`${size} font-display font-extrabold italic text-[hsl(0,0%,10%)]`}>
      Studio
    </span>
    <span className={`${size} font-display font-extrabold italic text-[hsl(0,0%,10%)]`}>
      Bit & Beeld<span style={{ color: ACCENT }}>.</span>
    </span>
  </div>
);

const BrandLogoWhite = ({ size = "text-5xl md:text-7xl" }: { size?: string }) => (
  <div className="flex flex-col items-start leading-[0.95]">
    <span className={`${size} font-display font-extrabold italic text-white`}>
      Studio
    </span>
    <span className={`${size} font-display font-extrabold italic text-white`}>
      Bit & Beeld<span style={{ color: ACCENT }}>.</span>
    </span>
  </div>
);

const BrandLogoInline = ({ size = "text-lg", dark = false }: { size?: string; dark?: boolean }) => (
  <span className={`${size} font-display font-extrabold italic ${dark ? "text-[hsl(0,0%,10%)]" : "text-white"}`}>
    Studio Bit & Beeld<span style={{ color: ACCENT }}>.</span>
  </span>
);

const CREAM_BG = "hsl(45, 60%, 88%)";
const DARK_BG  = "hsl(0, 0%, 5%)";

const GRID_BG = {
  backgroundImage: `
    linear-gradient(hsl(0 0% 0% / 0.06) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 0% / 0.06) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

const Brandbook = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 />

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24" style={{ background: CREAM_BG, ...GRID_BG }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-32 left-6 md:left-16 lg:left-24 z-10"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] transition-colors font-body">
              <ArrowLeft size={16} /> Terug naar home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8"
          >
            <BrandLogo size="text-6xl md:text-8xl lg:text-[10rem]" />

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="origin-left w-[280px] md:w-[500px] lg:w-[700px]"
            >
              <AccentBar height="h-4" />
            </motion.div>

            <p className="text-sm text-[hsl(0,0%,40%)] font-body tracking-[0.3em] uppercase mt-2">
              Brand Guidelines — 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-16 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 flex justify-between text-xs text-[hsl(0,0%,50%)] font-body tracking-[0.15em] uppercase"
          >
            <span>Nederland</span>
            <span>bitenbeeld.nl</span>
            <span>v2.0</span>
          </motion.div>
        </section>

        {/* ═══ 01 — LOGO ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: CREAM_BG, ...GRID_BG }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.3em] text-[hsl(0,0%,40%)] font-body uppercase font-bold">01</span>
              <div className="flex-1 h-px bg-[hsl(0,0%,75%)]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)]">Logo</h2>

            {/* Primary logo on dark */}
            <div className="p-16 md:p-28 flex flex-col items-center justify-center mb-12 border border-[hsl(0,0%,80%)]" style={{ background: DARK_BG }}>
              <BrandLogoWhite size="text-5xl md:text-7xl" />
              <div className="mt-8 w-3/5">
                <AccentBar height="h-1.5" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 mb-20">
              <div>
                <h3 className="text-lg font-display font-extrabold mb-3 text-[hsl(0,0%,10%)]">Woordmerk</h3>
                <p className="text-[hsl(0,0%,40%)] font-body leading-relaxed text-sm">
                  Het logo is een clean woordmerk "Studio Bit & Beeld." in italic extra-bold. De gekleurde punt is het enige kleurelement in de tekst — accent spaarzaam en intentioneel toegepast.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-display font-extrabold mb-3 text-[hsl(0,0%,10%)]">Accentlijn</h3>
                <p className="text-[hsl(0,0%,40%)] font-body leading-relaxed text-sm">
                  De accentlijn onder het logo is één kleur — warm rood/oranje (#FF4A2A). Minimaal en consistent met het gehele kleurpalet. Geen meerdere kleuren, geen degradé.
                </p>
              </div>
            </div>

            {/* Logo variants */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,80%)]" style={{ background: DARK_BG }}>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground font-body uppercase mb-6">Dark</p>
                <BrandLogoInline size="text-base" />
                <div className="mt-3 w-[70%]"><AccentBar height="h-0.5" /></div>
              </div>

              <div className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,80%)]" style={{ background: CREAM_BG, ...GRID_BG }}>
                <p className="text-[10px] tracking-[0.3em] text-[hsl(0,0%,55%)] font-body uppercase mb-6">Light</p>
                <BrandLogoInline size="text-base" dark />
                <div className="mt-3 w-[70%]"><AccentBar height="h-0.5" /></div>
              </div>

              <div className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,80%)]" style={{ background: DARK_BG }}>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground font-body uppercase mb-6">Compact</p>
                <span className="text-2xl font-display font-extrabold italic text-white">
                  B&B<span style={{ color: ACCENT }}>.</span>
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 02 — KLEURPALET ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: CREAM_BG, ...GRID_BG }}>
          <AccentBar height="h-1" />
          <motion.div {...fadeUp} className="max-w-6xl mx-auto mt-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.3em] text-[hsl(0,0%,40%)] font-body uppercase font-bold">02</span>
              <div className="flex-1 h-px bg-[hsl(0,0%,75%)]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)]">Kleurpalet</h2>

            <div className="grid grid-cols-5 gap-3 mb-16">
              {PALETTE.map((color, i) => (
                <motion.div
                  key={i}
                  className="aspect-[2/3] relative border border-[hsl(0,0%,80%)]"
                  style={{ background: color.hsl }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className={`text-[10px] font-body font-bold tracking-[0.1em] uppercase ${i === 2 || i === 4 ? "text-[hsl(0,0%,20%)]" : "text-white/90"}`}>
                      {color.name}
                    </p>
                    <p className={`text-[9px] font-body mt-0.5 ${i === 2 || i === 4 ? "text-[hsl(0,0%,40%)]" : "text-white/60"}`}>
                      {color.hex}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <AccentBar height="h-4" />
          </motion.div>
        </section>

        {/* ═══ 03 — TYPOGRAFIE ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: CREAM_BG, ...GRID_BG }}>
          <AccentBar height="h-1" />
          <motion.div {...fadeUp} className="max-w-6xl mx-auto mt-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.3em] text-[hsl(0,0%,40%)] font-body uppercase font-bold">03</span>
              <div className="flex-1 h-px bg-[hsl(0,0%,75%)]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)]">Typografie</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-[hsl(0,0%,75%)] bg-white p-8">
                <AccentBar height="h-1" className="mb-6" />
                <p className="text-xs text-[hsl(0,0%,50%)] font-body tracking-[0.2em] uppercase mb-4">Display — Syne</p>
                <p className="font-display font-extrabold text-8xl leading-none mb-6 text-[hsl(0,0%,10%)]">Aa</p>
                <p className="font-display font-extrabold text-lg tracking-wide text-[hsl(0,0%,10%)]">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-display font-bold text-lg text-[hsl(0,0%,50%)] mt-1">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-display text-base text-[hsl(0,0%,60%)] mt-1">1234567890!@#$%&</p>
                <div className="mt-6 pt-4 border-t border-[hsl(0,0%,85%)] space-y-1">
                  <p className="font-display font-extrabold text-sm text-[hsl(0,0%,10%)]">Extra Bold 800</p>
                  <p className="font-display font-bold text-sm text-[hsl(0,0%,50%)]">Bold 700</p>
                  <p className="font-display text-sm text-[hsl(0,0%,65%)]">Regular 400</p>
                </div>
              </div>

              <div className="border border-[hsl(0,0%,75%)] bg-white p-8">
                <AccentBar height="h-1" className="mb-6" />
                <p className="text-xs text-[hsl(0,0%,50%)] font-body tracking-[0.2em] uppercase mb-4">Body — Inter</p>
                <p className="font-body text-8xl leading-none mb-6 text-[hsl(0,0%,10%)]">Aa</p>
                <p className="font-body font-medium text-lg tracking-wide text-[hsl(0,0%,10%)]">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-body text-lg text-[hsl(0,0%,50%)] mt-1">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-body text-base text-[hsl(0,0%,60%)] mt-1">1234567890!@#$%&</p>
                <div className="mt-6 pt-4 border-t border-[hsl(0,0%,85%)] space-y-1">
                  <p className="font-body font-medium text-sm text-[hsl(0,0%,10%)]">Medium 500</p>
                  <p className="font-body text-sm text-[hsl(0,0%,50%)]">Regular 400</p>
                </div>
              </div>
            </div>

            <div className="mt-24 space-y-0 border border-[hsl(0,0%,75%)] bg-white">
              <div className="px-6 py-4 border-b border-[hsl(0,0%,85%)]">
                <span className="text-[10px] tracking-[0.3em] text-[hsl(0,0%,50%)] font-body uppercase">Type Hiërarchie</span>
              </div>
              {[
                { size: "text-7xl",  label: "Display", text: "Bit & Beeld." },
                { size: "text-5xl",  label: "H1",      text: "Heading One" },
                { size: "text-3xl",  label: "H2",      text: "Heading Two" },
                { size: "text-xl",   label: "H3",      text: "Heading Three" },
                { size: "text-base", label: "Body",    text: "Body text voor paragrafen." },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-0 border-b border-[hsl(0,0%,90%)] last:border-b-0">
                  <div className="w-1.5 self-stretch" style={{ background: ACCENT }} />
                  <div className="flex items-baseline gap-4 py-5 px-6 flex-1">
                    <span className="text-[10px] tracking-[0.2em] text-[hsl(0,0%,55%)] font-body w-16 flex-shrink-0 uppercase">{item.label}</span>
                    <span className={`font-display font-extrabold text-[hsl(0,0%,10%)] ${item.size}`}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ 04 — BEELDTAAL ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: CREAM_BG, ...GRID_BG }}>
          <AccentBar height="h-1" />
          <motion.div {...fadeUp} className="max-w-6xl mx-auto mt-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.3em] text-[hsl(0,0%,40%)] font-body uppercase font-bold">04</span>
              <div className="flex-1 h-px bg-[hsl(0,0%,75%)]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)]">Beeldtaal</h2>

            <div className="grid md:grid-cols-2 gap-20 mb-24">
              <div>
                <h3 className="text-lg font-display font-extrabold mb-6 text-[hsl(0,0%,10%)]">Visuele Principes</h3>
                <ul className="space-y-4 text-[hsl(0,0%,40%)] font-body text-sm">
                  {[
                    "Donkere achtergronden met warm wit voor contrast",
                    "Één accent kleur — warm rood/oranje (#FF4A2A)",
                    "Modern, strak en intentioneel",
                    "Bold woordmerk als kernidentiteit",
                    "Clean compositie, minimale elementen",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-4 h-1.5 flex-shrink-0" style={{ background: ACCENT }} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-display font-extrabold mb-6 text-[hsl(0,0%,10%)]">Do's & Don'ts</h3>
                <div className="space-y-3 font-body text-sm">
                  {[
                    { ok: true,  text: "Gebruik het accent spaarzaam en intentioneel" },
                    { ok: true,  text: "Houd ruime witruimte rondom het logo" },
                    { ok: true,  text: "Gebruik Syne voor koppen, Inter voor bodytekst" },
                    { ok: false, text: "Voeg extra kleuren toe buiten het palet" },
                    { ok: false, text: "Gebruik het logo zonder italic stijl" },
                    { ok: false, text: "Plaats het logo op drukke achtergronden" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`font-bold ${item.ok ? "text-[hsl(0,0%,50%)]" : "text-[#FF4A2A]"}`}>
                        {item.ok ? "✓" : "✗"}
                      </span>
                      <span className="text-[hsl(0,0%,40%)]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-48 md:h-64 flex items-center justify-center border border-[hsl(0,0%,80%)]" style={{ background: DARK_BG }}>
              <div className="flex flex-col items-center gap-4">
                <BrandLogoInline size="text-4xl md:text-6xl" />
                <AccentBar height="h-2" className="w-48 md:w-72" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: CREAM_BG, ...GRID_BG }}>
          <motion.div {...fadeUp} className="text-center flex flex-col items-center">
            <p className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-[hsl(0,0%,10%)]">
              Klaar om samen te bouwen?
            </p>
            <div className="w-32 mb-10"><AccentBar height="h-1" /></div>
            <Link
              to="/#contact"
              className="inline-block px-10 py-4 font-display font-bold text-sm tracking-[0.2em] uppercase transition-opacity hover:opacity-80 text-white"
              style={{ background: "hsl(0, 0%, 10%)" }}
            >
              Start Project
            </Link>
          </motion.div>
        </section>

        <footer className="py-6 px-6 md:px-16 lg:px-24" style={{ background: CREAM_BG, ...GRID_BG }}>
          <AccentBar height="h-1" className="mb-6" />
          <div className="flex items-center justify-between">
            <p className="text-[hsl(0,0%,50%)] text-xs font-body">© 2026 Studio Bit & Beeld</p>
            <div className="w-8 h-1" style={{ background: ACCENT }} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Brandbook;
