import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Rover({ visible = true }) {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Slow idle rotation when not being dragged
    if (groupRef.current && !isDragging) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    previousPointer.current = { x: e.clientX, y: e.clientY };
    // Capture pointer for smooth dragging
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !groupRef.current) return;
    e.stopPropagation();
    const dx = e.clientX - previousPointer.current.x;
    const dy = e.clientY - previousPointer.current.y;
    groupRef.current.rotation.y += dx * 0.01;
    groupRef.current.rotation.x += dy * 0.01;
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.8]} />
        <meshStandardMaterial color="#cccccc" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Camera mast */}
      <mesh position={[0.3, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#999999" metalness={0.8} />
      </mesh>
      {/* Camera head */}
      <mesh position={[0.3, 1.25, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.12]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Camera eyes */}
      <mesh position={[0.3, 1.27, 0.07]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#00F3FF" />
      </mesh>
      <mesh position={[0.3, 1.27, -0.07]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#00F3FF" />
      </mesh>
      {/* Wheels */}
      {[
        [-0.5, 0, 0.45],
        [0.5, 0, 0.45],
        [-0.5, 0, -0.45],
        [0.5, 0, -0.45],
        [0, 0, 0.45],
        [0, 0, -0.45],
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#555555" roughness={0.7} metalness={0.6} />
        </mesh>
      ))}
      {/* Solar panel */}
      <mesh position={[-0.2, 0.55, 0]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial
          color="#1a3a5c"
          emissive="#0a1f3a"
          emissiveIntensity={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Robotic arm */}
      <mesh position={[-0.6, 0.35, 0.2]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.8} />
      </mesh>
    </group>
  );
}
