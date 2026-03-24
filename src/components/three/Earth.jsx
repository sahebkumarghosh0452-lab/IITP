import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Earth({ visible = true }) {
  const meshRef = useRef();

  // Procedural Earth-like colors
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2b6cb0'),
      emissive: new THREE.Color('#1a365d'),
      emissiveIntensity: 0.15,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group>
      <mesh ref={meshRef} material={material}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
