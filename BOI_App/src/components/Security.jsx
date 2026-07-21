const measures = [
  {
    num: '01',
    title: 'End-to-end encryption',
    body: 'Every request between your device and our servers is encrypted with TLS 1.3. Your data is never sent or stored in plain text.',
  },
  {
    num: '02',
    title: 'Two-factor authentication',
    body: 'Every login and every large transfer requires a one-time code sent to your registered device — not just a password.',
  },
  {
    num: '03',
    title: 'Real-time fraud monitoring',
    body: 'Unusual transaction patterns are flagged automatically, and we\'ll reach out before a suspicious transfer completes.',
  },
  {
    num: '04',
    title: 'Session & device management',
    body: 'See every device logged into your account, and remotely sign out any session that isn\'t you — instantly.',
  },
  {
    num: '05',
    title: 'Biometric login',
    body: 'Unlock the app with fingerprint or face recognition on supported devices, so your password stays yours alone.',
  },
  {
    num: '06',
    title: 'Deposit insurance',
    body: 'Your deposits are insured by DICGC up to Rs 5,00,000 per depositor — on top of everything above.',
  },
];

const certifications = ['RBI Compliant', 'ISO 27001 Certified', 'PCI DSS Level 1', 'SOC 2 Type II'];

function Security() {
  return (
    <section className="section" id="security">
      <div className="section-head">
        <div className="section-eyebrow">Security</div>
        <div className="section-title">
          Built like a vault, not an afterthought.
        </div>
      </div>

      <div className="security-grid">
        {measures.map((m) => (
          <div className="security-item" key={m.num}>
            <div className="feature-num">{m.num}</div>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        ))}
      </div>

      <div className="cert-strip">
        {certifications.map((cert) => (
          <div className="cert-badge" key={cert}>
            <span className="cert-dot"></span> {cert}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Security;