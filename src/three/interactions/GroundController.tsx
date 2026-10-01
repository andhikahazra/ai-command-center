import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAgentStore } from '../../store/agentStore';
import { useEventStore } from '../../store/eventStore';
import { useUIStore } from '../../store/uiStore';
import { soundService } from '../../services/soundService';

export const GroundController: React.FC = () => {
  const [clickMarker, setClickMarker] = useState<THREE.Vector3 | null>(null);
  const [hoverPoint, setHoverPoint] = useState<THREE.Vector3 | null>(null);
  const markerRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const hoverReticleRef = useRef<THREE.Group>(null);

  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const agents = useAgentStore((s) => s.agents);
  const moveAgentTo = useAgentStore((s) => s.moveAgentTo);
  const moveBossTo = useAgentStore((s) => s.moveBossTo);
  const isRunMode = useUIStore((s) => s.isRunMode);

  const activeAgent = selectedAgentId
    ? agents.find((a) => a.id === selectedAgentId) || agents.find((a) => a.isBoss)
    : agents.find((a) => a.isBoss);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (markerRef.current && clickMarker) {
      if (ringRef.current) {
        ringRef.current.rotation.z = time * 3;
        const scale = 1 + Math.sin(time * 8) * 0.15;
        ringRef.current.scale.set(scale, scale, 1);
      }
    }
    if (hoverReticleRef.current && hoverPoint) {
      hoverReticleRef.current.rotation.y = time * 2;
    }
  });

  const handlePointerMove = (e: any) => {
    if (!isRunMode && !e.shiftKey) {
      if (hoverPoint) setHoverPoint(null);
      return;
    }
    if (e.point) {
      setHoverPoint(new THREE.Vector3(e.point.x, 0.04, e.point.z));
    }
  };

  const handlePointerDown = (e: any) => {
    if (e.eventObject.name !== 'ground-plane') return;

    // RULE: Plain left click does NOT move the agent!
    // To move on click, user MUST either:
    // 1) Have Running Mode toggled ON (Press 'R' or click Run Mode button)
    // 2) Hold Shift + Left Click
    // 3) Right-Click (e.button === 2)
    const canMove = isRunMode || e.shiftKey || e.button === 2;
    if (!canMove) {
      // Allow natural camera orbit / selection
      return;
    }

    e.stopPropagation();
    const point = e.point;
    const targetPos: [number, number, number] = [point.x, 0, point.z];

    setClickMarker(new THREE.Vector3(point.x, 0.05, point.z));
    soundService.playTaskAssigned();

    if (activeAgent) {
      if (activeAgent.isBoss) {
        moveBossTo(targetPos);
      } else {
        moveAgentTo(activeAgent.id, targetPos);
      }

      useEventStore.getState().addEvent({
        type: 'SYSTEM_MESSAGE',
        agentId: activeAgent.id,
        agentName: activeAgent.name,
        message: `${activeAgent.name} sprinting to [X: ${point.x.toFixed(1)}, Z: ${point.z.toFixed(1)}]`,
      });
    }

    // Fade out click marker after 3 seconds
    setTimeout(() => {
      setClickMarker(null);
    }, 3000);
  };

  return (
    <>
      {/* Invisible raycast receiver plane covering the Sims complex */}
      <mesh
        name="ground-plane"
        position={[0, -0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Real-time Hover Crosshair when Running Mode is ON */}
      {(isRunMode || hoverPoint) && hoverPoint && (
        <group ref={hoverReticleRef} position={[hoverPoint.x, 0.06, hoverPoint.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.58, 32]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
          {/* Crosshair pointers */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.55, 0.01, Math.sin(angle) * 0.55]}
              rotation={[-Math.PI / 2, 0, angle]}
            >
              <boxGeometry args={[0.16, 0.03, 0.01]} />
              <meshBasicMaterial color="#3b82f6" />
            </mesh>
          ))}
        </group>
      )}

      {/* Holographic Sprint Destination Beacon */}
      {clickMarker && (
        <group ref={markerRef} position={[clickMarker.x, 0.06, clickMarker.z]}>
          <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.75, 32]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.18, 16]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>

          {/* Vertical beacon pillar */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
          </mesh>
        </group>
      )}
    </>
  );
};
