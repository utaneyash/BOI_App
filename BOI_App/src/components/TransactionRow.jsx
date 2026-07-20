function TransactionRow({ initial, name, subtitle, amount, isPositive }) {
  const sign = isPositive ? '+' : '−';
  const amountClass = isPositive ? 'tx-amt pos' : 'tx-amt neg';

  return (
    <div className="tx-row">
      <div className="tx-left">
        <div className="tx-dot">{initial}</div>
        <div>
          <div className="tx-name">{name}</div>
          <div className="tx-sub">{subtitle}</div>
        </div>
      </div>
      <div className={amountClass}>{sign}Rs {amount}</div>
    </div>
  );
}

export default TransactionRow;