import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";

const ACCENT = "#FF4A2A";
const DARK_BG = "#0D0D0D";
const OFFWHITE_BG = "hsl(42, 22%, 91%)";

const PALETTE = [
  { name: "Accent",     hex: "#FF4A2A", hsl: "hsl(16, 100%, 57%)" },
  { name: "Deep Black", hex: "#0D0D0D", hsl: "hsl(0, 0%, 5%)" },
  { name: "Off-White",  hex: "#E8E1D4", hsl: "hsl(42, 22%, 91%)" },
  { name: "Dark Grey",  hex: "#2E2E2E", hsl: "hsl(0, 0%, 18%)" },
  { name: "Mid Grey",   hex: "#8C8C8C", hsl: "hsl(0, 0%, 55%)" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const LIGHT_GRID = {
  backgroundImage: `
    linear-gradient(hsl(0 0% 0% / 0.05) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 0% / 0.05) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const DARK_GRID = {
  backgroundImage: `
    linear-gradient(hsl(0 0% 100% / 0.035) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 100% / 0.035) 1px, transparent 1px)
  `,
  backgroundSize: "60px 60px",
};

const AccentBar = ({ height = "h-px", className = "" }: { height?: string; className?: string }) => (
  <div className={`${height} ${className}`} style={{ background: ACCENT }} />
);

const SectionLabel = ({ n, dark = false }: { n: string; dark?: boolean }) => (
  <div className="flex items-center gap-4 mb-4">
    <span className={`text-[10px] tracking-[0.4em] font-body uppercase font-bold ${dark ? "text-white/30" : "text-[hsl(0,0%,40%)]"}`}>{n}</span>
    <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-[hsl(0,0%,75%)]"}`} />
  </div>
);

const BrandLogoWhite = ({ size = "text-5xl md:text-7xl" }: { size?: string }) => (
  <div className="flex flex-col items-start leading-[0.9]">
    <span className={`${size} font-display font-extrabold italic text-white`}>Studio</span>
    <span className={`${size} font-display font-extrabold italic text-white`}>
      Bit & Beeld<span style={{ color: ACCENT }}>.</span>
    </span>
  </div>
);

const BrandLogoDark = ({ size = "text-5xl md:text-7xl" }: { size?: string }) => (
  <div className="flex flex-col items-start leading-[0.9]">
    <span className={`${size} font-display font-extrabold italic text-[hsl(0,0%,10%)]`}>Studio</span>
    <span className={`${size} font-display font-extrabold italic text-[hsl(0,0%,10%)]`}>
      Bit & Beeld<span style={{ color: ACCENT }}>.</span>
    </span>
  </div>
);

const BrandLogoInline = ({ size = "text-lg", dark = false }: { size?: string; dark?: boolean }) => (
  <span className={`${size} font-display font-extrabold italic ${dark ? "text-[hsl(0,0%,10%)]" : "text-white"}`}>
    Studio Bit & Beeld<span style={{ color: ACCENT }}>.</span>
  </span>
);

