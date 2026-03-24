import { useState, useEffect } from 'react';
import store from '../../store';

const SECTION_DATA = [
  { altitude: '400 km', phase: 'EARTH ORBIT' },
  { altitude: '—', phase: 'INTERPLANETARY' },
  { altitude: '125 km', phase: 'MARS APPROACH' },
  { altitude: '0 km', phase: 'SURFACE OPS' },
  { altitude: '0 km', phase: 'HABITAT MODE' },
];

export default function HUD() {
  const [section, setSection] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setSection(state.activeSection);
      setProgress(state.scrollProgress);
    });
    return unsub;
  }, []);

  const data = SECTION_DATA[section] || SECTION_DATA[0];

  return (
    <>
      {/* Top-left mission data */}
      <div
        style={{
          position: 'fixed',
          top: '4.5rem',
          left: '1.5rem',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <p className="text-data" style={{ opacity: 0.4 }}>
          ALTITUDE
        </p>
        <p
          className="text-mono"
          style={{
            color: 'var(--neon-cyan)',
            fontSize: 'var(--text-lg)',
            marginTop: '0.25rem',
          }}
        >
          {data.altitude}
        </p>
        <p
          className="text-data"
          style={{ opacity: 0.4, marginTop: '1rem' }}
        >
          PHASE
        </p>
        <p
          className="text-mono"
          style={{
            color: 'var(--stark-white)',
            fontSize: 'var(--text-sm)',
            marginTop: '0.25rem',
          }}
        >
          {data.phase}
        </p>
      </div>

      {/* Right-side progress indicator */}
      <div
        style={{
          position: 'fixed',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: section === i ? 30 : 12,
              borderRadius: 2,
              background:
                section === i ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
              boxShadow:
                section === i ? '0 0 8px var(--neon-cyan)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Bottom-left corner decoration */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <p className="text-data" style={{ opacity: 0.3 }}>
          MISSION ELAPSED TIME
        </p>
        <p
          className="text-mono"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '0.25rem',
          }}
        >
          T+{Math.floor(progress * 225)}d {Math.floor((progress * 225 * 24) % 24)}h
        </p>
      </div>
    </>
  );
}
