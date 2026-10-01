import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Detailed Sims-style furniture and equipment for all 8 private agent rooms
 * plus the central Breakroom / Lounge.
 */
export const RoomDecorations: React.FC = () => {
  const holoRef = useRef<THREE.Mesh>(null);
  const serverLedRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (holoRef.current) {
      holoRef.current.rotation.y = t * 0.9;
    }
    if (serverLedRef.current) {
      serverLedRef.current.opacity = 0.6 + Math.sin(t * 8) * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 1. CENTRAL BREAKROOM & CAFE (HALLWAY CENTER [0, 0, 0]) ================= */}
      <group position={[0, 0, 0]}>
        {/* Modern 3-Seater Sofa / Couch */}
        <group position={[0, 0, 0.4]}>
          <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
            <boxGeometry args={[2.0, 0.24, 0.7]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.7} />
          </mesh>
          {/* Sofa Backrest */}
          <mesh castShadow position={[0, 0.58, 0.26]}>
            <boxGeometry args={[2.0, 0.42, 0.18]} />
            <meshStandardMaterial color="#2563eb" roughness={0.7} />
          </mesh>
          {/* Sofa Armrests */}
          <mesh position={[-0.95, 0.44, 0]}>
            <boxGeometry args={[0.16, 0.32, 0.7]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.7} />
          </mesh>
          <mesh position={[0.95, 0.44, 0]}>
            <boxGeometry args={[0.16, 0.32, 0.7]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.7} />
          </mesh>
        </group>

        {/* Low Coffee Table in front of Sofa */}
        <group position={[0, 0, -0.45]}>
          <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
            <boxGeometry args={[1.4, 0.04, 0.55]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Table Legs */}
          {[-0.6, 0.6].map((x) =>
            [-0.2, 0.2].map((z) => (
              <mesh key={`tbl${x}${z}`} position={[x, 0.1, z]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
            ))
          )}
          {/* Magazines on table */}
          <mesh position={[-0.25, 0.245, 0]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.22, 0.01, 0.28]} />
            <meshStandardMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0.2, 0.245, 0.05]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.25]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* The Iconic Sims Water Cooler Dispenser! */}
        <group position={[-3.2, 0, 0.3]}>
          {/* White Dispenser Base */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[0.38, 0.9, 0.36]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Dispenser Niche */}
          <mesh position={[0, 0.72, 0.12]}>
            <boxGeometry args={[0.24, 0.24, 0.14]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Blue Inverted Water Bottle Jug on Top */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.42, 16]} />
            <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.1} />
          </mesh>
          {/* Bottle Cap */}
          <mesh position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        </group>

        {/* Espresso Coffee Bar Counter */}
        <group position={[3.2, 0, 0.3]}>
          <mesh castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[0.9, 0.88, 0.48]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          {/* Wood Countertop */}
          <mesh position={[0, 0.96, 0]}>
            <boxGeometry args={[0.96, 0.04, 0.52]} />
            <meshStandardMaterial color="#b45309" roughness={0.5} />
          </mesh>
          {/* Espresso Machine */}
          <mesh castShadow position={[0, 1.15, 0]}>
            <boxGeometry args={[0.34, 0.32, 0.28]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Coffee Cups */}
          <mesh position={[-0.26, 1.01, 0]}>
            <cylinderGeometry args={[0.035, 0.03, 0.07, 10]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* ================= 2. ROOM 1: COMMANDER EXECUTIVE HQ [0, 0, -5.5] ================= */}
      <group position={[0, 0, -5.5]}>
        {/* Executive Desk */}
        <group position={[0, 0, -0.6]}>
          <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
            <boxGeometry args={[2.8, 0.06, 0.95]} />
            <meshStandardMaterial color="#b45309" roughness={0.45} metalness={0.15} />
          </mesh>
          {/* Front Modesty Panel */}
          <mesh position={[0, 0.42, 0.44]}>
            <boxGeometry args={[2.65, 0.64, 0.04]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Legs */}
          <mesh position={[-1.32, 0.38, 0]}>
            <boxGeometry args={[0.08, 0.76, 0.88]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          <mesh position={[1.32, 0.38, 0]}>
            <boxGeometry args={[0.08, 0.76, 0.88]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          {/* Triple Curved Screens */}
          <group position={[0, 1.25, 0.26]}>
            <mesh castShadow>
              <boxGeometry args={[1.25, 0.6, 0.04]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.2, 0.55]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>
          {/* Hologram Emitter */}
          <mesh ref={holoRef} position={[0, 1.75, 0.26]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Executive Leather High-Back Chair */}
        <group position={[0, 0, -1.8]}>
          <mesh castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[0.58, 0.1, 0.54]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
          <mesh castShadow position={[0, 0.95, -0.22]}>
            <boxGeometry args={[0.54, 0.8, 0.08]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.44, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>

        {/* Credenza & Bookshelf along back wall */}
        <group position={[-2.8, 0, -3.2]}>
          <mesh castShadow position={[0, 0.9, 0]}>
            <boxGeometry args={[2.0, 1.8, 0.5]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          {/* Shelves with books */}
          {[0.3, 0.8, 1.3].map((y, i) => (
            <mesh key={`bks${i}`} position={[0, y, 0.05]}>
              <boxGeometry args={[1.8, 0.28, 0.35]} />
              <meshStandardMaterial color={i === 0 ? '#b91c1c' : i === 1 ? '#047857' : '#1d4ed8'} />
            </mesh>
          ))}
        </group>

        {/* Guest Armchairs & Glass Table */}
        <group position={[2.6, 0, -0.5]}>
          <mesh castShadow position={[0, 0.4, 0]}>
            <boxGeometry args={[0.7, 0.36, 0.7]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* ================= 3. ROOM 2: CODING LAB (Nexus) [-10, 0, -5.5] ================= */}
      <group position={[-10.0, 0, -5.5]}>
        {/* Developer Desk */}
        <group position={[0, 0, -1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.4, 0.05, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Dual Dev Monitors */}
          <group position={[-0.45, 1.16, 0.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.75, 0.48, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.7, 0.44]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
          <group position={[0.45, 1.16, 0.2]} rotation={[0, 0.25, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.75, 0.48, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.7, 0.44]} />
              <meshBasicMaterial color="#059669" />
            </mesh>
          </group>
          {/* RGB Gaming PC Tower with glowing fans */}
          <group position={[1.0, 0.38, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.26, 0.52, 0.52]} />
              <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Front RGB Fan Light */}
            <mesh position={[0, 0.05, 0.265]}>
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
          {/* Energy Drink Can */}
          <mesh position={[-0.95, 0.81, -0.1]}>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 10]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.8} />
          </mesh>
        </group>

        {/* Ergonomic Gaming Chair */}
        <group position={[0, 0, -2.0]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#047857" />
          </mesh>
          <mesh castShadow position={[0, 0.9, -0.22]}>
            <boxGeometry args={[0.46, 0.75, 0.06]} />
            <meshStandardMaterial color="#047857" />
          </mesh>
        </group>

        {/* Server Rack in Corner */}
        <group position={[-3.2, 0, -3.0]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.7, 2.0, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
          {/* Blinking LEDs */}
          {[0.4, 0.8, 1.2, 1.6].map((y, i) => (
            <mesh key={`led${i}`} position={[0, y, 0.31]}>
              <boxGeometry args={[0.55, 0.04, 0.01]} />
              <meshBasicMaterial ref={serverLedRef} color="#10b981" />
            </mesh>
          ))}
        </group>

        {/* Code Whiteboard on back wall */}
        <group position={[0, 1.5, -3.9]}>
          <mesh>
            <boxGeometry args={[3.2, 1.2, 0.04]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.6, 0.04]}>
            <boxGeometry args={[3.3, 0.04, 0.08]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <Text position={[0, 0.2, 0.03]} fontSize={0.12} color="#0f172a" anchorX="center">
            {"// ARCHITECTURE & CI/CD"}
          </Text>
          <Text position={[0, -0.1, 0.03]} fontSize={0.09} color="#059669" anchorX="center">
            {"git commit -m 'feat: 3D multi-agent orchestrator'"}
          </Text>
        </group>
      </group>

      {/* ================= 4. ROOM 3: DATA ANALYTICS (Cortex) [10, 0, -5.5] ================= */}
      <group position={[10.0, 0, -5.5]}>
        {/* Giant Presentation Wall Screen with Bar Charts */}
        <group position={[0, 1.6, -3.9]}>
          <mesh castShadow>
            <boxGeometry args={[3.6, 1.5, 0.05]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[3.5, 1.4]} />
            <meshBasicMaterial color="#381c6e" />
          </mesh>
          {/* Simulated 3D Bar Graph on wall */}
          {[-1.2, -0.6, 0.0, 0.6, 1.2].map((bx, i) => {
            const h = 0.3 + ((i * 3 + 2) % 5) * 0.16;
            return (
              <mesh key={`bar${i}`} position={[bx, -0.6 + h / 2, 0.06]}>
                <boxGeometry args={[0.32, h, 0.02]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#a855f7' : '#c084fc'} />
              </mesh>
            );
          })}
          <Text position={[0, 0.45, 0.06]} fontSize={0.11} color="#f8fafc" anchorX="center">
            REAL-TIME SYSTEM METRICS & FLEET TELEMETRY
          </Text>
        </group>

        {/* Analyst Desk & Chair */}
        <group position={[0, 0, -1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.2, 0.05, 0.85]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.15, 0.2]}>
            <boxGeometry args={[1.2, 0.5, 0.03]} />
            <meshBasicMaterial color="#7c3aed" />
          </mesh>
        </group>
        <group position={[0, 0, -2.0]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#6b21a8" />
          </mesh>
        </group>
      </group>

      {/* ================= 5. ROOM 4: RESEARCH LAB (Scout) [-10, 0, 5.0] ================= */}
      <group position={[-10.0, 0, 5.0]}>
        {/* Research Desk with Microscope & Laptop */}
        <group position={[0, 0, 1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.4, 0.05, 0.85]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Research Laptop */}
          <mesh position={[-0.4, 0.82, -0.1]}>
            <boxGeometry args={[0.35, 0.02, 0.25]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
          <mesh position={[-0.4, 0.95, -0.22]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.35, 0.24, 0.02]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          {/* Holographic Lab Microscope / Scanner */}
          <group position={[0.5, 0.88, -0.1]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.08, 0.25, 12]} />
              <meshStandardMaterial color="#0284c7" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>

        {/* Chair */}
        <group position={[0, 0, 2.0]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        </group>

        {/* Tall Double Bookshelves along left wall */}
        <group position={[-3.2, 0, 0]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 2.0, 2.8]} />
            <meshStandardMaterial color="#e2d4c0" roughness={0.6} />
          </mesh>
          {[0.3, 0.8, 1.3, 1.7].map((y, i) => (
            <mesh key={`bk${i}`} position={[0.05, y, 0]}>
              <boxGeometry args={[0.35, 0.3, 2.5]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#0369a1' : '#b45309'} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= 6. ROOM 5: WEB RECON HUB (Crawler) [10, 0, 5.0] ================= */}
      <group position={[10.0, 0, 5.0]}>
        {/* Global Web Map Wall Mural Screen */}
        <group position={[0, 1.5, 8.4]}>
          <mesh>
            <boxGeometry args={[3.4, 1.4, 0.04]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[3.3, 1.3]} />
            <meshBasicMaterial color="#c2410c" />
          </mesh>
          <Text position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]} fontSize={0.12} color="#ffffff" anchorX="center">
            GLOBAL WEB CRAWLER & SEARCH INDEX
          </Text>
        </group>

        {/* Recon Desk & Dual Terminals */}
        <group position={[0, 0, 1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.2, 0.05, 0.85]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.15, -0.2]}>
            <boxGeometry args={[1.1, 0.5, 0.03]} />
            <meshBasicMaterial color="#ea580c" />
          </mesh>
        </group>
        <group position={[0, 0, 2.0]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
        </group>
      </group>

      {/* ================= 7. ROOM 6: DESIGN & CREATIVE STUDIO (Pixel) [0, 0, 5.5] ================= */}
      <group position={[0, 0, 5.25]}>
        {/* Creative White Drafting Table */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.4, 0.05, 0.9]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Big iMac / Studio Display */}
          <group position={[0, 1.2, -0.25]}>
            <mesh castShadow>
              <boxGeometry args={[1.2, 0.65, 0.03]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[1.15, 0.6]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
          </group>
          {/* Digital Drawing Stylus Tablet */}
          <mesh position={[0.45, 0.78, 0.1]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.3]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Modern Studio Swivel Chair */}
        <group position={[0, 0, 1.8]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#0891b2" />
          </mesh>
        </group>

        {/* Color Palette Moodboard Pinboard on Wall */}
        <group position={[2.8, 1.5, 0]}>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[2.0, 1.2, 0.04]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.8} />
          </mesh>
          {/* Color swatch pins */}
          {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
            <mesh key={`sw${i}`} position={[2.77, 1.5, x]}>
              <boxGeometry args={[0.01, 0.25, 0.25]} />
              <meshBasicMaterial
                color={i === 0 ? '#ec4899' : i === 1 ? '#8b5cf6' : i === 2 ? '#06b6d4' : '#10b981'}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= 8. ROOM 7: WRITING & DOCS SUITE (Quill) [-7.5, 0, 13.0] ================= */}
      <group position={[-7.5, 0, 13.0]}>
        {/* Vintage Mahogany Writer's Desk */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.4, 0.06, 0.9]} />
            <meshStandardMaterial color="#831843" roughness={0.5} />
          </mesh>
          {/* Classic Banker's Brass Lamp */}
          <group position={[-0.8, 0.88, -0.15]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.08, 0.04, 12]} />
              <meshStandardMaterial color="#eab308" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.26, 8]} />
              <meshStandardMaterial color="#eab308" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.16, 12]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
          {/* Vintage Typewriter / Laptop on Leather Pad */}
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.38, 0.04, 0.32]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        </group>

        {/* Velvet Writer's Armchair */}
        <group position={[0, 0, 1.8]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.54, 0.1, 0.54]} />
            <meshStandardMaterial color="#be185d" />
          </mesh>
        </group>

        {/* Floor-to-Ceiling Library Shelf on Back Wall */}
        <group position={[0, 1.2, 3.4]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 2.2, 0.45]} />
            <meshStandardMaterial color="#500724" roughness={0.6} />
          </mesh>
          {[0.3, 0.8, 1.3, 1.8].map((y, i) => (
            <mesh key={`qbk${i}`} position={[0, -1.0 + y, 0.05]}>
              <boxGeometry args={[3.0, 0.32, 0.35]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#fbcfe8' : '#fda4af'} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= 9. ROOM 8: QA TESTING BAY (Sentinel) [7.5, 0, 13.0] ================= */}
      <group position={[7.5, 0, 13.0]}>
        {/* Hardware Test Bench with Multiple Devices */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.5, 0.06, 0.95]} />
            <meshStandardMaterial color="#064e3b" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Mobile phone / tablet stands on test bench */}
          {[-0.6, -0.2, 0.2, 0.6].map((tx, i) => (
            <group key={`dev${i}`} position={[tx, 0.86, -0.1]} rotation={[0.35, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.16, 0.24, 0.015]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>
              <mesh position={[0, 0, 0.009]}>
                <planeGeometry args={[0.14, 0.22]} />
                <meshBasicMaterial color={i === 2 ? '#ef4444' : '#10b981'} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Sturdy QA Work Chair */}
        <group position={[0, 0, 1.8]}>
          <mesh castShadow position={[0, 0.48, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
        </group>

        {/* Metal Locker & Tool Station */}
        <group position={[3.2, 0, 0]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.6, 2.0, 1.2]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Bug Tracker Kanban Board on Back Wall */}
        <group position={[0, 1.5, 3.4]}>
          <mesh>
            <boxGeometry args={[3.2, 1.3, 0.04]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <Text position={[0, 0.45, 0.03]} fontSize={0.11} color="#0f172a" anchorX="center">
            QA AUTOMATION & TEST SUITE MATRIX
          </Text>
          {/* Sticky Notes */}
          {[-1.0, -0.4, 0.2, 0.8].map((sx, i) => (
            <mesh key={`postit${i}`} position={[sx, 0.0, 0.025]}>
              <boxGeometry args={[0.22, 0.22, 0.005]} />
              <meshBasicMaterial color={i === 0 ? '#fef08a' : i === 1 ? '#86efac' : '#fca5a5'} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
