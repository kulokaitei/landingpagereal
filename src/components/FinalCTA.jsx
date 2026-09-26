import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Lock,
  Clock,
  Sparkles,
  Check,
  Server,
  FileSpreadsheet,
  Layers,
  Cpu,
  Database,
  ShoppingBag,
  Building2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import * as Sentry from '@sentry/react';

const bottleneckOptions = [
  {
    id: 'data_sync',
    label: 'Cross-Tool Data Sync & ERP Entry',
    desc: 'Manual copy-paste between CRM, ERP, and databases',
    icon: FileSpreadsheet,
  },
  {
    id: 'doc_triage',
    label: 'Unstructured Document & Invoice Triage',
    desc: 'PDF orders, invoices, claims, and contract parsing',
    icon: Cpu,
  },
  {
    id: 'order_routing',
    label: 'Order, Inventory & Fulfillment Logistics',
    desc: 'Vendor inventory sync, multi-warehouse routing',
    icon: Layers,
  },
  {
    id: 'custom_stack',
    label: 'Custom Legacy System Integration',
    desc: 'Bridging internal proprietary tools & APIs',
    icon: Server,
  },
];

const volumeOptions = [
  { id: 'low', label: '5 – 15 Hours / Week', sub: 'Single department friction' },
  { id: 'med', label: '15 – 40 Hours / Week', sub: 'Multiple staff members involved' },
  { id: 'high', label: '40 – 100+ Hours / Week', sub: 'Core operational bottleneck' },
];

const techStackOptions = [
  {
    id: 'enterprise_erp',
    label: 'Enterprise ERP & CRM',
    desc: 'NetSuite, Salesforce, HubSpot, SAP, or Microsoft Dynamics',
    icon: Building2,
  },
  {
    id: 'cloud_db',
    label: 'Modern Cloud & Database Stack',
    desc: 'PostgreSQL, Supabase, Airtable, Notion, custom REST/GraphQL APIs',
    icon: Database,
  },
  {
    id: 'ecommerce_logistics',
    label: 'E-commerce & Logistics Ecosystem',
    desc: 'Shopify Plus, Amazon FBA, ShipStation, 3PL/WMS systems',
    icon: ShoppingBag,
  },
  {
    id: 'spreadsheets_legacy',
    label: 'Spreadsheets & Legacy On-Prem',
    desc: 'Excel / Google Sheets, legacy desktop software, manual email chains',
    icon: FileSpreadsheet,
  },
];

