import React from 'react';

/**
 * Realistic Everyday Office Props & Equipment:
 * - Ergonomic mesh task chair with 5-star castor base
 * - Desk accessories (blotter, keyboard, mouse, pen cup, paper stack, mug, lamp)
 * - Enterprise multifunction office copier / printer station
 * - Steel lateral filing cabinets with drawer handles
 * - Standing coat & umbrella rack
 * - Brushed metal wastebasket
 */

// 1. Realistic Ergonomic Mesh Swivel Task Chair
export const OfficeErgoChair: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#1e293b' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 5-Star Caster Wheel Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.06, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {/* 5 Legs with Caster Wheels */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 5;
        const lx = Math.sin(angle) * 0.26;
        const lz = Math.cos(angle) * 0.26;
        return (
          <group key={`leg${i}`}>
            {/* Spoke Leg */}
            <mesh position={[lx / 2, 0.06, lz / 2]} rotation={[0, -angle, 0.1]}>
              <boxGeometry args={[0.03, 0.02, 0.25]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            {/* Caster Wheel */}
            <mesh position={[lx, 0.03, lz]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Chrome Hydraulic Center Column Cylinder */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.32, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Ergonomic Seat Cushion */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <boxGeometry args={[0.52, 0.08, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* High Curved Breathable Mesh Backrest */}
      <group position={[0, 0.82, -0.22]} rotation={[-0.1, 0, 0]}>
        {/* Frame Border */}
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.72, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Inner Mesh Panel */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.42, 0.66]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        {/* Lumbar Support Pad */}
        <mesh position={[0, -0.15, 0.03]}>
          <boxGeometry args={[0.34, 0.1, 0.03]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Dual 3D T-Armrests */}
      {[-0.27, 0.27].map((ax, i) => (
        <group key={`arm${i}`} position={[ax, 0.56, 0.02]}>
          {/* Arm Post */}
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.18, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          {/* Soft Armrest Pad */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.08, 0.03, 0.24]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 2. Realistic Desk Accessories (Blotter, Keyboard, Mouse, Pen Cup, Paper In-Tray, Mug, Lamp)
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
      {/* Premium Leather / Felt Desk Blotter Pad */}
      <mesh receiveShadow position={[0, 0.005, 0.04]}>
        <boxGeometry args={[1.3, 0.008, 0.55]} />
        <meshStandardMaterial color="#090d16" roughness={0.8} />
      </mesh>

      {/* Slim Low-Profile Mechanical Keyboard */}
      <group position={[-0.08, 0.012, 0.12]}>
        {/* Keyboard Chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.012, 0.14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Spacebar & Keys Accent */}
        <mesh position={[0, 0.008, 0.03]}>
          <boxGeometry args={[0.16, 0.006, 0.025]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Ergonomic Wireless Mouse */}
      <group position={[0.26, 0.015, 0.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.07, 0.025, 0.11]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
      </group>

      {/* Ceramic Pen Organizer Cup with Pens, Pencils, Scissors */}
      <group position={[0.5, 0.08, -0.12]}>
        {/* Matte Ceramic Tumbler */}
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.12, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Blue Pen */}
        <mesh position={[-0.015, 0.07, 0]} rotation={[0.1, 0, 0.2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 8]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        {/* Yellow Pencil with eraser tip */}
        <mesh position={[0.015, 0.08, 0.01]} rotation={[-0.1, 0, -0.15]}>
          <cylinderGeometry args={[0.004, 0.004, 0.18, 6]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        {/* Red Marker */}
        <mesh position={[0, 0.06, -0.015]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Multi-Tier Document In/Out Paper Tray with Document Sheets */}
      <group position={[-0.52, 0.05, -0.1]}>
        {/* Bottom Tray */}
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.03, 0.35]} />
          <meshStandardMaterial color="#475569" metalness={0.7} />
        </mesh>
        {/* Paper sheets inside bottom tray */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.24, 0.02, 0.31]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Top Tray Riser */}
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.28, 0.025, 0.35]} />
          <meshStandardMaterial color="#475569" metalness={0.7} />
        </mesh>
        {/* Paper sheets inside top tray */}
        <mesh position={[0, 0.09, 0]} rotation={[0, 0.05, 0]}>
          <boxGeometry args={[0.24, 0.015, 0.31]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Ceramic Coffee Mug */}
      <group position={[-0.45, 0.05, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.09, 12]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.035, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.01, 12]} />
          <meshStandardMaterial color="#451a03" roughness={0.2} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.025, 0.007, 8, 12]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
      </group>

      {/* Modern Articulated Angle-Poise LED Task Lamp */}
      {hasLamp && (
        <group position={[0.56, 0, 0.14]}>
          {/* Weighted Round Base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Lower Arm */}
          <mesh position={[-0.06, 0.18, 0]} rotation={[0, 0, -0.45]}>
            <cylinderGeometry args={[0.008, 0.008, 0.38, 8]} />
            <meshStandardMaterial color={lampColor} metalness={0.8} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[-0.14, 0.34, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.26, 0.32, 0]} rotation={[0, 0, 0.6]}>
            <cylinderGeometry args={[0.008, 0.008, 0.32, 8]} />
            <meshStandardMaterial color={lampColor} metalness={0.8} />
          </mesh>
          {/* Cone Lamp Head */}
          <group position={[-0.38, 0.28, 0]} rotation={[0, 0, -0.8]}>
            <mesh castShadow>
              <coneGeometry args={[0.06, 0.1, 16]} />
              <meshStandardMaterial color={lampColor} metalness={0.7} />
            </mesh>
            {/* Soft Warm Bulb Glow */}
            <mesh position={[0, -0.04, 0]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            <pointLight position={[0, -0.06, 0]} color="#fffbeb" intensity={0.4} distance={1.2} />
          </group>
        </group>
      )}
    </group>
  );
};

