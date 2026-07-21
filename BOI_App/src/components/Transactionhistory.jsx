import TransactionRow from './TransactionRow.jsx';

function TransactionHistory({ transactions }) {
  return (
    <div className="history-card">
      <div className="card-row-top">
        <div>
          <div className="card-label">All accounts</div>
          <div className="card-acct">Transaction history</div>
        </div>
        <div className="card-label">{transactions.length} entries</div>
      </div>

      <div className="card-divider"></div>

      {transactions.length === 0 ? (
        <p className="history-empty">No transactions yet.</p>
      ) : (
        transactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            initial={tx.initial}
            name={tx.name}
            subtitle={tx.subtitle}
            amount={tx.amount}
            isPositive={tx.isPositive}
          />
        ))
      )}
    </div>
  );
}

export default TransactionHistory;