import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import store from '../../store';

const WAYPOINTS = [
  { name: 'Jezero Crater', lat: 0.3, lng: 1.2, info: 'Ancient river delta — primary landing site for Perseverance. Evidence of past microbial life.' },
  { name: 'Olympus Mons', lat: 0.8, lng: 2.5, info: 'Largest volcano in the solar system. 21.9 km high, 600 km in diameter.' },
  { name: 'Valles Marineris', lat: -0.1, lng: 4.0, info: 'Vast canyon system stretching 4,000 km. Up to 7 km deep.' },
  { name: 'Hellas Basin', lat: -0.7, lng: 1.0, info: 'Massive impact crater. Lowest point on Mars at 7,152 m below datum.' },
];

function WaypointMarker({ position, name, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
      meshRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <octahedronGeometry args={[0.1, 0]} />
      <meshBasicMaterial
        color={hovered ? '#00F3FF' : '#B2533E'}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default function Mars({ visible = true }) {
  const meshRef = useRef();

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B2533E'),
      roughness: 0.9,
      metalness: 0.1,
      bumpScale: 0.05,
    });
  }, []);

  // Convert lat/lng to 3D position on sphere
  const getWaypointPos = useCallback((lat, lng, radius = 3.05) => {
    const x = radius * Math.cos(lat) * Math.cos(lng);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lng);
    return [x, y, z];
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  const handleWaypointClick = useCallback((waypoint) => {
    store.setState({ selectedWaypoint: waypoint });
  }, []);

  if (!visible) return null;

  return (
    <group>
      {/* Mars body */}
      <mesh ref={meshRef} material={material}>
        <sphereGeometry args={[3, 128, 128]} />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={[3.1, 3.1, 3.1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#B2533E"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Waypoint markers */}
      {WAYPOINTS.map((wp) => (
        <WaypointMarker
          key={wp.name}
          position={getWaypointPos(wp.lat, wp.lng)}
          name={wp.name}
          onClick={() => handleWaypointClick(wp)}
        />
      ))}
    </group>
  );
}
