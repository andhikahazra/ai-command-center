import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import { ZoomIn, ZoomOut, RotateCcw, Footprints, Award, CheckCircle2 } from 'lucide-react';

/**
 * 2D Flat Architectural Floorplan View (Top-Down 90° Blueprint):
 * - Pure orthographic top-down architecture (0° pitch, 90° elevation)
 * - 9 accurately partitioned private rooms with door swing arcs and wooden/tiled floors
 * - Top-down furniture: desks, dual monitors, ergonomic chairs, plants, lounge couch
 * - Smoothly gliding avatar puck tokens with role colors and Sims Plumbobs
 * - Click-to-move in Run Mode ('R') with radar ping ripple
 * - Pan and zoom support
 */

interface RoomLayout {
  id: string;
  name: string;
  agentId?: string;
  agentName?: string;
  role: string;
  x: number;
  y: number;
  w: number;
  h: number;
  floorColor: string;
  floorPattern: 'wood' | 'tile' | 'slate' | 'carpet';
  deskPos: { x: number; y: number; w: number; h: number };
  chairPos: { x: number; y: number };
  door: { x: number; y: number; dir: 'bottom' | 'top' | 'left' | 'right' };
}

// 9 Rooms in 3x3 Layout (Total ~860px x 680px)
const FLAT_ROOMS: RoomLayout[] = [
  // ROW 0: NORTH WING
  {
    id: 'coding-lab',
    name: 'Development Lab',
    agentId: 'coder-01',
    agentName: 'Nexus',
    role: 'coder',
    x: 40,
    y: 40,
    w: 240,
    h: 180,
    floorColor: '#dcfce7',
    floorPattern: 'slate',
    deskPos: { x: 120, y: 70, w: 90, h: 44 },
    chairPos: { x: 165, y: 132 },
    door: { x: 200, y: 220, dir: 'bottom' },
  },
  {
    id: 'executive-office',
    name: 'Executive Office',
    agentId: 'boss-01',
    agentName: 'Commander',
    role: 'boss',
    x: 320,
    y: 40,
    w: 260,
    h: 180,
    floorColor: '#fef3c7',
    floorPattern: 'wood',
    deskPos: { x: 405, y: 75, w: 100, h: 48 },
    chairPos: { x: 455, y: 140 },
    door: { x: 450, y: 220, dir: 'bottom' },
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    agentId: 'analyst-01',
    agentName: 'Cortex',
    role: 'data-analyst',
    x: 620,
    y: 40,
    w: 240,
    h: 180,
    floorColor: '#f3e8ff',
    floorPattern: 'tile',
    deskPos: { x: 700, y: 70, w: 90, h: 44 },
    chairPos: { x: 745, y: 132 },
    door: { x: 700, y: 220, dir: 'bottom' },
  },

  // ROW 1: MIDDLE WING
  {
    id: 'research-lab',
    name: 'Research Lab',
    agentId: 'research-01',
    agentName: 'Scout',
    role: 'researcher',
    x: 40,
    y: 260,
    w: 240,
    h: 180,
    floorColor: '#e0f2fe',
    floorPattern: 'tile',
    deskPos: { x: 120, y: 290, w: 90, h: 44 },
    chairPos: { x: 165, y: 352 },
    door: { x: 200, y: 260, dir: 'top' },
  },
  {
    id: 'breakroom-lounge',
    name: 'Central Lounge & Design',
    agentId: 'designer-01',
    agentName: 'Pixel',
    role: 'designer',
    x: 320,
    y: 260,
    w: 260,
    h: 180,
    floorColor: '#f8fafc',
    floorPattern: 'carpet',
    deskPos: { x: 445, y: 350, w: 90, h: 44 },
    chairPos: { x: 490, y: 412 },
    door: { x: 450, y: 260, dir: 'top' },
  },
  {
    id: 'web-research',
    name: 'Web Research Lab',
    agentId: 'browser-01',
    agentName: 'Crawler',
    role: 'browser',
    x: 620,
    y: 260,
    w: 240,
    h: 180,
    floorColor: '#ffedd5',
    floorPattern: 'slate',
    deskPos: { x: 700, y: 290, w: 90, h: 44 },
    chairPos: { x: 745, y: 352 },
    door: { x: 700, y: 260, dir: 'top' },
  },

  // ROW 2: SOUTH WING
  {
    id: 'writing-suite',
    name: 'Content Suite',
    agentId: 'writer-01',
    agentName: 'Quill',
    role: 'writer',
    x: 40,
    y: 480,
    w: 240,
    h: 180,
    floorColor: '#fce7f3',
    floorPattern: 'wood',
    deskPos: { x: 120, y: 510, w: 90, h: 44 },
    chairPos: { x: 165, y: 572 },
    door: { x: 200, y: 480, dir: 'top' },
  },
  {
    id: 'central-hallway',
    name: 'Terrace & Coffee Corner',
    role: 'lounge',
    x: 320,
    y: 480,
    w: 260,
    h: 180,
    floorColor: '#f1f5f9',
    floorPattern: 'tile',
    deskPos: { x: 400, y: 530, w: 100, h: 44 },
    chairPos: { x: 450, y: 592 },
    door: { x: 450, y: 480, dir: 'top' },
  },
  {
    id: 'qa-lab',
    name: 'QA Testing Lab',
    agentId: 'qa-01',
    agentName: 'Sentinel',
    role: 'qa',
    x: 620,
    y: 480,
    w: 240,
    h: 180,
    floorColor: '#d1fae5',
    floorPattern: 'slate',
    deskPos: { x: 700, y: 510, w: 90, h: 44 },
    chairPos: { x: 745, y: 572 },
    door: { x: 700, y: 480, dir: 'top' },
  },
];

