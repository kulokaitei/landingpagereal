import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowRight, Zap, RefreshCw, Layers, ShieldAlert, Cpu, Clock, FileSpreadsheet, Mail } from 'lucide-react';

export default function WorkflowComparison() {
  const [activeTab, setActiveTab] = useState('after'); // 'before' | 'after'

  return (
    <section id="comparison" className="py-28 md:py-36 px-6 relative bg-[#0A0A0C] border-t border-white/[0.06] overflow-hidden">
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
            Workflow Architecture Comparison
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
              Before & After: The Reality of Operational Automation
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Compare a typical order reconciliation and multi-tool data sync workflow before vs. after implementing Meridian.
            </p>
          </div>

          {/* Interactive Toggle Switch */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 self-start md:self-auto backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('before')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'before'
                  ? 'bg-rose-500/15 border border-rose-500/40 text-rose-300 shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Manual Legacy (Before)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('after')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'after'
                  ? 'bg-accent/15 border border-accent/40 text-accent shadow-[0_0_20px_rgba(74,222,128,0.2)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span>Meridian Autonomous (After)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 border overflow-hidden transition-all duration-500 bg-gradient-to-b from-white/[0.04] to-white/[0.015] shadow-2xl border-white/10">
          <AnimatePresence mode="wait">
            {activeTab === 'before' ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Meta summary strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>STATUS: Severe Friction & Silent Profit Leaks</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <span>Latency: <strong className="text-rose-300">2–4 Days</strong></span>
                    <span>Error Rate: <strong className="text-rose-300">8–12%</strong></span>
                    <span>Human Effort: <strong className="text-rose-300">~18 hrs/wk</strong></span>
                  </div>
                </div>

                {/* Step Flow List */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 relative">
                    <div className="text-[10px] font-mono text-rose-400 font-bold">STEP 01</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span>PDF Attachment</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Client emails unstructured PDF purchase order. Sits in general inbox for hours.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 relative">
                    <div className="text-[10px] font-mono text-rose-400 font-bold">STEP 02</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <FileSpreadsheet className="w-4 h-4 text-neutral-400" />
                      <span>Manual Copy-Paste</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Ops rep re-types line items manually into Excel and ERP. Prone to typo errors.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 relative">
                    <div className="text-[10px] font-mono text-rose-400 font-bold">STEP 03</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <RefreshCw className="w-4 h-4 text-neutral-400" />
                      <span>Email Back-and-Forth</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Price discrepancies require 3-party email thread to clarify SKU availability.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 relative">
                    <div className="text-[10px] font-mono text-rose-400 font-bold">STEP 04</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>Delayed Fulfillment</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Order finalized 3 days later. Customer support deals with status inquiries.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Bottleneck Outcome: Senior operators spend 40% of their workday playing human API router.</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Meta summary strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-accent/10 border border-accent/30 text-xs font-mono">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>STATUS: 100% Autonomous Pipeline Active</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-300">
                    <span>Latency: <strong className="text-accent">380ms</strong></span>
                    <span>Error Rate: <strong className="text-accent">&lt; 0.01%</strong></span>
                    <span>Human Effort: <strong className="text-accent">0 hrs (Exceptions Only)</strong></span>
                  </div>
                </div>

                {/* Step Flow List */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-accent/[0.03] border border-accent/20 space-y-2 relative">
                    <div className="text-[10px] font-mono text-accent font-bold">NODE 01</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>Webhook / Ingest</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Instant capture on email arrival. Streamed into deterministic parsing worker.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-accent/[0.03] border border-accent/20 space-y-2 relative">
                    <div className="text-[10px] font-mono text-accent font-bold">NODE 02</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Cpu className="w-4 h-4 text-accent" />
                      <span>Schema & Extraction</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Deep structural parser extracts 100% of SKUs, quantities, and tax values reliably.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-accent/[0.03] border border-accent/20 space-y-2 relative">
                    <div className="text-[10px] font-mono text-accent font-bold">NODE 03</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Layers className="w-4 h-4 text-accent" />
                      <span>ERP Cross-Sync</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Validates inventory in warehouse database and commits directly via native API.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-accent/[0.03] border border-accent/20 space-y-2 relative">
                    <div className="text-[10px] font-mono text-accent font-bold">NODE 04</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span>Instant Confirmation</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Customer receives invoice & fulfillment tracking link in under 1 minute.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent/[0.04] border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300 font-mono">
                  <span>Outcome: Team reclaimed 18 hours/week with zero data entry errors and faster cash collection.</span>
                  <a href="#request-audit" className="text-accent hover:underline flex items-center gap-1 font-semibold flex-shrink-0">
                    <span>Audit Your Workflows</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
