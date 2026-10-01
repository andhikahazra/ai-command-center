import React from 'react';

/**
 * Performance-Optimized Office Props & Equipment:
 * - Clean ergonomic swivel chairs with minimal draw calls
 * - Streamlined desk accessory sets with zero point-light overhead
 * - Optimized multifunction printer/copier
 * - Efficient steel filing cabinets & coat rack
 */

// 1. Sleek, Performant Ergonomic Office Task Chair
export const OfficeErgoChair: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#1e293b' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 5-Star Caster Star Base (Single cylinder with 5 sides) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.04, 5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      {/* Center Hydraulic Lift Column */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.34, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Contoured Seat Cushion */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.48]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Breathable Mesh High Backrest with Integrated Lumbar */}
      <group position={[0, 0.82, -0.22]} rotation={[-0.08, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.46, 0.7, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.4, 0.64]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      </group>

      {/* Dual Armrests */}
      {[-0.26, 0.26].map((ax, i) => (
        <mesh key={`arm${i}`} position={[ax, 0.54, 0.02]}>
          <boxGeometry args={[0.07, 0.16, 0.22]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// 2. Performant Desk Accessories (Blotter, Keyboard, Mouse, Pen Cup, Paper In-Tray, Mug, Lamp)
// ZERO point-lights; uses emissive mesh for glowing lamp
export const DeskSet: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  hasLamp?: boolean;
  lampColor?: string;
}> = ({
  position = [0, 0.76, 0],
  rotation = [0, 0, 0],
  hasLamp = true,
  lampColor = '#0284c7',
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Leather / Felt Desk Blotter Pad */}
      <mesh position={[0, 0.005, 0.04]}>
        <boxGeometry args={[1.3, 0.006, 0.55]} />
        <meshStandardMaterial color="#090d16" roughness={0.8} />
      </mesh>

      {/* Slim Low-Profile Mechanical Keyboard & Mouse */}
      <mesh position={[-0.08, 0.012, 0.12]}>
        <boxGeometry args={[0.44, 0.012, 0.14]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      <mesh position={[0.26, 0.015, 0.12]}>
        <boxGeometry args={[0.07, 0.022, 0.11]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* Ceramic Pen Organizer Cup */}
      <mesh position={[0.5, 0.06, -0.12]}>
        <cylinderGeometry args={[0.04, 0.035, 0.11, 8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* Multi-Tier Document In/Out Paper Tray */}
      <group position={[-0.52, 0.05, -0.1]}>
        <mesh>
          <boxGeometry args={[0.26, 0.06, 0.34]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[0.22, 0.015, 0.3]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Ceramic Coffee Mug */}
      <group position={[-0.45, 0.045, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.035, 0.03, 0.08, 8]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.005, 8]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
      </group>

      {/* Modern Angle-Poise LED Task Lamp (Glow without heavy point-light) */}
      {hasLamp && (
        <group position={[0.56, 0, 0.14]}>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 10]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[-0.08, 0.22, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.008, 0.008, 0.44, 6]} />
            <meshStandardMaterial color={lampColor} />
          </mesh>
          <mesh position={[-0.18, 0.38, 0]} rotation={[0, 0, -0.8]}>
            <coneGeometry args={[0.055, 0.09, 10]} />
            <meshStandardMaterial color={lampColor} />
          </mesh>
          {/* Glowing warm bulb tip */}
          <mesh position={[-0.2, 0.34, 0]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      )}
    </group>
  );
};

// 3. Enterprise Office Multifunction Copier & Printer
export const MultifunctionCopier: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Copier Cabinet Body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.82, 0.88, 0.68]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      {/* Front Drawers */}
      <mesh position={[0, 0.4, 0.345]}>
        <boxGeometry args={[0.74, 0.6, 0.01]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Top Scanner & ADF Lid */}
      <mesh position={[0, 0.96, 0]} castShadow>
        <boxGeometry args={[0.85, 0.14, 0.7]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      {/* Touch Screen Console with Blue Display */}
      <group position={[0.32, 1.05, 0.32]} rotation={[0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.15, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.17, 0.12]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>
      {/* Beside Printer: Stack of Paper Ream Boxes */}
      <mesh position={[0.62, 0.16, 0]} castShadow>
        <boxGeometry args={[0.3, 0.32, 0.42]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 4. Steel Lateral Filing Cabinet
export const FilingCabinet: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#475569' }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.58, 1.3, 0.54]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Silver Handles */}
      {[0.25, 0.65, 1.05].map((y, i) => (
        <mesh key={`handle${i}`} position={[0, y, 0.28]}>
          <boxGeometry args={[0.18, 0.02, 0.015]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

// 5. Standing Coat & Umbrella Rack
export const StandingCoatRack: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 10]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.85, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>
      {/* Hung Navy Blazer */}
      <mesh position={[0.14, 1.45, 0]}>
        <boxGeometry args={[0.16, 0.5, 0.28]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 6. Office Wastebasket
export const OfficeWastebasket: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.13, 0.1, 0.32, 10]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.02, 0.18, 0.02]}>
        <dodecahedronGeometry args={[0.035, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
    </group>
  );
};
