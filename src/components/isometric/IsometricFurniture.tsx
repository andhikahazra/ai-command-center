import React from 'react';

/**
 * 2D Isometric Furniture SVGs (Sims / Tycoon Aesthetic)
 */

interface FurnitureProps {
  x: number;
  y: number;
  label?: string;
}

export const IsometricDesk: React.FC<FurnitureProps & { role?: string; isBoss?: boolean }> = ({
  x,
  y,
  role,
  isBoss,
}) => {
  const deskColor = isBoss ? '#92400e' : '#e2e8f0'; // Mahogany for Boss, clean slate for devs
  const topColor = isBoss ? '#b45309' : '#f8fafc';
  const shadowColor = isBoss ? '#78350f' : '#cbd5e1';

  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Soft Contact Shadow on Floor */}
      <polygon points="0,0 28,14 0,28 -28,14" fill="#000000" opacity="0.12" />

      {/* Desk Base & Legs */}
      <polygon points="-24,12 -20,10 -20,28 -24,30" fill={shadowColor} />
      <polygon points="20,10 24,12 24,30 20,28" fill={shadowColor} />
      <polygon points="0,20 4,22 4,38 0,36" fill={shadowColor} />

      {/* Front Face of Desk */}
      <polygon points="-24,6 0,18 0,26 -24,14" fill={deskColor} />
      <polygon points="0,18 24,6 24,14 0,26" fill={shadowColor} />

      {/* Desk Top Surface */}
      <polygon points="0,6 24,-6 0,-18 -24,-6" fill={topColor} stroke="#94a3b8" strokeWidth="0.8" />

      {/* Computer Monitor */}
      <g transform="translate(0, -14)">
        {/* Monitor Stand */}
        <polygon points="-3,2 3,2 2,6 -2,6" fill="#475569" />
        <line x1="0" y1="2" x2="0" y2="-6" stroke="#475569" strokeWidth="2" />

        {/* Screen Bezel */}
        <polygon points="-12,-16 12,-16 12,-2 -12,-2" fill="#1e293b" rx="1" />
        {/* Screen Display Content */}
        <polygon
          points="-10,-14 10,-14 10,-4 -10,-4"
          fill={role === 'coder' ? '#1e3a8a' : role === 'data-analyst' ? '#581c87' : '#0284c7'}
        />
        {/* Little Code/Graph Lines on Screen */}
        <line x1="-8" y1="-11" x2="-2" y2="-11" stroke="#93c5fd" strokeWidth="1" />
        <line x1="-8" y1="-8" x2="6" y2="-8" stroke="#60a5fa" strokeWidth="1" />
        <line x1="-8" y1="-5" x2="2" y2="-5" stroke="#bfdbfe" strokeWidth="1" />
      </g>

      {/* Keyboard & Mouse Pad */}
      <polygon points="-8,4 0,0 6,3 -2,7" fill="#334155" opacity="0.8" />
      <circle cx="8" cy="5" r="2.5" fill="#475569" />

      {/* Coffee Mug or Accessory */}
      <circle cx="-14" cy="-2" r="3" fill={isBoss ? '#f59e0b' : '#3b82f6'} stroke="#ffffff" strokeWidth="0.8" />
    </g>
  );
};

export const IsometricOfficeChair: React.FC<FurnitureProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Castors shadow */}
      <ellipse cx="0" cy="8" rx="8" ry="4" fill="#000000" opacity="0.1" />
      {/* 5-Star Wheel Base */}
      <line x1="-7" y1="7" x2="7" y2="9" stroke="#64748b" strokeWidth="1.5" />
      <line x1="-7" y1="9" x2="7" y2="7" stroke="#64748b" strokeWidth="1.5" />
      <line x1="0" y1="5" x2="0" y2="9" stroke="#64748b" strokeWidth="2" />
      {/* Central Gas Lift Column */}
      <line x1="0" y1="0" x2="0" y2="6" stroke="#475569" strokeWidth="2.5" />
      {/* Seat Cushion */}
      <ellipse cx="0" cy="0" rx="9" ry="5.5" fill="#334155" stroke="#1e293b" strokeWidth="1" />
      {/* Backrest */}
      <path
        d="M -7 -4 Q 0 -18 7 -4 Z"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="1"
      />
    </g>
  );
};

