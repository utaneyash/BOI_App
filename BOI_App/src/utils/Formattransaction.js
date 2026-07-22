// Turns a raw backend transaction (type, amount, counterpartyUpiId, note, createdAt)
// into the shape TransactionRow expects (initial, name, subtitle, amount, isPositive).
// Shared between the Dashboard and the homepage preview card so both display
// real transactions identically.
export function formatTransaction(tx) {
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