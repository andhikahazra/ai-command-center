import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import * as THREE from 'three';

/**
 * Modern Worker Workstation Terminals:
 * Provides sleek futuristic desk pods for all worker agents on the operations floor.
 */
export const WorkerStations: React.FC = () => {
  const agents = useAgentStore((s) => s.agents);
  const workers = agents.filter((a) => !a.isBoss);

  return (
    <group>
      {workers.map((worker) => {
        const [x, , z] = worker.homePosition;
        const color = worker.color;

        return (
          <group key={`station-${worker.id}`} position={[x, 0, z]}>
            {/* Circular Station Floor Mat */}
            <mesh receiveShadow position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.3, 32]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
            </mesh>

            {/* Glowing Accent Ring with Worker Color */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.25, 1.3, 32]} />
              <meshBasicMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>

            {/* Mini Modern Curved Desk Pod in front of worker */}
            <group position={[0, 0, -0.65]}>
              {/* Desk Top */}
              <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
                <boxGeometry args={[1.1, 0.04, 0.45]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
              </mesh>

              {/* Desk Leg Stand */}
              <mesh castShadow position={[0, 0.32, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 0.62, 12]} />
                <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.7} />
              </mesh>
              <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.25, 16]} />
                <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.7} />
              </mesh>

              {/* Dual Mini Monitors */}
              <group position={[0, 0.95, -0.05]}>
                {/* Left screen */}
                <mesh position={[-0.24, 0, 0]} rotation={[0, 0.2, 0]}>
                  <boxGeometry args={[0.42, 0.28, 0.02]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh position={[-0.24, 0, 0.012]} rotation={[0, 0.2, 0]}>
                  <planeGeometry args={[0.39, 0.25]} />
                  <meshBasicMaterial color={color} transparent opacity={0.75} />
                </mesh>

                {/* Right screen */}
                <mesh position={[0.24, 0, 0]} rotation={[0, -0.2, 0]}>
                  <boxGeometry args={[0.42, 0.28, 0.02]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh position={[0.24, 0, 0.012]} rotation={[0, -0.2, 0]}>
                  <planeGeometry args={[0.39, 0.25]} />
                  <meshBasicMaterial color="#0284c7" transparent opacity={0.75} />
                </mesh>
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
};
