import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, Lock, Clock, Sparkles, Check, Server, FileSpreadsheet, Layers, Cpu } from 'lucide-react';

const bottleneckOptions = [
  { id: 'data_sync', label: 'Cross-Tool Data Sync & ERP Entry', desc: 'Manual copy-paste between CRM, ERP, and databases', icon: FileSpreadsheet },
  { id: 'doc_triage', label: 'Unstructured Document & Invoice Triage', desc: 'PDF orders, invoices, claims, and contract parsing', icon: Cpu },
  { id: 'order_routing', label: 'Order, Inventory & Fulfillment Logistics', desc: 'Vendor inventory sync, multi-warehouse routing', icon: Layers },
  { id: 'custom_stack', label: 'Custom Legacy System Integration', desc: 'Bridging internal proprietary tools & APIs', icon: Server },
];

const volumeOptions = [
  { id: 'low', label: '5 – 15 Hours / Week', sub: 'Single department friction' },
  { id: 'med', label: '15 – 40 Hours / Week', sub: 'Multiple staff members involved' },
  { id: 'high', label: '40 – 100+ Hours / Week', sub: 'Core operational bottleneck' },
];

export default function FinalCTA() {
  const [step, setStep] = useState(1);
  const [bottleneck, setBottleneck] = useState(bottleneckOptions[0].id);
  const [volume, setVolume] = useState(volumeOptions[1].id);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <section
      id="request-audit"
      className="py-28 md:py-36 px-6 relative bg-[#0D0D10] border-t border-white/[0.06] scroll-mt-16 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] radial-glow-cta pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic & Audit Intake</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
            Request your Automation Audit.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Answer 2 quick diagnostic questions to help us prepare tailored recommendations before we speak.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold font-display text-white mb-2">
                Diagnostic Intake Received
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-md mx-auto mb-6">
                We've queued your operational profile for preliminary architecture review. You will hear from our Principal Architect within one business day.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/[0.04] px-4 py-2 rounded-lg border border-white/5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Next step: 30-minute intro call invitation</span>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Progress Step Header */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-[#0A0A0C] flex items-center justify-center font-mono font-bold text-xs">
                    {step}
                  </span>
                  <span className="text-xs font-mono text-neutral-300">
                    {step === 1 && 'Step 1: Primary Friction'}
                    {step === 2 && 'Step 2: Operational Volume'}
                    {step === 3 && 'Step 3: Company & Contact'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className={`w-8 h-1 rounded-full transition-all ${step >= 1 ? 'bg-accent' : 'bg-white/10'}`} />
                  <div className={`w-8 h-1 rounded-full transition-all ${step >= 2 ? 'bg-accent' : 'bg-white/10'}`} />
                  <div className={`w-8 h-1 rounded-full transition-all ${step >= 3 ? 'bg-accent' : 'bg-white/10'}`} />
                </div>
              </div>

              {/* Step 1: Bottleneck Choice */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Where is your team's most severe operational bottleneck?
                  </label>
                  <div className="space-y-2.5">
                    {bottleneckOptions.map((opt) => {
                      const Icon = opt.icon;
                      const selected = bottleneck === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setBottleneck(opt.id)}
                          className={`cursor-pointer p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                            selected
                              ? 'bg-accent/10 border-accent text-white shadow-[0_0_15px_rgba(74,222,128,0.12)]'
                              : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${selected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-neutral-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{opt.label}</div>
                            <div className="text-xs text-neutral-400 mt-0.5">{opt.desc}</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 ${selected ? 'border-accent bg-accent text-[#0A0A0C]' : 'border-white/20'}`}>
                            {selected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-sm hover:bg-[#3ecf75] transition-all"
                  >
                    <span>Next: Select Volume</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Volume Choice */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Approximately how many manual team hours are consumed weekly?
                  </label>
                  <div className="space-y-3">
                    {volumeOptions.map((opt) => {
                      const selected = volume === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setVolume(opt.id)}
                          className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                            selected
                              ? 'bg-accent/10 border-accent text-white shadow-[0_0_15px_rgba(74,222,128,0.12)]'
                              : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-semibold text-white">{opt.label}</div>
                            <div className="text-xs text-neutral-400">{opt.sub}</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'border-accent bg-accent text-[#0A0A0C]' : 'border-white/20'}`}>
                            {selected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-sm hover:bg-[#3ecf75] transition-all"
                    >
                      <span>Next: Contact Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact & Submit */}
              {step === 3 && (
                <motion.form
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                        placeholder="Acme Operations Corp"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Specific Tools or Context (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all resize-none"
                      placeholder="e.g. We use NetSuite, Hubspot, and custom SQL tables"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-sm shadow-[0_0_25px_rgba(74,222,128,0.25)] hover:shadow-[0_0_35px_rgba(74,222,128,0.45)] hover:bg-[#3ecf75] transition-all duration-300 disabled:opacity-50"
                    >
                      <span>{loading ? 'Submitting...' : 'Request Free Automation Audit'}</span>
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-neutral-500" />
                      Mutual NDA Pre-Signed
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-neutral-500" />
                      Zero sales pressure
                    </span>
                  </div>
                </motion.form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
