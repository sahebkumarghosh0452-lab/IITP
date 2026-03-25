import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import store from '../../store';

/* Procedural rocket that launches from Earth's surface upward */
export default function Rocket({ visible = true }) {
  const groupRef = useRef();
  const exhaustRef = useRef();
  const [rocketProgress, setRocketProgress] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setRocketProgress(state.rocketProgress || 0);
    });
    return unsub;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rocket position: starts at Earth surface (y = -2), rises to y = 50+
    const startY = -2;
    const endY = 60;
    const y = startY + (endY - startY) * rocketProgress;

    // Slight tilt during ascent
    const tilt = Math.sin(rocketProgress * Math.PI) * 0.15;

    groupRef.current.position.y = y;
    groupRef.current.rotation.z = tilt;

    // Exhaust flicker
    if (exhaustRef.current && rocketProgress > 0 && rocketProgress < 0.95) {
      const flicker = 0.8 + Math.sin(Date.now() * 0.03) * 0.2;
      exhaustRef.current.scale.set(flicker, 1 + rocketProgress * 2, flicker);
      exhaustRef.current.material.opacity = 0.6 + Math.sin(Date.now() * 0.05) * 0.3;
    }
  });

  if (!visible) return null;

  const showExhaust = rocketProgress > 0.01 && rocketProgress < 0.95;

  return (
    <group ref={groupRef}>
      {/* Main rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.8, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.15, 0.6, 16]} />
        <meshStandardMaterial color="#ff3333" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Window / porthole */}
      <mesh position={[0, 0.5, 0.16]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#00F3FF" />
      </mesh>

      {/* Fins — 4 around the base */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(angle) * 0.22,
            -0.8,
            Math.cos(angle) * 0.22,
          ]}
          rotation={[0, angle, 0]}
        >
          <boxGeometry args={[0.02, 0.4, 0.25]} />
          <meshStandardMaterial color="#cc0000" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}

      {/* Engine nozzle */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.18, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#555555" roughness={0.6} metalness={0.8} />
      </mesh>

      {/* Exhaust flame — only visible during launch */}
      {showExhaust && (
        <mesh ref={exhaustRef} position={[0, -1.8, 0]}>
          <coneGeometry args={[0.15, 1.2, 12]} />
          <meshBasicMaterial
            color="#ff6600"
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Inner blue exhaust core */}
      {showExhaust && (
        <mesh position={[0, -1.6, 0]}>
          <coneGeometry args={[0.07, 0.7, 8]} />
          <meshBasicMaterial
            color="#00aaff"
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Exhaust glow light */}
      {showExhaust && (
        <pointLight
          position={[0, -2, 0]}
          intensity={2 + rocketProgress * 3}
          distance={8}
          color="#ff6600"
        />
      )}
    </group>
  );
}
