const features = [
  { num: '01', title: 'Instant transfers', body: "Move money between your own accounts or to anyone else's, and see it land in seconds — with a receipt you can actually read." },
  { num: '02', title: 'Real-time statements', body: 'Every transaction is written to your ledger the moment it happens. Export any month as a clean, audit-ready PDF.' },
  { num: '03', title: 'Spending categories', body: 'Transactions sort themselves into rent, groceries, transport, and more — so you know where money went without asking.' },
  { num: '04', title: 'Saved beneficiaries', body: 'Add the people and companies you pay often once, then send to them again in two taps.' },
  { num: '05', title: 'Spending limits', body: 'Set a daily transfer cap and get notified the moment anything unusual happens on your account.' },
  { num: '06', title: 'Scheduled payments', body: 'Set recurring transfers once — rent, savings, subscriptions — and let the ledger handle the rest.' },
];

function Features() {
  return (
    <section className="section" id="features">
      <div className="section-head">
        <div className="section-eyebrow">What's included</div>
        <div className="section-title">
          Everything a modern account needs — nothing it doesn't.
        </div>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div className="feature" key={f.num}>
            <div className="feature-num">{f.num}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
