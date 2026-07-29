function About() {
  return (
    <section className="info-card">
      <h2>About our platform</h2>
      <p>
        This frontend brings together a modern, responsive experience with the existing customer API.
        It is designed to make navigation simple while giving service teams a clear view of customer information.
      </p>
      <div className="grid">
        <div className="info-card">
          <h3>Trusted</h3>
          <p>Built around dependable workflows and clear communication.</p>
        </div>
        <div className="info-card">
          <h3>Flexible</h3>
          <p>Supports growth with a clean structure for future enhancements.</p>
        </div>
        <div className="info-card">
          <h3>Professional</h3>
          <p>Provides a polished presentation for business-facing experiences.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
