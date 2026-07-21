import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import UpiPaymentForm from '../components/UpiPaymentForm.jsx';
import TransactionHistory from '../components/TransactionHistory.jsx';
import './Dashboard.css';

// Mock starting data — replace with a fetch to your Spring Boot API,
// e.g. GET /api/accounts/{id}/transactions
const initialTransactions = [
  { id: 1, initial: 'R', name: 'Rent — Maple St.', subtitle: 'Today, 9:02 AM', amount: '1,450.00', isPositive: false },
  { id: 2, initial: 'P', name: 'Payroll deposit', subtitle: 'Yesterday, 6:00 AM', amount: '3,120.00', isPositive: true },
  { id: 3, initial: 'G', name: 'Groceries — Field & Co.', subtitle: 'Jul 18, 4:41 PM', amount: '86.14', isPositive: false },
  { id: 4, initial: 'U', name: 'UPI transfer — friend@upi', subtitle: 'Jul 16, 2:15 PM', amount: '500.00', isPositive: false },
  { id: 5, initial: 'S', name: 'Salary credit', subtitle: 'Jul 1, 6:00 AM', amount: '45,000.00', isPositive: true },
];

function Dashboard() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handlePaymentSuccess = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
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
            Balance: <span>Rs 8,214.52</span>
          </div>
          <button className="btn-ghost" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <UpiPaymentForm onPaymentSuccess={handlePaymentSuccess} />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;