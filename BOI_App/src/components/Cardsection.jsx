import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';

function CardSection() {
  const { token, user } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCard() {
      try {
        const data = await api.getCard(token);
        setCard(data);
      } catch {
        // No card yet — this is an expected state, not an error to show.
        setCard(null);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [token]);

  const handleApply = async () => {
    setError('');
    setApplying(true);
    try {
      const data = await api.applyForCard(token);
      setCard(data);
    } catch (err) {
      setError(err.message || 'Could not issue a card right now. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="card-section">
        <div className="card-label">Your card</div>
        <p className="history-empty">Loading…</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="card-section">
        <div className="card-label">Your card</div>
        <h3 className="upi-title">No card yet</h3>
        <p className="card-section-sub">
          Get a virtual debit card instantly — no paperwork, works right away for online payments.
        </p>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary" onClick={handleApply} disabled={applying}>
          {applying ? 'Issuing card…' : 'Apply for a card'}
        </button>
      </div>
    );
  }

  return (
    <div className="card-section">
      <div className="card-label">Your card</div>
      <div className="debit-card">
        <div className="debit-card-top">
          <span className="debit-card-bank">Bank of India</span>
          <span className="debit-card-type">Virtual Debit</span>
        </div>
        <div className="debit-card-chip"></div>
        <div className="debit-card-number mono">{card.maskedNumber}</div>
        <div className="debit-card-bottom">
          <div>
            <div className="debit-card-label">Card holder</div>
            <div className="debit-card-value">{card.cardHolderName}</div>
          </div>
          <div>
            <div className="debit-card-label">Expires</div>
            <div className="debit-card-value mono">{card.expiry}</div>
          </div>
        </div>
      </div>
      <div className={card.status === 'ACTIVE' ? 'card-status active' : 'card-status'}>
        {card.status === 'ACTIVE' ? '● Active' : '● Blocked'}
      </div>
    </div>
  );
}

export default CardSection;