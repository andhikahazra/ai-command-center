import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Agent } from '../../types/agent';

interface CharacterMeshProps {
  agent: Agent;
  isSelected: boolean;
  isMoving: boolean;
}

/**
 * Stylized The Sims Character Mesh:
 * - Humanoid low-poly office character (Chibi / Sims aesthetic)
 * - Grounded posture with legs, shoes, torso, arms, and stylized head with hair
 * - Walking leg swing & arm swing animation
 * - Office attire tailored by role (Executive suit for Commander, casual smart for team)
 * - Iconic Sims Plumbob (spinning emerald diamond) floating above selected / active characters
 * - Zero sci-fi thrusters, zero cybernetic armor, zero AI slop
 */
export const CharacterMesh: React.FC<CharacterMeshProps> = ({
  agent,
  isSelected,
  isMoving,
}) => {
  const characterGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const plumbobRef = useRef<THREE.Mesh>(null);

  const isBoss = agent.isBoss;
  const scale = isBoss ? 1.25 : 1.0;

  // Aesthetic color palettes for Sims office attire
  const outfit = useMemo(() => {
    // Unique seed for slight variations
    const seed = parseInt(agent.id.replace(/[^0-9]/g, ''), 10) || 1;
    const skinTones = ['#fed7aa', '#fde047', '#fcd5b5', '#e2b391', '#fbcfe8'];
    const skinColor = isBoss ? '#fed7aa' : skinTones[seed % skinTones.length];

    // Hair colors
    const hairColors = ['#1c1917', '#451a03', '#78350f', '#292524', '#b45309'];
    const hairColor = isBoss ? '#1c1917' : hairColors[seed % hairColors.length];

    // Role-based outfit colors
    let topColor = '#3b82f6';
    let bottomColor = '#334155';
    let shoeColor = '#0f172a';
    let tieColor = '#e11d48';

    if (isBoss) {
      topColor = '#1e293b'; // Charcoal navy suit blazer
      bottomColor = '#0f172a'; // Matching tailored trousers
      tieColor = '#d97706'; // Golden yellow executive tie
      shoeColor = '#09090b'; // Shiny black oxford shoes
    } else {
      switch (agent.role) {
        case 'coder':
          topColor = '#2563eb'; // Royal blue hoodie
          bottomColor = '#1e3a8a'; // Dark denim jeans
          shoeColor = '#f8fafc'; // White sneakers
          break;
        case 'researcher':
          topColor = '#0284c7'; // Sky blue button-down shirt
          bottomColor = '#e2e8f0'; // Beige chinos
          shoeColor = '#78350f'; // Brown loafers
          break;
        case 'browser':
          topColor = '#ea580c'; // Warm amber/orange polo
          bottomColor = '#475569'; // Grey trousers
          shoeColor = '#18181b';
          break;
        case 'data-analyst':
          topColor = '#7c3aed'; // Purple knit sweater
          bottomColor = '#334155'; // Dark slacks
          shoeColor = '#0f172a';
          break;
        case 'designer':
          topColor = '#0891b2'; // Teal creative top
          bottomColor = '#18181b'; // Black slim pants
          shoeColor = '#ffffff'; // White design sneakers
          break;
        case 'writer':
          topColor = '#e11d48'; // Rose cardigan
          bottomColor = '#1e293b'; // Dark navy slacks
          shoeColor = '#451a03'; // Loafers
          break;
        case 'qa':
          topColor = '#059669'; // Emerald smart polo
          bottomColor = '#334155'; // Charcoal slacks
          shoeColor = '#0f172a';
          break;
        default:
          topColor = agent.color || '#3b82f6';
          bottomColor = '#334155';
          shoeColor = '#0f172a';
      }
    }

    return {
      skin: new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 }),
      hair: new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.7 }),
      top: new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.55 }),
      bottom: new THREE.MeshStandardMaterial({ color: bottomColor, roughness: 0.6 }),
      shoes: new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.4 }),
      collar: new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 }),
      tie: new THREE.MeshStandardMaterial({ color: tieColor, roughness: 0.5 }),
      eyes: new THREE.MeshBasicMaterial({ color: '#18181b' }),
      plumbobActive: new THREE.MeshStandardMaterial({
        color: '#10b981',
        emissive: '#059669',
        emissiveIntensity: 0.65,
        roughness: 0.2,
      }),
      plumbobWork: new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        emissive: '#0284c7',
        emissiveIntensity: 0.65,
        roughness: 0.2,
      }),
      glasses: new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.3, metalness: 0.4 }),
    };
  }, [agent.color, agent.id, agent.role, isBoss]);

  // Frame animations: walking swing, typing at desk, breathing, plumbob spin
  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const idSeed = parseInt(agent.id.replace(/[^0-9]/g, ''), 10) || 1;

    // 1. Plumbob rotation and float
    if (plumbobRef.current) {
      plumbobRef.current.rotation.y = time * 2.2;
      plumbobRef.current.position.y = 1.72 + Math.sin(time * 3 + idSeed) * 0.04;
    }

    // 2. Walking animation
    if (isMoving) {
      const walkFreq = 10;
      const legSwing = Math.sin(time * walkFreq) * 0.45;
      const armSwing = Math.sin(time * walkFreq) * 0.38;

      if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing;

      // Slight head bounce while walking
      if (headGroup.current) {
        headGroup.current.rotation.x = 0.05 + Math.sin(time * walkFreq * 2) * 0.02;
        headGroup.current.rotation.y = 0;
      }
    } else {
      // 3. Stationary / Idle / Working states
      // Reset legs straight down
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.2);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.2);

      if (agent.status === 'working') {
        // Natural typing / desk focus pose
        const typeFidget = Math.sin(time * 14) * 0.04;
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.75 + typeFidget, 0.15);
          leftArmRef.current.rotation.z = 0.15;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.75 - typeFidget, 0.15);
          rightArmRef.current.rotation.z = -0.15;
        }
        if (headGroup.current) {
          // Looking down at desk / keyboard
          headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, 0.18, 0.1);
          headGroup.current.rotation.y = Math.sin(time * 1.5) * 0.08;
        }
      } else {
        // Casual idle breathing
        const breath = Math.sin(time * 1.8 + idSeed) * 0.02;
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
          leftArmRef.current.rotation.z = 0.08 + breath;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
          rightArmRef.current.rotation.z = -0.08 - breath;
        }
        if (headGroup.current) {
          headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, 0, 0.1);
          headGroup.current.rotation.y = Math.sin(time * 0.8 + idSeed) * 0.12;
        }
      }
    }
  });

  return (
    <group ref={characterGroup} scale={[scale, scale, scale]}>
      {/* ================= 1. THE SIMS PLUMBOB (Emerald Diamond) ================= */}
      {(isSelected || agent.status === 'working') && (
        <group position={[0, 0, 0]}>
          <mesh
            ref={plumbobRef}
            position={[0, 1.72, 0]}
            scale={[0.75, 1.7, 0.75]}
            material={agent.status === 'working' ? outfit.plumbobWork : outfit.plumbobActive}
          >
            <octahedronGeometry args={[0.09, 0]} />
          </mesh>
        </group>
      )}

      {/* ================= 2. LEGS & SHOES (Ground level Y = 0 to 0.45) ================= */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.1, 0.42, 0]}>
        {/* Trousers */}
        <mesh castShadow position={[0, -0.19, 0]} material={outfit.bottom}>
          <cylinderGeometry args={[0.05, 0.045, 0.38, 12]} />
        </mesh>
        {/* Shoe */}
        <mesh castShadow position={[0, -0.38, 0.03]} material={outfit.shoes}>
          <boxGeometry args={[0.09, 0.065, 0.16]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.1, 0.42, 0]}>
        {/* Trousers */}
        <mesh castShadow position={[0, -0.19, 0]} material={outfit.bottom}>
          <cylinderGeometry args={[0.05, 0.045, 0.38, 12]} />
        </mesh>
        {/* Shoe */}
        <mesh castShadow position={[0, -0.38, 0.03]} material={outfit.shoes}>
          <boxGeometry args={[0.09, 0.065, 0.16]} />
        </mesh>
      </group>

      {/* ================= 3. TORSO & ATTIRE (Y = 0.42 to 0.90) ================= */}
      <group position={[0, 0.65, 0]}>
        {/* Upper Body Shirt / Jacket */}
        <mesh castShadow material={outfit.top}>
          <boxGeometry args={[0.34, 0.44, 0.22]} />
        </mesh>

        {/* White Shirt Collar Insert */}
        <mesh position={[0, 0.17, 0.105]} material={outfit.collar}>
          <boxGeometry args={[0.13, 0.09, 0.02]} />
        </mesh>

        {/* Necktie for Boss / Formal Roles */}
        {isBoss && (
          <group position={[0, 0.08, 0.118]}>
            {/* Tie Knot */}
            <mesh material={outfit.tie}>
              <boxGeometry args={[0.045, 0.045, 0.015]} />
            </mesh>
            {/* Tie Body */}
            <mesh position={[0, -0.1, 0]} material={outfit.tie}>
              <boxGeometry args={[0.035, 0.18, 0.01]} />
            </mesh>
          </group>
        )}

        {/* ID Badge Lanyard for QA and Researchers */}
        {(agent.role === 'qa' || agent.role === 'researcher') && (
          <mesh position={[0.08, -0.02, 0.115]} material={outfit.collar}>
            <boxGeometry args={[0.06, 0.08, 0.005]} />
          </mesh>
        )}

        {/* Neck */}
        <mesh position={[0, 0.24, 0]} material={outfit.skin}>
          <cylinderGeometry args={[0.055, 0.06, 0.08, 12]} />
        </mesh>
      </group>

      {/* ================= 4. ARMS & HANDS ================= */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.22, 0.82, 0]}>
        {/* Sleeve */}
        <mesh castShadow position={[0, -0.16, 0]} material={outfit.top}>
          <cylinderGeometry args={[0.045, 0.04, 0.32, 12]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.34, 0.01]} material={outfit.skin}>
          <sphereGeometry args={[0.04, 10, 10]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.22, 0.82, 0]}>
        {/* Sleeve */}
        <mesh castShadow position={[0, -0.16, 0]} material={outfit.top}>
          <cylinderGeometry args={[0.045, 0.04, 0.32, 12]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.34, 0.01]} material={outfit.skin}>
          <sphereGeometry args={[0.04, 10, 10]} />
        </mesh>
      </group>

      {/* ================= 5. HEAD & HAIRSTYLE (Y = 1.08) ================= */}
      <group ref={headGroup} position={[0, 1.08, 0]}>
        {/* Head Sphere */}
        <mesh castShadow material={outfit.skin}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>

        {/* Eyes (Cute minimal dots) */}
        <mesh position={[-0.06, 0.02, 0.185]} material={outfit.eyes}>
          <circleGeometry args={[0.022, 12]} />
        </mesh>
        <mesh position={[0.06, 0.02, 0.185]} material={outfit.eyes}>
          <circleGeometry args={[0.022, 12]} />
        </mesh>

        {/* Spectacles for Researcher & Data Analyst */}
        {(agent.role === 'researcher' || agent.role === 'data-analyst') && (
          <group position={[0, 0.02, 0.19]}>
            <mesh position={[-0.06, 0, 0]} material={outfit.glasses}>
              <ringGeometry args={[0.03, 0.042, 16]} />
            </mesh>
            <mesh position={[0.06, 0, 0]} material={outfit.glasses}>
              <ringGeometry args={[0.03, 0.042, 16]} />
            </mesh>
            {/* Bridge */}
            <mesh position={[0, 0, 0]} material={outfit.glasses}>
              <boxGeometry args={[0.03, 0.008, 0.005]} />
            </mesh>
          </group>
        )}

        {/* Headset for Coder */}
        {agent.role === 'coder' && (
          <group position={[0, 0.06, 0]}>
            {/* Headband */}
            <mesh rotation={[0, 0, 0]} material={outfit.glasses}>
              <torusGeometry args={[0.21, 0.015, 8, 24, Math.PI]} />
            </mesh>
            {/* Ear Cups */}
            <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={outfit.top}>
              <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
            </mesh>
            <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={outfit.top}>
              <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
            </mesh>
          </group>
        )}

        {/* Stylized Hair Sculpt */}
        <group position={[0, 0.05, -0.01]}>
          {/* Main Hair Cap */}
          <mesh castShadow material={outfit.hair}>
            <sphereGeometry args={[0.212, 16, 16]} />
          </mesh>
          {/* Front Bangs / Hair Sweep */}
          <mesh position={[0, 0.11, 0.11]} rotation={[0.4, 0, 0]} material={outfit.hair}>
            <boxGeometry args={[0.24, 0.09, 0.1]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
