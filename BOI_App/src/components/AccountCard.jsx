import TransactionRow from './TransactionRow.jsx';

// Mock data — replace with a fetch to your Spring Boot API,
// e.g. GET /api/accounts/{id} and GET /api/accounts/{id}/transactions
const mockTransactions = [
  { id: 1, initial: 'R', name: 'Rent — Maple St.', subtitle: 'Today, 9:02 AM', amount: '1,450.00', isPositive: false },
  { id: 2, initial: 'P', name: 'Payroll deposit', subtitle: 'Yesterday, 6:00 AM', amount: '3,120.00', isPositive: true },
  { id: 3, initial: 'G', name: 'Groceries — Field & Co.', subtitle: 'Jul 18, 4:41 PM', amount: '86.14', isPositive: false },
];

function AccountCard() {
  return (
    <div className="card-wrap">
      <div className="ledger-card">
        <div className="card-row-top">
          <div>
            <div className="card-label">Everyday account</div>
            <div className="card-acct">•••• •••• •••• 4471</div>
          </div>
          <div className="card-label">INR</div>
        </div>

        <div className="card-balance">
          Rs 8,214<span className="cents">.52</span>
        </div>
        <div className="card-delta">↑ 3.2% this month</div>

        <div className="card-divider"></div>

        {mockTransactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            initial={tx.initial}
            name={tx.name}
            subtitle={tx.subtitle}
            amount={tx.amount}
            isPositive={tx.isPositive}
          />
        ))}
      </div>
    </div>
  );
}

export default AccountCard;