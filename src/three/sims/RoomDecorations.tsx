import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Import our modular Sims-style office ornaments & furniture
import {
  FiddleLeafPlant,
  SnakePlant,
  LoungePalm,
  DeskSucculent,
  TrailingPothos,
} from './decorations/OfficePlants';
import {
  ExecutiveRug,
  TechRug,
  DataRug,
  NordicRug,
  CreativeRug,
  PersianRug,
  IndustrialRug,
  RoundLoungeRug,
  HallwayRunner,
} from './decorations/OfficeRugs';
import {
  WoodSlatWall,
  FramedArtwork,
  AnalogWallClock,
  KanbanBoard,
  CorkNoticeBoard,
  ExitSign,
  FireExtinguisher,
  WifiAccessPoint,
} from './decorations/OfficeWalls';
import {
  OfficeErgoChair,
  DeskSet,
  MultifunctionCopier,
  FilingCabinet,
  StandingCoatRack,
  OfficeWastebasket,
} from './decorations/OfficeProps';
import {
  KitchenCounterUnit,
  EspressoStation,
  OfficeFridge,
  MicrowaveOven,
  SnackVendingMachine,
  RecyclingStation,
  BistroSeating,
} from './decorations/OfficeBreakroom';
import {
  SidewalkBench,
  OutdoorPlanterTrough,
  EntranceWelcomeMat,
  ExteriorLightBollard,
} from './decorations/OfficeOutdoor';

