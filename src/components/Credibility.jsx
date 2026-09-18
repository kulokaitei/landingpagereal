import { motion } from 'framer-motion';
import { ShieldCheck, Activity, TrendingUp, Layers } from 'lucide-react';

const stats = [
  {
    number: '340+',
    label: 'Automations Running in Production',
    subtext: 'High-availability mission-critical workflows',
    icon: Activity,
  },
  {
    number: '12+',
    label: "Core Industries Deployed",
    subtext: 'Manufacturing, logistics, fintech, legal, ops',
    icon: Layers,
  },
  {
    number: '~62%',
    label: 'Average Manual Time Reduction',
    subtext: 'Reclaimed team capacity within 30 days',
    icon: TrendingUp,
  },
];

const industries = [
  { code: 'MFG', name: 'Precision Manufacturing' },
  { code: 'LOG', name: 'Freight & Supply Chain' },
  { code: 'FIN', name: 'Fintech & Settlement' },
  { code: 'OPS', name: 'B2B Professional Services' },
  { code: 'SVC', name: 'Field Operations' },
  { code: 'RTL', name: 'Omnichannel Commerce' },
];

export default function Credibility() {
  return (
    <section id="credibility" className="py-28 md:py-36 px-6 relative bg-[#0A0A0C] border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-xs font-mono font-medium uppercase tracking-widest text-accent">
            Track Record & Scale
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-6">
          We work quietly. The systems speak for themselves.
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mb-16 leading-relaxed">
          Every automation we deploy is monitored, deterministic, and built to withstand real edge cases without human intervention.
        </p>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-8 bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.08] hover:border-accent/40 shadow-lg group transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">VERIFIED</span>
                </div>

                <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white mb-3 flex items-baseline gap-1">
                  <span>{stat.number}</span>
                </div>

                {/* Accent mini glowing bar */}
                <div className="w-12 h-1 bg-accent/40 rounded-full mb-4 group-hover:w-20 group-hover:bg-accent transition-all duration-300" />

                <h3 className="text-base font-semibold text-neutral-200 mb-1 leading-snug">
                  {stat.label}
                </h3>
                <p className="text-xs text-neutral-400">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Industry Domain Badges */}
        <div className="rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
            Proven Across High-Complexity Operational Domains
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {industries.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="px-3 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent/40 hover:bg-white/[0.06] transition-all group flex flex-col items-center justify-center text-center"
              >
                <span className="text-xs font-mono font-bold text-accent tracking-widest mb-1 group-hover:scale-105 transition-transform">
                  {item.code}
                </span>
                <span className="text-[11px] text-neutral-400 leading-tight">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
