import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64" role="img">
            <rect x="8" y="8" width="48" height="48" rx="12" />
            <path d="M20 24h24M20 32h14M20 40h20" />
          </svg>
        </div>
        <div>
          <h1>Cognixia Customer Hub</h1>
          <p>Reliable banking and customer experiences</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}

export default Header;
