import { motion } from 'framer-motion';

const stats = [
  { number: '340+', label: 'Automations running in production' },
  { number: '12+', label: "Industries we've worked across" },
  { number: '~60%', label: 'Average reduction in manual processing time' },
];

const logos = ['MFG', 'OPS', 'SVC', 'FIN', 'LOG', 'RTL'];

export default function Credibility() {
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
          Track Record
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-20">
          We work quietly. The results aren't.
        </h2>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-4">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo row */}
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-6">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
                className="w-20 h-12 md:w-24 md:h-14 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center"
              >
                <span className="text-xs font-semibold text-neutral-500 tracking-widest">
                  {logo}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-neutral-500">
            Across manufacturing, logistics, professional services, and more.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
