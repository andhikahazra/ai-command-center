import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Agent } from '../../types/agent';
import { useAgentStore } from '../../store/agentStore';
import { CharacterMesh } from './CharacterMesh';

interface AgentModelProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Sims-Style Agent Model:
 * - Humanoid character walking on the floor (Y = 0) with natural step-bob
 * - Ground soft shadow
 * - Subtle selection decal on the floor
 * - Clean minimal nameplate floating above head (no neon sci-fi billboards)
 */
export const AgentModel: React.FC<AgentModelProps> = ({ agent, isSelected, onClick }) => {
  const rootRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const isBoss = agent.isBoss;
  const radius = isBoss ? 0.6 : 0.42;

  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const currentPos = useMemo(() => new THREE.Vector3(...agent.position), []);
  const prevPos = useMemo(() => new THREE.Vector3(...agent.position), []);
  const moveDirection = useMemo(() => new THREE.Vector3(), []);

  const [isMovingState, setIsMovingState] = React.useState(false);
  const isMovingRef = useRef(false);
  const lastSyncTime = useRef(0);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    // Movement calculation
    const targetPos = agent.targetPosition || agent.homePosition;
    targetVec.set(targetPos[0], 0, targetPos[2]); // Keep target grounded

    const distToTarget = currentPos.distanceTo(targetVec);
    const moving = distToTarget > 0.06;

    if (moving !== isMovingRef.current) {
      isMovingRef.current = moving;
      setIsMovingState(moving);
    }

    // Smooth walking speed
    const lerpSpeed = isBoss ? 0.065 : 0.055;
    currentPos.lerp(targetVec, lerpSpeed);

    if (rootRef.current) {
      // Step-bob while walking; firm on floor when standing
      const walkBob = moving ? Math.abs(Math.sin(time * 10)) * 0.035 : 0;
      rootRef.current.position.set(currentPos.x, walkBob, currentPos.z);

      // Smooth heading rotation toward movement direction
      if (moving) {
        moveDirection.subVectors(currentPos, prevPos).normalize();
        if (moveDirection.lengthSq() > 0.001) {
          const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);
          rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetAngle, 0.15);
        }
      } else {
        // Slowly face forward in room
        if (isBoss) {
          rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, 0, 0.04);
        }
      }
      prevPos.copy(currentPos);
    }

    // Ground shadow scale
    if (shadowRef.current) {
      shadowRef.current.position.set(currentPos.x, 0.02, currentPos.z);
    }

    // Sync position back to store periodically
    if (moving && time - lastSyncTime.current > 0.18) {
      lastSyncTime.current = time;
      useAgentStore.getState().updateAgentPosition(agent.id, [currentPos.x, 0, currentPos.z]);
    }
  });

  return (
    <>
      {/* Ground Soft Contact Shadow (stays flat on floor Y=0.02) */}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.85, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.28} />
      </mesh>

      {/* Main Character Root (Grounded on floor) */}
      <group ref={rootRef}>
        {/* Clickable Character Entity */}
        <group onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <CharacterMesh
            agent={agent}
            isSelected={isSelected}
            isMoving={isMovingState}
          />

          {/* Clean Floor Selection Ring */}
          {isSelected && (
            <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 1.05, radius * 1.18, 36]} />
              <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>

        {/* Clean, Subtle Single Name Tag (High contrast dark slate on white outline) */}
        <Text
          position={[0, isBoss ? 1.78 : 1.52, 0]}
          fontSize={0.16}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.014}
          outlineColor="#ffffff"
        >
          {agent.name}
        </Text>
      </group>
    </>
  );
};
