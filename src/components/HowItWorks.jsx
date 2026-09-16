import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Understand your current system',
    description: "We start by mapping how work actually moves through your business — not how it's supposed to, but how it does. That means talking to the people doing the work.",
  },
  {
    number: '02',
    title: 'Identify bottlenecks and waste',
    description: 'We look for the places where time disappears: manual handoffs, repeated data entry, decisions that follow a pattern but still require a human to make them.',
  },
  {
    number: '03',
    title: 'Design practical automations',
    description: "We propose specific automations that fit your existing setup. Nothing theoretical. Everything is scoped to what your team can actually adopt and maintain.",
  },
  {
    number: '04',
    title: 'Decide together what makes sense',
    description: "You get a clear picture of what's possible, what it takes, and what the tradeoff is. Then you decide. We don't push. We advise.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
          The Process
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-16">
          Four steps. No jargon. No surprises.
        </h2>

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
          {/* connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-white/10" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center mb-6 relative z-10">
                <span className="text-xl font-semibold text-accent">{step.number}</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="relative pl-8 border-l border-white/10"
            >
              <div className="absolute -left-[15px] top-0 w-8 h-8 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-xs font-semibold text-accent">{step.number}</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
