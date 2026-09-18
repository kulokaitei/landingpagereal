import { motion } from 'framer-motion';
import { Search, Compass, Workflow, Sliders } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Deconstruct Current Workflows',
    description: "We map how work actually moves through your business — not the theoretical wiki doc, but the real day-to-day manual handoffs.",
  },
  {
    number: '02',
    icon: Compass,
    title: 'Pinpoint Friction & Waste',
    description: 'We isolate the silent profit leaks: repeated double-entry, copy-paste handoffs, and deterministic decisions tying up senior human hours.',
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Architect Custom Automations',
    description: "We design resilient systems configured strictly for your operational tech stack. Production-grade, maintainable, and built without fragile hacks.",
  },
  {
    number: '04',
    icon: Sliders,
    title: 'Collaborative Roadmap Review',
    description: "You receive an exact architectural blueprint with projected ROI, technical dependencies, and rollout phases. No pressure. Transparent engineering.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 md:py-36 px-6 relative bg-[#0D0D10] border-t border-white/[0.06]">
      {/* Background subtle dots */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-xs font-mono font-medium uppercase tracking-widest text-accent">
            Methodology & Architecture
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-6">
          Four steps. Zero jargon. Clear outcomes.
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mb-16 leading-relaxed">
          From diagnostic analysis to deployment-ready systems, our process is structured to deliver immediate visibility and tangible results.
        </p>

        {/* Desktop: Horizontal Connected Stepper */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 relative">
          {/* Directional Gradient Connector Line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-accent via-accent/40 to-white/10 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="relative z-10 flex flex-col h-full group"
              >
                {/* Node Pill Indicator */}
                <div className="w-20 h-20 rounded-2xl border border-white/15 bg-[#121216] shadow-xl group-hover:border-accent/60 group-hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] flex items-center justify-center mb-6 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-mono font-bold text-accent tracking-wider mb-0.5">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-white/80 group-hover:text-accent transition-colors duration-200" />
                  </div>
                </div>

                {/* Step Card Content */}
                <div className="flex-1 p-6 rounded-xl bg-white/[0.025] border border-white/[0.07] group-hover:border-white/20 group-hover:bg-white/[0.04] transition-all duration-300">
                  <h3 className="text-base font-semibold font-display text-white mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet: Vertical Timeline */}
        <div className="lg:hidden space-y-6 relative pl-6 sm:pl-8 border-l border-white/10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Step Pip on line */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-8 h-8 rounded-full border border-accent/40 bg-[#121216] flex items-center justify-center shadow-lg">
                  <span className="text-xs font-mono font-bold text-accent">{step.number}</span>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon className="w-4 h-4 text-accent" />
                    <h3 className="text-base font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
