import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-14 px-6 relative bg-[#0A0A0C] border-t border-white/[0.08]">
      {/* Top Border Gradient Accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white font-display">
            Meridian
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            / Autonomous Operations Architecture
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-5 text-xs text-neutral-400">
          <a href="#who-its-for" className="hover:text-white transition-colors">
            Fit
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#credibility" className="hover:text-white transition-colors">
            Track Record
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#request-audit" className="hover:text-accent transition-colors">
            Request Audit
          </a>
          <a
            href="/unsubscribe"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/unsubscribe');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="hover:text-neutral-300 transition-colors opacity-70 hover:opacity-100"
          >
            Unsubscribe
          </a>
        </div>

        <p className="text-xs text-neutral-400 font-mono">
          © {new Date().getFullYear()} Meridian Systems Inc. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
