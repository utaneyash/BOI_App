import { Link } from 'react-router-dom';

function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="guilloche"></div>

      <Link to="/" className="auth-brand">
        <img src="/logo.png" alt="Bank of India logo" className="brand-logo" />
        Bank of India
      </Link>

      <div className="auth-card">
        <div className="auth-eyebrow">{eyebrow}</div>
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>

        {children}

        <div className="auth-footer">{footer}</div>
      </div>
    </div>
  );
}

export default AuthLayout;