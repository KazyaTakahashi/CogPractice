import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

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
          <h1>Bank Client Hub</h1>
          <p>Reliable service and customer experiences</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isAuthenticated ? (
          <>
            <span className="user-pill">{user.name}</span>
            <button type="button" className="btn-secondary nav-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
