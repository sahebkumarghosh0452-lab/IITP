import { useState, useEffect } from 'react';
import store from '../../store';

const SECTION_NAMES = [
  'LAUNCH',
  'CRUISE',
  'EDL',
  'SURFACE',
  'HABITATS',
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setActiveSection(state.activeSection);
      setProgress(state.scrollProgress);
    });
    return unsub;
  }, []);

  return (
    <nav
      className="glass-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--neon-cyan)',
            boxShadow: '0 0 10px var(--neon-cyan)',
          }}
        />
        <span
          className="text-mono"
          style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.1em' }}
        >
          MARS TRANSIT
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        {SECTION_NAMES.map((name, i) => (
          <span
            key={name}
            className="text-mono"
            style={{
              fontSize: 'var(--text-xs)',
              color:
                activeSection === i
                  ? 'var(--neon-cyan)'
                  : 'rgba(255,255,255,0.3)',
              transition: 'color 0.3s',
              letterSpacing: '0.1em',
              display: window.innerWidth < 768 && i > 0 && i < 4 ? 'none' : 'inline',
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <div
        className="text-mono"
        style={{
          fontSize: 'var(--text-xs)',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {Math.round(progress * 100)}%
      </div>

      {/* Progress bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 1,
          background: 'linear-gradient(90deg, var(--neon-cyan), var(--mars-rust))',
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
        }}
      />
    </nav>
  );
}
