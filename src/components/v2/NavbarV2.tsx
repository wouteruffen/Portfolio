import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

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
  /** True only after About has fully snapped into place — drives the solid background. */
  isAboutActive?: boolean;
  /** When true, renders the studio wordmark in the top-left (used by Brandbook). */
  showLogo?: boolean;
  /** When true, hides the light/dark toggle (e.g. Brandbook has its own light/dark system). */
  hideThemeToggle?: boolean;
  /**
   * If provided, called when the user clicks a section anchor (#over-ons etc.)
   * while already on the home page. Use the smooth-scroll hook's scrollTo so
   * wheel-event targetY stays in sync.
   */
  onScrollToSection?: (sectionId: string) => void;
}

const NavbarV2 = ({
  scrollContainerRef,
  isAboutActive = false,
  showLogo = false,
  hideThemeToggle = false,
  onScrollToSection,
}: NavbarV2Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  // Nav color tokens — adapt to dark/light theme
  const navText       = isDark ? "rgba(255,255,255,0.75)" : "rgba(11,11,11,0.78)";
  const navTextSubtle = isDark ? "rgba(255,255,255,0.50)" : "rgba(11,11,11,0.42)";

  // Tailwind class strings for interactive pill elements
  const pillClass = isDark
    ? "border-white/40 bg-white/10 text-white/75 hover:bg-white/[0.22] hover:border-white/65 hover:text-white"
    : "border-black/20 bg-black/[0.05] text-black/75 hover:bg-black/10 hover:border-black/30 hover:text-black";

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 80);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

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

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, paddingTop: "20px", paddingBottom: "20px" }}
        animate={{
          opacity:        menuOpen ? 0 : 1,
          pointerEvents:  menuOpen ? "none" : "auto",
          paddingTop:     scrolled ? "10px" : "20px",
          paddingBottom:  scrolled ? "10px" : "20px",
          backgroundColor: "rgba(0,0,0,0)",
          borderBottom:    "1px solid rgba(255,255,255,0)",
        }}
        transition={{
          opacity:      { duration: 0.25, ease: "easeInOut" },
          paddingTop:   { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
          paddingBottom: { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
        }}
        className={`fixed top-0 left-0 right-0 z-[60] px-6 md:px-16 lg:px-24 flex items-center ${showLogo ? "justify-between" : "justify-end"}`}
      >
        {/* Studio wordmark — only in pages that request it (Brandbook) */}
        {showLogo && (
          <span
            className="font-logo uppercase leading-none"
            style={{
              fontSize:      "clamp(13px, 1.4vw, 17px)",
              color:         navText,
              letterSpacing: "0.03em",
            }}
          >
            Bit &amp; Beeld
          </span>
        )}

        <div className="flex items-center gap-6 md:gap-8">
          {/* Available for project */}
          <div className="hidden md:flex items-center gap-4">
            <span
              className="rounded-full flex-shrink-0"
              style={{
                width:           "10px",
                height:          "10px",
                marginRight:     "2px",
                backgroundColor: "#22c55e",
                boxShadow:       "0 0 6px rgba(34,197,94,0.6), 0 0 12px rgba(34,197,94,0.4)",
                animation:       "statusPulse 1.8s ease-in-out infinite",
              }}
            />
            <div className="flex flex-col">
              <span
                className="font-body"
                style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.015em", color: navText }}
              >
                Beschikbaar voor project
              </span>
              <span
                className="font-body uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.15em", color: navTextSubtle }}
              >
                Medio 2026
              </span>
            </div>
          </div>

          {/* Light / dark toggle */}
          {!hideThemeToggle && (
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Schakel naar licht modus" : "Schakel naar donker modus"}
              className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:scale-[1.05] ${pillClass}`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -20 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 20 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Sun size={14} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 20 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -20 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Moon size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          {/* CTA — navigates to #contact on home or to /#contact from other pages */}
          <button
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`px-7 py-3 rounded-full border text-base font-body font-medium tracking-[0.12em] uppercase hover:scale-[1.03] transition-all duration-300 ${pillClass}`}
          >
            Plan Gesprek
          </button>

          {/* Hamburger */}
          <button
            className={`flex items-center justify-center w-12 h-12 rounded-full border z-50 relative hover:scale-[1.05] transition-all duration-300 ${pillClass}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={18} />
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
                    className="font-body uppercase text-white/60"
                    style={{ fontSize: "11px", letterSpacing: "0.22em" }}
                  >
                    Menu
                  </span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">
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
                      className="group flex items-center gap-2 py-5 border-b border-white/10"
                    >
                      <span
                        className="font-body font-medium text-3xl md:text-4xl uppercase text-white group-hover:text-white/70 transition-colors"
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
                    className="font-body uppercase text-white/30"
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
                    className="font-body uppercase text-white/30"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    Socials
                  </span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="font-body text-white/70 text-sm hover:text-white transition-colors flex items-center gap-1"
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
