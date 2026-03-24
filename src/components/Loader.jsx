import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const BOOT_LINES = [
  { text: '> INITIALIZING MARS TRANSIT PROTOCOL v4.2.1...', cls: '' },
  { text: '> LOADING NAVIGATION SUBSYSTEM.............. OK', cls: 'success' },
  { text: '> SOLAR ARRAY ALIGNMENT..................... OK', cls: 'success' },
  { text: '> COMM LINK ESTABLISHED — DSN FREQUENCY LOCK', cls: '' },
  { text: '> THERMAL PROTECTION STATUS................. NOMINAL', cls: 'success' },
  { text: '> TRAJECTORY CORRECTION ΔV = 2.31 m/s...... COMPUTED', cls: '' },
  { text: '> WARNING: DUST STORM DETECTED SECTOR 7-G', cls: 'warning' },
  { text: '> RECALCULATING LANDING ZONE................ DONE', cls: 'success' },
  { text: '> LIFE SUPPORT MODULES...................... ONLINE', cls: 'success' },
  { text: '> ALL SYSTEMS NOMINAL — READY FOR DEPARTURE', cls: 'success' },
];

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const linesRef = useRef([]);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide out animation
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: onComplete,
          });
        },
      });

      // Type out each line sequentially
      linesRef.current.forEach((line, i) => {
        tl.to(
          line,
          {
            opacity: 1,
            duration: 0.05,
            ease: 'none',
          },
          i * 0.15
        );
      });

      // Progress bar fills during the boot
      tl.to(
        progressRef.current,
        {
          width: '100%',
          duration: BOOT_LINES.length * 0.15,
          ease: 'power1.inOut',
          onUpdate: function () {
            if (percentRef.current) {
              percentRef.current.textContent =
                Math.round(this.progress() * 100) + '%';
            }
          },
        },
        0
      );

      // Reveal mission title at the end
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Hold for a beat
      tl.to({}, { duration: 0.8 });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={overlayRef}>
      <div className="scanlines" />
      <div className="loader-terminal">
        <div className="loader-terminal-header">
          <span className="loader-terminal-dot" />
          <span className="loader-terminal-dot" />
          <span className="loader-terminal-dot" />
          <span className="loader-terminal-title">
            MARS_TRANSIT_v4.2.1 — session://earth.departure
          </span>
        </div>
        <div className="loader-lines">
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className={`line ${line.cls}`}
              ref={(el) => (linesRef.current[i] = el)}
            >
              {line.text}
            </div>
          ))}
        </div>
        <div className="loader-progress-container">
          <div className="loader-progress-label">
            <span>SYSTEM BOOT</span>
            <span ref={percentRef}>0%</span>
          </div>
          <div className="loader-progress-bar">
            <div className="loader-progress-fill" ref={progressRef} />
          </div>
        </div>
      </div>
      <div
        className="loader-mission-title"
        ref={titleRef}
        style={{ transform: 'translateY(20px)' }}
      >
        <h1>Journey to Mars</h1>
        <p>MISSION CONTROL — ENGAGING</p>
      </div>
    </div>
  );
}
