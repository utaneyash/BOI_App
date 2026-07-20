function Footer() {
  return (
    <footer>
      <div className="brand" style={{ fontSize: '16px' }}>
        <img src="/images.png" alt="Bank of India logo" className="brand-logo" style={{ height: '22px' }} />
        Bank of India
      </div>
      <div className="foot-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Security</a>
        <a href="#">Contact</a>
      </div>
      <div>© 2026 Bank of India</div>
    </footer>
  );
}

export default Footer;