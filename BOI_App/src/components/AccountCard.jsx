import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import { formatTransaction } from '../utils/formatTransaction.js';
import TransactionRow from './TransactionRow.jsx';

// Shown to logged-out visitors as a preview of what the app looks like.
const demoTransactions = [
  { id: 1, initial: 'R', name: 'Rent — Maple St.', subtitle: 'Today, 9:02 AM', amount: '1,450.00', isPositive: false },
  { id: 2, initial: 'P', name: 'Payroll deposit', subtitle: 'Yesterday, 6:00 AM', amount: '3,120.00', isPositive: true },
  { id: 3, initial: 'G', name: 'Groceries — Field & Co.', subtitle: 'Jul 18, 4:41 PM', amount: '86.14', isPositive: false },
];

function AccountCard() {
  const { isAuthenticated, token, user } = useAuth();
  const [realBalance, setRealBalance] = useState(null);
  const [realTransactions, setRealTransactions] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadRealData() {
      try {
        const [account, txs] = await Promise.all([
          api.getAccount(token),
          api.getTransactions(token),
        ]);
        setRealBalance(account.balance);
        setRealTransactions(txs.slice(0, 3).map(formatTransaction));
      } catch {
        // If this fails, the card just quietly falls back to the demo preview below.
      }
    }
    loadRealData();
  }, [isAuthenticated, token]);

  const showingReal = isAuthenticated && realBalance !== null;
  const balanceWhole = showingReal ? Math.trunc(realBalance) : 8214;
  const balanceCents = showingReal
    ? Math.round((realBalance - Math.trunc(realBalance)) * 100).toString().padStart(2, '0')
    : '52';
  const transactionsToShow = showingReal ? realTransactions : demoTransactions;

  return (
    <div className="card-wrap">
      <div className="ledger-card">
        <div className="card-row-top">
          <div>
            <div className="card-label">Everyday account</div>
            {showingReal && user?.fullName && (
              <div className="card-holder-name">{user.fullName}</div>
            )}
            <div className="card-acct">•••• •••• •••• 4471</div>
          </div>
          <div className="card-label">INR</div>
        </div>

        <div className="card-balance">
          Rs {balanceWhole.toLocaleString('en-IN')}<span className="cents">.{balanceCents}</span>
        </div>
        {!showingReal && <div className="card-delta">↑ 3.2% this month</div>}

        <div className="card-divider"></div>

        {transactionsToShow && transactionsToShow.length > 0 ? (
          transactionsToShow.map((tx) => (
            <TransactionRow
              key={tx.id}
              initial={tx.initial}
              name={tx.name}
              subtitle={tx.subtitle}
              amount={tx.amount}
              isPositive={tx.isPositive}
            />
          ))
        ) : (
          showingReal && <p className="history-empty">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}

export default AccountCard;