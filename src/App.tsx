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
import FAQ from '@/components/FAQ';
import AuditOffer from '@/components/AuditOffer';
import WhatHappensNext from '@/components/WhatHappensNext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ExitIntentModal from '@/components/ExitIntentModal';
import UnsubscribePage from '@/components/UnsubscribePage';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [currentSearch, setCurrentSearch] = useState<string>(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const searchParams = new URLSearchParams(currentSearch);
  const isUnsubscribePage =
    currentPath.toLowerCase().includes('unsubscribe') ||
    searchParams.get('page') === 'unsubscribe' ||
    searchParams.get('view') === 'unsubscribe' ||
    searchParams.get('unsubscribe') === 'true';

  if (isUnsubscribePage) {
    return (
      <UnsubscribePage
        onNavigateHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
          setCurrentSearch('');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

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
        <FAQ />
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



