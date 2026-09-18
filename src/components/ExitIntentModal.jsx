import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CheckCircle2, ArrowRight, Sparkles, Shield } from 'lucide-react';

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 15) {
        const hasSeen = sessionStorage.getItem('meridian_exit_seen');
        if (!hasSeen) {
          setIsOpen(true);
          sessionStorage.setItem('meridian_exit_seen', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-lg w-full rounded-3xl p-8 sm:p-10 bg-[#0E0E12] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Top glow accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-accent via-emerald-300 to-accent" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {downloaded ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center mx-auto mb-4 text-accent">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Checklist Sent to Your Inbox
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xs mx-auto mb-6">
                Check your email for the PDF download link. No sales spam will follow.
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-white/[0.08] text-xs font-semibold text-white hover:bg-white/15 transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Operations Guide</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                5 Red Flags Your Team is Drowning in Manual Work
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                A concise 4-page technical framework to identify silent operational profit leaks before they compound.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDownloaded(true);
                }}
                className="space-y-3.5"
              >
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-xs uppercase tracking-wider hover:bg-[#3ecf75] transition-all"
                >
                  <span>Send Free Diagnostic Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-neutral-400 font-mono">
                <Shield className="w-3 h-3 text-neutral-400" />
                <span>Zero marketing lists. Instant PDF download.</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
