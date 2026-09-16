import { motion } from 'framer-motion';
import { FileText, ShieldCheck, MessageSquareText } from 'lucide-react';

const valuePoints = [
  {
    icon: FileText,
    title: 'No fluff',
    description: 'You get a real assessment, not a pitch deck',
  },
  {
    icon: ShieldCheck,
    title: 'No obligation',
    description: 'The audit has value on its own, regardless of next steps',
  },
  {
    icon: MessageSquareText,
    title: 'No jargon',
    description: 'Everything is explained in plain operational language',
  },
];

export default function AuditOffer() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
          Free Audit
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-10">
          A free automation audit. Useful whether or not we work together.
        </h2>

        <div className="space-y-6 mb-16">
          <p className="text-lg text-neutral-300 leading-relaxed">
            The audit is a structured review of your current workflows. We look at where time is being lost, where handoffs break down, and where automation would actually make a difference — versus where it would just add complexity.
          </p>
          <p className="text-lg text-neutral-300 leading-relaxed">
            At the end, you'll have a clear map of your automation opportunities, prioritized by impact and feasibility. You can take that and do whatever you want with it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valuePoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-medium text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
