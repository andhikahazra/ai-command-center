import React, { useMemo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';

/**
 * TopBar:
 * - Clean, unpretentious header with zero AI slop
 * - Pure text navigation links (Overview, Commander, Free Orbit) without outer boxes or tabs
 * - Clean text Telemetry toggle
 * - Removed useless "PROD" tag and obscure "Nominal" label
 * - Simple "New Objective" action
 */
export const TopBar: React.FC = () => {
  const agents = useAgentStore((state) => state.agents);
  const tasks = useTaskStore((state) => state.tasks);
  const isMuted = useUIStore((state) => state.isMuted);
  const cameraMode = useUIStore((state) => state.cameraMode);
  const consoleTab = useUIStore((state) => state.consoleTab);
  const isConsoleOpen = useUIStore((state) => state.isConsoleOpen);
  const setConsoleTab = useUIStore((state) => state.setConsoleTab);
  const toggleConsoleOpen = useUIStore((state) => state.toggleConsoleOpen);
  const viewMode = useUIStore((state) => state.viewMode);
  const setViewMode = useUIStore((state) => state.setViewMode);
  const toggleMute = useUIStore((state) => state.toggleMute);
  const setCameraMode = useUIStore((state) => state.setCameraMode);
  const setActivePanel = useUIStore((state) => state.setActivePanel);

  const activeTasksCount = useMemo(
    () => tasks.filter((t) => ['assigned', 'running', 'pending'].includes(t.status)).length,
    [tasks]
  );
  const completedTasksCount = useMemo(
    () => tasks.filter((t) => t.status === 'completed').length,
    [tasks]
  );

  return (
    <header className="fixed top-0 left-0 right-0 h-12 z-50 flex items-center justify-between px-4 pointer-events-auto border-b border-slate-200 bg-white">
      {/* Left: Clean Brand Title & Dual View Mode Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" title="Office Active" />
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            Command Center
          </span>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* View Mode Switcher: 2D Flat vs 2D Tycoon vs 3D Office */}
        <div className="flex items-center p-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode('flat')}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer active:scale-[0.98] ${
              viewMode === 'flat'
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
            title="Flat Architectural Floorplan (90° Top-Down)"
          >
            2D Flat
          </button>
          <button
            onClick={() => setViewMode('iso')}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer active:scale-[0.98] ${
              viewMode === 'iso'
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
            title="Isometric Tycoon (45° The Sims Style)"
          >
            2D Tycoon
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer active:scale-[0.98] ${
              viewMode === '3d'
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
            title="Full 3D Office (Orbit Camera)"
          >
            3D Office
          </button>
        </div>
      </div>

      {/* Center: Navigation or Subtitle */}
      {viewMode === '3d' ? (
        <nav className="hidden sm:flex items-center gap-6 text-xs">
          <button
            onClick={() => setCameraMode('overview')}
            className={`cursor-pointer transition-colors py-1 ${
              cameraMode === 'overview'
                ? 'font-bold text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setCameraMode('focus-boss')}
            className={`cursor-pointer transition-colors py-1 ${
              cameraMode === 'focus-boss'
                ? 'font-bold text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            Commander Desk
          </button>

          <button
            onClick={() => setCameraMode('free')}
            className={`cursor-pointer transition-colors py-1 ${
              cameraMode === 'free'
                ? 'font-bold text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            Free Orbit
          </button>
        </nav>
      ) : viewMode === 'flat' ? (
        <div className="hidden sm:flex items-center text-xs text-slate-500 font-medium">
          <span>Architectural Blueprint • 90° Top-Down Floorplan</span>
        </div>
      ) : (
        <div className="hidden sm:flex items-center text-xs text-slate-500 font-medium">
          <span>Isometric Office Complex • 26.6° Tycoon View</span>
        </div>
      )}

      {/* Right: Metrics, Pure Text Telemetry & Clean Action */}
      <div className="flex items-center gap-4">
        {/* Monospace Counts */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500">
          <span>
            Team: <strong className="font-mono text-slate-800 font-semibold">{agents.length}</strong>
          </span>
          <span>
            Working: <strong className="font-mono text-blue-700 font-semibold">{activeTasksCount}</strong>
          </span>
          <span>
            Done: <strong className="font-mono text-emerald-700 font-semibold">{completedTasksCount}</strong>
          </span>
        </div>

        <div className="hidden lg:block h-4 w-px bg-slate-200" />

        {/* Pure Text Workload Toggle (No outer box) */}
        <button
          onClick={() => {
            if (consoleTab === 'telemetry' && isConsoleOpen) {
              toggleConsoleOpen();
            } else {
              setConsoleTab('telemetry');
              if (!isConsoleOpen) toggleConsoleOpen();
            }
          }}
          className={`text-xs cursor-pointer transition-colors ${
            consoleTab === 'telemetry' && isConsoleOpen
              ? 'font-bold text-slate-900 border-b border-slate-900'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          Workload
        </button>

        {/* Audio Mute Icon */}
        <button
          onClick={toggleMute}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-slate-700" />}
        </button>

        {/* Simple Action Button */}
        <button
          onClick={() => setActivePanel('objective-input')}
          className="btn btn-primary px-3 py-1.5 text-xs font-semibold"
        >
          Assign Task
        </button>
      </div>
    </header>
  );
};
