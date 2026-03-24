export default function SurfaceSection() {
  const panels = [
    {
      title: 'JEZERO CRATER',
      subtitle: 'Primary Landing Zone',
      detail:
        'An ancient river delta, rich in clay minerals. Ideal for detecting biosignatures of past microbial life.',
      stat: '45 km diameter',
    },
    {
      title: 'OLYMPUS MONS',
      subtitle: 'Volcanic Shield Region',
      detail:
        'The tallest planetary mountain in our solar system. Three times the height of Mount Everest.',
      stat: '21.9 km altitude',
    },
    {
      title: 'VALLES MARINERIS',
      subtitle: 'The Grand Canyon of Mars',
      detail:
        'A vast canyon system that spans 4,000 km — stretching from New York to Los Angeles.',
      stat: '7 km depth',
    },
    {
      title: 'SAMPLE COLLECTION',
      subtitle: 'Perseverance Operations',
      detail:
        'Drill cores sealed in titanium tubes, cached for future Earth-return missions. 43 samples collected.',
      stat: '43 samples',
    },
  ];

  return (
    <section
      className="section"
      id="surface"
      data-section="3"
      style={{ minHeight: '400vh', padding: 0 }}
    >
      <div
        className="surface-pin-wrapper"
        style={{
          height: '400vh',
          position: 'relative',
        }}
      >
        <div
          className="surface-inner"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="surface-track"
            style={{
              display: 'flex',
              width: 'max-content',
              gap: '3rem',
              paddingLeft: '5vw',
              paddingRight: '5vw',
            }}
          >
            {/* Intro panel */}
            <div
              style={{
                width: 'min(80vw, 500px)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p className="text-data" style={{ marginBottom: '1rem' }}>
                SECTION 04 — PRIMARY SURFACE MISSION
              </p>
              <h2 className="text-section-title glow-rust">
                EXPLORING
                <br />
                THE RED PLANET
              </h2>
              <p
                className="text-section-subtitle"
                style={{ opacity: 0.6, marginTop: '1rem' }}
              >
                Scroll to traverse the Martian surface. Discover key geological
                sites and mission landmarks.
              </p>
            </div>

            {/* Horizontal content panels */}
            {panels.map((panel, i) => (
              <div
                key={i}
                className="glass-panel hud-corners"
                style={{
                  width: 'min(80vw, 400px)',
                  flexShrink: 0,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p className="text-data" style={{ color: 'var(--mars-rust)' }}>
                  {panel.subtitle}
                </p>
                <h3
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginTop: '0.5rem',
                  }}
                >
                  {panel.title}
                </h3>
                <p
                  style={{
                    opacity: 0.7,
                    marginTop: '1rem',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.7,
                  }}
                >
                  {panel.detail}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--panel-border)',
                  }}
                >
                  <p className="text-data">KEY METRIC</p>
                  <p
                    style={{
                      fontSize: 'var(--text-xl)',
                      color: 'var(--neon-cyan)',
                      fontWeight: 700,
                      marginTop: '0.25rem',
                    }}
                  >
                    {panel.stat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
