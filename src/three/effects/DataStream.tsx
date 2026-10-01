import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3Tuple } from 'three';

interface DataStreamProps {
  from: Vector3Tuple;
  to: Vector3Tuple;
  color: string;
}

export const DataStream: React.FC<DataStreamProps> = ({ from, to, color }) => {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particlesCount = 8;
  const speeds = useMemo(() => Array.from({ length: particlesCount }, () => 1 + Math.random()), []);
  const offsets = useMemo(() => Array.from({ length: particlesCount }, () => Math.random()), []);

  const startVec = useMemo(() => new THREE.Vector3(...from), [from]);
  const endVec = useMemo(() => new THREE.Vector3(...to), [to]);
  const dirVec = useMemo(() => new THREE.Vector3().subVectors(endVec, startVec), [startVec, endVec]);
  const length = dirVec.length();
  const dirNormalized = useMemo(() => dirVec.clone().normalize(), [dirVec]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const progress = (time * speeds[i] + offsets[i]) % 1;
        
        // Midpoint elevation for curve
        const curveOffset = Math.sin(progress * Math.PI) * 2;
        
        child.position.copy(startVec)
          .add(dirNormalized.clone().multiplyScalar(length * progress))
          .setY(startVec.y + (endVec.y - startVec.y) * progress + curveOffset);
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: particlesCount }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};
