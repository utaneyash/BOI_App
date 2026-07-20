import { Link } from 'react-router-dom';
import AccountCard from './AccountCard.jsx';

function Hero() {
  return (
    <section className="hero">
      <div className="guilloche"></div>

      <div className="hero-copy">
        <div className="eyebrow">Personal &amp; joint accounts</div>
        <h1>
          Your money,
          <br />
          kept in <em>plain</em> sight.
        </h1>
        <p className="lede">
          Every balance, transfer, and fee shown exactly as it happened — no
          jargon, no hidden charges, no surprises at month's end. Banking the
          way a ledger was meant to read: clearly.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Open an account — free
          </Link>
          <a href="#" className="btn-ghost">See how it works</a>
        </div>
      </div>

      <AccountCard />
    </section>
  );
}

export default Hero;