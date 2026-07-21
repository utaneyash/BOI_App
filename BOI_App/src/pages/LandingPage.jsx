import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import Features from '../components/Features.jsx';
import Pricing from '../components/Pricing.jsx';
import Support from '../components/Support.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';
import './LandingPage.css';
import Security from '../components/Security.jsx';

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <Security />
      <Pricing />
      <Support />
      <CTASection />
      <Footer />
    </>
  );
}

export default LandingPage;