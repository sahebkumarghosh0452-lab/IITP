export default function LaunchSection() {
  return (
    <section className="section" id="launch" data-section="0">
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <p className="text-data" style={{ marginBottom: '1rem' }}>
          SECTION 01 — EARTH DEPARTURE
        </p>
        <h2 className="text-hero glow-cyan" style={{ marginBottom: '2rem' }}>
          LAUNCH
        </h2>
        <p
          className="text-section-subtitle"
          style={{ opacity: 0.7, marginBottom: '2rem' }}
        >
          Escape velocity achieved. The spacecraft separates from Earth's
          gravity well, initiating a 225-day interplanetary trajectory toward
          the Red Planet.
        </p>
        <div
          className="glass-panel hud-corners"
          style={{ padding: '1.5rem', display: 'inline-block' }}
        >
          <p className="text-data">
            ΔV = 3.6 km/s &nbsp;|&nbsp; TRAJECTORY: HOHMANN TRANSFER
          </p>
          <p className="text-data" style={{ marginTop: '0.5rem' }}>
            T+00:08:42 — STAGE SEPARATION CONFIRMED
          </p>
        </div>
      </div>
    </section>
  );
}
