import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Stars from './three/Stars';
import Earth from './three/Earth';
import Spacecraft from './three/Spacecraft';
import Mars from './three/Mars';
import Rocket from './three/Rocket';
import Rover from './three/Rover';
import MartianTerrain from './three/MartianTerrain';
import store from '../store';

/* Reads store state each frame and drives the camera + bloom */
function SceneController() {
  const { camera } = useThree();
  const bloomRef = useRef();

  useFrame(() => {
    const state = store.getState();
    const [x, y, z] = state.cameraPosition;
    const [lx, ly, lz] = state.cameraLookAt;

    // Smoothly interpolate camera
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.05);
    const target = new THREE.Vector3(lx, ly, lz);
    const currentDir = new THREE.Vector3();
    camera.getWorldDirection(currentDir);
    camera.lookAt(target);

    // Camera shake during EDL
    if (state.cameraShake > 0) {
      camera.position.x += Math.sin(Date.now() * 0.05) * state.cameraShake * 0.05;
      camera.position.y += Math.cos(Date.now() * 0.07) * state.cameraShake * 0.03;
    }
  });

  return null;
}

function BloomController() {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setIntensity(state.bloomIntensity);
    });
    return unsub;
  }, []);

  return (
    <EffectComposer>
      <Bloom
        intensity={intensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}

function SceneContent() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setActiveSection(state.activeSection);
    });
    return unsub;
  }, []);

  return (
    <>
      <SceneController />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[10, 8, 5]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#B2533E" />

      {/* Always visible stars */}
      <Stars />

      {/* Phase-dependent objects */}

      {/* Earth + Rocket launch sequence */}
      <group position={[0, 0, 0]}>
        <Earth visible={activeSection <= 1} />
      </group>

      {/* Rocket — launches from Earth surface, driven by rocketProgress */}
      <group position={[0, 0, 0]}>
        <Rocket visible={activeSection <= 1} />
      </group>

      {/* Spacecraft during cruise */}
      <group position={[0, 0, -30]}>
        <Spacecraft visible={activeSection === 1} />
      </group>

      {/* Mars globe */}
      <group position={[0, 0, -80]}>
        <Mars visible={activeSection >= 2} />
      </group>

      {/* Rover placed ABOVE Mars globe */}
      <group position={[0, 5, -80]}>
        <Rover visible={activeSection >= 3} />
      </group>

      {/* Martian terrain */}
      <group position={[0, -2.5, -80]}>
        <MartianTerrain visible={activeSection >= 3} />
      </group>

      {/* Post-processing */}
      <BloomController />
    </>
  );
}

export default function Scene() {
  return (
    <div className="fixed-canvas">
      <Canvas
        camera={{ position: [2, 0, 5], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#000000' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
