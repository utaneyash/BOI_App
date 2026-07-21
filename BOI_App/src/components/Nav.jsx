import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <div className="brand">
        <img src="/images.png" alt="Bank of India logo" className="brand-logo" />
        Bank of India
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#security">Security</a>
        <a href="#pricing">Pricing</a>
        <a href="#support">Support</a>
        <Link to="/dashboard">Payments</Link>
      </div>
      <Link to="/login" className="nav-link-plain">Log in</Link>
      <Link to="/signup" className="nav-cta">Open account</Link>
    </nav>
  );
}

export default Nav;