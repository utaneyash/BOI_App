import { Link } from 'react-router-dom';

function CTASection() {
  return (
    <section className="cta-section">
      <div className="guilloche" style={{ opacity: 0.1 }}></div>
      <div className="cta-title">Open an account in under four minutes.</div>
      <p className="cta-sub">
        No paperwork, no branch visit — just your ID and a few details about you.
      </p>
      <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Get started
      </Link>
    </section>
  );
}

export default CTASection;