export const IsometricPlant: React.FC<FurnitureProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Shadow */}
      <ellipse cx="0" cy="8" rx="7" ry="3.5" fill="#000000" opacity="0.12" />
      {/* Planter Pot */}
      <polygon points="-6,6 6,6 4,14 -4,14" fill="#d97706" stroke="#b45309" strokeWidth="0.8" />
      <ellipse cx="0" cy="6" rx="6" ry="2.5" fill="#92400e" />
      {/* Lush Leaves */}
      <ellipse cx="-4" cy="-2" rx="5" ry="8" fill="#15803d" transform="rotate(-25, -4, -2)" />
      <ellipse cx="4" cy="-3" rx="5" ry="8" fill="#16a34a" transform="rotate(25, 4, -3)" />
      <ellipse cx="0" cy="-8" rx="5" ry="9" fill="#22c55e" />
      <ellipse cx="-2" cy="0" rx="4" ry="6" fill="#4ade80" />
    </g>
  );
};

export const IsometricBookshelf: React.FC<FurnitureProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Bookcase Cabinet */}
      <polygon points="-16,-36 0,-44 0,0 -16,8" fill="#78350f" />
      <polygon points="0,-44 16,-36 16,8 0,0" fill="#92400e" stroke="#5b21b6" strokeWidth="0.5" />
      <polygon points="-16,-36 0,-44 16,-36 0,-28" fill="#b45309" />

      {/* Shelves and Colorful Books */}
      <line x1="-14" y1="-22" x2="-2" y2="-28" stroke="#d97706" strokeWidth="1.5" />
      <line x1="2" y1="-28" x2="14" y2="-22" stroke="#d97706" strokeWidth="1.5" />

      {/* Small Book Blocks */}
      <rect x="3" y="-36" width="3" height="7" fill="#3b82f6" />
      <rect x="7" y="-35" width="2" height="6" fill="#ef4444" />
      <rect x="10" y="-36" width="3.5" height="7" fill="#10b981" />

      <line x1="-14" y1="-8" x2="-2" y2="-14" stroke="#d97706" strokeWidth="1.5" />
      <line x1="2" y1="-14" x2="14" y2="-8" stroke="#d97706" strokeWidth="1.5" />

      <rect x="-12" y="-16" width="3" height="7" fill="#f59e0b" />
      <rect x="-8" y="-17" width="4" height="8" fill="#6366f1" />
    </g>
  );
};

export const IsometricSofa: React.FC<FurnitureProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Floor Shadow */}
      <polygon points="0,-8 34,9 0,26 -34,9" fill="#000000" opacity="0.1" />

      {/* Main Base */}
      <polygon points="-28,4 0,18 28,4 0,-10" fill="#1d4ed8" />
      <polygon points="-28,4 0,18 0,26 -28,12" fill="#1e40af" />
      <polygon points="0,18 28,4 28,12 0,26" fill="#1e3a8a" />

      {/* Sofa Cushions */}
      <polygon points="-22,1 0,12 22,1 0,-10" fill="#3b82f6" />

      {/* Backrest */}
      <polygon points="-28,-8 0,6 0,-8 -28,-22" fill="#2563eb" />
      <polygon points="0,6 28,-8 28,-22 0,-8" fill="#1d4ed8" />
      <polygon points="-28,-22 0,-8 28,-22 0,-36" fill="#3b82f6" />
    </g>
  );
};

export const IsometricCoffeeStation: React.FC<FurnitureProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="select-none pointer-events-none">
      {/* Cabinet Stand */}
      <polygon points="-12,0 0,6 12,0 0,-6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
      <polygon points="-12,0 0,6 0,18 -12,12" fill="#e2e8f0" />
      <polygon points="0,6 12,0 12,12 0,18" fill="#cbd5e1" />

      {/* Espresso Machine */}
      <g transform="translate(0, -6)">
        <polygon points="-8,-4 0,0 8,-4 0,-8" fill="#334155" />
        <polygon points="-8,-4 0,0 0,6 -8,2" fill="#1e293b" />
        <polygon points="0,0 8,-4 8,2 0,6" fill="#0f172a" />
        {/* Steam Nozzle */}
        <circle cx="0" cy="-3" r="1.5" fill="#f59e0b" />
        <circle cx="3" cy="-1" r="1" fill="#ffffff" />
      </g>
    </g>
  );
};
