import { motion } from 'framer-motion';
import { Shield, Lock, Server, FileCheck, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Mutual NDA Protection',
    description: 'We execute a mutual non-disclosure agreement prior to reviewing any proprietary operational workflows.',
  },
  {
    icon: Server,
    title: 'Client-Owned Tenancy',
    description: 'All pipelines and automation scripts deploy directly into your AWS, GCP, Azure, or private cloud VPC.',
  },
  {
    icon: Shield,
    title: 'Zero Third-Party Model Training',
    description: 'Your business data and customer records are never used to train public or shared AI models.',
  },
  {
    icon: FileCheck,
    title: 'Zero Vendor Lock-In',
    description: 'Every system is built on standard open technologies with full documentation and code transfer.',
  },
];

export default function SecurityAssurance() {
  return (
    <section className="py-20 md:py-28 px-6 relative bg-[#09090C] border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Security & Sovereignty</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold font-display tracking-tight text-white mb-3">
            Your data remains strictly yours.
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Enterprise operations demand uncompromising confidentiality and infrastructure control.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold font-display text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
