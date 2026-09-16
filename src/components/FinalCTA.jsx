import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="request-audit"
      className="py-24 md:py-32 px-6 border-t border-white/5 scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Ready to see where your operations can improve?
        </h2>
        <p className="text-lg text-neutral-400 leading-relaxed mb-12">
          Request a free automation audit. No commitment, no sales pressure — just a clear, honest look at your workflows.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white/[0.02] border border-accent/20 rounded-2xl p-12"
          >
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-6" strokeWidth={1.5} />
            <p className="text-lg text-neutral-200 leading-relaxed">
              We've received your request. Expect to hear from us within one business day.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5 text-left"
          >
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Company Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Work Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="jane@acme.com"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Briefly describe your biggest operational headache
              </label>
              <textarea
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                placeholder="What's taking up the most manual time?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-[#0A0A0A] text-sm font-semibold rounded-lg py-3.5 hover:bg-accent/90 transition-all duration-300"
            >
              Request My Free Audit
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          We don't share your information. We don't add you to a mailing list. We just get back to you.
        </p>
      </motion.div>
    </section>
  );
}
