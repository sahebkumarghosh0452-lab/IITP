export default function EDLSection() {
  return (
    <section className="section" id="edl" data-section="2">
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          className="text-data"
          style={{ marginBottom: '1rem', color: 'var(--mars-rust)' }}
        >
          SECTION 03 — ENTRY, DESCENT & LANDING
        </p>
        <h2 className="text-hero glow-rust" style={{ marginBottom: '1rem' }}>
          6 MINUTES
          <br />
          OF TERROR
        </h2>
        <p
          className="text-section-subtitle"
          style={{ opacity: 0.7, marginBottom: '2rem' }}
        >
          The spacecraft impacts the Martian atmosphere at 5.4 km/s.
          Temperatures spike to 1,600°C. No ground control possible — the
          12-minute signal delay means the craft must land itself.
        </p>
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderColor: 'rgba(178, 83, 62, 0.4)',
            background: 'rgba(178, 83, 62, 0.05)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              textAlign: 'left',
            }}
          >
            <div>
              <p className="text-data" style={{ color: 'var(--mars-rust)' }}>
                PEAK HEATING
              </p>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                1,600°C
              </p>
            </div>
            <div>
              <p className="text-data" style={{ color: 'var(--mars-rust)' }}>
                ENTRY VELOCITY
              </p>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                5.4 km/s
              </p>
            </div>
            <div>
              <p className="text-data" style={{ color: 'var(--mars-rust)' }}>
                G-FORCE PEAK
              </p>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                12G
              </p>
            </div>
            <div>
              <p className="text-data" style={{ color: 'var(--mars-rust)' }}>
                PARACHUTE DEPLOY
              </p>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                Mach 1.7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
