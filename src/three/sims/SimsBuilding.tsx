import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Sims-Style Office Complex Architecture:
 * - Isometric cutaway building with perimeter outdoor lawn & sidewalk
 * - Distinct flooring for each private agent room & central marble hallway
 * - Sims-style cutaway walls (back/side walls full height, front walls cut low for visibility)
 * - Doorways with department signage
 */
export const SimsBuilding: React.FC = () => {
  // Shared materials for architectural efficiency & crisp light look
  const mats = useMemo(() => {
    return {
      lawn: new THREE.MeshStandardMaterial({ color: '#86efac', roughness: 0.85 }),
      sidewalk: new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.6 }),
      hallwayFloor: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.4, metalness: 0.1 }),
      wallExterior: new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.7 }),
      wallAccent: new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.6 }),
      doorFrame: new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.3, metalness: 0.5 }),
      // Distinct room floors
      floorBoss: new THREE.MeshStandardMaterial({ color: '#fed7aa', roughness: 0.6 }), // Rich warm parquet
      floorNexus: new THREE.MeshStandardMaterial({ color: '#dcfce7', roughness: 0.5 }), // Dev mint/slate
      floorCortex: new THREE.MeshStandardMaterial({ color: '#f3e8ff', roughness: 0.5 }), // Data lavender
      floorScout: new THREE.MeshStandardMaterial({ color: '#e0f2fe', roughness: 0.5 }), // Research sky blue
      floorCrawler: new THREE.MeshStandardMaterial({ color: '#ffedd5', roughness: 0.5 }), // Web amber
      floorPixel: new THREE.MeshStandardMaterial({ color: '#cffafe', roughness: 0.5 }), // Creative cyan
      floorQuill: new THREE.MeshStandardMaterial({ color: '#fce7f3', roughness: 0.6 }), // Writer rosewood
      floorSentinel: new THREE.MeshStandardMaterial({ color: '#d1fae5', roughness: 0.5 }), // QA emerald
      floorLounge: new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.6 }), // Lounge modern tile
    };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 1. OUTDOOR SURROUND (LAWN & SIDEWALK) ================= */}
      {/* Large outdoor lawn */}
      <mesh receiveShadow position={[0, -0.06, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <primitive object={mats.lawn} attach="material" />
      </mesh>

      {/* Exterior perimeter sidewalk pavers */}
      <mesh receiveShadow position={[0, -0.03, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 28]} />
        <primitive object={mats.sidewalk} attach="material" />
      </mesh>

      {/* Main Building Foundation Slab */}
      <mesh receiveShadow position={[0, 0.02, 3.5]}>
        <boxGeometry args={[30.5, 0.06, 26.5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>

      {/* ================= 2. ROOM FLOORS ================= */}
      {/* 1. Commander HQ: Center-North [-4.5 to 4.5, Z: -9.5 to -1.5] */}
      <mesh receiveShadow position={[0, 0.055, -5.5]}>
        <boxGeometry args={[9.0, 0.01, 8.0]} />
        <primitive object={mats.floorBoss} attach="material" />
      </mesh>

      {/* 2. Coding Lab (Nexus): Northwest [-14.5 to -5.5, Z: -9.5 to -1.5] */}
      <mesh receiveShadow position={[-10.0, 0.055, -5.5]}>
        <boxGeometry args={[9.0, 0.01, 8.0]} />
        <primitive object={mats.floorNexus} attach="material" />
      </mesh>

      {/* 3. Data Analytics (Cortex): Northeast [5.5 to 14.5, Z: -9.5 to -1.5] */}
      <mesh receiveShadow position={[10.0, 0.055, -5.5]}>
        <boxGeometry args={[9.0, 0.01, 8.0]} />
        <primitive object={mats.floorCortex} attach="material" />
      </mesh>

      {/* 4. Research Lab (Scout): Mid-West [-14.5 to -5.5, Z: 1.5 to 8.5] */}
      <mesh receiveShadow position={[-10.0, 0.055, 5.0]}>
        <boxGeometry args={[9.0, 0.01, 7.0]} />
        <primitive object={mats.floorScout} attach="material" />
      </mesh>

      {/* 5. Web Recon Hub (Crawler): Mid-East [5.5 to 14.5, Z: 1.5 to 8.5] */}
      <mesh receiveShadow position={[10.0, 0.055, 5.0]}>
        <boxGeometry args={[9.0, 0.01, 7.0]} />
        <primitive object={mats.floorCrawler} attach="material" />
      </mesh>

      {/* 6. Creative Design Studio (Pixel): Center [ -4.5 to 4.5, Z: 2.0 to 8.5] */}
      <mesh receiveShadow position={[0, 0.055, 5.25]}>
        <boxGeometry args={[9.0, 0.01, 6.5]} />
        <primitive object={mats.floorPixel} attach="material" />
      </mesh>

      {/* 7. Writing & Docs Suite (Quill): Southwest [-13.5 to -2.0, Z: 9.5 to 16.5] */}
      <mesh receiveShadow position={[-7.5, 0.055, 13.0]}>
        <boxGeometry args={[11.0, 0.01, 7.0]} />
        <primitive object={mats.floorQuill} attach="material" />
      </mesh>

      {/* 8. QA Testing Lab (Sentinel): Southeast [2.0 to 13.5, Z: 9.5 to 16.5] */}
      <mesh receiveShadow position={[7.5, 0.055, 13.0]}>
        <boxGeometry args={[11.0, 0.01, 7.0]} />
        <primitive object={mats.floorSentinel} attach="material" />
      </mesh>

      {/* Central Hallway & Sims Breakroom Promenade [Z: -1.5 to 1.8] */}
      <mesh receiveShadow position={[0, 0.054, 0.0]}>
        <boxGeometry args={[29.0, 0.008, 3.0]} />
        <primitive object={mats.hallwayFloor} attach="material" />
      </mesh>
      {/* South Hallway connecting south rooms [Z: 8.5 to 9.5] */}
      <mesh receiveShadow position={[0, 0.054, 9.0]}>
        <boxGeometry args={[29.0, 0.008, 1.0]} />
        <primitive object={mats.hallwayFloor} attach="material" />
      </mesh>

      {/* ================= 3. WALLS & DOORWAYS (SIMS CUTAWAY STYLE) ================= */}
      {/* --- North Exterior Full-Height Back Wall [Z = -9.6] --- */}
      <mesh position={[0, 1.25, -9.6]} castShadow receiveShadow>
        <boxGeometry args={[29.2, 2.4, 0.2]} />
        <primitive object={mats.wallExterior} attach="material" />
      </mesh>

      {/* --- West Exterior Full-Height Wall [X = -14.6] --- */}
      <mesh position={[-14.6, 1.25, 3.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.4, 26.2]} />
        <primitive object={mats.wallExterior} attach="material" />
      </mesh>

      {/* --- East Exterior Full-Height Wall [X = 14.6] --- */}
      <mesh position={[14.6, 1.25, 3.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.4, 26.2]} />
        <primitive object={mats.wallExterior} attach="material" />
      </mesh>

      {/* --- South Exterior Back Wall [Z = 16.6] --- */}
      <mesh position={[0, 1.25, 16.6]} castShadow receiveShadow>
        <boxGeometry args={[29.2, 2.4, 0.2]} />
        <primitive object={mats.wallExterior} attach="material" />
      </mesh>

      {/* --- Vertical Partition Walls Between Rooms (North Wing) --- */}
      {/* Wall between Nexus & Boss [X = -4.6, Z: -9.5 to -1.5] */}
      <mesh position={[-4.6, 1.25, -5.5]} castShadow>
        <boxGeometry args={[0.16, 2.4, 8.0]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      {/* Wall between Boss & Cortex [X = 4.6, Z: -9.5 to -1.5] */}
      <mesh position={[4.6, 1.25, -5.5]} castShadow>
        <boxGeometry args={[0.16, 2.4, 8.0]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>

      {/* --- Vertical Partition Walls (Mid Wing) --- */}
      {/* Wall between Scout & Pixel [X = -4.6, Z: 1.5 to 8.5] */}
      <mesh position={[-4.6, 1.25, 5.0]} castShadow>
        <boxGeometry args={[0.16, 2.4, 7.0]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      {/* Wall between Pixel & Crawler [X = 4.6, Z: 1.5 to 8.5] */}
      <mesh position={[4.6, 1.25, 5.0]} castShadow>
        <boxGeometry args={[0.16, 2.4, 7.0]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>

      {/* --- Vertical Partition Wall (South Wing) --- */}
      {/* Wall between Quill & Sentinel [X = 0, Z: 9.5 to 16.5] */}
      <mesh position={[0, 1.25, 13.0]} castShadow>
        <boxGeometry args={[0.16, 2.4, 7.0]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>

      {/* --- Hallway Dividing Walls with Open Doorways (Sims Cutaway: Height 2.2 with door gap) --- */}
      {/* 1. North Hallway Wall [Z = -1.5] */}
      {/* Coding Lab front wall with door at [-10, 0, -1.5] */}
      <mesh position={[-12.7, 1.1, -1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[-7.3, 1.1, -1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      {/* Door Lintel header above Coding Lab door */}
      <mesh position={[-10.0, 2.15, -1.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* Boss HQ front wall with door at [0, 0, -1.5] */}
      <mesh position={[-2.8, 1.1, -1.5]}>
        <boxGeometry args={[3.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[2.8, 1.1, -1.5]}>
        <boxGeometry args={[3.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      {/* Door Lintel header above Boss door */}
      <mesh position={[0, 2.15, -1.5]}>
        <boxGeometry args={[2.2, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* Cortex Data Lab front wall with door at [10, 0, -1.5] */}
      <mesh position={[7.3, 1.1, -1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[12.7, 1.1, -1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      {/* Door Lintel header above Cortex door */}
      <mesh position={[10.0, 2.15, -1.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* 2. Mid Hallway Wall [Z = 1.5] */}
      {/* Scout Research Lab wall with door at [-10, 0, 1.5] */}
      <mesh position={[-12.7, 1.1, 1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[-7.3, 1.1, 1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[-10.0, 2.15, 1.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* Pixel Design Studio wall with door at [0, 0, 1.8] */}
      <mesh position={[-2.8, 1.1, 1.8]}>
        <boxGeometry args={[3.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[2.8, 1.1, 1.8]}>
        <boxGeometry args={[3.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[0, 2.15, 1.8]}>
        <boxGeometry args={[2.0, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* Crawler Web Recon wall with door at [10, 0, 1.5] */}
      <mesh position={[7.3, 1.1, 1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[12.7, 1.1, 1.5]}>
        <boxGeometry args={[3.6, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[10.0, 2.15, 1.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* 3. South Hallway Wall [Z = 9.5] */}
      {/* Quill Writing Suite door at [-6.5, 0, 9.5] */}
      <mesh position={[-11.2, 1.1, 9.5]}>
        <boxGeometry args={[4.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[-2.3, 1.1, 9.5]}>
        <boxGeometry args={[4.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[-6.5, 2.15, 9.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* Sentinel QA Lab door at [6.5, 0, 9.5] */}
      <mesh position={[2.3, 1.1, 9.5]}>
        <boxGeometry args={[4.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[11.2, 1.1, 9.5]}>
        <boxGeometry args={[4.4, 2.1, 0.16]} />
        <primitive object={mats.wallAccent} attach="material" />
      </mesh>
      <mesh position={[6.5, 2.15, 9.5]}>
        <boxGeometry args={[1.8, 0.3, 0.18]} />
        <primitive object={mats.doorFrame} attach="material" />
      </mesh>

      {/* ================= 4. DEPARTMENT SIGNPLATES ABOVE DOORS ================= */}
      <RoomSign position={[0, 2.45, -1.4]} title="EXECUTIVE SUITE" code="HQ-01" color="#d97706" />
      <RoomSign position={[-10.0, 2.45, -1.4]} title="CODING LAB" code="DEV-02" color="#059669" />
      <RoomSign position={[10.0, 2.45, -1.4]} title="DATA ANALYTICS" code="DAT-03" color="#7c3aed" />
      <RoomSign position={[-10.0, 2.45, 1.6]} title="RESEARCH LAB" code="RES-04" color="#0284c7" />
      <RoomSign position={[0, 2.45, 1.9]} title="DESIGN STUDIO" code="DSN-05" color="#0891b2" />
      <RoomSign position={[10.0, 2.45, 1.6]} title="WEB RECON" code="WEB-06" color="#ea580c" />
      <RoomSign position={[-6.5, 2.45, 9.6]} title="WRITING SUITE" code="WRT-07" color="#db2777" />
      <RoomSign position={[6.5, 2.45, 9.6]} title="QA TESTING LAB" code="QAA-08" color="#10b981" />
    </group>
  );
};

// Modern Sims-style department door header sign
function RoomSign({
  position,
  title,
  code,
  color,
}: {
  position: [number, number, number];
  title: string;
  code: string;
  color: string;
}) {
  return (
    <group position={position}>
      {/* Plate plaque backing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.28, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Colored Left Accent Badge */}
      <mesh position={[-0.72, 0, 0.025]}>
        <boxGeometry args={[0.06, 0.24, 0.01]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        position={[-0.1, 0.04, 0.03]}
        fontSize={0.09}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#ffffff"
      >
        {title}
      </Text>
      <Text
        position={[-0.1, -0.06, 0.03]}
        fontSize={0.06}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        {code}
      </Text>
    </group>
  );
}