/**
 * Complete Sims-style Living Office Environment:
 * Replaces boring flat templates with a fully decorated, authentic workplace:
 * - 8 customized private agent suites with distinct rugs, desks, lamps, accessories, and art
 * - Full breakroom cafeteria with kitchen counter, fridge, microwave, espresso machine, vending machine, and bistro seating
 * - Central hallway with commercial photocopier, water cooler, coat racks, and recycling station
 * - Architectural details: wood slat accent walls, analog wall clocks, Kanban boards, exit signs, and fire safety equipment
 * - Lush indoor greenery (Fiddle-leaf figs, snake plants, lounge palms, succulents, pothos)
 * - Outdoor perimeter landscaping (benches, concrete planters, bollards, entrance welcome mat)
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
      {/* =========================================================================
          0. OUTDOOR PERIMETER & ENTRANCE AMENITIES
          ========================================================================= */}
      {/* Entrance Welcome Mat at South Portal [0, 0, 9.8] */}
      <EntranceWelcomeMat position={[0, 0.055, 9.8]} />

      {/* Sidewalk Bench for outdoor breaks */}
      <SidewalkBench position={[-11.5, 0, -11.5]} rotation={[0, 0.2, 0]} />
      <SidewalkBench position={[11.5, 0, -11.5]} rotation={[0, -0.2, 0]} />

      {/* Concrete Planter Troughs with ornamental grasses flanking exterior */}
      <OutdoorPlanterTrough position={[-6.0, 0, -11.0]} length={3.2} />
      <OutdoorPlanterTrough position={[6.0, 0, -11.0]} length={3.2} />
      <OutdoorPlanterTrough position={[-16.0, 0, 3.5]} rotation={[0, Math.PI / 2, 0]} length={4.0} />
      <OutdoorPlanterTrough position={[16.0, 0, 3.5]} rotation={[0, -Math.PI / 2, 0]} length={4.0} />

      {/* Exterior Bollard Lights */}
      <ExteriorLightBollard position={[-13.5, 0, -11.0]} />
      <ExteriorLightBollard position={[13.5, 0, -11.0]} />
      <ExteriorLightBollard position={[-3.5, 0, 10.5]} />
      <ExteriorLightBollard position={[3.5, 0, 10.5]} />

      {/* =========================================================================
          1. CENTRAL HALLWAY & BREAKROOM CAFE (Z: -1.5 to 1.8)
          ========================================================================= */}
      {/* Hallway Runner Carpet spanning the corridor */}
      <HallwayRunner position={[-7.0, 0.055, 0.2]} length={12} width={1.2} />
      <HallwayRunner position={[7.0, 0.055, 0.2]} length={12} width={1.2} />

      {/* Breakroom Central Lounge Zone */}
      <group position={[0, 0, 0]}>
        {/* Round Plush Braided Lounge Rug */}
        <RoundLoungeRug position={[0, 0.056, 0.3]} radius={1.7} />

        {/* Modern 3-Seater Sofa / Couch */}
        <group position={[0, 0, 0.45]}>
          <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
            <boxGeometry args={[2.2, 0.24, 0.75]} />
            <meshStandardMaterial color="#1e40af" roughness={0.7} />
          </mesh>
          {/* Sofa Backrest */}
          <mesh castShadow position={[0, 0.6, 0.28]}>
            <boxGeometry args={[2.2, 0.44, 0.18]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.7} />
          </mesh>
          {/* Sofa Armrests */}
          <mesh position={[-1.05, 0.46, 0]}>
            <boxGeometry args={[0.16, 0.34, 0.75]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
          <mesh position={[1.05, 0.46, 0]}>
            <boxGeometry args={[0.16, 0.34, 0.75]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
          {/* Decorative Accent Throw Pillows */}
          <mesh position={[-0.7, 0.48, 0.18]} rotation={[0.2, 0.2, 0.1]}>
            <boxGeometry args={[0.26, 0.26, 0.1]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.7, 0.48, 0.18]} rotation={[0.2, -0.2, -0.1]}>
            <boxGeometry args={[0.26, 0.26, 0.1]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Low Wood & Glass Coffee Table */}
        <group position={[0, 0, -0.45]}>
          <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
            <boxGeometry args={[1.5, 0.04, 0.65]} />
            <meshStandardMaterial color="#d4a373" roughness={0.4} />
          </mesh>
          {/* Table Legs */}
          {[-0.65, 0.65].map((x) =>
            [-0.25, 0.25].map((z) => (
              <mesh key={`ctbl${x}${z}`} position={[x, 0.1, z]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
            ))
          )}
          {/* Magazines and Ceramic Succulent on Coffee Table */}
          <mesh position={[-0.3, 0.25, 0]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.24, 0.015, 0.3]} />
            <meshStandardMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0.25, 0.25, 0.05]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[0.22, 0.015, 0.28]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <DeskSucculent position={[0, 0.24, -0.1]} scale={0.8} />
        </group>

        {/* Lush Tropical Palm in Breakroom Corner */}
        <LoungePalm position={[-2.4, 0, 0.8]} scale={1.1} />

        {/* Bistro High-Top Table & Bar Stools */}
        <BistroSeating position={[2.5, 0, 0.3]} />
      </group>

      {/* Breakroom Kitchenette: Left Wing [X = -4.0 to -2.0, Z = -1.2] */}
      <group position={[-3.6, 0, -1.1]}>
        <KitchenCounterUnit position={[0, 0, 0]} />
        <MicrowaveOven position={[0.7, 0.92, -0.05]} />
        <EspressoStation position={[-0.7, 0, -0.02]} />
      </group>

      {/* Breakroom Appliances: Right Wing [X = 3.6, Z = -1.0] */}
      <group position={[4.0, 0, -1.0]}>
        {/* Stainless Steel Refrigerator */}
        <OfficeFridge position={[-0.8, 0, 0]} />
        {/* Snack & Cold Drink Vending Machine */}
        <SnackVendingMachine position={[0.4, 0, 0]} />
      </group>

      {/* Hallway Amenities: Water Cooler & Recycling Station */}
      <group position={[-5.8, 0, 0.6]}>
        {/* Water Cooler Dispenser */}
        <group position={[-0.8, 0, 0]}>
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[0.38, 0.9, 0.36]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.72, 0.12]}>
            <boxGeometry args={[0.24, 0.24, 0.14]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Blue Inverted Water Bottle Jug */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.42, 16]} />
            <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.1} />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          {/* Side Paper Cup Dispenser Tube */}
          <mesh position={[0.22, 0.7, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 10]} />
            <meshPhysicalMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        </group>
        {/* Tri-Color Recycling Station */}
        <RecyclingStation position={[0.5, 0, 0]} />
      </group>

      {/* Hallway Amenities: Multifunction Enterprise Copier Station & Coat Rack */}
      <group position={[6.2, 0, 0.6]}>
        <MultifunctionCopier position={[-0.4, 0, 0]} />
        <StandingCoatRack position={[1.2, 0, 0]} />
      </group>

      {/* Hallway Wall Decor: Analog Wall Clock & Safety Fixtures */}
      <AnalogWallClock position={[0, 2.2, -1.35]} radius={0.28} />
      <WifiAccessPoint position={[0, 2.35, 0.5]} />
      <ExitSign position={[-13.8, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <ExitSign position={[13.8, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <FireExtinguisher position={[-5.0, 1.2, -1.38]} />
      <FireExtinguisher position={[5.0, 1.2, -1.38]} />

      {/* =========================================================================
          2. ROOM 1: EXECUTIVE COMMANDER SUITE (Center-North [0, 0, -5.5])
          ========================================================================= */}
      <group position={[0, 0, -5.5]}>
        {/* Executive Area Rug */}
        <ExecutiveRug position={[0, 0.057, -0.6]} />

        {/* Architectural Oak Wood Slat Feature Wall behind Desk */}
        <WoodSlatWall position={[0, 1.25, -3.9]} width={4.2} height={2.2} slatColor="#92400e" />

        {/* Framed Executive Diploma & Modern Architectural Art */}
        <FramedArtwork
          position={[-3.2, 1.6, -3.85]}
          width={1.2}
          height={0.8}
          artColor="#1e3a8a"
          frameColor="#0f172a"
          title="EXCELLENCE IN ORCHESTRATION"
          subtitle="Annual Leadership Award"
        />
        <FramedArtwork
          position={[3.2, 1.6, -3.85]}
          width={1.2}
          height={0.8}
          artColor="#b45309"
          frameColor="#0f172a"
          title="STRATEGIC HORIZONS"
          subtitle="Company Vision 2026"
        />

        {/* Analog Wall Clock */}
        <AnalogWallClock position={[-4.4, 1.8, -1.0]} rotation={[0, Math.PI / 2, 0]} />

        {/* Large Executive Hardwood Desk */}
        <group position={[0, 0, -0.6]}>
          <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
            <boxGeometry args={[3.0, 0.07, 1.05]} />
            <meshStandardMaterial color="#78350f" roughness={0.4} metalness={0.15} />
          </mesh>
          {/* Front Executive Modesty Panel */}
          <mesh position={[0, 0.42, 0.48]}>
            <boxGeometry args={[2.85, 0.64, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          {/* Brushed Metal Legs */}
          <mesh position={[-1.42, 0.38, 0]}>
            <boxGeometry args={[0.08, 0.76, 0.95]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          <mesh position={[1.42, 0.38, 0]}>
            <boxGeometry args={[0.08, 0.76, 0.95]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>

          {/* Triple Curved Executive Monitors */}
          <group position={[0, 1.25, 0.28]}>
            <mesh castShadow>
              <boxGeometry args={[1.35, 0.62, 0.04]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.3, 0.57]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>

          {/* Desk accessories (Blotter, keyboard, mouse, pen holder, lamp) */}
          <DeskSet position={[0, 0.8, -0.1]} hasLamp lampColor="#d97706" />

          {/* Hologram Emitter on desk front */}
          <mesh ref={holoRef} position={[0, 1.75, 0.28]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* High-Back Executive Leather Chair */}
        <OfficeErgoChair position={[0, 0, -1.8]} color="#0f172a" />

        {/* Guest Armchairs & Glass Table for Meetings */}
        <group position={[2.6, 0, -0.6]}>
          <mesh castShadow position={[0, 0.4, 0]}>
            <boxGeometry args={[0.75, 0.38, 0.75]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.65, -0.3]}>
            <boxGeometry args={[0.75, 0.45, 0.14]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
        </group>

        {/* Corner Flora: Tall Fiddle-Leaf Fig & Snake Plant */}
        <FiddleLeafPlant position={[-3.4, 0, -3.0]} scale={1.15} />
        <SnakePlant position={[3.6, 0, 1.8]} scale={1.0} />

        {/* Executive Credenza Bookshelf along back wall */}
        <group position={[-2.8, 0, -3.2]}>
          <mesh castShadow position={[0, 0.9, 0]}>
            <boxGeometry args={[2.0, 1.8, 0.5]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          {[0.3, 0.8, 1.3].map((y, i) => (
            <mesh key={`execbk${i}`} position={[0, y, 0.05]}>
              <boxGeometry args={[1.8, 0.28, 0.35]} />
              <meshStandardMaterial color={i === 0 ? '#b91c1c' : i === 1 ? '#047857' : '#1d4ed8'} />
            </mesh>
          ))}
          <TrailingPothos position={[0.7, 1.82, 0]} scale={0.9} />
        </group>

        {/* Wastebasket */}
        <OfficeWastebasket position={[1.6, 0, -1.2]} />
      </group>

      {/* =========================================================================
          3. ROOM 2: CODING LAB - Nexus (Northwest [-10.0, 0, -5.5])
          ========================================================================= */}
      <group position={[-10.0, 0, -5.5]}>
        {/* Dark Tech Rug */}
        <TechRug position={[0, 0.057, -1.0]} />

        {/* Code Architecture Whiteboard on North Wall */}
        <KanbanBoard position={[0, 1.5, -3.85]} width={3.4} height={1.3} boardTitle="SPRINT ARCHITECTURE & CI/CD" />

        {/* Developer Desk */}
        <group position={[0, 0, -1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.6, 0.06, 0.95]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
          </mesh>

          {/* Dual Dev Monitors */}
          <group position={[-0.5, 1.18, 0.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.8, 0.5, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.75, 0.46]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
          <group position={[0.5, 1.18, 0.2]} rotation={[0, 0.25, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.8, 0.5, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.75, 0.46]} />
              <meshBasicMaterial color="#059669" />
            </mesh>
          </group>

          {/* Desk accessories & Ergonomic Lamp */}
          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#10b981" />

          {/* RGB Gaming PC Tower with glowing interior */}
          <group position={[1.05, 0.38, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.26, 0.52, 0.52]} />
              <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.05, 0.265]}>
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </group>

        {/* Ergonomic Mesh Developer Chair */}
        <OfficeErgoChair position={[0, 0, -2.0]} color="#064e3b" />

        {/* Enterprise Server Rack in Corner */}
        <group position={[-3.4, 0, -3.0]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.75, 2.0, 0.65]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {[0.3, 0.6, 0.9, 1.2, 1.5, 1.8].map((y, i) => (
            <mesh key={`nxled${i}`} position={[0, y, 0.33]}>
              <boxGeometry args={[0.6, 0.04, 0.01]} />
              <meshBasicMaterial ref={serverLedRef} color="#10b981" />
            </mesh>
          ))}
        </group>

        {/* Lateral Filing Cabinet & Flora */}
        <FilingCabinet position={[3.2, 0, -3.0]} color="#1e293b" />
        <TrailingPothos position={[3.2, 1.32, -3.0]} />
        <SnakePlant position={[-3.4, 0, 1.5]} scale={1.0} />

        {/* Framed Wall Art on West Wall */}
        <FramedArtwork
          position={[-4.3, 1.6, -1.0]}
          rotation={[0, Math.PI / 2, 0]}
          width={1.2}
          height={0.8}
          artColor="#064e3b"
          title="CLEAN CODE PRINCIPLES"
          subtitle="Modularity • Speed • Stability"
        />

        {/* Wastebasket */}
        <OfficeWastebasket position={[-1.2, 0, -1.2]} />
      </group>

      {/* =========================================================================
          4. ROOM 3: DATA ANALYTICS - Cortex (Northeast [10.0, 0, -5.5])
          ========================================================================= */}
      <group position={[10.0, 0, -5.5]}>
        {/* Data Analytics Geometric Rug */}
        <DataRug position={[0, 0.057, -1.0]} />

        {/* Giant Presentation Wall Screen with Dynamic Bar Charts */}
        <group position={[0, 1.6, -3.85]}>
          <mesh castShadow>
            <boxGeometry args={[3.8, 1.5, 0.05]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[3.7, 1.4]} />
            <meshBasicMaterial color="#381c6e" />
          </mesh>
          {/* Multi-tier Analytics Bar Graph */}
          {[-1.3, -0.75, -0.2, 0.35, 0.9, 1.45].map((bx, i) => {
            const h = 0.35 + ((i * 4 + 3) % 6) * 0.15;
            return (
              <mesh key={`cortexbar${i}`} position={[bx, -0.6 + h / 2, 0.06]}>
                <boxGeometry args={[0.36, h, 0.02]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#a855f7' : '#c084fc'} />
              </mesh>
            );
          })}
          <Text position={[0, 0.48, 0.06]} fontSize={0.11} color="#f8fafc" anchorX="center">
            REAL-TIME METRICS & AGENT TELEMETRY
          </Text>
        </group>

        {/* Analyst Workstation Desk */}
        <group position={[0, 0, -1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.5, 0.06, 0.9]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          {/* Dual Wide Monitors */}
          <group position={[0, 1.18, 0.2]}>
            <mesh castShadow>
              <boxGeometry args={[1.3, 0.52, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.25, 0.48]} />
              <meshBasicMaterial color="#7c3aed" />
            </mesh>
          </group>
          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#7c3aed" />
        </group>

        {/* Ergonomic Purple Chair */}
        <OfficeErgoChair position={[0, 0, -2.0]} color="#581c87" />

        {/* Fiddle Leaf Fig Tree & Filing Cabinets */}
        <FiddleLeafPlant position={[3.4, 0, -3.0]} scale={1.1} />
        <FilingCabinet position={[-3.4, 0, -3.0]} color="#334155" />
        <TrailingPothos position={[-3.4, 1.32, -3.0]} />

        {/* Framed Wall Art on East Wall */}
        <FramedArtwork
          position={[4.3, 1.6, -1.0]}
          rotation={[0, -Math.PI / 2, 0]}
          width={1.2}
          height={0.8}
          artColor="#581c87"
          title="STATISTICAL INFERENCE"
          subtitle="Model Accuracy 99.8%"
        />

        <OfficeWastebasket position={[1.4, 0, -1.2]} />
      </group>

      {/* =========================================================================
          5. ROOM 4: RESEARCH LAB - Scout (Mid-West [-10.0, 0, 5.0])
          ========================================================================= */}
      <group position={[-10.0, 0, 5.0]}>
        {/* Scandinavian Clean Sky-Blue Rug */}
        <NordicRug position={[0, 0.057, 1.0]} />

        {/* Research Cork Notice Board with pinned findings on South Wall */}
        <CorkNoticeBoard position={[0, 1.5, 3.35]} width={2.8} height={1.2} />

        {/* Research Desk with Holographic Microscope */}
        <group position={[0, 0, 1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.5, 0.06, 0.9]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          {/* Research Laptop */}
          <group position={[-0.45, 0.77, -0.1]}>
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.38, 0.02, 0.26]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.14, -0.12]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.38, 0.25, 0.02]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>
          {/* Holographic Microscope / Analyzer Scanner */}
          <group position={[0.5, 0.88, -0.1]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.09, 0.26, 12]} />
              <meshStandardMaterial color="#0284c7" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>

          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#0284c7" />
        </group>

        {/* Blue Ergonomic Chair */}
        <OfficeErgoChair position={[0, 0, 2.0]} color="#0369a1" />

        {/* Tall Double Bookshelves on West Wall */}
        <group position={[-3.4, 0, 0]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 2.0, 2.8]} />
            <meshStandardMaterial color="#e2d4c0" roughness={0.6} />
          </mesh>
          {[0.3, 0.8, 1.3, 1.7].map((y, i) => (
            <mesh key={`scoutbk${i}`} position={[0.05, y, 0]}>
              <boxGeometry args={[0.35, 0.3, 2.5]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#0369a1' : '#b45309'} />
            </mesh>
          ))}
          <TrailingPothos position={[0, 2.05, 0.8]} />
        </group>

        <FiddleLeafPlant position={[3.2, 0, 2.2]} scale={1.0} />
        <OfficeWastebasket position={[-1.2, 0, 1.4]} />
      </group>

      {/* =========================================================================
          6. ROOM 5: CREATIVE DESIGN STUDIO - Pixel (Center [0, 0, 5.25])
          ========================================================================= */}
      <group position={[0, 0, 5.25]}>
        {/* Creative Colorblock Abstract Rug */}
        <CreativeRug position={[0, 0.057, 0.8]} />

        {/* Color Palette Moodboard & Inspiration Wall on West Partition */}
        <group position={[-4.35, 1.5, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[2.8, 1.3, 0.04]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.8} />
          </mesh>
          {/* Swatch chips */}
          {[-0.8, -0.3, 0.2, 0.7].map((x, i) => (
            <mesh key={`pixsw${i}`} position={[0.03, 0, x]}>
              <boxGeometry args={[0.01, 0.35, 0.35]} />
              <meshBasicMaterial
                color={i === 0 ? '#ec4899' : i === 1 ? '#8b5cf6' : i === 2 ? '#06b6d4' : '#10b981'}
              />
            </mesh>
          ))}
        </group>

        {/* Framed Bauhaus / Modern Design Poster on East Partition */}
        <FramedArtwork
          position={[4.35, 1.6, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          width={1.4}
          height={0.9}
          artColor="#0891b2"
          title="FORM FOLLOWS FUNCTION"
          subtitle="Design System 2026"
        />

        {/* Creative Drafting / Drawing Table */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.6, 0.06, 0.95]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Studio Display iMac with artwork screen */}
          <group position={[0, 1.22, -0.25]}>
            <mesh castShadow>
              <boxGeometry args={[1.3, 0.7, 0.03]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[1.25, 0.65]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
          </group>
          {/* Digital Drawing Stylus Tablet */}
          <mesh position={[0.45, 0.78, 0.1]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.45, 0.02, 0.32]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#06b6d4" />
        </group>

        {/* Cyan Studio Swivel Chair */}
        <OfficeErgoChair position={[0, 0, 1.8]} color="#0891b2" />

        {/* Plants & Storage */}
        <FiddleLeafPlant position={[3.2, 0, 2.0]} scale={1.05} />
        <OfficeWastebasket position={[-1.2, 0, 1.2]} />
      </group>

      {/* =========================================================================
          7. ROOM 6: WEB RECON HUB - Crawler (Mid-East [10.0, 0, 5.0])
          ========================================================================= */}
      <group position={[10.0, 0, 5.0]}>
        {/* Amber Tech Rug */}
        <TechRug position={[0, 0.057, 1.0]} />

        {/* Global Web Map Wall Mural Screen on South Wall */}
        <group position={[0, 1.5, 3.35]}>
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

        {/* Recon Desk */}
        <group position={[0, 0, 1.0]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.4, 0.06, 0.9]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.4} />
          </mesh>
          <group position={[0, 1.18, -0.2]}>
            <mesh castShadow>
              <boxGeometry args={[1.2, 0.52, 0.03]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[1.15, 0.48]} />
              <meshBasicMaterial color="#ea580c" />
            </mesh>
          </group>
          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#ea580c" />
        </group>

        {/* Amber Chair */}
        <OfficeErgoChair position={[0, 0, 2.0]} color="#9a3412" />

        <SnakePlant position={[3.2, 0, -0.8]} scale={1.0} />
        <FilingCabinet position={[-3.2, 0, -0.8]} color="#475569" />
        <OfficeWastebasket position={[1.2, 0, 1.4]} />
      </group>

      {/* =========================================================================
          8. ROOM 7: WRITING & DOCS SUITE - Quill (Southwest [-7.5, 0, 13.0])
          ========================================================================= */}
      <group position={[-7.5, 0, 13.0]}>
        {/* Persian Patterned Rug */}
        <PersianRug position={[0, 0.057, 0.8]} />

        {/* Vintage Mahogany Writer's Desk */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.6, 0.06, 0.95]} />
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
            <boxGeometry args={[0.42, 0.04, 0.34]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <DeskSet position={[0, 0.77, 0]} hasLamp={false} />
        </group>

        {/* Rose Velvet Writer's Armchair */}
        <OfficeErgoChair position={[0, 0, 1.8]} color="#be185d" />

        {/* Floor-to-Ceiling Library Bookshelf on South Wall */}
        <group position={[0, 1.2, 3.35]}>
          <mesh castShadow>
            <boxGeometry args={[3.8, 2.2, 0.45]} />
            <meshStandardMaterial color="#500724" roughness={0.6} />
          </mesh>
          {[0.3, 0.8, 1.3, 1.8].map((y, i) => (
            <mesh key={`writerbk${i}`} position={[0, -1.0 + y, 0.05]}>
              <boxGeometry args={[3.6, 0.32, 0.35]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#fbcfe8' : '#fda4af'} />
            </mesh>
          ))}
          <TrailingPothos position={[-1.2, 1.15, 0]} scale={0.9} />
        </group>

        {/* Framed Literary Quote Poster on West Wall */}
        <FramedArtwork
          position={[-5.35, 1.6, 0.8]}
          rotation={[0, Math.PI / 2, 0]}
          width={1.2}
          height={0.8}
          artColor="#831843"
          title="THE WRITTEN WORD"
          subtitle="Documentation is Knowledge"
        />

        <FiddleLeafPlant position={[3.6, 0, 2.4]} scale={1.05} />
        <OfficeWastebasket position={[-1.4, 0, 1.2]} />
      </group>

      {/* =========================================================================
          9. ROOM 8: QA TESTING LAB - Sentinel (Southeast [7.5, 0, 13.0])
          ========================================================================= */}
      <group position={[7.5, 0, 13.0]}>
        {/* Industrial Charcoal & Mint Rug */}
        <IndustrialRug position={[0, 0.057, 0.8]} />

        {/* Bug Tracker Kanban Board on South Wall */}
        <KanbanBoard
          position={[0, 1.5, 3.35]}
          width={3.4}
          height={1.3}
          boardTitle="AUTOMATION & REGRESSION TEST MATRIX"
        />

        {/* Hardware Multi-Device Test Bench */}
        <group position={[0, 0, 0.8]}>
          <mesh castShadow position={[0, 0.74, 0]}>
            <boxGeometry args={[2.6, 0.06, 0.95]} />
            <meshStandardMaterial color="#064e3b" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Mobile Phones & Tablets on Angled Stands */}
          {[-0.7, -0.25, 0.25, 0.7].map((tx, i) => (
            <group key={`qadev${i}`} position={[tx, 0.86, -0.1]} rotation={[0.35, 0, 0]}>
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
          <DeskSet position={[0, 0.77, 0]} hasLamp lampColor="#10b981" />
        </group>

        {/* Emerald Work Chair */}
        <OfficeErgoChair position={[0, 0, 1.8]} color="#065f46" />

        {/* Heavy Metal Equipment Locker on East Wall */}
        <group position={[5.35, 0, 0.8]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.6, 2.0, 1.4]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Safety & Flora */}
        <FireExtinguisher position={[-3.6, 1.2, -0.8]} />
        <SnakePlant position={[3.6, 0, 2.4]} scale={1.05} />
        <OfficeWastebasket position={[1.4, 0, 1.2]} />
      </group>
    </group>
  );
};
