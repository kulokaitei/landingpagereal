import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const faqItems = [
  {
    id: 'difference',
    category: 'Architecture',
    question: 'How does Meridian differ from Zapier, Make, or commodity offshore agencies?',
    shortAnswer:
      'We engineer production-grade, typed infrastructure rather than fragile no-code duct-tape or junior offshore handoffs.',
    answer:
      'Commodity no-code tools (Zapier, Make) frequently fail under payload spikes, rate limits, and schema changes without logging. Offshore agencies often build non-standard scripts without documentation. Meridian builds resilient, typed automation systems (TypeScript, serverless endpoints, robust webhook queues, n8n clusters) with comprehensive system schematics and error tracing.',
  },
  {
    id: 'transformation-plan',
    category: 'Deliverables',
    question: 'How does the Operations Transformation Plan work and what is delivered?',
    shortAnswer:
      'A structured 5-business-day diagnostic audit producing a prioritized ROI matrix, architecture blueprints, and implementation roadmaps.',
    answer:
      'We conduct a deep architectural review of your existing tool handoffs, manual data entry bottlenecks, and ERP/CRM sync points. You receive a complete operational blueprint: prioritized automation opportunities, feasibility and ROI scoring, technical data flow diagrams, and a step-by-step implementation plan that is 100% yours to keep and execute.',
  },
  {
    id: 'supported-stacks',
    category: 'Integrations',
    question: 'What enterprise ERPs, databases, and tech ecosystems does Meridian support?',
    shortAnswer:
      'All major ERPs (NetSuite, SAP, Salesforce, Dynamics), modern databases (PostgreSQL, Supabase), e-commerce engines, and custom REST/GraphQL APIs.',
    answer:
      'Our systems bridge enterprise ERPs (NetSuite, Salesforce, SAP, HubSpot, Microsoft Dynamics), modern cloud databases (PostgreSQL, Supabase, MongoDB, Airtable), e-commerce platforms (Shopify Plus, Amazon FBA, ShipStation, 3PL/WMS), and legacy on-premise software via custom HTTP/gRPC bridges and webhook handlers.',
  },
  {
    id: 'security-nda',
    category: 'Security',
    question: 'How does Meridian guarantee data privacy, GDPR compliance, and NDA protection?',
    shortAnswer:
      'Every engagement is protected by a pre-signed mutual NDA, zero credential persistence, and end-to-end encryption.',
    answer:
      'We operate under strict confidentiality. We do not store sensitive client business records or customer PII on intermediate servers. All API handoffs use TLS 1.3 encryption, environment secret vaults, and GDPR/CCPA compliant data suppression protocols.',
  },
  {
    id: 'roi-timeline',
    category: 'ROI & Speed',
    question: 'What ROI and time savings do companies typically experience?',
    shortAnswer:
      'Clients eliminate 15–40+ hours of manual labor per week and remove costly operational handoff errors within weeks of deployment.',
    answer:
      'By replacing manual copy-pasting, invoice triage, and vendor catalog reconciliations with automated event pipelines, businesses scale transaction volume 5x–10x without adding operational headcount. Systems typically achieve full ROI payback in under 60 days.',
  },
  {
    id: 'ownership',
    category: 'Ownership',
    question: 'Do we own the automation code and architecture blueprints?',
    shortAnswer:
      'Yes. You retain 100% intellectual property ownership of all custom scripts, workflows, and documentation with zero vendor lock-in.',
    answer:
      'Everything we architect is delivered with full source code, deployment scripts, environment configurations, and documentation. You can host workflows on your own cloud (AWS, GCP, self-hosted n8n) and maintain them with internal staff or continue engaging Meridian for architectural expansion.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(faqItems[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Architecture', 'Deliverables', 'Integrations', 'Security', 'ROI & Speed'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 relative bg-[#0A0A0C] border-t border-white/[0.06] overflow-hidden scroll-mt-16"
    >
      {/* Background Glows and Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with GEO Freshness Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>KNOWLEDGE BASE & ARCHITECTURE FAQS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-semibold">VER 2026.3</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
            Frequently Answered Technical Questions
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Direct specifications on our automation architecture, integration security, delivery timelines, and ROI metrics.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-accent/15 border-accent text-white shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                    : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0F0F12] border-accent/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                    : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.035]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border text-xs font-mono font-bold ${
                        isOpen
                          ? 'bg-accent/20 border-accent/50 text-accent'
                          : 'bg-white/5 border-white/10 text-neutral-400'
                      }`}
                    >
                      ?
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold font-display text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-accent text-[#0A0A0C] border-accent' : 'text-neutral-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/[0.04] mt-2">
                        {/* Short GEO highlight takeaway */}
                        <div className="mb-3 p-3 rounded-xl bg-accent/[0.06] border border-accent/20 font-mono text-xs text-accent/90 flex items-start gap-2">
                          <span className="text-accent font-bold">&gt; KEY TAKEAWAY:</span>
                          <span>{faq.shortAnswer}</span>
                        </div>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA prompt inside FAQ */}
        <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold font-display text-white">
                Have a specific tool stack or custom architectural requirement?
              </p>
              <p className="text-xs text-neutral-400">
                Our principal automation engineers review all diagnostic requests.
              </p>
            </div>
          </div>
          <a
            href="#request-audit"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors flex-shrink-0"
          >
            <span>Request Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
