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
  0: Launch — looking at Earth
  1: Cruise — pulling away into void
  2: EDL — rushing toward Mars
  3: Surface — landed, ground-level
  4: Habitats — slightly pulled back overhead
*/
const CAMERA_KEYFRAMES = [
  { pos: [0, 1, 20], look: [0, 0, 0] },       // Launch: facing Earth
  { pos: [5, 2, -10], look: [0, 0, -30] },     // Cruise: moving through void
  { pos: [0, 3, -60], look: [0, 0, -80] },     // EDL: approaching Mars
  { pos: [3, 0, -75], look: [0, -2, -80] },    // Surface: ground-level
  { pos: [0, 5, -72], look: [0, -1, -80] },    // Habitats: slight overview
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
        // CAMERA SPLINE FLY-THROUGH (Animation 2)
        // ============================================
        sections.forEach((section, i) => {
          if (i >= CAMERA_KEYFRAMES.length) return;
          const kf = CAMERA_KEYFRAMES[i];

          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            onUpdate: (self) => {
              const nextIdx = Math.min(i + 1, CAMERA_KEYFRAMES.length - 1);
              const nextKf = CAMERA_KEYFRAMES[nextIdx];
              const p = self.progress;

              // Lerp between current and next keyframe's positions
              const pos = kf.pos.map(
                (v, j) => v + (nextKf.pos[j] - v) * p
              );
              const look = kf.look.map(
                (v, j) => v + (nextKf.look[j] - v) * p
              );

              store.setState({
                cameraPosition: pos,
                cameraLookAt: look,
              });
            },
          });
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
