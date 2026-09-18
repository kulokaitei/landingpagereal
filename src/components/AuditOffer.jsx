import { motion } from 'framer-motion';
import { FileText, ShieldCheck, MessageSquareText, ArrowRight, Zap } from 'lucide-react';

const valuePoints = [
  {
    icon: FileText,
    title: 'Zero Sales Fluff',
    description: 'You receive an objective diagnostic report and architectural blueprint, not a generic pitch deck.',
  },
  {
    icon: ShieldCheck,
    title: 'No Obligation',
    description: 'The roadmap is 100% yours to keep, execute internally, or implement with another team.',
  },
  {
    icon: MessageSquareText,
    title: 'Plain Language',
    description: 'Everything is scoped in straightforward business terms: time saved, bottlenecks resolved, ROI.',
  },
];

export default function AuditOffer() {
  return (
    <section className="py-28 md:py-36 px-6 relative bg-[#0D0D10] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Main Highlighted Container Box */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-white/[0.05] to-white/[0.015] border border-accent/30 shadow-[0_0_50px_rgba(74,222,128,0.08)]">
          {/* Top border beam accent */}
          <div className="absolute top-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-xs font-mono font-medium uppercase tracking-widest text-accent">
              Zero-Risk Assessment
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-6">
            A free automation audit. Useful whether or not we work together.
          </h2>

          <div className="space-y-4 mb-12 text-neutral-300 text-base sm:text-lg leading-relaxed">
            <p>
              The audit is a structured review of your current operations. We map where team hours disappear, where cross-tool handoffs break down, and where automation yields 10x leverage versus unnecessary complexity.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base">
              At the end of 5 business days, you receive a prioritized matrix of opportunities with feasibility ratings, time projections, and architecture diagrams.
            </p>
          </div>

          {/* Three Deliverable Pillars */}
          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] mb-10">
            {valuePoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center mb-4 text-accent">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold font-display text-white mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Direct Section Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08] bg-white/[0.01] -mx-4 -mb-4 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs sm:text-sm text-neutral-300">
                Audits limited to 4 companies per month to maintain depth.
              </span>
            </div>
            <a
              href="#request-audit"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors"
            >
              <span>Reserve Your Slot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Founder / Expert Note: Statement of Intent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent/30 to-emerald-500/10 border border-accent/40 flex items-center justify-center flex-shrink-0 text-accent font-display font-bold text-lg">
            M
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold font-display text-white">Statement of Intent</span>
              <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">Principal Architect</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed italic">
              "We reject the commodity agency model of junior offshore handoffs and fragile zapier duct-tape. Every system we build is treated as critical enterprise infrastructure — documented, typed, and resilient to failure."
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
