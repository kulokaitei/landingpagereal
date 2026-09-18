import { motion } from 'framer-motion';
import { Check, X, Sparkles, AlertCircle } from 'lucide-react';

const forYou = [
  'Your team handles repetitive manual work across tools that don\'t talk to each other',
  'You\'re running a real business with established workflows, not a side project',
  'You\'ve thought about automation but don\'t know where to start or what\'s actually worth building',
  'You want practical, high-leverage improvements with zero theoretical fluff',
];

const notForYou = [
  'You\'re looking for a magic button that replaces thinking or basic management',
  'You\'re in early product ideation with no defined recurring processes yet',
  'You\'re expecting results overnight without any internal stakeholder context',
  'You want an offshore commodity vendor to hand off to and completely forget',
];

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-28 md:py-36 px-6 relative overflow-hidden bg-[#0A0A0C]">
      {/* Subtle backdrop transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

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
            Qualification & Fit
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-6">
          Built for businesses with real operations.
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mb-16 leading-relaxed">
          We are intentional about who we take on. Our systems deliver maximum leverage when there is established operational volume to optimize.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* For you - Positive / Hero Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-accent/30 shadow-[0_0_40px_rgba(74,222,128,0.06)] hover:shadow-[0_0_50px_rgba(74,222,128,0.12)] hover:border-accent/50 transition-all flex flex-col justify-between"
          >
            {/* Ambient card top glow */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High Alignment</span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">01 / FIT</span>
              </div>

              <h3 className="text-xl font-semibold font-display text-white mb-6">
                This is designed for you if:
              </h3>

              <ul className="space-y-5">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5 group">
                    <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/25 transition-colors">
                      <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                    </div>
                    <span className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-accent">
              <span className="font-mono">Expected ROI: 4x – 10x manual labor savings</span>
              <span>✓</span>
            </div>
          </motion.div>

          {/* Not for you - Muted Neutral Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl p-8 sm:p-10 bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-400 text-xs font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Not Ideal</span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">02 / OUT OF SCOPE</span>
              </div>

              <h3 className="text-xl font-semibold font-display text-neutral-300 mb-6">
                This probably isn't a fit if:
              </h3>

              <ul className="space-y-5">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-neutral-400" strokeWidth={2} />
                    </div>
                    <span className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs text-neutral-400 font-mono">
              We decline ~35% of requests to ensure existing client focus.
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
