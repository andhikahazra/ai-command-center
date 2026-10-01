import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Target,
  Crosshair,
  PauseCircle,
  Crown,
  RotateCcw,
  Footprints,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { StatusBadge } from '../ui/StatusBadge';
import { ProgressBar } from '../ui/ProgressBar';

/**
 * Mitra UI Unit Inspector Panel (App Shell Section 5.2 & Panel Cards Section 6):
 * - Grounded right inspector from topbar to bottom edge
 * - Partitioned into thematic sub-sections with h-px dividers
 * - Tactile action buttons (active:scale-[0.98])
 */
export const AgentDetailPanel: React.FC = () => {
  const activePanel = useUIStore((state) => state.activePanel);
  const setActivePanel = useUIStore((state) => state.setActivePanel);
  const setCameraMode = useUIStore((state) => state.setCameraMode);

  const selectedAgentId = useAgentStore((state) => state.selectedAgentId);
  const agents = useAgentStore((state) => state.agents);
  const updateAgentStatus = useAgentStore((state) => state.updateAgentStatus);
  const returnBossHome = useAgentStore((state) => state.returnBossHome);
  const visitAgent = useAgentStore((state) => state.visitAgent);
  const tasks = useTaskStore((state) => state.tasks);

  const isVisible = activePanel === 'agent-detail' && selectedAgentId !== null;
  const agent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId),
    [agents, selectedAgentId]
  );
  const currentTask = useMemo(
    () => tasks.find((t) => t.id === agent?.currentTaskId),
    [tasks, agent?.currentTaskId]
  );

  return (
    <AnimatePresence>
      {isVisible && agent && (
        <motion.aside
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="fixed top-12 bottom-0 right-0 w-84 border-l border-slate-200 bg-white shadow-2xl pointer-events-auto flex flex-col z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-start bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-md border flex items-center justify-center font-bold text-xs ${
                  agent.isBoss
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 font-mono'
                }`}
              >
                {agent.isBoss ? <Crown size={18} /> : agent.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">{agent.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {agent.role}
                  </span>
                  <StatusBadge status={agent.status} size="sm" />
                </div>
              </div>
            </div>
            <button
              onClick={() => setActivePanel('none')}
              className="p-1 rounded hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Close Panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Sections (Mitra UI Section 6.2) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
            {/* Section 1: Workload & Runtime */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Workload & Assignment
              </div>
              {agent.status === 'working' ? (
                <div className="p-3 rounded-md bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-900">Current Task</span>
                    <span className="font-mono font-bold text-blue-700">{agent.progress || 0}%</span>
                  </div>
                  <div className="text-xs font-medium text-slate-900">
                    {currentTask?.title || 'Processing task instructions...'}
                  </div>
                  <ProgressBar progress={agent.progress || 0} color="#2563eb" size="sm" />
                </div>
              ) : (
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-slate-600">
                  <CheckCircle2 size={14} className="text-slate-400" />
                  <span>Unit standing by in designated quarters.</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-150" />

            {/* Section 2: Spatial Telemetry */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Spatial Coordinates
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Position
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-800">
                    [{agent.position[0].toFixed(1)}, {agent.position[2].toFixed(1)}]
                  </span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Quarters
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-800 capitalize truncate block">
                    {agent.role} Room
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-150" />

            {/* Section 3: Tooling Capabilities */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Registered Tooling
              </div>
              <div className="flex flex-wrap gap-1.5">
                {agent.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions (Mitra UI Section 9 Tactile Buttons) */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/50 space-y-2">
            {agent.isBoss ? (
              <>
                <button
                  onClick={() => setActivePanel('objective-input')}
                  className="w-full btn btn-primary py-2 text-xs font-semibold"
                >
                  <Target size={14} />
                  <span>New Objective</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCameraMode('focus-boss')}
                    className="btn btn-secondary py-1.5 text-xs"
                  >
                    <Crosshair size={13} />
                    <span>Focus View</span>
                  </button>
                  <button
                    onClick={returnBossHome}
                    className="btn btn-secondary py-1.5 text-xs text-amber-800"
                  >
                    <RotateCcw size={13} />
                    <span>Return Desk</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActivePanel('task-create')}
                    className="btn btn-primary py-2 text-xs font-semibold"
                  >
                    <Target size={14} />
                    <span>Assign Task</span>
                  </button>
                  <button
                    onClick={() => setCameraMode('focus-agent')}
                    className="btn btn-secondary py-2 text-xs"
                  >
                    <Compass size={14} />
                    <span>Focus Room</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => visitAgent(agent.id)}
                    className="btn btn-secondary py-1.5 text-xs text-slate-700"
                    title="Send Commander to visit this unit's room"
                  >
                    <Footprints size={13} />
                    <span>Visit Room</span>
                  </button>
                  <button
                    onClick={() => updateAgentStatus(agent.id, 'idle')}
                    className="btn btn-secondary py-1.5 text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50 border-rose-200"
                  >
                    <PauseCircle size={13} />
                    <span>Set Idle</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
