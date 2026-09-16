import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'We review your request',
    description: "Within one business day, we'll look at what you've shared and confirm we're a good fit to help.",
  },
  {
    number: '2',
    title: 'Short intro call',
    description: "A 30-minute call. No slides. No pitch. We ask questions about your operations and you ask whatever you want about how we work.",
  },
  {
    number: '3',
    title: 'We do the audit',
    description: 'We map your workflows, identify the friction points, and put together a clear set of recommendations. This takes 5–7 business days.',
  },
  {
    number: '4',
    title: 'You get the findings',
    description: "We walk you through what we found. You get a written summary you can keep. Then you decide what, if anything, you want to do next.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
          After You Submit
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-16">
          Here's exactly what happens after you reach out.
        </h2>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
                  <span className="text-sm font-semibold text-accent">{step.number}</span>
                </div>
              </div>
              <div className="pt-1.5">
                <h3 className="text-lg font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-16 text-sm text-neutral-500 italic">
          We don't follow up aggressively. If it's a fit, you'll know.
        </p>
      </motion.div>
    </section>
  );
}
