import React from 'react';

/**
 * Performance-Optimized Area Rugs & Runners:
 * Single or two-plane meshes to eliminate Z-fighting and reduce draw calls.
 */

// 1. Executive Boardroom Rug
export const ExecutiveRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 4.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 3.8]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 2. Tech Rug for Coding Lab (Nexus)
export const TechRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#090d16" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.3, 3.3]} />
        <meshStandardMaterial color="#064e3b" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 3. Modern Data Analytics Rug (Cortex)
export const DataRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#2e1065" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#581c87" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 4. Scandinavian Research Lab Rug (Scout)
export const NordicRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 3.6]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 3.0]} />
        <meshStandardMaterial color="#0284c7" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 5. Creative Studio Rug (Pixel)
export const CreativeRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#cffafe" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 6. Vintage Persian Woven Rug (Quill)
export const PersianRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#881337" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 7. Industrial Quality Assurance Rug (Sentinel)
export const IndustrialRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#0f766e" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 8. Round Braided Lounge Rug
export const RoundLoungeRug: React.FC<{
  position?: [number, number, number];
  radius?: number;
}> = ({ position = [0, 0.057, 0], radius = 1.6 }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 20]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.75, 20]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 9. Corridor Runner Rug
export const HallwayRunner: React.FC<{
  position?: [number, number, number];
  length?: number;
  width?: number;
}> = ({ position = [0, 0.056, 0], length = 18, width = 1.4 }) => {
  return (
    <mesh receiveShadow position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[length, width]} />
      <meshStandardMaterial color="#334155" roughness={0.9} />
    </mesh>
  );
};
