import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, Users, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const domains = [
  { id: 'ops', name: 'Operations & ERP Sync', rate: 48 },
  { id: 'logistics', name: 'Logistics & Supply Chain', rate: 45 },
  { id: 'finance', name: 'Fintech & Accounting', rate: 55 },
  { id: 'commerce', name: 'E-commerce & Fulfillment', rate: 40 },
  { id: 'services', name: 'B2B Professional Services', rate: 60 },
];

export default function AutomationCalculator() {
  const [teamSize, setTeamSize] = useState(6);
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);

  // Calculations
  const weeklyHoursLost = teamSize * hoursPerWeek;
  const annualHoursReclaimed = Math.round(weeklyHoursLost * 48 * 0.85); // 48 work weeks, ~85% reclaim rate
  const annualCostSaved = Math.round(annualHoursReclaimed * selectedDomain.rate);
  const equivalentHeadcount = (annualHoursReclaimed / 1920).toFixed(1);

  return (
    <section id="calculator" className="py-28 md:py-36 px-6 relative bg-[#0D0D10] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] blur-[140px] rounded-full pointer-events-none" />

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
            Interactive Capacity Simulator
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
              Calculate your reclaimed team capacity.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Estimate the silent annual drain of manual handoffs and deterministic tasks across your organization.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Based on 340+ Production Deployments</span>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/10 shadow-xl flex flex-col justify-between space-y-8">
            {/* Domain Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-3">
                1. Select Primary Operational Domain
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {domains.map((d) => {
                  const active = d.id === selectedDomain.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDomain(d)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        active
                          ? 'bg-accent/10 border-accent text-white shadow-[0_0_15px_rgba(74,222,128,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15 hover:text-neutral-200'
                      }`}
                    >
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">~${d.rate}/hr blended</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider 1: Team Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  <span>2. Team members involved in repetitive ops</span>
                </label>
                <span className="text-lg font-bold font-display text-accent">
                  {teamSize} {teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>1 employee</span>
                <span>20 employees</span>
                <span>40+ employees</span>
              </div>
            </div>

            {/* Slider 2: Hours Per Person */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>3. Avg. manual hours per person / week</span>
                </label>
                <span className="text-lg font-bold font-display text-accent">
                  {hoursPerWeek} hrs / wk
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                step={1}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>2 hrs (Light)</span>
                <span>15 hrs (Moderate)</span>
                <span>30 hrs (Severe)</span>
              </div>
            </div>
          </div>

          {/* Results Output Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-accent/30 shadow-[0_0_50px_rgba(74,222,128,0.08)] flex flex-col justify-between relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-emerald-300 to-accent" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-widest text-accent">
                  Annual Opportunity
                </span>
                <span className="text-xs text-neutral-500 font-mono">ESTIMATION</span>
              </div>

              {/* Main Metric: Dollars Saved */}
              <div className="mb-6">
                <div className="text-xs text-neutral-400 mb-1">Estimated Annual Value Reclaimed</div>
                <div className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight flex items-baseline gap-1">
                  <span>${annualCostSaved.toLocaleString()}</span>
                  <span className="text-xs font-mono text-accent font-normal">/ year</span>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.08] mb-8">
                <div>
                  <div className="text-xs text-neutral-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>Hours Saved</span>
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    {annualHoursReclaimed.toLocaleString()} <span className="text-xs font-mono font-normal text-neutral-400">hrs</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-neutral-400 mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    <span>Unlocked Capacity</span>
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    +{equivalentHeadcount} <span className="text-xs font-mono font-normal text-neutral-400">FTEs</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                These hours are currently spent on routine data syncs, invoice approvals, order entry, and email triage.
              </p>
            </div>

            {/* Direct Pre-filled CTA */}
            <a
              href="#request-audit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent text-[#0A0A0C] font-semibold text-xs uppercase tracking-wider hover:bg-[#3ecf75] hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] transition-all duration-300"
            >
              <span>Audit These {weeklyHoursLost} Weekly Hours</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
