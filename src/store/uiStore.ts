import { create } from 'zustand';

export type CameraMode = 'free' | 'focus-agent' | 'focus-boss' | 'overview';
export type UIPanel = 'none' | 'agent-detail' | 'task-create' | 'agent-create' | 'objective-input';
export type ConsoleTab = 'fleet' | 'activity' | 'telemetry';

// View Modes: Flat 2D (90° Floorplan) | Isometric 2D (45° Tycoon) | 3D Office (R3F)
export type ViewMode = 'flat' | 'iso' | '3d';

interface UIStore {
  cameraMode: CameraMode;
  activePanel: UIPanel;
  showMinimap: boolean;
  isMuted: boolean;
  isRunMode: boolean; // Shortcut 'R' running/sprint move mode

  // Unified Bottom Control Console (Sims / Tycoon style)
  consoleTab: ConsoleTab;
  isConsoleOpen: boolean;

  // Triple View Mode: Flat 2D Floorplan vs 2D Isometric Tycoon vs 3D Office
  viewMode: ViewMode;

  // Legacy panel support
  showActivityLog?: boolean;
  showAgentList?: boolean;
  showTelemetry?: boolean;
  toggleTelemetry?: () => void;

  setCameraMode: (mode: CameraMode) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setActivePanel: (panel: UIPanel) => void;
  setConsoleTab: (tab: ConsoleTab) => void;
  toggleConsoleOpen: () => void;
  setConsoleOpen: (open: boolean) => void;
  toggleMinimap: () => void;
  toggleMute: () => void;
  toggleRunMode: () => void;
  setRunMode: (enabled: boolean) => void;
  closeAllPanels: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cameraMode: 'overview',
  activePanel: 'none',
  showMinimap: false,
  isMuted: true,
  isRunMode: false,

  consoleTab: 'fleet',
  isConsoleOpen: true,
  viewMode: 'flat', // Default to the new 2D Flat Floorplan!

  showActivityLog: false,
  showAgentList: false,
  showTelemetry: false,
  toggleTelemetry: () => set((s) => ({ showTelemetry: !s.showTelemetry })),

  setCameraMode: (mode) => set({ cameraMode: mode }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () =>
    set((s) => ({
      viewMode: s.viewMode === 'flat' ? 'iso' : s.viewMode === 'iso' ? '3d' : 'flat',
    })),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setConsoleTab: (tab) => set({ consoleTab: tab, isConsoleOpen: true }),
  toggleConsoleOpen: () => set((s) => ({ isConsoleOpen: !s.isConsoleOpen })),
  setConsoleOpen: (open) => set({ isConsoleOpen: open }),
  toggleMinimap: () => set((s) => ({ showMinimap: !s.showMinimap })),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  toggleRunMode: () => set((s) => ({ isRunMode: !s.isRunMode })),
  setRunMode: (enabled) => set({ isRunMode: enabled }),
  closeAllPanels: () => set({ activePanel: 'none', isRunMode: false }),
}));
