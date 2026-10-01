import React, { useEffect } from 'react';
import { SceneCanvas } from './three/scene/SceneCanvas';
import { DashboardOverlay } from './components/dashboard/DashboardOverlay';
import { useUIStore } from './store/uiStore';

import { IsometricOfficeView } from './components/isometric/IsometricOfficeView';
import { FlatOfficeView } from './components/flat/FlatOfficeView';

const App: React.FC = () => {
  const setActivePanel = useUIStore((s) => s.setActivePanel);
  const setCameraMode = useUIStore((s) => s.setCameraMode);
  const toggleMute = useUIStore((s) => s.toggleMute);
  const isRunMode = useUIStore((s) => s.isRunMode);
  const toggleRunMode = useUIStore((s) => s.toggleRunMode);
  const setRunMode = useUIStore((s) => s.setRunMode);
  const viewMode = useUIStore((s) => s.viewMode);

  // Global hotkeys for command center
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input, textarea, or select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        if (e.key === 'Escape') {
          setActivePanel('none');
          setRunMode(false);
        }
        return;
      }

      if (e.key === 'Escape') {
        setActivePanel('none');
        setRunMode(false);
      } else if (e.key === 'r' || e.key === 'R') {
        toggleRunMode();
      } else if (e.key === 'o' || e.key === 'O') {
        setActivePanel('objective-input');
      } else if (e.key === 't' || e.key === 'T') {
        setActivePanel('task-create');
      } else if (e.key === 'n' || e.key === 'N') {
        setActivePanel('agent-create');
      } else if (e.key === '1') {
        setCameraMode('overview');
      } else if (e.key === '2') {
        setCameraMode('focus-boss');
      } else if (e.key === '3') {
        setCameraMode('free');
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePanel, setCameraMode, toggleMute, toggleRunMode, setRunMode]);

  return (
    <div className="relative w-full h-full select-none font-sans">
      {/* Triple View Mode: Flat 2D Floorplan | Isometric 2D Tycoon | 3D Office */}
      <div className="absolute inset-0">
        {viewMode === 'flat' && <FlatOfficeView />}
        {viewMode === 'iso' && <IsometricOfficeView />}
        {viewMode === '3d' && <SceneCanvas />}
      </div>

      {/* UI Overlay */}
      <DashboardOverlay />

      {/* Running Mode Toast Banner */}
      {isRunMode && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 bg-white/95 text-slate-800 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2.5 text-xs font-medium pointer-events-auto border border-slate-200 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Run Mode: Click any floor tile to move Commander</span>
          <button
            onClick={() => setRunMode(false)}
            className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-600 border border-slate-200 transition-colors cursor-pointer active:scale-[0.98]"
          >
            Esc
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
