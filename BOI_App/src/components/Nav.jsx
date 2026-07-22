import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Nav() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const firstName = user?.fullName ? user.fullName.split(' ')[0] : '';

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

      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className="nav-cta" style={{ border: 'none', cursor: 'pointer' }}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link-plain">Log in</Link>
          <Link to="/signup" className="nav-cta">Open account</Link>
        </>
      )}
    </nav>
  );
}

export default Nav;