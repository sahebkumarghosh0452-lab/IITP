import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Spacecraft({ visible = true }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2, 16]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.3, 0.8, 16]} />
        <meshStandardMaterial color="#cccccc" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Engine bell */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.5, 0.25, 0.6, 16]} />
        <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.7} />
      </mesh>
      {/* Solar panel left */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 12]}>
        <boxGeometry args={[2, 0.02, 0.8]} />
        <meshStandardMaterial
          color="#1a3a5c"
          emissive="#0a1f3a"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Solar panel right */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <boxGeometry args={[2, 0.02, 0.8]} />
        <meshStandardMaterial
          color="#1a3a5c"
          emissive="#0a1f3a"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#00F3FF" />
      </mesh>
    </group>
  );
}
