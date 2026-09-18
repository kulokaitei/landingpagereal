import { motion } from 'framer-motion';
import { Mail, PhoneCall, Cpu, Presentation, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Mail,
    title: 'Initial Intake & Feasibility Check',
    timeframe: 'Day 1',
    description: "Within one business day, we review your operational setup and confirm whether we can deliver substantial, measurable leverage.",
  },
  {
    number: '02',
    icon: PhoneCall,
    title: '30-Minute Operational Deep Dive',
    timeframe: 'Day 2–3',
    description: "No sales deck. No generic pitch. We speak directly with your operations leads to trace data paths and pinpoint friction points.",
  },
  {
    number: '03',
    icon: Cpu,
    title: 'Systems & Architecture Audit',
    timeframe: 'Days 3–6',
    description: 'We map every manual bottleneck, evaluate tech stack APIs, calculate automation ROI, and design the execution blueprint.',
  },
  {
    number: '04',
    icon: Presentation,
    title: 'Executive Findings & Recommendations',
    timeframe: 'Day 7',
    description: "We deliver a comprehensive audit document and walk you through every finding. You decide whether to build it yourself, hire us, or shelf it.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="py-28 md:py-36 px-6 relative bg-[#0A0A0C] border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-xs font-mono font-medium uppercase tracking-widest text-accent">
            Timeline & Next Steps
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-6">
          Here's exactly what happens after you reach out.
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 mb-16 leading-relaxed">
          A transparent, predictable process with zero ambiguous steps or high-pressure follow-ups.
        </p>

        {/* Continuous Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8">
          {/* Continuous vertical glowing line */}
          <div className="absolute left-[19px] sm:left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent via-accent/50 to-white/10" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Timeline Step Pip */}
                <div className="absolute -left-[27px] sm:-left-[39px] top-4 w-9 h-9 rounded-full border border-accent/40 bg-[#121216] flex items-center justify-center shadow-lg group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all z-10">
                  <span className="text-xs font-mono font-bold text-accent">{step.number}</span>
                </div>

                {/* Step Card Container */}
                <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-accent" />
                      <h3 className="text-base sm:text-lg font-semibold font-display text-white">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-neutral-400 flex-shrink-0">
                      {step.timeframe}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
          <span>We respect your time. If we're not the right fit, we'll let you know immediately and recommend alternative approaches.</span>
        </div>
      </motion.div>
    </section>
  );
}
