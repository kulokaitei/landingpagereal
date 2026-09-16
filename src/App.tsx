import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhoItsFor from '@/components/WhoItsFor';
import HowItWorks from '@/components/HowItWorks';
import Credibility from '@/components/Credibility';
import AuditOffer from '@/components/AuditOffer';
import WhatHappensNext from '@/components/WhatHappensNext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 antialiased">
      <Nav />
      <main>
        <Hero />
        <WhoItsFor />
        <HowItWorks />
        <Credibility />
        <AuditOffer />
        <WhatHappensNext />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
