import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3Tuple } from 'three';

interface TaskBeamProps {
  position: Vector3Tuple;
  color: string;
  progress: number;
}

export const TaskBeam: React.FC<TaskBeamProps> = ({ position, color, progress }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  const maxHeight = 10;
  const currentHeight = Math.max(0.1, (progress / 100) * maxHeight);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child) => {
        child.position.y += 0.05 + Math.random() * 0.02;
        if (child.position.y > currentHeight) {
          child.position.y = 0;
        }
      });
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(time * 5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={beamRef} position={[0, currentHeight / 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, currentHeight, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <group ref={particlesRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 0.8, Math.random() * currentHeight, (Math.random() - 0.5) * 0.8]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
