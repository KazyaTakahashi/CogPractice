function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-logo" aria-label="Cognixia logo">
        <svg viewBox="0 0 64 64" role="img">
          <rect x="8" y="8" width="48" height="48" rx="12" />
          <path d="M20 24h24M20 32h14M20 40h20" />
        </svg>
        <span>Bank</span>
      </div>
      <p>© {currentYear} Bank Client Hub. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
