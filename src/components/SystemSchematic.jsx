import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Cloud, MessageSquare, Terminal, Server, Shield, CheckCircle } from 'lucide-react';

const nodes = [
  { id: 'ingest', label: 'Source Ingest', desc: 'Email / Webhook / S3 / EDI', latency: '4ms', type: 'input' },
  { id: 'parser', label: 'Schema Engine', desc: 'Deterministic Parser & Validator', latency: '12ms', type: 'core' },
  { id: 'router', label: 'Decision Logic', desc: 'Business Rule Engine & Thresholds', latency: '6ms', type: 'core' },
  { id: 'erp', label: 'Enterprise ERP', desc: 'NetSuite / SAP / PostgreSQL Sync', latency: '18ms', type: 'output' },
  { id: 'alerts', label: 'Event Telemetry', desc: 'Slack / PagerDuty / Webhook Out', latency: '5ms', type: 'output' },
];

export default function SystemSchematic() {
  const [activeNode, setActiveNode] = useState(nodes[1]);

  return (
    <section className="py-28 md:py-36 px-6 relative bg-[#0D0D10] border-t border-white/[0.06] overflow-hidden">
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
            Live Architecture Schematic
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
              Engineered for deterministic scale.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Every workflow is decoupled into fault-tolerant micro-pipelines with automatic retry queues, schema validation, and complete observability.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 self-start md:self-auto bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-neutral-300">Live Execution Simulation</span>
          </div>
        </div>

        {/* Schematic Container Box */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#09090C] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Telemetry Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-accent font-semibold flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" />
                SYSTEM_STATUS: HEALTHY
              </span>
              <span className="text-white/20">|</span>
              <span>UPTIME: 99.998%</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>QUEUE_LATENCY: &lt; 20ms</span>
              <span>SECURITY: VPC ENCRYPTED</span>
            </div>
          </div>

          {/* Interactive Node Flow Map */}
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 relative mb-8">
            {nodes.map((node, i) => {
              const isSelected = activeNode.id === node.id;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveNode(node)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-accent/[0.08] border-accent shadow-[0_0_25px_rgba(74,222,128,0.15)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-neutral-400 font-bold">NODE_0{i + 1}</span>
                    <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                      {node.latency}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold font-display text-white mb-1">
                    {node.label}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    {node.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Node Detail Inspector Output */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-accent flex-shrink-0" />
              <div>
                <span className="text-neutral-400">INSPECTING: </span>
                <span className="text-white font-semibold">{activeNode.label}</span>
                <span className="text-neutral-500 ml-2">({activeNode.desc})</span>
              </div>
            </div>
            <div className="text-neutral-400 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-accent" />
              <span>Full Audit Logging & Self-Healing Retry Enabled</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
