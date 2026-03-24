import { useMemo } from 'react';
import * as THREE from 'three';

export default function MartianTerrain({ visible = true }) {
  // Create a displacement-style terrain using noise in geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 128, 128);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i);
      // Simple procedural terrain displacement
      const height =
        Math.sin(x * 0.3) * 0.5 +
        Math.cos(z * 0.4) * 0.4 +
        Math.sin(x * 0.7 + z * 0.5) * 0.3 +
        Math.cos(x * 1.2 - z * 0.8) * 0.15;
      positions.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  if (!visible) return null;

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
    >
      <meshStandardMaterial
        color="#8B4513"
        roughness={0.95}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}