// Map 3D coordinates [-15..15, -10..17] to 2D flat blueprint space [40..860, 40..660]
function worldToFlat(x: number, z: number): { x: number; y: number } {
  const flatX = 40 + ((x + 15) / 30) * 820;
  const flatY = 40 + ((z + 10) / 27) * 620;
  return { x: flatX, y: flatY };
}

function flatToWorld(flatX: number, flatY: number): [number, number, number] {
  const worldX = ((flatX - 40) / 820) * 30 - 15;
  const worldZ = ((flatY - 40) / 620) * 27 - 10;
  return [worldX, 0, worldZ];
}

export const FlatOfficeView: React.FC = () => {
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const selectAgent = useAgentStore((s) => s.selectAgent);
  const moveBossTo = useAgentStore((s) => s.moveBossTo);

  const isRunMode = useUIStore((s) => s.isRunMode);
  const toggleRunMode = useUIStore((s) => s.toggleRunMode);

  // Pan and Zoom
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [hoveredRoom, setHoveredRoom] = useState<RoomLayout | null>(null);
  const [radarPing, setRadarPing] = useState<{ x: number; y: number } | null>(null);

  // Animated character positions in 2D flat space
  const [animatedFlatPositions, setAnimatedFlatPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      setAnimatedFlatPositions((prev) => {
        const next: Record<string, { x: number; y: number }> = { ...prev };
        let hasChanges = false;

        agents.forEach((agent) => {
          const targetWorld = agent.targetPosition || agent.homePosition;
          const targetFlat = worldToFlat(targetWorld[0], targetWorld[2]);

          const currentFlat = prev[agent.id] || targetFlat;
          const dx = targetFlat.x - currentFlat.x;
          const dy = targetFlat.y - currentFlat.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 1.5) {
            hasChanges = true;
            next[agent.id] = {
              x: currentFlat.x + dx * 0.08,
              y: currentFlat.y + dy * 0.08,
            };
          } else {
            next[agent.id] = targetFlat;
          }
        });

        return hasChanges ? next : prev;
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [agents]);

  // Mouse handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !isRunMode) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(1.8, Math.max(0.65, prev * factor)));
  };

  // Click floor to move Commander in Run Mode
  const handleFloorClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isRunMode) return;

      const svg = e.currentTarget;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      // Check bounds
      if (svgP.x >= 20 && svgP.x <= 880 && svgP.y >= 20 && svgP.y <= 680) {
        const worldTarget = flatToWorld(svgP.x, svgP.y);
        moveBossTo(worldTarget);

        setRadarPing({ x: svgP.x, y: svgP.y });
        setTimeout(() => setRadarPing(null), 900);
      }
    },
    [isRunMode, moveBossTo]
  );

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-slate-100 ${
        isRunMode ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 1. Architectural Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Top-Right Canvas Controls */}
      <div className="absolute top-16 right-4 z-30 flex items-center gap-1.5 p-1 rounded-lg bg-white/95 border border-slate-200 shadow-sm backdrop-blur-xs">
        <button
          onClick={() => setZoom((z) => Math.min(1.8, z * 1.15))}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer active:scale-[0.98]"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.65, z * 0.85))}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer active:scale-[0.98]"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <button
          onClick={() => {
            setZoom(1.0);
            setPan({ x: 0, y: -20 });
          }}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer active:scale-[0.98]"
          title="Reset View"
        >
          <RotateCcw size={14} />
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <button
          onClick={toggleRunMode}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer active:scale-[0.98] ${
            isRunMode ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle Sprint / Move (R)"
        >
          <Footprints size={12} className={isRunMode ? 'text-amber-200' : 'text-slate-500'} />
          <span>Walk Mode</span>
          <kbd className="px-1 text-[9px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
            R
          </kbd>
        </button>
      </div>

      {/* 3. Main Architectural SVG Viewport */}
      <svg
        className="w-full h-full pointer-events-auto"
        onClick={handleFloorClick}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        <g
          transform={`translate(${window.innerWidth / 2 - 450 * zoom}, ${
            window.innerHeight / 2 - 350 * zoom
          }) scale(${zoom})`}
        >
          {/* ================= OUTDOOR PERIMETER LAWN & FOUNDATION ================= */}
          <rect
            x="10"
            y="10"
            width="880"
            height="680"
            rx="8"
            fill="#dcfce7"
            stroke="#86efac"
            strokeWidth="3"
            opacity="0.6"
          />

          {/* Foundation Concrete Base */}
          <rect
            x="30"
            y="30"
            width="840"
            height="640"
            rx="4"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Central Hallways / Promenade Floor */}
          <rect x="30" y="220" width="840" height="40" fill="#f8fafc" />
          <rect x="30" y="440" width="840" height="40" fill="#f8fafc" />
          <rect x="280" y="30" width="40" height="640" fill="#f8fafc" />
          <rect x="580" y="30" width="40" height="640" fill="#f8fafc" />

          {/* Hallway Floor Pattern (Terrazzo Speckles) */}
          <line x1="30" y1="240" x2="870" y2="240" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="30" y1="460" x2="870" y2="460" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6 6" />

          {/* ================= 9 ROOMS: FLOORS, WALLS & DOORWAYS ================= */}
          {FLAT_ROOMS.map((room) => {
            const isHovered = hoveredRoom?.id === room.id;

            return (
              <g
                key={room.id}
                onMouseEnter={() => setHoveredRoom(room)}
                onMouseLeave={() => setHoveredRoom(null)}
                className="transition-opacity"
              >
                {/* 1. Room Floor Surface */}
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  fill={room.floorColor}
                  className="transition-colors duration-150"
                />

                {/* 2. Floor Texture Pattern */}
                {room.floorPattern === 'wood' && (
                  <g opacity="0.35">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line
                        key={i}
                        x1={room.x}
                        y1={room.y + (i + 1) * 18}
                        x2={room.x + room.w}
                        y2={room.y + (i + 1) * 18}
                        stroke="#d97706"
                        strokeWidth="0.8"
                      />
                    ))}
                  </g>
                )}
                {(room.floorPattern === 'tile' || room.floorPattern === 'slate') && (
                  <g opacity="0.3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={room.x + (i + 1) * 24}
                        y1={room.y}
                        x2={room.x + (i + 1) * 24}
                        y2={room.y + room.h}
                        stroke="#64748b"
                        strokeWidth="0.6"
                      />
                    ))}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1={room.x}
                        y1={room.y + (i + 1) * 24}
                        x2={room.x + room.w}
                        y2={room.y + (i + 1) * 24}
                        stroke="#64748b"
                        strokeWidth="0.6"
                      />
                    ))}
                  </g>
                )}

                {/* 3. Solid Partition Walls */}
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                  className={isHovered ? 'stroke-blue-600' : 'stroke-slate-700'}
                />

                {/* 4. Architectural Doorway & 90° Swing Arc */}
                <g>
                  {/* Door Opening Gap */}
                  <rect
                    x={room.door.x - 16}
                    y={room.door.y - 3}
                    width="32"
                    height="6"
                    fill="#f8fafc"
                  />
                  {/* Swing Arc Path */}
                  <path
                    d={`M ${room.door.x - 16} ${room.door.y} A 28 28 0 0 1 ${room.door.x + 12} ${
                      room.door.dir === 'bottom' ? room.door.y - 24 : room.door.y + 24
                    }`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  {/* Door Leaf Line */}
                  <line
                    x1={room.door.x - 16}
                    y1={room.door.y}
                    x2={room.door.x + 12}
                    y2={room.door.dir === 'bottom' ? room.door.y - 24 : room.door.y + 24}
                    stroke="#475569"
                    strokeWidth="2"
                  />
                </g>

                {/* 5. Room Blueprint Label */}
                <g transform={`translate(${room.x + 12}, ${room.y + 20})`}>
                  <rect
                    x="0"
                    y="-12"
                    width={room.name.length * 7 + 16}
                    height="18"
                    rx="3"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="0.8"
                    opacity="0.95"
                  />
                  <text
                    x="8"
                    y="1"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#1e293b"
                    className="font-sans select-none tracking-wide uppercase"
                  >
                    {room.name}
                  </text>
                </g>

                {/* 6. Top-Down Furniture in Room */}
                {/* Desk */}
                <g transform={`translate(${room.deskPos.x}, ${room.deskPos.y})`}>
                  {/* Desk Shadow */}
                  <rect x="2" y="2" width={room.deskPos.w} height={room.deskPos.h} rx="4" fill="#000000" opacity="0.1" />
                  {/* Desk Surface */}
                  <rect
                    x="0"
                    y="0"
                    width={room.deskPos.w}
                    height={room.deskPos.h}
                    rx="4"
                    fill={room.role === 'boss' ? '#b45309' : '#f8fafc'}
                    stroke={room.role === 'boss' ? '#78350f' : '#94a3b8'}
                    strokeWidth="1.5"
                  />

                  {/* Dual Monitors / Screen bar */}
                  <rect
                    x={room.deskPos.w / 2 - 28}
                    y="6"
                    width="56"
                    height="4.5"
                    rx="1.5"
                    fill="#1e293b"
                    stroke="#0284c7"
                    strokeWidth="1"
                  />
                  {/* Keyboard & Mousepad */}
                  <rect
                    x={room.deskPos.w / 2 - 14}
                    y="18"
                    width="28"
                    height="12"
                    rx="1"
                    fill="#334155"
                  />
                  <rect x={room.deskPos.w / 2 + 18} y="20" width="8" height="8" rx="1" fill="#475569" />

                  {/* Coffee Mug */}
                  <circle cx="16" cy="18" r="3.5" fill={room.role === 'boss' ? '#f59e0b' : '#3b82f6'} />
                </g>

                {/* Ergonomic Office Chair */}
                <g transform={`translate(${room.chairPos.x}, ${room.chairPos.y})`}>
                  <circle cx="0" cy="0" r="13" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
                  {/* Curved Lumbar Backrest */}
                  <path d="M -11 -6 Q 0 -13 11 -6" fill="none" stroke="#475569" strokeWidth="3" />
                  <circle cx="0" cy="1" r="5" fill="#334155" />
                </g>

                {/* Potted Plant in Corner */}
                <g transform={`translate(${room.x + 24}, ${room.y + room.h - 24})`}>
                  <circle cx="0" cy="0" r="10" fill="#15803d" />
                  <circle cx="-5" cy="-3" r="6" fill="#22c55e" />
                  <circle cx="5" cy="-3" r="6" fill="#16a34a" />
                  <circle cx="0" cy="5" r="5" fill="#4ade80" />
                  <circle cx="0" cy="0" r="4.5" fill="#d97706" />
                </g>

                {/* Lounge Sofa (in Breakroom / Lounge) */}
                {room.id === 'breakroom-lounge' && (
                  <g transform="translate(345, 290)">
                    {/* Sofa Base */}
                    <rect x="0" y="0" width="70" height="36" rx="4" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
                    {/* Cushions */}
                    <rect x="4" y="8" width="30" height="24" rx="2" fill="#3b82f6" />
                    <rect x="36" y="8" width="30" height="24" rx="2" fill="#3b82f6" />
                    {/* Coffee Table */}
                    <rect x="15" y="44" width="40" height="18" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                  </g>
                )}
              </g>
            );
          })}

          {/* ================= RADAR PING RIPPLE (CLICK TARGET IN RUN MODE) ================= */}
          {radarPing && (
            <g transform={`translate(${radarPing.x}, ${radarPing.y})`}>
              <circle cx="0" cy="0" r="28" fill="none" stroke="#2563eb" strokeWidth="2.5" className="animate-ping" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill="#2563eb" />
            </g>
          )}

          {/* ================= CHARACTERS (ARCHITECTURAL AVATAR PUCKS) ================= */}
          {agents.map((agent) => {
            const pos =
              animatedFlatPositions[agent.id] || worldToFlat(agent.position[0], agent.position[2]);
            const isSelected = selectedAgentId === agent.id;
            const isWorking = agent.status === 'working';

            return (
              <g
                key={agent.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectAgent(agent.id);
                }}
                className="cursor-pointer select-none group"
              >
                {/* 1. Floor Shadow */}
                <ellipse cx="0" cy="4" rx="18" ry="12" fill="#000000" opacity="0.18" />

                {/* 2. Selection Pulsing Ring */}
                {isSelected && (
                  <g>
                    <circle
                      cx="0"
                      cy="0"
                      r="24"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    <circle cx="0" cy="0" r="22" fill="#3b82f6" opacity="0.15" />
                  </g>
                )}

                {/* 3. Main Avatar Puck (Diameter: 34px) */}
                <circle
                  cx="0"
                  cy="0"
                  r="17"
                  fill={agent.isBoss ? '#1e293b' : '#ffffff'}
                  stroke={agent.isBoss ? '#f59e0b' : agent.color || '#2563eb'}
                  strokeWidth="2.5"
                  className="shadow-md transition-transform group-hover:scale-110 active:scale-95"
                />

                {/* Avatar Icon / Initials */}
                {agent.isBoss ? (
                  <g transform="translate(-7, -7)">
                    <Award size={14} className="text-amber-400" />
                  </g>
                ) : (
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill={agent.isBoss ? '#f59e0b' : '#1e293b'}
                    className="font-mono select-none"
                  >
                    {agent.name.slice(0, 2).toUpperCase()}
                  </text>
                )}

                {/* 4. The Sims Plumbob (Emerald Diamond) Badge */}
                {(isSelected || isWorking) && (
                  <g transform="translate(0, -26)">
                    <polygon
                      points="0,-8 5,-2 0,0 -5,-2"
                      fill={isWorking ? '#38bdf8' : '#34d399'}
                    />
                    <polygon
                      points="0,0 5,-2 0,6 -5,-2"
                      fill={isWorking ? '#0284c7' : '#059669'}
                    />
                  </g>
                )}

                {/* 5. Nameplate Pill Floating Under Avatar */}
                <g transform="translate(0, 26)">
                  <rect
                    x="-26"
                    y="-9"
                    width="52"
                    height="16"
                    rx="8"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    className="shadow-xs"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#0f172a"
                    className="font-sans select-none tracking-tight"
                  >
                    {agent.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
