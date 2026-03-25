import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Scene from './Scene';
import Navigation from './ui/Navigation';
import HUD from './ui/HUD';
import WaypointModal from './ui/WaypointModal';
import LaunchSection from './sections/LaunchSection';
import CruiseSection from './sections/CruiseSection';
import EDLSection from './sections/EDLSection';
import SurfaceSection from './sections/SurfaceSection';
import HabitatsSection from './sections/HabitatsSection';
import store from '../store';

gsap.registerPlugin(ScrollTrigger);

/*
  Camera spline waypoints (x, y, z) for each narrative phase:
  0: Launch — ground-level on Earth, watching rocket lift off
  1: Cruise — following rocket into space, then void
  2: EDL — rushing toward Mars
  3: Surface — landed, ground-level
  4: Habitats — slightly pulled back overhead
*/
const CAMERA_KEYFRAMES = [
  { pos: [2, 0, 5], look: [0, 0, 0] },          // Launch start: close to Earth, rocket visible at surface
  { pos: [3, 20, 8], look: [0, 40, 0] },         // Launch mid: rising with rocket through atmosphere
  { pos: [5, 2, -10], look: [0, 0, -30] },       // Cruise: pulling away into the void
  { pos: [0, 3, -60], look: [0, 0, -80] },       // EDL: approaching Mars
  { pos: [3, 0, -75], look: [0, -2, -80] },      // Surface: ground-level on Mars
  { pos: [0, 8, -72], look: [0, 3, -80] },       // Habitats: overhead view, rover visible above Mars
];

export default function Experience() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Give DOM time to render all sections
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('.section');
        const totalScrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        // ============================================
        // MASTER SCROLL TIMELINE
        // ============================================
        // Update global progress + active section
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const sectionIndex = Math.min(
              4,
              Math.floor(progress * 5)
            );
            store.setState({
              scrollProgress: progress,
              activeSection: sectionIndex,
            });
          },
        });

        // ============================================
        // ROCKET LAUNCH ANIMATION (Section 0: Launch)
        // ============================================
        const launchSection = document.querySelector('#launch');
        if (launchSection) {
          ScrollTrigger.create({
            trigger: launchSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              store.setState({ rocketProgress: self.progress });
            },
            onLeave: () => {
              store.setState({ rocketProgress: 1 });
            },
            onLeaveBack: () => {
              store.setState({ rocketProgress: 0 });
            },
          });
        }

        // ============================================
        // CAMERA SPLINE FLY-THROUGH (Animation 2)
        // Now with 6 keyframes (2 for launch phase)
        // ============================================
        // Map sections to keyframe pairs:
        // section 0 (Launch) -> keyframes 0→1 (ground to atmosphere)
        // section 1 (Cruise) -> keyframes 2 (void)
        // section 2 (EDL) -> keyframes 3 (approach Mars)
        // section 3 (Surface) -> keyframes 4 (ground)
        // section 4 (Habitats) -> keyframes 5 (overhead)
        const sectionToKeyframe = [0, 2, 3, 4, 5];

        sections.forEach((section, i) => {
          const kfIdx = sectionToKeyframe[i];
          if (kfIdx === undefined || kfIdx >= CAMERA_KEYFRAMES.length) return;
          const kf = CAMERA_KEYFRAMES[kfIdx];

          // For launch section, interpolate across 2 keyframes (0→1)
          if (i === 0) {
            ScrollTrigger.create({
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;
                const kf0 = CAMERA_KEYFRAMES[0];
                const kf1 = CAMERA_KEYFRAMES[1];
                const pos = kf0.pos.map((v, j) => v + (kf1.pos[j] - v) * p);
                const look = kf0.look.map((v, j) => v + (kf1.look[j] - v) * p);
                store.setState({ cameraPosition: pos, cameraLookAt: look });
              },
            });
          } else {
            const nextIdx = Math.min(kfIdx + 1, CAMERA_KEYFRAMES.length - 1);
            const nextKf = CAMERA_KEYFRAMES[nextIdx];

            ScrollTrigger.create({
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;
                const pos = kf.pos.map((v, j) => v + (nextKf.pos[j] - v) * p);
                const look = kf.look.map((v, j) => v + (nextKf.look[j] - v) * p);
                store.setState({ cameraPosition: pos, cameraLookAt: look });
              },
            });
          }
        });

        // ============================================
        // SCROLL EFFECT 1: PARALLAX DEPTH (Cruise)
        // ============================================
        // The starfield Z-parallax is driven implicitly by the
        // camera movement along Z in the spline above. The Stars
        // component stays at origin while the camera flies past,
        // creating automatic parallax.

        // ============================================
        // SCROLL EFFECT 2: PINNED HORIZONTAL SCROLL (Surface)
        // ============================================
        const surfaceWrapper = document.querySelector('.surface-pin-wrapper');
        const surfaceTrack = document.querySelector('.surface-track');

        if (surfaceWrapper && surfaceTrack) {
          const trackWidth = surfaceTrack.scrollWidth;
          const viewportWidth = window.innerWidth;

          gsap.to(surfaceTrack, {
            x: -(trackWidth - viewportWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: surfaceWrapper,
              start: 'top top',
              end: () => `+=${trackWidth - viewportWidth}`,
              scrub: 1,
              pin: '.surface-inner',
              anticipatePin: 1,
            },
          });
        }

        // ============================================
        // ANIMATION 3: EDL BLOOM + CAMERA SHAKE
        // ============================================
        const edlSection = document.querySelector('#edl');
        if (edlSection) {
          ScrollTrigger.create({
            trigger: edlSection,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            onUpdate: (self) => {
              // Bell curve: bloom peaks in the middle of EDL
              const p = self.progress;
              const bloom = Math.sin(p * Math.PI) * 3;
              const shake = Math.sin(p * Math.PI) * 1.5;

              store.setState({
                bloomIntensity: bloom,
                cameraShake: shake,
              });
            },
            onLeave: () => {
              store.setState({ bloomIntensity: 0, cameraShake: 0 });
            },
            onLeaveBack: () => {
              store.setState({ bloomIntensity: 0, cameraShake: 0 });
            },
          });
        }

        // ============================================
        // SECTION CONTENT REVEAL ANIMATIONS
        // ============================================
        sections.forEach((section) => {
          const elements = section.querySelectorAll(
            'h2, h3, p, .glass-panel, .glass-card'
          );
          gsap.from(elements, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fixed 3D Canvas */}
      <Scene />

      {/* Navigation */}
      <Navigation />

      {/* HUD Overlays */}
      <HUD />

      {/* Waypoint Modal */}
      <WaypointModal />

      {/* Scrollable HTML Overlay */}
      <div className="scroll-overlay" ref={containerRef}>
        <LaunchSection />
        <CruiseSection />
        <EDLSection />
        <SurfaceSection />
        <HabitatsSection />
      </div>
    </>
  );
}
