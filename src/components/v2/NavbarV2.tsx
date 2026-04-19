import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Projecten", href: "#projecten" },
  { label: "Over Mij", href: "#over-ons" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
];

const NavbarV2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Europe/Amsterdam",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const tzOffset = () => {
    const fmt = new Intl.DateTimeFormat("nl-NL", { timeZone: "Europe/Amsterdam", timeZoneName: "shortOffset" });
    const parts = fmt.formatToParts(new Date());
    const tz = parts.find(p => p.type === "timeZoneName");
    return tz ? tz.value : "GMT+2";
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-16 lg:px-24 py-5 flex items-center justify-end"
      >
        <div className="flex items-center gap-6 md:gap-8">
          {/* Available for project */}
          <div className="hidden md:flex items-center gap-4">
            <span
              className="rounded-full flex-shrink-0"
              style={{
                width: "10px",
                height: "10px",
                marginRight: "2px",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.6), 0 0 12px rgba(34,197,94,0.4)",
                animation: "statusPulse 1.8s ease-in-out infinite",
              }}
            />
            <div className="flex flex-col">
              <span className="text-white text-base font-body font-medium tracking-wide">
                Beschikbaar voor project
              </span>
              <span className="text-white/50 text-xs font-body uppercase tracking-[0.15em]">
                Medio 2026
              </span>
            </div>
          </div>

          {/* Time + timezone */}
          <div className="hidden md:flex flex-col items-center">
            <span className="text-white text-base font-body font-medium tabular-nums">
              {currentTime}
            </span>
            <span className="text-white/50 text-xs font-body">
              ({tzOffset()})
            </span>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="px-7 py-3 rounded-full border border-white/40 bg-white/10 text-white/75 text-base font-display font-bold tracking-[0.15em] uppercase hover:bg-white/22 hover:border-white/65 hover:text-white hover:scale-[1.03] transition-all duration-300"
          >
            Plan Gesprek
          </a>

          {/* Hamburger */}
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/40 bg-white/10 text-white/75 z-50 relative hover:bg-white/22 hover:border-white/65 hover:text-white hover:scale-[1.05] transition-all duration-300"
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
              className="fixed inset-0 z-30 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="fixed top-0 right-0 bottom-0 z-40 w-full md:w-[380px] bg-[hsl(0,0%,6%)] flex flex-col"
            >
              {/* Close button area */}
              <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[hsl(10,85%,50%)]" />
                  <span className="text-white/60 text-xs font-body font-medium tracking-[0.15em] uppercase">Menu</span>
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
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-2 py-5 border-b border-white/10"
                    >
                      <span className="text-white font-display font-extrabold text-3xl md:text-4xl uppercase tracking-wide hover:text-white/70 transition-colors">
                        {item.label}
                      </span>
                      {item.active && <span className="w-2 h-2 bg-[hsl(10,85%,50%)] mt-1" />}
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
                  <span className="text-white/30 text-[10px] font-body tracking-[0.2em] uppercase">(Email)</span>
                  <a href="mailto:hello@bitbeeld.nl" className="block text-[hsl(10,85%,50%)] text-lg font-body font-medium mt-1 hover:underline">
                    hello@bitbeeld.nl
                  </a>
                </div>

                <div>
                  <span className="text-white/30 text-[10px] font-body tracking-[0.2em] uppercase">(Socials)</span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="text-white/70 text-sm font-body hover:text-white transition-colors flex items-center gap-1"
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
