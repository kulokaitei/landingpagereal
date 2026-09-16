import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto flex items-center justify-between"
      >
        <span className="text-lg font-semibold tracking-tight text-white">
          Meridian
        </span>
        <p className="text-xs text-neutral-500">
          © 2025 Meridian. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
