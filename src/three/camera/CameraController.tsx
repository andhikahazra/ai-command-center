import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';
import { useAgentStore } from '../../store/agentStore';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export const CameraController: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraMode = useUIStore((s) => s.cameraMode);
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);

  // Default camera framed for Sims isometric dollhouse perspective
  const targetPosition = useRef(new THREE.Vector3(22, 20, 24));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 3.0));
  const isTransitioning = useRef(true);

  // When cameraMode changes, trigger a smooth transition
  React.useEffect(() => {
    if (cameraMode !== 'free') {
      isTransitioning.current = true;
    }
  }, [cameraMode, selectedAgentId]);

  useFrame(({ camera }) => {
    if (!controlsRef.current) return;

    if (cameraMode !== 'free' && isTransitioning.current) {
      if (cameraMode === 'overview') {
        // Classic Sims-style isometric overview framing all 8 rooms and central hallway
        targetPosition.current.set(22, 20, 24);
        targetLookAt.current.set(0, 0.5, 3.0);
      } else if (cameraMode === 'focus-agent' && selectedAgentId) {
        const agent = agents.find((a) => a.id === selectedAgentId);
        if (agent) {
          const [x, y, z] = agent.position;
          // Zoom into the agent's private room
          targetPosition.current.set(x + 3.8, y + 4.2, z + 3.8);
          targetLookAt.current.set(x, y + 0.6, z);
        }
      } else if (cameraMode === 'focus-boss') {
        const boss = agents.find((a) => a.isBoss);
        if (boss) {
          const [x, y, z] = boss.position;
          // Zoom into Commander's Executive Suite
          targetPosition.current.set(x + 4.2, y + 4.6, z + 4.2);
          targetLookAt.current.set(x, y + 0.8, z);
        }
      }

      camera.position.lerp(targetPosition.current, 0.05);
      controlsRef.current.target.lerp(targetLookAt.current, 0.05);
      controlsRef.current.update();

      // Check if close enough to stop forced transition so user can orbit freely
      if (
        camera.position.distanceTo(targetPosition.current) < 0.15 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.15
      ) {
        isTransitioning.current = false;
      }
    } else {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={2}
      maxDistance={70}
      maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below floor
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      onStart={() => {
        // User manually moved camera, disable forced transition
        isTransitioning.current = false;
      }}
    />
  );
};
