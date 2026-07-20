import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import Features from '../components/Features.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <CTASection />
      <Footer />
    </>
  );
}

export default LandingPage;
