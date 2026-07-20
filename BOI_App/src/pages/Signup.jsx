import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import './Auth.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      // Replace with your real Spring Boot endpoint, e.g. POST /api/auth/signup
      console.log('Signup submitted:', { fullName, email, password });
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

        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Open account'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;