/**
 * Isometric Projection Math and Room Configurations
 * Standard 2:1 isometric ratio (TW: 52px, TH: 26px)
 */

export const TILE_W = 52;
export const TILE_H = 26;

// Convert 2D grid coordinates (col, row) to screen isometric coordinates (px)
export function gridToIso(col: number, row: number): { x: number; y: number } {
  const x = (col - row) * (TILE_W / 2);
  const y = (col + row) * (TILE_H / 2);
  return { x, y };
}

// Convert screen isometric coordinates back to grid coordinates (col, row)
export function isoToGrid(isoX: number, isoY: number): { col: number; row: number } {
  const col = Math.round((isoX / (TILE_W / 2) + isoY / (TILE_H / 2)) / 2);
  const row = Math.round((isoY / (TILE_H / 2) - isoX / (TILE_W / 2)) / 2);
  return { col, row };
}

// Convert 3D world position [x, y, z] to 2D isometric grid coordinates [col, row]
export function worldToGrid(x: number, z: number): { col: number; row: number } {
  // 3D world X: [-14.5, 14.5] maps to grid Col: [0, 18]
  // 3D world Z: [-9.5, 16.5] maps to grid Row: [0, 18]
  const col = Math.max(0, Math.min(18, ((x + 15) / 30) * 18));
  const row = Math.max(0, Math.min(18, ((z + 10) / 26) * 18));
  return { col, row };
}

// Convert 2D grid [col, row] back to 3D world position [x, 0, z]
export function gridToWorld(col: number, row: number): [number, number, number] {
  const x = (col / 18) * 30 - 15;
  const z = (row / 18) * 26 - 10;
  return [x, 0, z];
}

export interface RoomDef {
  id: string;
  name: string;
  agentId?: string;
  agentName?: string;
  role: string;
  startCol: number;
  startRow: number;
  width: number; // in tiles
  height: number; // in tiles
  floorColor: string;
  floorBorder: string;
  floorType: 'wood' | 'slate' | 'tile' | 'carpet';
  deskCol: number;
  deskRow: number;
  chairCol: number;
  chairRow: number;
}

export const ROOMS: RoomDef[] = [
  // ROW 0 (NORTH WING)
  {
    id: 'coding-lab',
    name: 'Development Lab',
    agentId: 'coder-01',
    agentName: 'Nexus',
    role: 'coder',
    startCol: 0,
    startRow: 0,
    width: 6,
    height: 6,
    floorColor: '#dcfce7',
    floorBorder: '#86efac',
    floorType: 'slate',
    deskCol: 3,
    deskRow: 1,
    chairCol: 3,
    chairRow: 2,
  },
  {
    id: 'executive-office',
    name: 'Executive Office',
    agentId: 'boss-01',
    agentName: 'Commander',
    role: 'boss',
    startCol: 6,
    startRow: 0,
    width: 6,
    height: 6,
    floorColor: '#fef3c7',
    floorBorder: '#fde047',
    floorType: 'wood',
    deskCol: 9,
    deskRow: 1,
    chairCol: 9,
    chairRow: 2,
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    agentId: 'analyst-01',
    agentName: 'Cortex',
    role: 'data-analyst',
    startCol: 12,
    startRow: 0,
    width: 6,
    height: 6,
    floorColor: '#f3e8ff',
    floorBorder: '#d8b4fe',
    floorType: 'slate',
    deskCol: 15,
    deskRow: 1,
    chairCol: 15,
    chairRow: 2,
  },

  // ROW 1 (MIDDLE WING)
  {
    id: 'research-lab',
    name: 'Research Lab',
    agentId: 'research-01',
    agentName: 'Scout',
    role: 'researcher',
    startCol: 0,
    startRow: 6,
    width: 6,
    height: 6,
    floorColor: '#e0f2fe',
    floorBorder: '#7dd3fc',
    floorType: 'tile',
    deskCol: 3,
    deskRow: 7,
    chairCol: 3,
    chairRow: 8,
  },
  {
    id: 'breakroom-lounge',
    name: 'Central Lounge & Design Studio',
    agentId: 'designer-01',
    agentName: 'Pixel',
    role: 'designer',
    startCol: 6,
    startRow: 6,
    width: 6,
    height: 6,
    floorColor: '#f8fafc',
    floorBorder: '#cbd5e1',
    floorType: 'carpet',
    deskCol: 9,
    deskRow: 7,
    chairCol: 9,
    chairRow: 8,
  },
  {
    id: 'web-research',
    name: 'Web Research Lab',
    agentId: 'browser-01',
    agentName: 'Crawler',
    role: 'browser',
    startCol: 12,
    startRow: 6,
    width: 6,
    height: 6,
    floorColor: '#ffedd5',
    floorBorder: '#fdba74',
    floorType: 'slate',
    deskCol: 15,
    deskRow: 7,
    chairCol: 15,
    chairRow: 8,
  },

  // ROW 2 (SOUTH WING)
  {
    id: 'writing-suite',
    name: 'Content Suite',
    agentId: 'writer-01',
    agentName: 'Quill',
    role: 'writer',
    startCol: 0,
    startRow: 12,
    width: 6,
    height: 6,
    floorColor: '#fce7f3',
    floorBorder: '#f9a8d4',
    floorType: 'wood',
    deskCol: 3,
    deskRow: 13,
    chairCol: 3,
    chairRow: 14,
  },
  {
    id: 'central-hallway',
    name: 'Terrace & Coffee Corner',
    role: 'lounge',
    startCol: 6,
    startRow: 12,
    width: 6,
    height: 6,
    floorColor: '#f1f5f9',
    floorBorder: '#cbd5e1',
    floorType: 'tile',
    deskCol: 9,
    deskRow: 13,
    chairCol: 9,
    chairRow: 14,
  },
  {
    id: 'qa-lab',
    name: 'QA Testing Lab',
    agentId: 'qa-01',
    agentName: 'Sentinel',
    role: 'qa',
    startCol: 12,
    startRow: 12,
    width: 6,
    height: 6,
    floorColor: '#d1fae5',
    floorBorder: '#6ee7b7',
    floorType: 'slate',
    deskCol: 15,
    deskRow: 13,
    chairCol: 15,
    chairRow: 14,
  },
];
