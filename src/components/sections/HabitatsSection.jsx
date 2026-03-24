import TelemetryCard from '../ui/TelemetryCard';

const TELEMETRY_DATA = [
  {
    label: 'ATMOSPHERIC COMPOSITION',
    value: '95.3% CO₂',
    detail: 'Thin atmosphere — 1% of Earth surface pressure',
    icon: '🌫️',
  },
  {
    label: 'SURFACE TEMPERATURE',
    value: '-60°C avg',
    detail: 'Ranges from -140°C to 20°C near equator',
    icon: '🌡️',
  },
  {
    label: 'GRAVITY',
    value: '3.72 m/s²',
    detail: '38% of Earth gravity — affects human physiology',
    icon: '⚖️',
  },
  {
    label: 'RADIATION LEVEL',
    value: '0.67 mSv/day',
    detail: 'Surface shielding required for long-term habitation',
    icon: '☢️',
  },
  {
    label: 'WATER ICE RESERVES',
    value: '5M km³ est.',
    detail: 'Subsurface ice deposits detected by orbital radar',
    icon: '🧊',
  },
  {
    label: 'SOLAR ENERGY',
    value: '590 W/m²',
    detail: '43% of Earth insolation — viable for solar arrays',
    icon: '☀️',
  },
];

export default function HabitatsSection() {
  return (
    <section className="section" id="habitats" data-section="4">
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="text-data" style={{ marginBottom: '1rem' }}>
            SECTION 05 — FUTURE HABITATS
          </p>
          <h2 className="text-section-title glow-cyan">
            BUILDING A NEW WORLD
          </h2>
          <p
            className="text-section-subtitle"
            style={{ opacity: 0.6, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}
          >
            Long-term colonization demands mastery of Mars's hostile
            environment. Real-time telemetry drives every decision.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TELEMETRY_DATA.map((data, i) => (
            <TelemetryCard key={i} {...data} index={i} />
          ))}
        </div>

        <div
          className="glass-panel"
          style={{
            marginTop: '3rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p className="text-data" style={{ marginBottom: '0.5rem' }}>
            MISSION STATUS
          </p>
          <p
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              background:
                'linear-gradient(135deg, var(--neon-cyan), var(--mars-rust))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            THE FUTURE IS ON MARS
          </p>
          <p className="text-mono" style={{ opacity: 0.4, marginTop: '1rem' }}>
            Journey to Mars — an interactive experience
          </p>
        </div>
      </div>
    </section>
  );
}
