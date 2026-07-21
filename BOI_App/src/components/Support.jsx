import { useState } from 'react';

const faqs = [
  {
    q: 'How long does it take to open an account?',
    a: 'Most accounts are approved in under four minutes. You\'ll need a government ID and a few personal details — no branch visit required.',
  },
  {
    q: 'Is my money insured?',
    a: 'Yes. Deposits are insured by DICGC up to Rs 5,00,000 per depositor, per bank, in the same right and capacity.',
  },
  {
    q: 'What are the daily transfer limits?',
    a: 'Basic accounts have a standard daily limit. Plus and Premium plans raise this significantly — see the Pricing section for details, or adjust your limit anytime from account settings.',
  },
  {
    q: 'Can I close my account at any time?',
    a: 'Yes, with no penalty or hidden fee. Reach out to support and we\'ll walk you through it.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Use "Forgot password?" on the login page. You\'ll get a reset link by email, valid for 15 minutes.',
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {faq.q}
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="faq-answer">{faq.a}</p>}
    </div>
  );
}

function Support() {
  return (
    <section className="section" id="support">
      <div className="section-head">
        <div className="section-eyebrow">Support</div>
        <div className="section-title">
          Questions, answered plainly.
        </div>
      </div>

      <div className="support-grid">
        <div className="faq-list">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>

        <div className="contact-card">
          <div className="card-label">Still need help?</div>
          <h3 className="contact-title">Talk to our team</h3>
          <p className="contact-sub">
            We typically reply within a few hours, every day of the week.
          </p>

          <div className="contact-divider"></div>

          <div className="contact-row">
            <span className="contact-label">Email</span>
            <a href="mailto:support@bankofindia.example" className="contact-value">
              support@bankofindia.example
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">Phone</span>
            <span className="contact-value">1800-XXX-XXXX</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Hours</span>
            <span className="contact-value">24/7</span>
          </div>

          <button className="btn-primary contact-btn">Start live chat</button>
        </div>
      </div>
    </section>
  );
}

export default Support;