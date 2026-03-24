import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import store from '../../store';

export default function WaypointModal() {
  const [waypoint, setWaypoint] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setWaypoint(state.selectedWaypoint);
    });
    return unsub;
  }, []);

  useLayoutEffect(() => {
    if (!modalRef.current) return;

    if (waypoint) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [waypoint]);

  const handleClose = () => {
    if (!modalRef.current) return;
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        store.setState({ selectedWaypoint: null });
      },
    });
  };

  if (!waypoint) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        width: 'min(90vw, 450px)',
      }}
    >
      <div
        ref={modalRef}
        className="glass-panel hud-corners"
        style={{ padding: '2rem', opacity: 0 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p className="text-data" style={{ marginBottom: '0.5rem' }}>
              WAYPOINT SELECTED
            </p>
            <h3
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {waypoint.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: '1px solid var(--panel-border)',
              color: 'var(--stark-white)',
              padding: '0.25rem 0.75rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              borderRadius: '4px',
            }}
          >
            CLOSE
          </button>
        </div>
        <p
          style={{
            marginTop: '1rem',
            opacity: 0.7,
            lineHeight: 1.7,
            fontSize: 'var(--text-base)',
          }}
        >
          {waypoint.info}
        </p>
        <div
          style={{
            marginTop: '1rem',
            height: 1,
            background: 'var(--panel-border)',
          }}
        />
        <p
          className="text-data"
          style={{ marginTop: '0.75rem', color: 'var(--neon-cyan)' }}
        >
          CLICK ANOTHER WAYPOINT TO NAVIGATE • DRAG ROVER TO EXPLORE
        </p>
      </div>
    </div>
  );
}
