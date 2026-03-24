export default function CruiseSection() {
  return (
    <section className="section" id="cruise" data-section="1">
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p className="text-data" style={{ marginBottom: '1rem' }}>
          SECTION 02 — INTERPLANETARY CRUISE
        </p>
        <h2
          className="text-section-title glow-cyan"
          style={{ marginBottom: '2rem' }}
        >
          225 DAYS IN THE VOID
        </h2>
        <p
          className="text-section-subtitle"
          style={{ opacity: 0.6, marginBottom: '3rem' }}
        >
          Crossing the vast emptiness between worlds. Solar alignment is
          maintained while onboard systems enter cruise mode. The silence of
          deep space is absolute.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          <div className="glass-panel hud-corners" style={{ padding: '1rem' }}>
            <p className="text-data">DISTANCE</p>
            <p
              className="text-xl"
              style={{
                color: 'var(--neon-cyan)',
                fontWeight: 700,
                marginTop: '0.5rem',
              }}
            >
              225M km
            </p>
          </div>
          <div className="glass-panel hud-corners" style={{ padding: '1rem' }}>
            <p className="text-data">VELOCITY</p>
            <p
              className="text-xl"
              style={{
                color: 'var(--neon-cyan)',
                fontWeight: 700,
                marginTop: '0.5rem',
              }}
            >
              24.1 km/s
            </p>
          </div>
          <div className="glass-panel hud-corners" style={{ padding: '1rem' }}>
            <p className="text-data">SIGNAL DELAY</p>
            <p
              className="text-xl"
              style={{
                color: 'var(--neon-cyan)',
                fontWeight: 700,
                marginTop: '0.5rem',
              }}
            >
              12.5 min
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
