import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function TelemetryCard({
  label,
  value,
  detail,
  icon,
  index,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card hud-corners"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '1.5rem',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <p className="text-data">{label}</p>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      </div>
      <p
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--neon-cyan)',
          marginTop: '0.75rem',
          letterSpacing: '0.05em',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: 'var(--text-sm)',
          opacity: 0.5,
          marginTop: '0.5rem',
          lineHeight: 1.5,
        }}
      >
        {detail}
      </p>
    </div>
  );
}
