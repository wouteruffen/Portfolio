import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Formspree integration: replace action URL later
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-24 px-6 md:px-16 lg:px-24 relative snap-start">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(25 95% 55%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(25 95% 55%) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-8 font-body uppercase">Contact</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-3xl md:text-5xl font-display font-extrabold text-foreground leading-tight">
                Klaar om iets <span className="text-primary">moois</span> te bouwen?
              </p>
              <div className="mt-12 flex flex-col gap-6 text-sm text-muted-foreground font-body">
                <div>
                  <div className="text-foreground font-semibold mb-1">Email</div>
                  hello@studiobitbeeld.nl
                </div>
                <div>
                  <div className="text-foreground font-semibold mb-1">Telefoon</div>
                  +31 (0)6 1234 5678
                </div>
                <div>
                  <div className="text-foreground font-semibold mb-1">Locatie</div>
                  Amsterdam, NL
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">
                  Naam
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Jouw naam"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="jouw@email.nl"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">
                  Bericht
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Vertel over je project..."
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors mt-4"
              >
                Verstuur Bericht
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
