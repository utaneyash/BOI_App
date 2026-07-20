const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    tagline: 'Everyday banking, no strings attached.',
    features: [
      'Free savings account',
      'Unlimited digital transfers',
      'Monthly e-statement',
      'Standard debit card',
    ],
    highlighted: false,
  },
  {
    name: 'Plus',
    price: 'Rs 199',
    period: '/month',
    tagline: 'For people who want more control.',
    features: [
      'Everything in Basic',
      'Higher daily transfer limit',
      'Scheduled & recurring payments',
      'Spending category breakdown',
      'Priority customer support',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'Rs 499',
    period: '/month',
    tagline: 'Full control, zero limits.',
    features: [
      'Everything in Plus',
      'No transfer limits',
      'Virtual & physical cards included',
      'Dedicated relationship manager',
      'Early access to new features',
    ],
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="section-head">
        <div className="section-eyebrow">Pricing</div>
        <div className="section-title">
          Straightforward plans, no fine print.
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={plan.highlighted ? 'pricing-card highlighted' : 'pricing-card'}
          >
            {plan.highlighted && <div className="pricing-badge">Most popular</div>}

            <div className="pricing-name">{plan.name}</div>
            <div className="pricing-price">
              {plan.price}
              {plan.period && <span className="pricing-period">{plan.period}</span>}
            </div>
            <p className="pricing-tagline">{plan.tagline}</p>

            <div className="pricing-divider"></div>

            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <span className="pricing-check">✓</span> {f}
                </li>
              ))}
            </ul>

            <button
              className={plan.highlighted ? 'btn-primary pricing-btn' : 'btn-ghost pricing-btn'}
            >
              {plan.price === 'Free' ? 'Get started' : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;