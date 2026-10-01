import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import {
  ROOMS,
  gridToIso,
  isoToGrid,
  worldToGrid,
  gridToWorld,
} from './isometricConstants';
import {
  IsometricDesk,
  IsometricOfficeChair,
  IsometricPlant,
  IsometricBookshelf,
  IsometricSofa,
  IsometricCoffeeStation,
} from './IsometricFurniture';
import { IsometricCharacter } from './IsometricCharacter';
import { ZoomIn, ZoomOut, RotateCcw, Footprints } from 'lucide-react';

/**
 * 2D Isometric Tycoon Office View (The Sims 1 / Game Dev Story Aesthetic):
 * - Clean, lightweight vector isometric projection (60+ FPS, zero GPU load)
 * - 9 stylized private rooms, cutaway walls, wooden/tiled floors, and furniture
 * - Grounded 2D Sims characters with walking animations and emerald Plumbobs
 * - Click-to-move in Run Mode ('R') with smooth path interpolation
 * - Interactive panning and zooming
 */
export const IsometricOfficeView: React.FC = () => {
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const selectAgent = useAgentStore((s) => s.selectAgent);
  const moveBossTo = useAgentStore((s) => s.moveBossTo);

  const isRunMode = useUIStore((s) => s.isRunMode);
  const toggleRunMode = useUIStore((s) => s.toggleRunMode);

  // Pan and Zoom Canvas State
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: -40 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [hoveredTile, setHoveredTile] = useState<{ col: number; row: number } | null>(null);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number } | null>(null);

  // Live animated positions for agents in 2D
  const [animatedPositions, setAnimatedPositions] = useState<Record<string, { col: number; row: number }>>({});

  // Sync / smoothly lerp agent positions toward target
  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      setAnimatedPositions((prev) => {
        const next: Record<string, { col: number; row: number }> = { ...prev };
        let hasChanges = false;

        agents.forEach((agent) => {
          const targetWorld = agent.targetPosition || agent.homePosition;
          const targetGrid = worldToGrid(targetWorld[0], targetWorld[2]);

          const currentGrid = prev[agent.id] || targetGrid;
          const dCol = targetGrid.col - currentGrid.col;
          const dRow = targetGrid.row - currentGrid.row;
          const dist = Math.hypot(dCol, dRow);

          if (dist > 0.05) {
            hasChanges = true;
            const lerpRate = 0.08;
            next[agent.id] = {
              col: currentGrid.col + dCol * lerpRate,
              row: currentGrid.row + dRow * lerpRate,
            };
          } else {
            next[agent.id] = targetGrid;
          }
        });

        return hasChanges ? next : prev;
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [agents]);

  // Pan interaction handlers
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

    // Calculate isometric tile under mouse
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2 + pan.x;
    const centerY = rect.height / 2 + pan.y;

    const mouseIsoX = (e.clientX - centerX) / zoom;
    const mouseIsoY = (e.clientY - centerY) / zoom;
    const grid = isoToGrid(mouseIsoX, mouseIsoY);

    if (grid.col >= 0 && grid.col <= 18 && grid.row >= 0 && grid.row <= 18) {
      setHoveredTile(grid);
    } else {
      setHoveredTile(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(1.8, Math.max(0.65, prev * zoomFactor)));
  };

  // Click on floor to move Commander in Run Mode
  const handleFloorClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isRunMode) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2 + pan.x;
      const centerY = rect.height / 2 + pan.y;

      const mouseIsoX = (e.clientX - centerX) / zoom;
      const mouseIsoY = (e.clientY - centerY) / zoom;
      const grid = isoToGrid(mouseIsoX, mouseIsoY);

      if (grid.col >= 0 && grid.col <= 18 && grid.row >= 0 && grid.row <= 18) {
        const targetWorld = gridToWorld(grid.col, grid.row);
        moveBossTo(targetWorld);

        const isoPos = gridToIso(grid.col, grid.row);
        setClickRipple({ x: isoPos.x, y: isoPos.y });
        setTimeout(() => setClickRipple(null), 800);
      }
    },
    [isRunMode, pan, zoom, moveBossTo]
  );

  // Depth-sorting entities (Rooms, Furniture, Characters) by isometric depth
  const renderedEntities = useMemo(() => {
    const list: Array<{
      type: 'character' | 'desk' | 'plant' | 'sofa' | 'bookshelf';
      depth: number;
      element: React.ReactNode;
    }> = [];

    // 1. Desks & Office Furniture
    ROOMS.forEach((room) => {
      const deskIso = gridToIso(room.deskCol, room.deskRow);
      list.push({
        type: 'desk',
        depth: (room.deskCol + room.deskRow) * 10,
        element: (
          <React.Fragment key={`desk-${room.id}`}>
            <IsometricDesk
              x={deskIso.x}
              y={deskIso.y}
              role={room.role}
              isBoss={room.role === 'boss'}
            />
            {/* Office Chair behind/at desk */}
            <IsometricOfficeChair
              x={deskIso.x}
              y={deskIso.y + 12}
            />
          </React.Fragment>
        ),
      });

      // Potted Plant in corner of room
      const plantIso = gridToIso(room.startCol + 1, room.startRow + room.height - 1);
      list.push({
        type: 'plant',
        depth: (room.startCol + 1 + room.startRow + room.height - 1) * 10 + 2,
        element: <IsometricPlant key={`plant-${room.id}`} x={plantIso.x} y={plantIso.y} />,
      });

      // Bookshelf in Boss & Content Suites
      if (room.role === 'boss' || room.role === 'writer') {
        const shelfIso = gridToIso(room.startCol + room.width - 1, room.startRow);
        list.push({
          type: 'bookshelf',
          depth: (room.startCol + room.width - 1 + room.startRow) * 10,
          element: <IsometricBookshelf key={`shelf-${room.id}`} x={shelfIso.x} y={shelfIso.y} />,
        });
      }

      // Breakroom Lounge Sofa & Coffee Station
      if (room.id === 'breakroom-lounge' || room.id === 'central-hallway') {
        const sofaIso = gridToIso(room.startCol + 3, room.startRow + 3);
        list.push({
          type: 'sofa',
          depth: (room.startCol + 3 + room.startRow + 3) * 10,
          element: <IsometricSofa key={`sofa-${room.id}`} x={sofaIso.x} y={sofaIso.y} />,
        });

        const coffeeIso = gridToIso(room.startCol + 1, room.startRow + 2);
        list.push({
          type: 'sofa',
          depth: (room.startCol + 1 + room.startRow + 2) * 10,
          element: <IsometricCoffeeStation key={`coffee-${room.id}`} x={coffeeIso.x} y={coffeeIso.y} />,
        });
      }
    });

    // 2. Agents / Characters
    agents.forEach((agent) => {
      const pos = animatedPositions[agent.id] || worldToGrid(agent.position[0], agent.position[2]);
      const isoPos = gridToIso(pos.col, pos.row);

      const targetPos = agent.targetPosition || agent.homePosition;
      const targetGrid = worldToGrid(targetPos[0], targetPos[2]);
      const isMoving = Math.hypot(targetGrid.col - pos.col, targetGrid.row - pos.row) > 0.15;

      list.push({
        type: 'character',
        depth: (pos.col + pos.row) * 10 + 5, // Slightly in front of floor/desk at same cell
        element: (
          <IsometricCharacter
            key={agent.id}
            agent={agent}
            screenX={isoPos.x}
            screenY={isoPos.y}
            isSelected={selectedAgentId === agent.id}
            isMoving={isMoving}
            onClick={() => selectAgent(agent.id)}
          />
        ),
      });
    });

    // Sort by depth (Y-order) for correct isometric layering
    return list.sort((a, b) => a.depth - b.depth);
  }, [agents, animatedPositions, selectedAgentId, selectAgent]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-slate-100 ${
        isRunMode ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleFloorClick}
    >
      {/* 1. Subtle Outdoor Lawn / Pavement Background Pattern */}
      <div className="absolute inset-0 bg-radial from-slate-50 via-slate-100 to-slate-200 pointer-events-none" />

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
            setPan({ x: 0, y: -40 });
          }}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer active:scale-[0.98]"
          title="Reset View"
        >
          <RotateCcw size={14} />
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <button
          onClick={toggleRunMode}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold cursor-pointer active:scale-[0.98] ${
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

      {/* 3. Main Isometric SVG Viewport */}
      <svg
        className="w-full h-full pointer-events-auto"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        <g
          transform={`translate(${window.innerWidth / 2}, ${window.innerHeight / 2}) scale(${zoom})`}
          style={{ transformOrigin: '0px 0px' }}
        >
          {/* ================= OUTDOOR PERIMETER LAWN ================= */}
          <polygon
            points="0,-36 600,264 0,564 -600,264"
            fill="#dcfce7"
            stroke="#bbf7d0"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* ================= BUILDING FOUNDATION SLAB ================= */}
          <polygon
            points="0,-16 520,244 0,504 -520,244"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          {/* Foundation Depth Edge */}
          <polygon points="-520,244 0,504 0,516 -520,256" fill="#94a3b8" />
          <polygon points="520,244 0,504 0,516 520,256" fill="#64748b" />

          {/* ================= 9 ROOM FLOORS & TILES ================= */}
          {ROOMS.map((room) => {
            const pTop = gridToIso(room.startCol, room.startRow);
            const pRight = gridToIso(room.startCol + room.width, room.startRow);
            const pBottom = gridToIso(room.startCol + room.width, room.startRow + room.height);
            const pLeft = gridToIso(room.startCol, room.startRow + room.height);

            const floorPoints = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;

            return (
              <g key={room.id} className="transition-colors duration-150">
                {/* Room Floor Diamond */}
                <polygon
                  points={floorPoints}
                  fill={room.floorColor}
                  stroke={room.floorBorder}
                  strokeWidth="1.5"
                />

                {/* Internal Tile Grid Lines (Subtle texture) */}
                {Array.from({ length: room.width - 1 }).map((_, i) => {
                  const p1 = gridToIso(room.startCol + i + 1, room.startRow);
                  const p2 = gridToIso(room.startCol + i + 1, room.startRow + room.height);
                  return (
                    <line
                      key={`v-${i}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={room.floorBorder}
                      strokeWidth="0.6"
                      opacity="0.45"
                    />
                  );
                })}
                {Array.from({ length: room.height - 1 }).map((_, i) => {
                  const p1 = gridToIso(room.startCol, room.startRow + i + 1);
                  const p2 = gridToIso(room.startCol + room.width, room.startRow + i + 1);
                  return (
                    <line
                      key={`h-${i}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={room.floorBorder}
                      strokeWidth="0.6"
                      opacity="0.45"
                    />
                  );
                })}

                {/* SIMS CUTAWAY WALLS: Back walls full height (h=48px), Front walls cut low */}
                {/* Back Left Wall */}
                <polygon
                  points={`${pTop.x},${pTop.y - 48} ${pTop.x},${pTop.y} ${pLeft.x},${pLeft.y} ${pLeft.x},${pLeft.y - 48}`}
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                {/* Back Right Wall */}
                <polygon
                  points={`${pTop.x},${pTop.y - 48} ${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pRight.x},${pRight.y - 48}`}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />

                {/* Wall Baseboards */}
                <polyline
                  points={`${pLeft.x},${pLeft.y} ${pTop.x},${pTop.y} ${pRight.x},${pRight.y}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                />

                {/* Room Name Signboard Tag */}
                <g transform={`translate(${pTop.x}, ${pTop.y - 32})`}>
                  <rect
                    x="-45"
                    y="-8"
                    width="90"
                    height="16"
                    rx="3"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="0.8"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="700"
                    fill="#334155"
                    className="font-sans select-none tracking-wide"
                  >
                    {room.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ================= RUN MODE HOVER TILE HIGHLIGHT ================= */}
          {isRunMode && hoveredTile && (
            <g>
              {(() => {
                const pt = gridToIso(hoveredTile.col, hoveredTile.row);
                const pr = gridToIso(hoveredTile.col + 1, hoveredTile.row);
                const pb = gridToIso(hoveredTile.col + 1, hoveredTile.row + 1);
                const pl = gridToIso(hoveredTile.col, hoveredTile.row + 1);
                return (
                  <polygon
                    points={`${pt.x},${pt.y} ${pr.x},${pr.y} ${pb.x},${pb.y} ${pl.x},${pl.y}`}
                    fill="#3b82f6"
                    opacity="0.35"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                  />
                );
              })()}
            </g>
          )}

          {/* ================= CLICK RIPPLE (FOOTSTEP TARGET) ================= */}
          {clickRipple && (
            <g transform={`translate(${clickRipple.x}, ${clickRipple.y})`}>
              <ellipse
                cx="0"
                cy="0"
                rx="14"
                ry="7"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                className="animate-ping"
              />
              <circle cx="0" cy="0" r="3" fill="#2563eb" />
            </g>
          )}

          {/* ================= DEPTH-SORTED ENTITIES (FURNITURE & CHARACTERS) ================= */}
          {renderedEntities.map((ent, i) => (
            <g key={i}>{ent.element}</g>
          ))}
        </g>
      </svg>
    </div>
  );
};
