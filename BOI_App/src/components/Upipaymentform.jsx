import { useState } from 'react';

function UpiPaymentForm({ onPaymentSuccess }) {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const upiPattern = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;

  const handleSubmit = async (e) => {
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

    setLoading(true);
    try {
      // Replace with your real Spring Boot endpoint, e.g. POST /api/payments/upi
      // const res = await fetch('/api/payments/upi', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ upiId, amount: numericAmount, note }),
      // });
      // if (!res.ok) throw new Error('Payment failed. Please try again.');
      // const data = await res.json();

      console.log('UPI payment submitted:', { upiId, amount: numericAmount, note });
      setSuccess(`Rs ${numericAmount.toLocaleString('en-IN')} sent to ${upiId}`);

      if (onPaymentSuccess) {
        onPaymentSuccess({
          id: Date.now(),
          initial: upiId.charAt(0).toUpperCase(),
          name: `UPI transfer — ${upiId}`,
          subtitle: 'Just now',
          amount: numericAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          isPositive: false,
        });
      }

      setUpiId('');
      setAmount('');
      setNote('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upi-card">
      <div className="card-label">Send money</div>
      <h3 className="upi-title">Pay via UPI</h3>

      <form className="upi-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-primary upi-submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send payment'}
        </button>
      </form>
    </div>
  );
}

export default UpiPaymentForm;