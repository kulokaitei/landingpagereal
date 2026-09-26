import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-surface-card border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white font-display">
              Meridian
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-neutral-500 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
              Ops Engine
            </span>
          </a>

          <div className="flex items-center gap-5">
            <a
              href="#calculator"
              className="hidden lg:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              ROI Calculator
            </a>
            <a
              href="#comparison"
              className="hidden md:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Before/After
            </a>
            <a
              href="#cases"
              className="hidden md:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#how-it-works"
              className="hidden sm:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Process
            </a>
            <a
              href="#faq"
              className="hidden md:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#request-audit"
              className="relative group inline-flex items-center justify-center text-xs font-medium text-white px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 hover:border-accent/40 hover:bg-accent/[0.08] hover:text-accent transition-all duration-300"
            >
              <span>Request Audit</span>
              <span className="ml-1.5 text-accent opacity-70 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>

        {/* Dynamic Top Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="h-[2px] bg-gradient-to-r from-accent/60 via-accent to-emerald-300 origin-left shadow-[0_0_10px_rgba(74,222,128,0.7)]"
        />
      </motion.nav>
    </>
  );
}
