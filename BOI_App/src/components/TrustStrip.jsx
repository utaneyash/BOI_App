const trustItems = [
  'DICGC-insured up to Rs 5,00,000',
  '256-bit encryption end to end',
  'Two-factor on every login',
  'No hidden monthly fees',
];

function TrustStrip() {
  return (
    <div className="trust-strip" id="trust">
      {trustItems.map((item) => (
        <div className="trust-item" key={item}>
          <span className="dot"></span> {item}
        </div>
      ))}
    </div>
  );
}

export default TrustStrip;