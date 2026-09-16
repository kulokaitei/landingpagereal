import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const forYou = [
  'Your team handles repetitive manual work across tools that don\'t talk to each other',
  'You\'re running a real business with established workflows, not a side project',
  'You\'ve thought about automation but don\'t know where to start or what\'s actually worth building',
  'You want practical improvements, not experiments',
];

const notForYou = [
  'You\'re looking for a magic button that replaces thinking',
  'You\'re in early exploration with no defined processes yet',
  'You\'re expecting results in days without any internal involvement',
  'You want a vendor to hand off to and forget about',
];

export default function WhoItsFor() {
  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
          A Good Fit
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-16">
          Built for businesses with real operations.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* For you */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-medium text-white mb-6">This is for you if:</h3>
            <ul className="space-y-5">
              {forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-neutral-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for you */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-medium text-neutral-400 mb-6">This probably isn't for you if:</h3>
            <ul className="space-y-5">
              {notForYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-neutral-500 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
