import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import UpiPaymentForm from '../components/UpiPaymentForm.jsx';
import TransactionHistory from '../components/TransactionHistory.jsx';
import './Dashboard.css';

// Turns a raw backend transaction (type, amount, counterpartyUpiId, note, createdAt)
// into the shape TransactionRow expects (initial, name, subtitle, amount, isPositive).
function formatTransaction(tx) {
  const isPositive = tx.type === 'DEPOSIT';
  const name =
    tx.type === 'UPI_TRANSFER'
      ? `UPI transfer — ${tx.counterpartyUpiId}`
      : tx.note || tx.type;

  const date = new Date(tx.createdAt);
  const subtitle = date.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
  });

  return {
    id: tx.id,
    initial: (tx.counterpartyUpiId || tx.type).charAt(0).toUpperCase(),
    name,
    subtitle,
    amount: Number(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
    isPositive,
  };
}

function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [account, txs] = await Promise.all([
          api.getAccount(token),
          api.getTransactions(token),
        ]);
        setBalance(account.balance);
        setTransactions(txs.map(formatTransaction));
      } catch (err) {
        setError(err.message || 'Could not load your account.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [token]);

  const handlePaymentSuccess = (newTransaction) => {
    setTransactions([formatTransaction(newTransaction), ...transactions]);
    setBalance((prev) => (prev !== null ? prev - Number(newTransaction.amount) : prev));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <Link to="/" className="auth-brand">
          <img src="/logo.png" alt="Bank of India logo" className="brand-logo" />
          Bank of India
        </Link>
        <div className="dashboard-nav-right">
          <div className="dashboard-balance-pill">
            Balance:{' '}
            <span>
              {loading ? '…' : balance !== null ? `Rs ${Number(balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
            </span>
          </div>
          <button className="btn-ghost" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      {error && <div className="auth-error" style={{ maxWidth: '1100px', margin: '0 auto 20px' }}>{error}</div>}

      <div className="dashboard-grid">
        <UpiPaymentForm onPaymentSuccess={handlePaymentSuccess} />
        <TransactionHistory transactions={loading ? [] : transactions} />
      </div>
    </div>
  );
}

export default Dashboard;