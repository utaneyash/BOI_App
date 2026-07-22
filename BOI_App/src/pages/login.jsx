import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import AuthLayout from '../components/AuthLayout.jsx';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // If ProtectedRoute redirected here, it passes a message and the page
  // the user was originally trying to reach. Otherwise, just go home.
  const redirectMessage = location.state?.message;
  const redirectTo = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login({ email, password });
      login({ fullName: data.fullName, email: data.email }, data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Enter your details to access your dashboard."
      footer={
        <>
          Don't have an account? <Link to="/signup">Open one</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {redirectMessage && <div className="auth-notice">{redirectMessage}</div>}
        {error && <div className="auth-error">{error}</div>}

        <label className="auth-label" htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className="auth-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="auth-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="#" className="auth-forgot">Forgot password?</Link>

        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;