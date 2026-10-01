import React, { useMemo } from 'react';
import type { Agent } from '../../types/agent';

interface IsometricCharacterProps {
  agent: Agent;
  screenX: number;
  screenY: number;
  isSelected: boolean;
  isMoving: boolean;
  onClick: () => void;
}

/**
 * 2D Stylized The Sims Character Sprite (Isometric View)
 * - Humanoid figure with office attire tailored by role
 * - Walking leg animation when moving
 * - Typing arm animation when working at desk
 * - Iconic The Sims Plumbob (emerald diamond) rotating above head
 * - Floor shadow & selection indicator
 */
export const IsometricCharacter: React.FC<IsometricCharacterProps> = ({
  agent,
  screenX,
  screenY,
  isSelected,
  isMoving,
  onClick,
}) => {
  const isBoss = agent.isBoss;
  const isWorking = agent.status === 'working';

  // Role attire styling
  const style = useMemo(() => {
    let topColor = '#3b82f6';
    let bottomColor = '#334155';
    let shoeColor = '#0f172a';
    let hairColor = '#1c1917';
    const skinColor = '#fed7aa';

    if (isBoss) {
      topColor = '#1e293b'; // Charcoal navy suit
      bottomColor = '#0f172a';
      shoeColor = '#09090b';
      hairColor = '#18181b';
    } else {
      switch (agent.role) {
        case 'coder':
          topColor = '#2563eb';
          bottomColor = '#1e3a8a';
          hairColor = '#451a03';
          break;
        case 'researcher':
          topColor = '#0284c7';
          bottomColor = '#d6d3d1';
          hairColor = '#78350f';
          break;
        case 'browser':
          topColor = '#ea580c';
          bottomColor = '#475569';
          hairColor = '#292524';
          break;
        case 'data-analyst':
          topColor = '#7c3aed';
          bottomColor = '#334155';
          hairColor = '#1c1917';
          break;
        case 'designer':
          topColor = '#0891b2';
          bottomColor = '#18181b';
          hairColor = '#9333ea';
          break;
        case 'writer':
          topColor = '#e11d48';
          bottomColor = '#1e293b';
          hairColor = '#451a03';
          break;
        case 'qa':
          topColor = '#059669';
          bottomColor = '#334155';
          hairColor = '#b45309';
          break;
      }
    }

    return { topColor, bottomColor, shoeColor, hairColor, skinColor };
  }, [agent.role, isBoss]);

  return (
    <g
      transform={`translate(${screenX}, ${screenY})`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="cursor-pointer group select-none transition-transform duration-75"
    >
      {/* 1. Floor Shadow */}
      <ellipse cx="0" cy="4" rx="13" ry="6.5" fill="#000000" opacity="0.22" />

      {/* 2. Selection Ring on Floor */}
      {isSelected && (
        <g>
          <ellipse
            cx="0"
            cy="4"
            rx="16"
            ry="8.5"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="animate-spin"
            style={{ transformOrigin: '0px 4px', animationDuration: '6s' }}
          />
          <ellipse cx="0" cy="4" rx="14" ry="7" fill="#3b82f6" opacity="0.15" />
        </g>
      )}

      {/* 3. Character Body (Grounded at Y=0, height ~50px) */}
      <g className={isMoving ? 'animate-bounce' : ''} style={{ animationDuration: '0.4s' }}>
        {/* LEGS & SHOES */}
        {/* Left Leg */}
        <g className={isMoving ? 'animate-pulse' : ''}>
          <rect x="-6" y="-14" width="4.5" height="15" rx="2" fill={style.bottomColor} />
          {/* Shoe */}
          <ellipse cx="-4" cy="2" rx="3.5" ry="2" fill={style.shoeColor} />
        </g>
        {/* Right Leg */}
        <g>
          <rect x="1.5" y="-14" width="4.5" height="15" rx="2" fill={style.bottomColor} />
          {/* Shoe */}
          <ellipse cx="3.5" cy="2" rx="3.5" ry="2" fill={style.shoeColor} />
        </g>

        {/* TORSO / SHIRT / SUIT */}
        <g transform="translate(0, -14)">
          {/* Jacket / Torso */}
          <rect x="-8.5" y="-18" width="17" height="18" rx="3" fill={style.topColor} />

          {/* White Shirt Collar & Tie */}
          <polygon points="-3,-18 3,-18 0,-13" fill="#ffffff" />
          {isBoss && (
            <polygon points="-1.5,-17 1.5,-17 1,-9 0,-6 -1,-9" fill="#f59e0b" />
          )}

          {/* ID Lanyard badge for QA / Researcher */}
          {(agent.role === 'qa' || agent.role === 'researcher') && (
            <rect x="2" y="-11" width="3.5" height="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.5" />
          )}
        </g>

        {/* ARMS & HANDS */}
        <g transform="translate(0, -14)">
          {/* Left Arm */}
          <rect
            x="-12.5"
            y={isWorking ? '-14' : '-16'}
            width="4"
            height={isWorking ? '10' : '14'}
            rx="2"
            fill={style.topColor}
            transform={isWorking ? 'rotate(35, -12, -14)' : ''}
          />
          <circle cx={isWorking ? '-6' : '-10.5'} cy={isWorking ? '-4' : '-1'} r="2.2" fill={style.skinColor} />

          {/* Right Arm */}
          <rect
            x="8.5"
            y={isWorking ? '-14' : '-16'}
            width="4"
            height={isWorking ? '10' : '14'}
            rx="2"
            fill={style.topColor}
            transform={isWorking ? 'rotate(-35, 12, -14)' : ''}
          />
          <circle cx={isWorking ? '6' : '10.5'} cy={isWorking ? '0' : '-1'} r="2.2" fill={style.skinColor} />
        </g>

        {/* HEAD & HAIR */}
        <g transform="translate(0, -32)">
          {/* Neck */}
          <rect x="-2" y="-4" width="4" height="4" fill={style.skinColor} />

          {/* Head Shape */}
          <circle cx="0" cy="-10" r="8.5" fill={style.skinColor} />

          {/* Eyes (Cute minimal dots) */}
          <circle cx="-3" cy="-9" r="1.2" fill="#18181b" />
          <circle cx="3" cy="-9" r="1.2" fill="#18181b" />

          {/* Glasses for Researcher & Data Analyst */}
          {(agent.role === 'researcher' || agent.role === 'data-analyst') && (
            <g>
              <circle cx="-3" cy="-9" r="2.5" fill="none" stroke="#475569" strokeWidth="0.8" />
              <circle cx="3" cy="-9" r="2.5" fill="none" stroke="#475569" strokeWidth="0.8" />
              <line x1="-0.5" y1="-9" x2="0.5" y2="-9" stroke="#475569" strokeWidth="0.8" />
            </g>
          )}

          {/* Hair Style */}
          <path
            d="M -8.5 -10 C -8.5 -18, 8.5 -18, 8.5 -10 C 8.5 -12, 5 -16, 0 -16 C -5 -16, -8.5 -12, -8.5 -10 Z"
            fill={style.hairColor}
          />
          {/* Hair Bangs Sweep */}
          <path d="M -7 -13 Q -2 -11 3 -15 Q -1 -16 -7 -13 Z" fill={style.hairColor} />
        </g>
      </g>

      {/* 4. THE SIMS PLUMBOB (Emerald Diamond) */}
      {(isSelected || isWorking) && (
        <g
          transform="translate(0, -56)"
          className="transition-all duration-300"
        >
          {/* Bobbing Plumbob Diamond */}
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            {/* Top Half of Diamond */}
            <polygon
              points="0,-12 5,0 0,2 -5,0"
              fill={isWorking ? '#38bdf8' : '#34d399'}
            />
            {/* Right Top Facet */}
            <polygon
              points="0,-12 5,0 0,2"
              fill={isWorking ? '#0284c7' : '#059669'}
            />
            {/* Bottom Half of Diamond */}
            <polygon
              points="0,2 5,0 0,10 -5,0"
              fill={isWorking ? '#0369a1' : '#047857'}
            />
            {/* Front Light Reflection */}
            <polygon
              points="0,-10 3,0 0,1.5 -3,0"
              fill="#ffffff"
              opacity="0.35"
            />
          </g>
        </g>
      )}

      {/* 5. Minimal Nameplate Floating Tag */}
      <g transform="translate(0, -50)">
        <rect
          x="-24"
          y="-10"
          width="48"
          height="14"
          rx="7"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1"
          className="shadow-xs"
        />
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#0f172a"
          className="font-sans select-none"
        >
          {agent.name}
        </text>
      </g>
    </g>
  );
};
