import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useThemeTransition } from "@/components/ThemeTransitionProvider";
import { useIsPhoneLayout, useIsTablet, useIsLandscapeMobile } from "@/hooks/use-mobile";
import { BRAND_ORANGE_RGB } from "@/lib/brandColor";
import { LOGO_ZWART, SolidLogoMark } from "@/components/v2/BitBeeldLogo";

/*
 * Scroll offsets (in pixels) for each home-page section.
 * Derived from the fixed heights in the layout:
 *   HeroV2: 300vh  |  About outer: 200vh -100vh margin  |  Projects outer: 650vh -100vh margin  |  Contact outer: 200vh -100vh margin
 */
const SECTION_TARGETS: Record<string, number> = {
  "over-ons":  2   * window.innerHeight,   // 200vh
  "projecten": 3   * window.innerHeight,   // 300vh
  "contact":   8.5 * window.innerHeight,   // 850vh
};

const NAV_ITEMS = [
  { label: "Home",      href: "/"          },
  { label: "Over Mij",  href: "#over-ons"  },
  { label: "Projecten", href: "#projecten" },
  { label: "Contact",   href: "#contact"   },
  { label: "Brandbook", href: "/brandbook" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "Behance",   href: "#" },
];

interface NavbarV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  /**
   * Ref to a sentinel placed at the top of the About section's outer wrapper
   * (Index only). When provided, the navbar observes it via IntersectionObserver
   * and switches to the solid, theme-dependent background exactly when About's
   * opaque panel rises to cover the navbar's own strip. Pages without a Hero
   * simply omit this.
   */
  aboutTopRef?: React.RefObject<HTMLDivElement>;
  /**
   * When true, the navbar renders in its solid, post-Hero state from the very
   * first frame — same brand-orange background, shadow, black logo mark, and
   * theme-aware content colors as Index's navbar once About has covered the
   * Hero — instead of the default transparent Hero state. For pages with no
   * Hero of their own to fade over (e.g. OverMij) that still want the exact
   * "solid" look. Independent of aboutTopRef/solidNav — no scroll or
   * IntersectionObserver involved.
   */
  forceSolid?: boolean;
  /** When true, renders the studio wordmark in the top-left (used by Brandbook). */
  showLogo?: boolean;
  /** When true, hides the light/dark toggle (Brandbook has its own contrast system). */
  hideThemeToggle?: boolean;
  /**
   * If provided, called when the user clicks a section anchor (#over-ons etc.)
   * while already on the home page. Use the smooth-scroll hook's scrollTo so
   * wheel-event targetY stays in sync.
   */
  onScrollToSection?: (sectionId: string) => void;
  /**
   * Fired whenever the GATED solid state flips (see `gatedSolidNav` below —
   * About-covers-Hero geometry AND `heroLogoSettled`, not geometry alone).
   * Lets the page sync other Hero-exit effects (e.g. the top gradient swap)
   * to this same trigger instead of a second, independent one, which is
   * what caused the gradient and navbar to desync.
   */
  onSolidNavChange?: (active: boolean) => void;
  /**
   * True once ScrollLogo's own shrink + crossfade into SolidLogoMark has
   * fully settled (Index threads this through from ScrollLogo's
   * `onShrinkSettled`). The navbar will not visually go solid — background,
   * shadow, its own SolidLogoMark, `onSolidNavChange` — until this is true,
   * even if the About-covers-Hero scroll geometry has already been reached.
   * This is what keeps a fast/instant scroll (or an instant scroll-restore
   * on mount) from showing the solid navbar's logo before ScrollLogo has
   * actually finished shrinking into it — see `gatedSolidNav` below.
   * Defaults to true so pages with no ScrollLogo at all (forceSolid pages,
   * anything without `aboutTopRef`) are never blocked by a signal that
   * would otherwise never arrive.
   */
  heroLogoSettled?: boolean;
}

