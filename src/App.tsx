import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WorkflowComparison from '@/components/WorkflowComparison';
import AutomationCalculator from '@/components/AutomationCalculator';
import SystemSchematic from '@/components/SystemSchematic';
import CaseSnapshots from '@/components/CaseSnapshots';
import WhoItsFor from '@/components/WhoItsFor';
import HowItWorks from '@/components/HowItWorks';
import Credibility from '@/components/Credibility';
import SecurityAssurance from '@/components/SecurityAssurance';
import AuditOffer from '@/components/AuditOffer';
import WhatHappensNext from '@/components/WhatHappensNext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ExitIntentModal from '@/components/ExitIntentModal';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-neutral-200 antialiased selection:bg-accent/20 selection:text-white overflow-x-hidden">
      {/* Subtle Desktop Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.035), transparent 80%)`,
        }}
      />

      <Nav />
      <main>
        <Hero />
        <WorkflowComparison />
        <AutomationCalculator />
        <SystemSchematic />
        <CaseSnapshots />
        <WhoItsFor />
        <HowItWorks />
        <Credibility />
        <SecurityAssurance />
        <AuditOffer />
        <WhatHappensNext />
        <FinalCTA />
      </main>
      <Footer />
      <ExitIntentModal />
    </div>
  );
}

export default App;
