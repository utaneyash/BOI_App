import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import AuthLayout from '../components/AuthLayout.jsx';
import './Auth.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!/^\d{4,6}$/.test(upiPin)) {
      setError('UPI PIN must be 4-6 digits.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.signup({ fullName, email, password, upiPin });
      login({ fullName: data.fullName, email: data.email }, data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Open your account"
      subtitle="Takes under four minutes. No paperwork, no branch visit."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        <label className="auth-label" htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          className="auth-input"
          placeholder="As it appears on your ID"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          className="auth-input"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="upiPin">Set your UPI PIN</label>
        <input
          id="upiPin"
          type="password"
          inputMode="numeric"
          maxLength={6}
          className="auth-input mono"
          placeholder="4-6 digits"
          value={upiPin}
          onChange={(e) => setUpiPin(e.target.value.replace(/\D/g, ''))}
          required
        />

        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Open account'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;