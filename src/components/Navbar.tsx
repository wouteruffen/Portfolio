import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const POLAROID_BARS = [
  "hsl(0, 80%, 50%)",    // Rood
  "hsl(30, 95%, 50%)",   // Oranje
  "hsl(50, 95%, 55%)",   // Geel
  "hsl(140, 65%, 40%)",  // Groen
  "hsl(215, 75%, 50%)",  // Blauw
];

const NAV_ITEMS = [
  { label: "Over Mij", href: "#over-ons" },
  { label: "Projecten", href: "#projecten" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isV2 = location.pathname === "/v2";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-16 lg:px-24 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? isV2
              ? "py-3 bg-[hsl(0,0%,8%)]/95 backdrop-blur-md border-b border-[hsl(0,0%,20%)]/50 shadow-lg"
              : "py-3 bg-white/95 backdrop-blur-md border-b border-[hsl(0,0%,85%)] shadow-lg shadow-black/5"
            : isV2
              ? "py-6 bg-[hsl(0,0%,8%)]/80 backdrop-blur-sm"
              : "py-6 bg-white/80 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0 h-3">
              {POLAROID_BARS.map((color, i) => (
                <span key={i} className="w-2 h-3" style={{ background: color }} />
              ))}
            </div>
            <span className={`font-display font-extrabold italic text-sm tracking-wider ${isV2 ? "text-foreground" : "text-[hsl(0,0%,10%)]"}`}>
              B&B
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative px-5 py-2 text-sm transition-colors font-body group ${
                isV2 ? "text-muted-foreground hover:text-foreground" : "text-[hsl(0,0%,45%)] hover:text-[hsl(0,0%,10%)]"
              }`}
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
          <button
            onClick={() => navigate(isV2 ? "/" : "/v2")}
            className={`ml-2 px-4 py-2 text-xs font-body transition-colors ${
              isV2 ? "text-muted-foreground border border-border hover:border-primary hover:text-primary" : "text-[hsl(0,0%,45%)] border border-[hsl(0,0%,80%)] hover:border-primary hover:text-primary"
            }`}
          >
            {isV2 ? "Versie 1" : "Versie 2"}
          </button>
          {isV2 ? (
            <a
              href="#contact"
              className="ml-2 px-5 py-2 text-sm font-display font-bold tracking-wider uppercase bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Start Project
            </a>
          ) : (
            <a
              href="#contact"
              className="ml-2 px-5 py-2 text-sm font-display font-bold tracking-wider uppercase bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Start Project
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden relative w-10 h-10 flex items-center justify-center ${isV2 ? "text-foreground" : "text-[hsl(0,0%,10%)]"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center gap-2"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="text-3xl text-foreground font-display font-extrabold hover:text-primary transition-colors py-3"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-6 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              Start Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