const NavbarV2 = ({
  scrollContainerRef,
  aboutTopRef,
  forceSolid = false,
  showLogo = false,
  hideThemeToggle = false,
  onScrollToSection,
  onSolidNavChange,
  heroLogoSettled = true,
}: NavbarV2Props) => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [solidNav, setSolidNav]   = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeTransition();
  // Portrait phone OR landscape phone — must match Index.tsx's routing
  // exactly (same hook), since this decides whether the navbar renders its
  // simplified always-solid-orange treatment. If this ever disagreed with
  // Index's Mobile*-vs-V2 choice, the navbar would try to fade transparent
  // over a Hero image that isn't there (landscape phones get MobileHero,
  // which has no dark background image behind the navbar to reveal).
  const isPhoneLayout = useIsPhoneLayout();
  // Tablet (768–1023) gets a slightly lighter navbar than desktop — needed
  // here specifically because vertical padding is animated via Framer
  // Motion's `animate` prop (a JS value, not a Tailwind class) and so can't
  // be expressed as a `md:`/`lg:` pair the way the rest of the tablet sizing
  // below is.
  const isTablet = useIsTablet();
  // Short, wide phones in landscape (e.g. iPhone Pro Max) — same JS-value
  // constraint as isTablet above, and takes priority over it below since
  // these devices are often wide enough to also match the tablet range.
  const isLandscapeMobile = useIsLandscapeMobile();

  // Phone layouts skip the Hero-transparency mechanic entirely and are
  // always in the "solid" visual state from first paint — the
  // IntersectionObserver below still runs (harmless; Index's phone branch
  // doesn't act on it), but nothing downstream should treat `solidNav` as
  // a phone layout's real state. forceSolid (pages with no Hero at all,
  // e.g. OverMij) short-circuits to the same solid state unconditionally.
  // AND-gated against heroLogoSettled (see the prop doc above): raw scroll
  // geometry alone isn't enough to visually go solid on Index/Home — the
  // Hero's own logo shrink + crossfade into SolidLogoMark must also have
  // already finished, so a fast scroll (or instant scroll-restore) can't
  // show the navbar's mark before ScrollLogo has actually settled into it.
  const gatedSolidNav = solidNav && heroLogoSettled;
  const effectiveSolidNav = isPhoneLayout || gatedSolidNav || forceSolid;

  // The small solid-navbar wordmark logo only applies to the Hero→solid
  // transition (aboutTopRef is only ever passed by Index) and only on
  // desktop/tablet — phone layouts are always-solid from first paint (no
  // transition to hand off from) and already get their own static logo
  // inside MobileHero, so adding this one there would duplicate it.
  // forceSolid pages have no MobileHero equivalent at any breakpoint, so the
  // logo shows everywhere there instead of being gated by isPhoneLayout.
  const showSolidLogo = forceSolid ? true : Boolean(aboutTopRef) && !isPhoneLayout;

  // In Brandbook mode (showLogo=true) the page uses CSS filter:invert() to flip
  // the entire nav on light sections, so the nav must always start white.
  // Pages with a Hero (aboutTopRef provided) or forceSolid force white nav
  // text/icons while the navbar is solid/transparent over the dark Hero,
  // regardless of the selected theme. Pages without either stay theme-aware.
  const forceWhite = showLogo || Boolean(aboutTopRef) || forceSolid;

  // Once solidNav flips (About has covered the navbar strip), the navbar
  // background itself becomes theme-dependent instead of brand-orange (see
  // the backgroundColor animation below): a deeper cream (--navbar-cream)
  // in Dark Mode, a soft warm charcoal (--navbar-charcoal) in Light Mode —
  // dedicated navbar-surface tokens, distinct from the shared --cream/
  // --near-black used for the navbar's CONTENT (and for body text
  // elsewhere) below, so tuning the bar's own fill can't shift text tone
  // site-wide. Foreground content stays tied to the shared tokens as the
  // contrasting color — near-black text on the cream Dark-Mode bar, cream
  // text on the charcoal Light-Mode bar.
  // Stays plain cream while the navbar is still transparent over the Hero —
  // solidNav is always false on pages without a Hero (aboutTopRef), so this
  // only ever applies on Index.
  //
  // Mobile is the one exception to all of the above: it always shows the
  // official --brand-orange fill (BRAND_ORANGE_RGB) instead, never the
  // cream/charcoal surface tokens, and never the transparent Hero state.
  // Content on top follows the same accessibility rule the codebase already
  // documents for saturated brand-color backgrounds (see the --cream token
  // comment in index.css): cream measurably loses contrast against orange
  // versus literal white, so mobile's solid-content pairing is near-black
  // (Light Mode) / literal white (Dark Mode), not the cream/near-black pair
  // desktop's cream-or-charcoal bar uses.
  const solidBgRGB = BRAND_ORANGE_RGB;
  const solidNavText = isPhoneLayout
    ? (theme === "light" ? "text-nearBlack" : "text-white")
    : (theme === "light" ? "text-cream" : "text-nearBlack");

  // Soft ambient drop shadow that separates the solid navbar from the
  // content beneath it — recreated to match the same recipe as FooterV2's
  // own shadow (0 ±24px 60px, no spread) and the sitewide --section-shadow
  // token (same blur/offset, alpha tuned 0.55 dark / 0.12 light), just
  // mirrored downward since the navbar sits at the TOP of the stack rather
  // than the bottom. Recreated rather than reusing FooterV2's literal
  // because that one is a fixed constant tied to the footer's always-orange
  // background — the navbar sits above a theme-swapping app background, so
  // it needs the same light/dark alpha split --section-shadow already uses.
  const solidNavShadow = theme === "light"
    ? "0 24px 60px rgba(0, 0, 0, 0.12)"
    : "0 24px 60px rgba(0, 0, 0, 0.55)";
  const forceWhiteText = forceWhite ? (effectiveSolidNav ? solidNavText : "text-cream") : "";

  // Shared colour tokens for pill/icon buttons (toggle, CTA, hamburger).
  // Split so they can be composed with per-button sizing classes.
  //
  // Border/text colours are untouched from before. The only thing that
  // changes once effectiveSolidNav is true (navbar has gone solid
  // red/orange) is: border width bumps from 1px to ~1.75px, and the bg tint
  // switches to a uniform light glass (bg-white/10, hover bg-white/20) instead
  // of the previous theme-tinted fill — since the bar itself is now always
  // the same orange regardless of theme, one light overlay reads correctly
  // against it everywhere, whereas the old per-branch tints were tuned for
  // the old charcoal/cream solid bars. Non-solid (transparent Hero) states
  // keep their original 1px border and light tint completely unchanged.
  const pillColors = forceWhite
    ? effectiveSolidNav
      ? isPhoneLayout
        ? theme === "light"
          ? "border-[1.75px] border-nearBlack/30 bg-white/10 text-nearBlack/80 hover:bg-white/20 hover:border-nearBlack/50 hover:text-nearBlack"
          : "border-[1.75px] border-white/30 bg-white/10 text-white/80 hover:bg-white/20 hover:border-white/50 hover:text-white"
        // Same near-black border/text in both themes: once solid, the bar
        // itself is always brand-orange regardless of theme (see solidBgRGB
        // above), so a theme-dependent control color no longer makes sense
        // here — this used to be cream in Light Mode / near-black in Dark
        // Mode, which read as an inconsistent pairing on an identical fill.
        : "border-[1.75px] border-nearBlack/40 bg-white/10 text-nearBlack/75 hover:bg-white/20 hover:border-nearBlack/65 hover:text-nearBlack"
      : "border border-cream/40 bg-cream/10 text-cream/75 hover:bg-cream/[0.22] hover:border-cream/65 hover:text-cream"
    : effectiveSolidNav
      ? theme === "light"
        ? "border-[1.75px] border-nearBlack/20 bg-white/10 text-nearBlack/65 hover:bg-white/20 hover:border-nearBlack/[0.30] hover:text-nearBlack"
        : "border-[1.75px] border-cream/40 bg-white/10 text-cream/75 hover:bg-white/20 hover:border-cream/65 hover:text-cream"
      : "border border-nearBlack/20 bg-nearBlack/5 text-nearBlack/65 dark:border-cream/40 dark:bg-cream/10 dark:text-cream/75 hover:bg-nearBlack/10 hover:border-nearBlack/[0.30] hover:text-nearBlack dark:hover:bg-cream/[0.22] dark:hover:border-cream/65 dark:hover:text-cream";

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 80);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Track the navbar's own rendered height so the solid-nav boundary below
  // can be inset by the *real* nav height instead of a guessed pixel value —
  // this keeps it correct across mobile/desktop/QHD without breakpoint math.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(([entry]) => setNavHeight(entry.contentRect.height));
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // Solid-nav detection: observes a sentinel at the TOP of About's outer
  // wrapper (rendered by AboutV2 via aboutTopRef) instead of a scroll-position
  // threshold or Framer Motion's revealProgress. Once that sentinel — About's
  // own top edge — rises above the navbar's bottom edge, About's opaque panel
  // is guaranteed to fully back the navbar's strip, so this is the exact
  // moment "transparent" would otherwise expose About's raw background.
  // rootMargin insets the root by the navbar's own height so the switch (and
  // its transition) completes right as coverage arrives, not after.
  useEffect(() => {
    const sentinel = aboutTopRef?.current;
    if (!sentinel) return;
    const root = scrollContainerRef?.current ?? null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? 0;
        const active = entry.boundingClientRect.top < rootTop;
        setSolidNav(active);
      },
      { root, rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [aboutTopRef, scrollContainerRef, navHeight]);

  // Notifies the parent of the GATED solid state (not raw geometry) — and
  // deliberately depends on `gatedSolidNav` itself rather than living inside
  // the observer callback above, since `heroLogoSettled` can turn true
  // *after* the geometry trigger already fired once (the observer callback
  // only re-runs when the intersection itself changes, not when
  // heroLogoSettled does) — this effect re-evaluates whenever either input
  // changes, so the parent still gets notified once both are true.
  useEffect(() => {
    onSolidNavChange?.(gatedSolidNav);
  }, [gatedSolidNav, onSolidNavChange]);

  /**
   * Unified navigation handler for every nav link and the CTA button.
   *
   * "/" → scroll to top if already home, else navigate to home.
   * "#section" → if on home, scroll directly; if on another page, navigate to
   *              home with the hash so Index can scroll after the loading screen.
   * "/page" → push to router normally.
   */
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href === "/") {
      if (location.pathname === "/") {
        const container = scrollContainerRef?.current;
        if (container) {
          if (onScrollToSection) {
            // scrollTo(0) via the hook keeps targetY in sync
            onScrollToSection("__top__");
          } else {
            container.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("#")) {
      const sectionId = href.slice(1);
      if (location.pathname === "/") {
        if (onScrollToSection) {
          onScrollToSection(sectionId);
        } else {
          // Fallback: native smooth scroll (hook-independent)
          const target = SECTION_TARGETS[sectionId];
          if (target !== undefined) {
            scrollContainerRef?.current?.scrollTo({ top: target, behavior: "smooth" });
          }
        }
      } else {
        // Navigate to home; Index will read the hash after the loading screen and scroll.
        navigate("/" + href);
      }
      return;
    }

    navigate(href);
  };

  /* Whether to mark a nav item as "active" (shows the accent dot). */
  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/"
    : href.startsWith("/") ? location.pathname === href
    : false;

  // Tablet's navbar sits ~4px shorter in both states — desktop and mobile
  // keep their original 20px/10px exactly. Landscape-mobile is much shorter
  // still (very limited vertical room) and takes priority over isTablet.
  const navPaddingRest     = isLandscapeMobile ? "8px" : isTablet ? "16px" : "20px";
  const navPaddingScrolled = isLandscapeMobile ? "4px" : isTablet ? "8px" : "10px";

  // forceSolid pages (OverMij, project pages, ...) skip the Hero entirely, so
  // without this they'd render at navPaddingRest forever — taller than
  // Home's solid navbar, which on desktop/tablet is only ever reached after
  // scrolling well past the 80px `scrolled` threshold that shrinks padding.
  // Phone is exempt: Home's own solid mobile navbar starts at navPaddingRest
  // too (no Hero-scroll runway there either), so forceSolid phones already
  // match without help, and forcing the shrink there would make them shorter
  // than Home's mobile reference instead of equal to it.
  const effectiveScrolled = scrolled || (forceSolid && !isPhoneLayout);

  return (
    <>
      <motion.nav
        ref={navRef}
        // Mobile (and forceSolid pages, e.g. OverMij) pre-set
        // backgroundColor/boxShadow in `initial` to the exact same value
        // `animate` resolves to below, so framer-motion has zero delta to
        // tween on mount — the bar is solid brand-orange from the very first
        // frame, never a transparent-to-solid fade like desktop's Hero-exit
        // crossfade.
        initial={
          isPhoneLayout || forceSolid
            ? {
                opacity: 0,
                paddingTop: effectiveScrolled ? navPaddingScrolled : navPaddingRest,
                paddingBottom: effectiveScrolled ? navPaddingScrolled : navPaddingRest,
                backgroundColor: `rgba(${solidBgRGB}, 1)`,
                boxShadow: solidNavShadow,
              }
            : { opacity: 0, paddingTop: "20px", paddingBottom: "20px" }
        }
        animate={{
          opacity:        menuOpen ? 0 : 1,
          pointerEvents:  menuOpen ? "none" : "auto",
          paddingTop:     effectiveScrolled ? navPaddingScrolled : navPaddingRest,
          paddingBottom:  effectiveScrolled ? navPaddingScrolled : navPaddingRest,
          // solidBgRGB is theme-dependent (deeper cream in Dark Mode, warm
          // charcoal in Light Mode — dedicated navbar-surface tokens, see
          // brandColor.ts) on desktop, or the official --brand-orange on
          // mobile (see solidBgRGB above) — written as literal rgba because
          // framer-motion interpolates colors frame-by-frame and can't
          // resolve a CSS custom property mid-animation. Desktop's
          // transparent (Hero) state uses the SAME rgb channels at alpha 0,
          // so its fade-in only animates alpha and never flashes through an
          // intermediate hue. Mobile is always the solid branch — effectiveSolidNav
          // is forced true — so this never animates at all there.
          backgroundColor: effectiveSolidNav ? `rgba(${solidBgRGB}, 1)` : `rgba(${solidBgRGB}, 0)`,
          boxShadow:       effectiveSolidNav ? solidNavShadow : "0 0px 0px rgba(0, 0, 0, 0)",
        }}
        transition={{
          opacity:        { duration: 0.25, ease: "easeInOut" },
          paddingTop:     { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
          paddingBottom:  { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
          backgroundColor: { duration: 0.4, ease: "easeInOut" },
          boxShadow:       { duration: 0.4, ease: "easeInOut" },
        }}
        className={`fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 lg:px-24 landscape-mobile:pl-[max(1rem,env(safe-area-inset-left))] landscape-mobile:pr-[max(1rem,env(safe-area-inset-right))] flex items-center ${showLogo || showSolidLogo ? "justify-between" : "justify-end"}`}
      >
        {/* Bit & Beeld logo mark — fades in with the navbar's own
            transparent-to-solid transition (same 0.4s duration as its
            backgroundColor tween above) and is fully hidden while still
            transparent over the Hero. Always mounted (rather than
            conditionally rendered) so the flex layout's left slot stays
            reserved and the right-hand control group never shifts. */}
        {showSolidLogo && (
          // Opacity only — no x/position animation here. ScrollLogo's own
          // small mark is already fully settled at this exact spot by the
          // time this fades in (see ScrollLogo.tsx's stable-window
          // guarantee), so this should read as a pure color swap (white →
          // black) synced with the background reveal, not a second motion.
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: effectiveSolidNav ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="select-none pointer-events-none"
          >
            <SolidLogoMark src={LOGO_ZWART} />
          </motion.div>
        )}

        {/* Studio wordmark — only in pages that request it (Brandbook) */}
        {showLogo && (
          <span
            className={`font-logo uppercase leading-none transition-colors duration-300 ${forceWhite ? forceWhiteText : "text-nearBlack/80 dark:text-cream"}`}
            style={{
              fontSize:      "clamp(13px, 1.4vw, 17px)",
              letterSpacing: "0.03em",
            }}
          >
            Bit &amp; Beeld
          </span>
        )}

        <div className="flex items-center gap-6 md:gap-5 lg:gap-8 landscape-mobile:gap-3">
          {/* Available for project — hidden on landscape-mobile too: MobileHero
              (rendered for both phone layouts) already has its own identical
              badge, so this would otherwise duplicate it the same way the
              CTA below would. Also hidden once the navbar has gone solid
              red/orange (effectiveSolidNav) — kept only for the transparent
              Hero state. */}
          {!effectiveSolidNav && (
            <div className="hidden md:flex landscape-mobile:hidden items-center gap-4">
              <span
                className="rounded-full flex-shrink-0 w-2.5 h-2.5"
                style={{
                  marginRight:     "2px",
                  backgroundColor: "#22c55e",
                  boxShadow:       "0 0 6px rgba(34,197,94,0.6), 0 0 12px rgba(34,197,94,0.4)",
                  animation:       "statusPulse 1.8s ease-in-out infinite",
                }}
              />
              <div className="flex flex-col">
                <span
                  className={`font-body transition-colors duration-300 text-[15px] ${forceWhite ? forceWhiteText : "text-nearBlack/80 dark:text-cream"}`}
                  style={{ fontWeight: 500, letterSpacing: "0.015em" }}
                >
                  Beschikbaar voor project
                </span>
                <span
                  className={`font-body uppercase transition-colors duration-300 text-[10px] ${forceWhite ? "text-cream/50" : "text-nearBlack/40 dark:text-cream/50"}`}
                  style={{ letterSpacing: "0.15em" }}
                >
                  Medio 2026
                </span>
              </div>
            </div>
          )}

          {/* Light / dark toggle — visible at every breakpoint (unlike the
              availability block above and the CTA below) since the mobile
              navbar should keep it per the mobile-nav simplification pass. */}
          {!hideThemeToggle && <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.15 }}
            className={`flex items-center justify-center w-10 h-10 md:w-9 md:h-9 lg:w-10 lg:h-10 landscape-mobile:w-7 landscape-mobile:h-7 rounded-full transition-all duration-300 hover:scale-[1.05] ${pillColors}`}
            aria-label="Toggle light/dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.span key="moon" initial={{ opacity: 0, rotate: -30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 30 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 landscape-mobile:w-3 landscape-mobile:h-3" />
                </motion.span>
              ) : (
                <motion.span key="sun" initial={{ opacity: 0, rotate: 30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -30 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 landscape-mobile:w-3 landscape-mobile:h-3" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>}

          {/* CTA — navigates to #contact on home or to /#contact from other pages.
              Hidden below md, and hidden again on landscape-mobile despite
              being ≥768px wide: both phone layouts render MobileHero, which
              already has its own "Plan Gesprek" primary CTA, so keeping this
              one too would put two competing CTAs on screen at once (the
              same duplication landscape-mobile would otherwise reintroduce,
              since its width is well within md's range). Unprefixed values
              below are the tablet (md, 768–1023) size; `lg:` restores the
              exact original desktop size untouched. */}
          <button
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`hidden md:inline-block landscape-mobile:hidden px-5 py-2.5 lg:px-7 lg:py-3 rounded-full text-sm lg:text-base font-body font-medium tracking-[0.12em] uppercase hover:scale-[1.03] transition-all duration-300 ${pillColors}`}
          >
            Plan Gesprek
          </button>

          {/* Hamburger */}
          <button
            className={`flex items-center justify-center w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 landscape-mobile:w-7 landscape-mobile:h-7 rounded-full z-50 relative hover:scale-[1.05] transition-all duration-300 ${pillColors}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-[18px] h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] landscape-mobile:w-3 landscape-mobile:h-3" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-[18px] h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] landscape-mobile:w-3 landscape-mobile:h-3" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

      </motion.nav>

      {/* Slide-in panel menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[65] bg-black/60"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full md:w-[460px] bg-[hsl(0,0%,6%)] flex flex-col"
            >
              {/* Close button area */}
              <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[hsl(10,85%,50%)]" />
                  <span
                    className="font-body uppercase text-cream/60"
                    style={{ fontSize: "11px", letterSpacing: "0.22em" }}
                  >
                    Menu
                  </span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-cream/60 hover:text-cream transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-8">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-center gap-2 py-5 border-b border-cream/10"
                    >
                      <span
                        className="font-body font-medium text-3xl md:text-4xl uppercase text-cream group-hover:text-cream/70 transition-colors"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {item.label}
                      </span>
                      {isActive(item.href) && (
                        <span className="w-2 h-2 bg-[hsl(10,85%,50%)] mt-1" />
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Bottom section: email + socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="px-8 pb-10"
              >
                <div className="mb-6">
                  <span
                    className="font-body uppercase text-cream/30"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    Email
                  </span>
                  <a
                    href="mailto:hello@bitbeeld.nl"
                    className="font-body block text-[hsl(10,85%,50%)] text-lg font-medium mt-1 hover:underline"
                  >
                    hello@bitbeeld.nl
                  </a>
                </div>

                <div>
                  <span
                    className="font-body uppercase text-cream/30"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    Socials
                  </span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="font-body text-cream/70 text-sm hover:text-cream transition-colors flex items-center gap-1"
                        style={{ letterSpacing: "0.04em" }}
                      >
                        {s.label} <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarV2;
