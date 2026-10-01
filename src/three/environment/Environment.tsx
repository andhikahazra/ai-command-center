import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GridFloor } from './GridFloor';
import { Lighting } from './Lighting';

export const Environment: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Gentle floating dust motes in the air
  const particlesCount = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = 1 + Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [particlesCount]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <GridFloor />
      <Lighting />

      {/* Floating dust motes — light soft particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#94a3b8"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </>
  );
};
