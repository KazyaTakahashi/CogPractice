import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero-card">
      <div>
        <p className="eyebrow">Customer-first banking</p>
        <h2>Modern experiences for modern clients</h2>
        <p>
          Explore a polished customer portal that combines trusted service, flexible account tools,
          and effortless communication in one place.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/services">View customers</Link>
          <Link className="btn-secondary" to="/about">Learn more</Link>
        </div>
      </div>
      <div className="info-card">
        <h3>Why teams choose us</h3>
        <ul>
          <li>Secure, scalable account management</li>
          <li>Helpful support across every touchpoint</li>
          <li>Fast access to your customer data</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