const Brandbook = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 />

        {/* ═══ HERO — DARK ═══ */}
        <section
          className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-16 lg:px-24"
          style={{ background: DARK_BG, ...DARK_GRID }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-32 left-6 md:left-16 lg:left-24 z-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] text-white/35 hover:text-white/70 transition-colors font-body tracking-[0.2em] uppercase"
            >
              <ArrowLeft size={12} /> Terug naar home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl w-full"
          >
            <p className="text-[10px] text-white/25 font-body tracking-[0.45em] uppercase mb-6">
              Studio Bit & Beeld
            </p>
            <h1
              className="font-logo leading-[0.85] text-white uppercase"
              style={{ fontSize: "clamp(5rem, 18vw, 17rem)" }}
            >
              BRAND<br />BOOK<span style={{ color: ACCENT }}>.</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="origin-left mt-8 w-full max-w-sm"
            >
              <AccentBar height="h-px" />
            </motion.div>
            <p className="mt-5 text-white/25 font-body text-xs tracking-[0.3em] uppercase">
              Brand Guidelines — 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 flex justify-between text-[10px] text-white/18 font-body tracking-[0.22em] uppercase"
          >
            <span>Nederland</span>
            <span>bitenbeeld.nl</span>
            <span>v2.0</span>
          </motion.div>
        </section>

        {/* ═══ 01 — LOGO — LIGHT ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: OFFWHITE_BG, ...LIGHT_GRID }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <SectionLabel n="01" />
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)] uppercase tracking-tight">
              Logo
            </h2>

            <div
              className="p-16 md:p-28 flex flex-col items-center justify-center mb-1 border border-[hsl(0,0%,20%)]"
              style={{ background: DARK_BG }}
            >
              <BrandLogoWhite size="text-5xl md:text-7xl" />
              <div className="mt-8 w-3/5">
                <AccentBar height="h-px" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0.5 mb-16">
              <div
                className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,20%)]"
                style={{ background: DARK_BG }}
              >
                <p className="text-[9px] tracking-[0.3em] text-white/25 font-body uppercase mb-6">Dark</p>
                <BrandLogoInline size="text-sm" />
                <div className="mt-3 w-[70%]"><AccentBar height="h-px" /></div>
              </div>
              <div
                className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,80%)]"
                style={{ background: OFFWHITE_BG }}
              >
                <p className="text-[9px] tracking-[0.3em] text-[hsl(0,0%,55%)] font-body uppercase mb-6">Light</p>
                <BrandLogoInline size="text-sm" dark />
                <div className="mt-3 w-[70%]"><AccentBar height="h-px" /></div>
              </div>
              <div
                className="p-10 flex flex-col items-center justify-center aspect-[4/3] border border-[hsl(0,0%,20%)]"
                style={{ background: DARK_BG }}
              >
                <p className="text-[9px] tracking-[0.3em] text-white/25 font-body uppercase mb-6">Compact</p>
                <span className="text-2xl font-display font-extrabold italic text-white">
                  B&B<span style={{ color: ACCENT }}>.</span>
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-3">Woordmerk</p>
                <p className="text-sm text-[hsl(0,0%,45%)] font-body leading-relaxed">
                  Het logo is een clean woordmerk in italic extra-bold Syne. De gekleurde punt is het enige kleurelement — accent spaarzaam en intentioneel toegepast.
                </p>
              </div>
              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-3">Accentlijn</p>
                <p className="text-sm text-[hsl(0,0%,45%)] font-body leading-relaxed">
                  De accentlijn is één kleur — #FF4A2A. Altijd horizontaal, nooit decoratief. Geen meerdere kleuren, geen degradé.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ DARK STATEMENT — TWO STATES ═══ */}
        <section
          className="relative px-6 md:px-16 lg:px-24 py-44 overflow-hidden"
          style={{ background: DARK_BG, ...DARK_GRID }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            <h2
              className="font-logo text-white uppercase leading-[0.85]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
            >
              TWO STATES<span style={{ color: ACCENT }}>.</span><br />
              <span className="text-white/20">ONE SIGNAL.</span>
            </h2>
            <div className="mt-14 grid md:grid-cols-2 gap-12 max-w-2xl">
              <div>
                <AccentBar height="h-px" className="mb-4" />
                <p className="text-white/45 font-body text-sm leading-relaxed">
                  Donker en licht. Beide zijn thuis voor het merk. Eén consistent systeem in twee contexten.
                </p>
              </div>
              <div>
                <AccentBar height="h-px" className="mb-4" />
                <p className="text-white/45 font-body text-sm leading-relaxed">
                  Het accent (#FF4A2A) is het enige vaste signaal — aanwezig in beide states, altijd intentioneel.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 02 — KLEURPALET — LIGHT ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: OFFWHITE_BG, ...LIGHT_GRID }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <SectionLabel n="02" />
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)] uppercase tracking-tight">
              Kleurpalet
            </h2>

            <div className="grid grid-cols-5 gap-2 mb-14">
              {PALETTE.map((color, i) => (
                <motion.div
                  key={i}
                  className="aspect-[2/3] relative border border-[hsl(0,0%,80%)]"
                  style={{ background: color.hsl }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className={`text-[10px] font-body font-bold tracking-[0.1em] uppercase ${i === 2 ? "text-[hsl(0,0%,25%)]" : "text-white/90"}`}>
                      {color.name}
                    </p>
                    <p className={`text-[9px] font-body mt-0.5 ${i === 2 ? "text-[hsl(0,0%,45%)]" : "text-white/55"}`}>
                      {color.hex}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-0 border border-[hsl(0,0%,78%)] bg-white">
              {[
                {
                  label: "Primair accent",
                  body: "#FF4A2A — het enige kleuraccent. Spaarzaam toegepast op punten, lijnen en interactie-elementen.",
                },
                {
                  label: "Neutraal systeem",
                  body: "Donker zwart en warm off-white als basis. Geen extra kleuraccenten buiten het systeem.",
                },
                {
                  label: "Grijsschaal",
                  body: "Dark grey en mid grey voor structuur, dividers en ondersteunende UI-elementen.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="p-8 border-r border-[hsl(0,0%,88%)] last:border-r-0">
                  <AccentBar height="h-px" className="mb-5" />
                  <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-3">{label}</p>
                  <p className="text-sm text-[hsl(0,0%,35%)] font-body leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ 03 — TYPOGRAFIE — LIGHT ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: OFFWHITE_BG, ...LIGHT_GRID }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <SectionLabel n="03" />
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)] uppercase tracking-tight">
              Typografie
            </h2>

            <div className="grid md:grid-cols-3 gap-2 mb-16">
              <div className="bg-white border border-[hsl(0,0%,78%)] p-8">
                <AccentBar height="h-px" className="mb-6" />
                <p className="text-[9px] text-[hsl(0,0%,50%)] font-body tracking-[0.3em] uppercase mb-4">Impact — Anton</p>
                <p className="font-logo text-8xl leading-none mb-4 text-[hsl(0,0%,10%)]">Aa</p>
                <p className="font-logo text-xl tracking-wide text-[hsl(0,0%,10%)]">ABCDEFGHIJ</p>
                <p className="font-logo text-lg text-[hsl(0,0%,55%)] mt-1">KLMNOPQRST</p>
                <div className="mt-5 pt-4 border-t border-[hsl(0,0%,90%)]">
                  <p className="font-logo text-[10px] text-[hsl(0,0%,40%)] tracking-wide">
                    Logo · Impacttitels · Hero
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[hsl(0,0%,78%)] p-8">
                <AccentBar height="h-px" className="mb-6" />
                <p className="text-[9px] text-[hsl(0,0%,50%)] font-body tracking-[0.3em] uppercase mb-4">Headlines — Syne</p>
                <p className="font-display font-extrabold text-8xl leading-none mb-4 text-[hsl(0,0%,10%)]">Aa</p>
                <p className="font-display font-extrabold text-xl text-[hsl(0,0%,10%)]">ABCDEFGHIJ</p>
                <p className="font-display font-bold text-lg text-[hsl(0,0%,55%)] mt-1">klmnopqrst</p>
                <div className="mt-5 pt-4 border-t border-[hsl(0,0%,90%)] space-y-0.5">
                  <p className="font-display font-extrabold text-[10px] text-[hsl(0,0%,10%)]">Extra Bold 800</p>
                  <p className="font-display font-bold text-[10px] text-[hsl(0,0%,55%)]">Bold 700</p>
                </div>
              </div>

              <div className="bg-white border border-[hsl(0,0%,78%)] p-8">
                <AccentBar height="h-px" className="mb-6" />
                <p className="text-[9px] text-[hsl(0,0%,50%)] font-body tracking-[0.3em] uppercase mb-4">Body — Inter</p>
                <p className="font-body text-8xl leading-none mb-4 text-[hsl(0,0%,10%)]">Aa</p>
                <p className="font-body font-medium text-xl text-[hsl(0,0%,10%)]">ABCDEFGHIJ</p>
                <p className="font-body text-lg text-[hsl(0,0%,55%)] mt-1">klmnopqrst</p>
                <div className="mt-5 pt-4 border-t border-[hsl(0,0%,90%)] space-y-0.5">
                  <p className="font-body font-medium text-[10px] text-[hsl(0,0%,10%)]">Medium 500</p>
                  <p className="font-body text-[10px] text-[hsl(0,0%,55%)]">Regular 400</p>
                </div>
              </div>
            </div>

            <div className="border border-[hsl(0,0%,78%)] bg-white overflow-hidden">
              <div className="px-6 py-3 border-b border-[hsl(0,0%,88%)]">
                <span className="text-[9px] tracking-[0.4em] text-[hsl(0,0%,50%)] font-body uppercase">Typehiërarchie</span>
              </div>
              {[
                { size: "text-5xl",  label: "Display", font: "font-logo",                      text: "STUDIO B&B" },
                { size: "text-4xl",  label: "H1",      font: "font-display font-extrabold",    text: "Heading One" },
                { size: "text-2xl",  label: "H2",      font: "font-display font-bold",         text: "Heading Two" },
                { size: "text-lg",   label: "H3",      font: "font-display font-bold",         text: "Heading Three" },
                { size: "text-sm",   label: "Body",    font: "font-body",                      text: "Body text voor paragrafen en UI-elementen." },
                { size: "text-xs",   label: "Label",   font: "font-body tracking-[0.2em]",     text: "LABEL / CAPTION" },
              ].map((item) => (
                <div key={item.label} className="flex items-center border-b border-[hsl(0,0%,92%)] last:border-b-0">
                  <div className="w-1 self-stretch flex-shrink-0" style={{ background: ACCENT }} />
                  <div className="flex items-baseline gap-6 py-4 px-6 flex-1 min-w-0">
                    <span className="text-[9px] tracking-[0.2em] text-[hsl(0,0%,55%)] font-body w-14 flex-shrink-0 uppercase">
                      {item.label}
                    </span>
                    <span className={`${item.font} text-[hsl(0,0%,10%)] ${item.size} truncate`}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ DARK STATEMENT — BUILT FOR THE BLACK CANVAS ═══ */}
        <section
          className="relative px-6 md:px-16 lg:px-24 py-44 overflow-hidden"
          style={{ background: DARK_BG, ...DARK_GRID }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            <h2
              className="font-logo text-white uppercase leading-[0.85]"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 8rem)" }}
            >
              BUILT FOR<br />THE BLACK<br /><span style={{ color: ACCENT }}>CANVAS.</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-12 max-w-2xl">
              <div>
                <AccentBar height="h-px" className="mb-4" />
                <p className="text-white/45 font-body text-sm leading-relaxed">
                  Het primaire canvas is donker. Sterk contrast, intentioneel. Wit lettertype op zwart geeft karakter zonder ruis.
                </p>
              </div>
              <div>
                <AccentBar height="h-px" className="mb-4" />
                <p className="text-white/45 font-body text-sm leading-relaxed">
                  Het lichte systeem is het complement — gebruikt voor uitleg, richtlijnen en documentatie, niet als standaard.
                </p>
              </div>
            </div>

            <div className="mt-20 pt-16 border-t border-white/[0.07] flex items-end justify-between flex-wrap gap-6">
              <BrandLogoWhite size="text-4xl md:text-5xl" />
              <AccentBar height="h-px" className="w-24 md:w-48 self-end" />
            </div>
          </motion.div>
        </section>

        {/* ═══ 04 — GRID & LAYOUT — LIGHT ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: OFFWHITE_BG, ...LIGHT_GRID }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <SectionLabel n="04" />
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)] uppercase tracking-tight">
              Grid & Lay-out
            </h2>

            <div className="grid md:grid-cols-2 gap-20 mb-20">
              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-4">Spacing systeem</p>
                <p className="text-sm text-[hsl(0,0%,45%)] font-body leading-relaxed mb-8">
                  Ruimte is een stijlmiddel. Gebruik ruime marges en consistente paddings. Witruimte definieert de compositie — kleur vult nooit de lege ruimte.
                </p>
                <div className="space-y-3 bg-white border border-[hsl(0,0%,78%)] p-6">
                  {[
                    { label: "XS", val: "8px" },
                    { label: "S",  val: "16px" },
                    { label: "M",  val: "32px" },
                    { label: "L",  val: "64px" },
                    { label: "XL", val: "128px" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="text-[10px] text-[hsl(0,0%,50%)] font-body w-5 flex-shrink-0">{label}</span>
                      <div className="h-px flex-1 bg-[hsl(0,0%,82%)]" />
                      <span className="text-[10px] text-[hsl(0,0%,50%)] font-body">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-4">Kolommen</p>
                <p className="text-sm text-[hsl(0,0%,45%)] font-body leading-relaxed mb-8">
                  12-kolom grid op desktop. 4 kolommen op tablet. 1 kolom op mobiel. Marges zijn altijd proportioneel aan de breedte.
                </p>
                <div className="bg-white border border-[hsl(0,0%,78%)] p-6">
                  <div className="grid grid-cols-12 gap-1 mb-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 border border-[hsl(0,0%,82%)]"
                        style={{ background: i < 4 ? `${ACCENT}20` : "transparent" }}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-[hsl(0,0%,55%)] font-body tracking-[0.2em] uppercase">4 / 12 kolommen actief</p>
                </div>
              </div>
            </div>

            <div>
              <AccentBar height="h-px" className="mb-5" />
              <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-6">Dividers</p>
              <div className="bg-white border border-[hsl(0,0%,78%)] p-8 grid md:grid-cols-3 gap-8">
                {[
                  { label: "Accent", style: { background: ACCENT } },
                  { label: "Light",  style: { background: "hsl(0,0%,80%)" } },
                  { label: "Dark",   style: { background: "hsl(0,0%,18%)" } },
                ].map(({ label, style }) => (
                  <div key={label}>
                    <p className="text-[9px] text-[hsl(0,0%,55%)] font-body tracking-[0.2em] uppercase mb-3">{label}</p>
                    <div className="h-px w-full" style={style} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 05 — UI ELEMENTEN — LIGHT ═══ */}
        <section className="px-6 md:px-16 lg:px-24 py-32" style={{ background: OFFWHITE_BG, ...LIGHT_GRID }}>
          <motion.div {...fadeUp} className="max-w-6xl mx-auto">
            <SectionLabel n="05" />
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-20 text-[hsl(0,0%,10%)] uppercase tracking-tight">
              UI Elementen
            </h2>

            <div className="grid md:grid-cols-2 gap-16 mb-16">
              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-6">Knoppen</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      className="px-7 py-3 font-body font-medium text-[10px] tracking-[0.2em] uppercase text-white"
                      style={{ background: DARK_BG }}
                    >
                      Primair
                    </button>
                    <button
                      className="px-7 py-3 font-body font-medium text-[10px] tracking-[0.2em] uppercase text-white"
                      style={{ background: ACCENT }}
                    >
                      Accent
                    </button>
                    <button className="px-7 py-3 font-body font-medium text-[10px] tracking-[0.2em] uppercase text-[hsl(0,0%,10%)] border border-[hsl(0,0%,20%)]">
                      Outline
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-5 py-2 font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(0,0%,50%)] border border-[hsl(0,0%,78%)]">
                      Ghost
                    </button>
                    <button className="font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(0,0%,20%)] underline underline-offset-4">
                      Link
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <AccentBar height="h-px" className="mb-5" />
                <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-6">Tags & Labels</p>
                <div className="flex flex-wrap gap-3">
                  {["Webdesign", "UI/UX", "Branding", "TypeScript", "React"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] font-body tracking-[0.15em] uppercase border border-[hsl(0,0%,22%)] text-[hsl(0,0%,22%)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className="px-3 py-1 text-[10px] font-body tracking-[0.15em] uppercase text-white"
                    style={{ background: ACCENT }}
                  >
                    Nieuw
                  </span>
                </div>
              </div>
            </div>

            <div>
              <AccentBar height="h-px" className="mb-5" />
              <p className="text-[10px] tracking-[0.25em] text-[hsl(0,0%,40%)] font-body uppercase mb-6">Projectkaart</p>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="border border-[hsl(0,0%,20%)] p-8" style={{ background: DARK_BG }}>
                  <AccentBar height="h-px" className="mb-6" />
                  <p className="text-[9px] tracking-[0.3em] text-white/30 font-body uppercase mb-4">Webdesign · 2026</p>
                  <h4 className="font-display font-extrabold text-xl text-white mb-3">Projectnaam</h4>
                  <p className="text-sm text-white/40 font-body leading-relaxed mb-6">
                    Korte beschrijving van het project in twee regels. Doel, context, resultaat.
                  </p>
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-white/35 flex items-center gap-1.5">
                    Bekijk project <span style={{ color: ACCENT }}>→</span>
                  </span>
                </div>
                <div className="border border-[hsl(0,0%,78%)] p-8 bg-white">
                  <AccentBar height="h-px" className="mb-6" />
                  <p className="text-[9px] tracking-[0.3em] text-[hsl(0,0%,55%)] font-body uppercase mb-4">Branding · 2026</p>
                  <h4 className="font-display font-extrabold text-xl text-[hsl(0,0%,10%)] mb-3">Projectnaam</h4>
                  <p className="text-sm text-[hsl(0,0%,45%)] font-body leading-relaxed mb-6">
                    Korte beschrijving van het project in twee regels. Doel, context, resultaat.
                  </p>
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[hsl(0,0%,50%)] flex items-center gap-1.5">
                    Bekijk project <span style={{ color: ACCENT }}>→</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ CTA — DARK ═══ */}
        <section
          className="px-6 md:px-16 lg:px-24 py-44"
          style={{ background: DARK_BG, ...DARK_GRID }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <p className="text-[10px] text-white/20 font-body tracking-[0.45em] uppercase mb-6">Klaar?</p>
            <h2
              className="font-logo text-white uppercase leading-[0.85] mb-10"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              SAMEN<br />BOUWEN<span style={{ color: ACCENT }}>.</span>
            </h2>
            <AccentBar height="h-px" className="w-40 mb-10" />
            <Link
              to="/#contact"
              className="inline-block px-10 py-4 font-body font-medium text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-70 text-[hsl(0,0%,10%)] bg-white"
            >
              Start Project
            </Link>
          </motion.div>
        </section>

        <footer className="py-6 px-6 md:px-16 lg:px-24" style={{ background: DARK_BG }}>
          <AccentBar height="h-px" className="mb-6" />
          <div className="flex items-center justify-between">
            <p className="text-white/25 text-[10px] font-body tracking-[0.18em] uppercase">
              © 2026 Studio Bit & Beeld
            </p>
            <div className="w-5 h-px" style={{ background: ACCENT }} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Brandbook;
