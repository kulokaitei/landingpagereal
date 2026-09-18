import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Engineering Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow-hero pointer-events-none" />

      {/* Decorative Technical Vector Graph Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-100 400 C 300 200, 600 600, 1300 350"
            stroke="url(#hero-gradient)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M-50 250 C 400 500, 800 150, 1350 450"
            stroke="url(#hero-gradient)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <circle cx="450" cy="330" r="3" fill="#4ADE80" />
          <circle cx="780" cy="410" r="3" fill="#4ADE80" />
          <defs>
            <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0" />
              <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Technical Kicker Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono mb-8 backdrop-blur-md shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-neutral-400">Autonomous Operations Architecture</span>
          <span className="text-white/20">|</span>
          <span className="text-accent">Production Grade</span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold font-display tracking-tightest text-white leading-[1.08] mb-8">
          Your team is spending{' '}
          <span className="text-gradient-accent">real hours</span> on work that{' '}
          <span className="text-white relative inline-block underline decoration-accent/40 decoration-wavy decoration-1 underline-offset-8">
            shouldn't require a human
          </span>
          .
        </h1>

        {/* Value Subheading */}
        <h2 className="text-base sm:text-lg md:text-xl font-normal text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          We engineer custom automation infrastructure that eliminates operational friction — quietly, reliably, and without disrupting your existing workflows. Not a disconnected tool. An autonomous system built for your scale.
        </h2>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#request-audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-[#0A0A0C] font-semibold text-sm rounded-xl shadow-[0_0_25px_rgba(74,222,128,0.25)] hover:shadow-[0_0_35px_rgba(74,222,128,0.45)] hover:bg-[#3ecf75] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            <span>Request an Automation Audit</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/[0.04] text-neutral-300 font-medium text-sm rounded-xl border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Trust & Frictionless micro-guarantee */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-accent/80" />
            <span>Zero commitment required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-accent/80" />
            <span>5–7 day turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-accent/80" />
            <span>No high-pressure sales</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
