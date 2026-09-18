import { motion } from 'framer-motion';
import { Truck, Stethoscope, Landmark, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const cases = [
  {
    sector: 'Freight & Logistics Brokerage',
    icon: Truck,
    highlight: 'Cut multi-carrier rate & BOL reconciliation from 4 business days to 4 minutes.',
    details: 'Automated ingestion of unstandardized carrier bills of lading, parsing line-item charges, and reconciling against customer contracts with 99.8% precision.',
    metrics: [
      { label: 'Time Saved', val: '94% Faster' },
      { label: 'Annual Reclaimed', val: '1,420 Hours' },
      { label: 'Error Margin', val: '< 0.2%' },
    ],
    stack: ['Custom Python Engine', 'Webhook Gateway', 'PostgreSQL Event Store'],
  },
  {
    sector: 'Healthcare & Medical Supply',
    icon: Stethoscope,
    highlight: 'Automated 100% of incoming EDI 850 purchase orders directly into warehouse ERP.',
    details: 'Eliminated manual copy-pasting for high-volume clinic accounts. Systems automatically route low-stock exceptions to human reps while clearing 92% of standard orders autonomously.',
    metrics: [
      { label: 'Staff Capacity', val: '+22 hrs/wk' },
      { label: 'Fulfillment Speed', val: 'Same-Day' },
      { label: 'Touchless Orders', val: '92.4%' },
    ],
    stack: ['EDI / AS2 Connector', 'NetSuite SuiteScript', 'Dead-Letter Queue'],
  },
  {
    sector: 'B2B Fintech & Lending Platform',
    icon: Landmark,
    highlight: 'Zero-backlog loan application document triage during a 300% surge period.',
    details: 'Constructed an automated KYC/financial packet validator that sorts bank statements, flags missing pages, and scores document validity before reaching human underwriters.',
    metrics: [
      { label: 'Underwrite Latency', val: '2.5 hrs vs 24 hrs' },
      { label: 'Volume Capacity', val: '3x Peak Surge' },
      { label: 'Human Touch', val: 'Final Signoff Only' },
    ],
    stack: ['OCR / Structural Parser', 'REST Event Bus', 'Slack Ops Digest'],
  },
];

export default function CaseSnapshots() {
  return (
    <section id="cases" className="py-28 md:py-36 px-6 relative bg-[#0A0A0C] border-t border-white/[0.06] overflow-hidden">
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
            Snapshots of Success
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
              Proven engineering. Measurable scale.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Real-world systems engineered for high-volume operations where downtime and inaccuracy are not options.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400 self-start md:self-auto">
            ANONYMIZED CLIENT PROFILES
          </div>
        </div>

        {/* Case Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {cases.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl p-7 bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.08] hover:border-accent/40 shadow-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Sector Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">DEPLOYED</span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-neutral-300 mb-2 block">
                    {item.sector}
                  </span>

                  <h3 className="text-base font-semibold font-display text-white mb-3 leading-snug group-hover:text-accent transition-colors">
                    "{item.highlight}"
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {item.details}
                  </p>
                </div>

                <div>
                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/[0.07] mb-5 text-center">
                    {item.metrics.map((m, mi) => (
                      <div key={mi}>
                        <div className="text-xs sm:text-sm font-bold font-display text-accent">
                          {m.val}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((s, si) => (
                      <span
                        key={si}
                        className="text-[10px] font-mono text-neutral-400 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
