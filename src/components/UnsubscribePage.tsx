import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  MailX,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  Send,
  HelpCircle,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface UnsubscribePageProps {
  onNavigateHome?: () => void;
}

export default function UnsubscribePage({ onNavigateHome }: UnsubscribePageProps) {
  const [email, setEmail] = useState<string>('');
  const [isResubscribed, setIsResubscribed] = useState<boolean>(false);
  const [isResubscribing, setIsResubscribing] = useState<boolean>(false);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  useEffect(() => {
    // Parse email and optional query params from URL
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam.trim());
    } else {
      setEmail('your email address');
    }

    // Generate a deterministic or pseudo-random compliance audit ID
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    setReferenceId(`OP-UNSUB-${randomHex}`);
  }, []);

  const handleResubscribe = () => {
    setIsResubscribing(true);
    setTimeout(() => {
      setIsResubscribing(false);
      setIsResubscribed(true);
    }, 650);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackCategory && !feedbackText.trim()) return;
    setFeedbackSubmitted(true);
  };

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const reasons = [
    { id: 'frequency', label: 'Cadence too high / Too frequent' },
    { id: 'relevance', label: 'Not relevant to my current tech stack' },
    { id: 'role_change', label: 'Changed company or team role' },
    { id: 'never_signed', label: 'Never intended to subscribe' },
    { id: 'other', label: 'Other / Prefer not to specify' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-neutral-200 antialiased selection:bg-accent/20 selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Grids and Atmospheric Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.12)_0%,rgba(74,222,128,0.02)_50%,transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 border-b border-white/[0.08] bg-[#0A0A0C]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={handleGoHome}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white font-display">
              Meridian
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-neutral-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
              Ops Engine
            </span>
          </a>

          <a
            href="/"
            onClick={handleGoHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.07] px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Terminal</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="max-w-2xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative rounded-2xl bg-[#0F0F12]/90 border border-white/[0.08] p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            {/* Top Border Neon Line Accent */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            {/* Status Pill */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163824] border border-[#23653A] text-accent font-mono text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Subscription Halted</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                AUDIT_REF: <span className="text-neutral-300">{referenceId || 'OP-UNSUB-8F4A21'}</span>
              </div>
            </div>

            {/* Confirmation State Transition */}
            <AnimatePresence mode="wait">
              {!isResubscribed ? (
                <motion.div
                  key="unsubscribed-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <MailX className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                        You Have Been Unsubscribed
                      </h1>
                      <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
                        We have successfully updated our records. You will no longer receive automation audits, engineering briefings, or product updates at:
                      </p>
                      <div className="mt-2.5 inline-block px-3 py-1 rounded-md bg-[#181820] border border-white/10 font-mono text-xs text-accent font-medium break-all">
                        {email}
                      </div>
                    </div>
                  </div>

                  {/* Terminal Diagnostics Readout */}
                  <div className="my-6 rounded-xl bg-[#0A0A0C] border border-white/[0.06] p-4 font-mono text-xs text-neutral-400 leading-relaxed overflow-x-auto">
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/5 text-[11px] text-neutral-400">
                      <Terminal className="w-3.5 h-3.5 text-accent" />
                      <span>DISPATCH TERMINAL TELEMETRY</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-neutral-400">
                        <span className="text-accent">&gt;</span> STATUS: <span className="text-white">EMAIL_CADENCE_HALTED [OK]</span>
                      </div>
                      <div className="text-neutral-400">
                        <span className="text-accent">&gt;</span> REGISTRY: <span className="text-white">RECIPIENT_SUPPRESSED</span>
                      </div>
                      <div className="text-neutral-400">
                        <span className="text-accent">&gt;</span> GDPR_COMPLIANCE: <span className="text-white">RECORD_SUPPRESSED_IMMEDIATELY</span>
                      </div>
                    </div>
                  </div>

                  {/* Resubscribe Section */}
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/[0.04]">
                    <div>
                      <h3 className="text-sm font-semibold text-white font-display">
                        Did this happen by mistake?
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        You can reactivate your engineering dispatch subscription in one click.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResubscribe}
                      disabled={isResubscribing}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-[#0A0A0C] text-xs font-bold font-sans transition-all duration-200 shadow-[0_0_20px_rgba(74,222,128,0.25)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] flex-shrink-0 disabled:opacity-50"
                    >
                      {isResubscribing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Re-activating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Re-subscribe</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Feedback Section */}
                  <div className="mt-8 pt-6 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-4 h-4 text-neutral-400" />
                      <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-300 font-semibold">
                        Optional: Help Us Optimize Our Output
                      </h3>
                    </div>

                    {!feedbackSubmitted ? (
                      <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {reasons.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setFeedbackCategory(r.id)}
                              className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                                feedbackCategory === r.id
                                  ? 'bg-accent/10 border-accent text-white shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                                  : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-neutral-200 hover:border-white/20'
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>

                        <div>
                          <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Any specific thoughts or operational friction? (Optional)"
                            rows={2}
                            className="w-full rounded-lg bg-[#0A0A0C] border border-white/10 px-3 py-2 text-xs text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-neutral-400 font-mono">
                            Zero spam guarantee.
                          </span>
                          <button
                            type="submit"
                            disabled={!feedbackCategory && !feedbackText.trim()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white border border-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Send className="w-3 h-3" />
                            <span>Submit Feedback</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-accent mx-auto mb-1.5" />
                        <p className="text-xs text-neutral-200 font-medium">
                          Feedback received. Thank you for helping us calibrate our systems.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="resubscribed-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                    Welcome Back to Meridian
                  </h2>
                  <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
                    Your subscription has been successfully restored. You will continue to receive operational architecture briefs and automation benchmarks.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleGoHome}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-[#0A0A0C] text-xs font-bold font-sans transition-all duration-200 shadow-[0_0_25px_rgba(74,222,128,0.25)]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Return to Meridian Home</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsResubscribed(false)}
                      className="w-full sm:w-auto px-4 py-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-neutral-400 hover:text-white border border-white/10 transition-colors"
                    >
                      Undo & Unsubscribe
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Utility Actions */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <a
                href="/"
                onClick={handleGoHome}
                className="hover:text-accent flex items-center gap-1.5 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explore Meridian Automation Systems</span>
              </a>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>GDPR & CCPA Compliant Suppression</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#0A0A0C] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-white">Meridian</span>
            <span className="font-mono text-neutral-400">/ Autonomous Operations Architecture</span>
          </div>
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} Meridian Systems Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