export default function FinalCTA() {
  const [step, setStep] = useState(1);
  const [bottleneck, setBottleneck] = useState(bottleneckOptions[0].id);
  const [volume, setVolume] = useState(volumeOptions[1].id);
  const [techStack, setTechStack] = useState(techStackOptions[0].id);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Check URL parameters on mount for payment redirects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const payment = params.get('payment');
      const session = params.get('session_id');
      const emailParam = params.get('email');

      if (payment === 'success') {
        setPaymentSuccess(true);
        setSubmitted(true);
        if (session) setSessionId(session);
        if (emailParam) setEmail(emailParam);
      } else if (payment === 'cancelled') {
        setPaymentCancelled(true);
        setStep(4);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!gdprConsent) {
      setErrorMsg('Please confirm your consent to proceed with the transformation plan.');
      return;
    }

    setLoading(true);

    const payload = {
      firstName,
      lastName,
      email,
      company,
      notes,
      gdprConsent,
      diagnostic: {
        bottleneck,
        volume,
        techStack,
      },
      website_hp: honeypot,
      source: 'diagnostic_wizard',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize Stripe checkout. Please try again.');
      }

      if (data.url) {
        // Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Checkout submission error:', err);
      Sentry.captureException(err);
      setErrorMsg(
        err.message || 'An unexpected connection error occurred. Please try submitting again.'
      );
      setLoading(false);
    }
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
            <span>Operations Transformation Plan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
            Apply for your Transformation Plan.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Complete your diagnostic profile to initiate your custom systems architecture roadmap and reserve engineer onboarding.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          {/* Payment Cancelled Notice Banner */}
          {paymentCancelled && !submitted && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Checkout was cancelled. Your diagnostic inputs were preserved so you can checkout when ready.</span>
              </div>
              <button
                type="button"
                onClick={() => setPaymentCancelled(false)}
                className="text-neutral-400 hover:text-white font-mono text-[11px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(74,222,128,0.25)]">
                <CheckCircle2 className="w-8 h-8 text-accent" strokeWidth={2} />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163824] border border-[#23653A] text-accent font-mono text-xs font-semibold uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{paymentSuccess ? 'Order & Payment Confirmed' : 'Diagnostic Intake Dispatched'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                {paymentSuccess ? 'Transformation Plan Queued' : 'Intake Dispatched'}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-md mx-auto mb-6">
                Thank you{firstName ? `, ${firstName}` : ''}! Your operational profile and payment have been verified. Your custom architecture roadmap and dispatch telemetry have been relayed to <span className="text-accent font-medium">{email || 'your email'}</span>.
              </p>

              {sessionId && (
                <div className="mb-6 inline-block text-[11px] font-mono text-neutral-400 bg-white/[0.04] px-4 py-2 rounded-lg border border-white/10">
                  STRIPE_SESSION: <span className="text-neutral-300">{sessionId}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/');
                    setSubmitted(false);
                    setPaymentSuccess(false);
                    setStep(1);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Home</span>
                </a>
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
                    {step === 3 && 'Step 3: Tech Ecosystem'}
                    {step === 4 && 'Step 4: Contact & Roadmap'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className={`w-7 h-1 rounded-full transition-all ${step >= 1 ? 'bg-accent' : 'bg-white/10'}`} />
                  <div className={`w-7 h-1 rounded-full transition-all ${step >= 2 ? 'bg-accent' : 'bg-white/10'}`} />
                  <div className={`w-7 h-1 rounded-full transition-all ${step >= 3 ? 'bg-accent' : 'bg-white/10'}`} />
                  <div className={`w-7 h-1 rounded-full transition-all ${step >= 4 ? 'bg-accent' : 'bg-white/10'}`} />
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
                    1. Where is your team's most severe operational bottleneck?
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
                    2. Approximately how many manual team hours are consumed weekly?
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
                      <span>Next: Tech Ecosystem</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Tech Stack Choice */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    3. What is your primary tech stack / operating ecosystem?
                  </label>
                  <div className="space-y-2.5">
                    {techStackOptions.map((opt) => {
                      const Icon = opt.icon;
                      const selected = techStack === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setTechStack(opt.id)}
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

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-sm hover:bg-[#3ecf75] transition-all"
                    >
                      <span>Next: Contact Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact & Submit */}
              {step === 4 && (
                <motion.form
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Anti-spam Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Error Notification Alert */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="flex-1">{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Company & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
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
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all"
                        placeholder="Acme Operations Corp"
                      />
                    </div>
                  </div>

                  {/* Specific Tools / Notes */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Specific Tools or Context (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#121216]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all resize-none"
                      placeholder="e.g. We want to connect NetSuite with custom PostgreSQL database"
                    />
                  </div>

                  {/* GDPR Compliance Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          required
                          checked={gdprConsent}
                          onChange={(e) => setGdprConsent(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                            gdprConsent
                              ? 'bg-accent border-accent text-[#0A0A0C]'
                              : 'bg-white/[0.04] border-white/20 group-hover:border-white/40'
                          }`}
                        >
                          {gdprConsent && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                        I consent to the processing of my personal data to receive my tailored automation audit roadmap in accordance with privacy regulations.
                      </span>
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
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
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Roadmap...</span>
                        </>
                      ) : (
                        <>
                          <span>Get My Full Audit RoadMap</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
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
