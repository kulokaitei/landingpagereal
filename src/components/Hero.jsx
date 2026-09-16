import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tightest text-white leading-[1.05] mb-8">
          Your team is spending real hours on work that shouldn't require a human.
        </h1>
        <h2 className="text-lg md:text-xl font-normal text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-12">
          We build automation systems that remove operational friction — quietly, reliably, and without disrupting how your business already runs. Not a tool. Not a plugin. A system designed around your actual workflows.
        </h2>
        <a
          href="#request-audit"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-medium rounded-lg hover:bg-accent/10 transition-all duration-300"
        >
          Request an Automation Audit
        </a>
        <p className="mt-6 text-sm text-neutral-500">
          No commitment. No sales call. Just a clear look at where your operations can improve.
        </p>
      </motion.div>
    </section>
  );
}
