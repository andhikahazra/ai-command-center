import React from 'react';

/**
 * Architectural Area Rugs & Floor Coverings for Sims-Style Office:
 * Demarcates desk zones, eliminates boring flat floors, and injects warm, realistic textile feel.
 */

// 1. Executive Boardroom Rug: Elegant Navy & Gold Border
export const ExecutiveRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      {/* Outer base border */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 4.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Gold inner pinstripe */}
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 4.0]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>
      {/* Inner plush navy field */}
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 3.7]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 2. Tech Geometric Rug for Coding Lab (Nexus)
export const TechRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      {/* Dark charcoal base */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#090d16" roughness={0.9} />
      </mesh>
      {/* Subtle emerald edge band */}
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 3.5]} />
        <meshStandardMaterial color="#064e3b" roughness={0.85} />
      </mesh>
      {/* Inner matrix slate field */}
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#0f291e" roughness={0.85} />
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
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 3.4]} />
        <meshStandardMaterial color="#581c87" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 3.0]} />
        <meshStandardMaterial color="#3b0764" roughness={0.85} />
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
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#bae6fd" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshStandardMaterial color="#0284c7" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 5. Creative Studio Colorblock Rug (Pixel)
export const CreativeRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Modern colorful colorblock accents */}
      <mesh receiveShadow position={[-1.0, 0.001, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.8]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[1.0, 0.001, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.8]} />
        <meshStandardMaterial color="#cffafe" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0.8, 0.002, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.2]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 6. Vintage Persian Woven Rug for Writer's Suite (Quill)
export const PersianRug: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.057, 0] }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#881337" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 3.4]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.1, 3.1]} />
        <meshStandardMaterial color="#9f1239" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.8]} />
        <meshStandardMaterial color="#4c0519" roughness={0.85} />
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
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 3.4]} />
        <meshStandardMaterial color="#334155" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.1, 3.1]} />
        <meshStandardMaterial color="#0f766e" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 8. Round Braided Lounge Rug for Breakroom / Coffee Area
export const RoundLoungeRug: React.FC<{
  position?: [number, number, number];
  radius?: number;
}> = ({ position = [0, 0.057, 0], radius = 1.6 }) => {
  return (
    <group position={position}>
      {/* Outer Circle */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.9} />
      </mesh>
      {/* Middle Ring */}
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.8, 32]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.85} />
      </mesh>
      {/* Inner Center */}
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.55, 32]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.85} />
      </mesh>
    </group>
  );
};

// 9. Corridor Runner Rug for central walkways
export const HallwayRunner: React.FC<{
  position?: [number, number, number];
  length?: number;
  width?: number;
}> = ({ position = [0, 0.056, 0], length = 18, width = 1.4 }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length - 0.4, width - 0.2]} />
        <meshStandardMaterial color="#475569" roughness={0.85} />
      </mesh>
    </group>
  );
};