// 3. Enterprise Office Multifunction Copier & Printer Station
export const MultifunctionCopier: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Copier Lower Cabinet Body */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.8, 0.7]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>
      {/* Front Paper Drawers (3 Drawers) */}
      {[0.2, 0.38, 0.56].map((y, i) => (
        <group key={`drawer${i}`} position={[0, y, 0.355]}>
          <mesh>
            <boxGeometry args={[0.76, 0.14, 0.01]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
          {/* Drawer Handle */}
          <mesh position={[0, 0.03, 0.015]}>
            <boxGeometry args={[0.25, 0.02, 0.015]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Middle Output Paper Collection Tray */}
      <group position={[0.05, 0.78, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.45]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Output Printed Paper Stack */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.28, 0.025, 0.38]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Top Scanner Flatbed & Automatic Document Feeder (ADF) Lid */}
      <group position={[0, 0.98, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.88, 0.12, 0.72]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        {/* ADF Top Feeder Module */}
        <mesh position={[0, 0.12, -0.05]} castShadow>
          <boxGeometry args={[0.65, 0.12, 0.4]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Input tray for documents */}
        <mesh position={[0, 0.18, 0.12]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.42, 0.01, 0.28]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Touch Screen Control Console with Blue Display */}
      <group position={[0.34, 1.05, 0.32]} rotation={[0.4, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.16, 0.025]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Glowing Touchscreen UI */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.18, 0.12]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Beside Printer: Stack of A4 Paper Ream Boxes */}
      <group position={[0.65, 0, 0]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.32, 0.24, 0.44]} />
          <meshStandardMaterial color="#d97706" roughness={0.8} />
        </mesh>
        {/* Top Box open */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.42]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

// 4. Steel Lateral 3-Drawer Filing Cabinet
export const FilingCabinet: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#475569' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Steel Housing */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 1.3, 0.55]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* 3 Drawer Panels */}
      {[0.25, 0.65, 1.05].map((y, i) => (
        <group key={`fc${i}`} position={[0, y, 0.28]}>
          {/* Drawer Bevel */}
          <mesh>
            <boxGeometry args={[0.54, 0.36, 0.01]} />
            <meshStandardMaterial color={color} metalness={0.8} />
          </mesh>
          {/* Silver Recessed Pull Handle */}
          <mesh position={[0, 0.06, 0.015]}>
            <boxGeometry args={[0.16, 0.02, 0.02]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
          </mesh>
          {/* White Card Label Slot */}
          <mesh position={[0, -0.04, 0.01]}>
            <boxGeometry args={[0.1, 0.04, 0.005]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
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
      {/* Heavy Steel Disc Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {/* Center Upright Pole */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.85, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Umbrella Ring Catch Basin */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.16, 0.015, 8, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      {/* Hanging Umbrella */}
      <mesh position={[0.14, 0.38, 0]} rotation={[0.1, 0, 0.15]}>
        <cylinderGeometry args={[0.015, 0.01, 0.65, 8]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      {/* 4 Upper Coat Hooks */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <group key={`hook${i}`} position={[0, 1.75, 0]} rotation={[0, angle, 0]}>
            <mesh position={[0.1, 0.06, 0]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            <mesh position={[0.15, 0.14, 0]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
            </mesh>
          </group>
        );
      })}
      {/* Hung Navy Blazer */}
      <mesh position={[0.15, 1.45, 0]} castShadow>
        <boxGeometry args={[0.18, 0.52, 0.3]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 6. Brushed Metal Office Wastebasket with Crumpled Paper
export const OfficeWastebasket: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Tapered Waste Bin Cylinder */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.11, 0.32, 16, 1, true]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} side={2} />
      </mesh>
      {/* Bottom Cap */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.7} />
      </mesh>
      {/* Crumpled paper balls inside */}
      <mesh position={[0.03, 0.18, 0.02]}>
        <dodecahedronGeometry args={[0.04, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[-0.04, 0.22, -0.02]}>
        <dodecahedronGeometry args={[0.035, 0]} />
        <meshStandardMaterial color="#fef08a" roughness={0.9} />
      </mesh>
    </group>
  );
};
