import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';

const PIN_LENGTH = 4;

function PinModal({ amount, upiId, note, onConfirm, onCancel }) {
  const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef([]);
  const { token } = useAuth();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError('');

    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pin = digits.join('');
    if (pin.length !== PIN_LENGTH) {
      setError('Enter your complete UPI PIN.');
      return;
    }

    setVerifying(true);
    try {
      // The backend verifies the PIN against the securely hashed value on file
      // and applies the actual debit + records the transaction, all atomically.
      const transaction = await api.sendUpiPayment(
        { upiId, amount: Number(amount.replace(/,/g, '')), note, pin },
        token
      );
      onConfirm(transaction);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setDigits(Array(PIN_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="pin-overlay">
      <div className="pin-modal">
        <div className="card-label">Confirm payment</div>
        <h3 className="pin-title">Enter UPI PIN</h3>
        <p className="pin-subtitle">
          Paying <span className="pin-amount">Rs {amount}</span> to <span className="pin-upi mono">{upiId}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="pin-boxes">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="pin-box"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
              />
            ))}
          </div>

          <button type="submit" className="btn-primary pin-submit" disabled={verifying}>
            {verifying ? 'Verifying…' : 'Confirm & pay'}
          </button>
          <button type="button" className="btn-ghost pin-cancel" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

function UpiPaymentForm({ onPaymentSuccess }) {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);

  const upiPattern = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!upiPattern.test(upiId)) {
      setError('Enter a valid UPI ID, e.g. name@bank');
      return;
    }
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError('Enter an amount greater than Rs 0');
      return;
    }

    setShowPinModal(true);
  };

  const handlePinConfirm = (transaction) => {
    setSuccess(`Rs ${Number(amount).toLocaleString('en-IN')} sent to ${upiId}`);
    setShowPinModal(false);

    if (onPaymentSuccess) {
      onPaymentSuccess(transaction);
    }

    setUpiId('');
    setAmount('');
    setNote('');
  };

  return (
    <div className="upi-card">
      <div className="card-label">Send money</div>
      <h3 className="upi-title">Pay via UPI</h3>

      <form className="upi-form" onSubmit={handleDetailsSubmit}>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="upi-success">{success}</div>}

        <label className="auth-label" htmlFor="upiId">UPI ID</label>
        <input
          id="upiId"
          type="text"
          className="auth-input mono"
          placeholder="name@bank"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="amount">Amount (Rs)</label>
        <input
          id="amount"
          type="number"
          min="1"
          step="0.01"
          className="auth-input mono"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="note">Note (optional)</label>
        <input
          id="note"
          type="text"
          className="auth-input"
          placeholder="What's this for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit" className="btn-primary upi-submit">
          Send payment
        </button>
      </form>

      {showPinModal && (
        <PinModal
          amount={Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          upiId={upiId}
          note={note}
          onConfirm={handlePinConfirm}
          onCancel={() => setShowPinModal(false)}
        />
      )}
    </div>
  );
}

export default UpiPaymentForm;