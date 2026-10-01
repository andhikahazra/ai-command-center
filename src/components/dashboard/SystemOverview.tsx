import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { Cpu, Activity, X } from 'lucide-react';

/**
 * Mitra UI System Telemetry KPI Card (Section 8 Dashboard Standards):
 * - Grounded under topbar, toggleable via TopBar Telemetry button
 * - JetBrains/mono counts, solid primary blue progress bar, and dot status indicator
 */
export const SystemOverview: React.FC = () => {
  const showTelemetry = useUIStore((state) => state.showTelemetry);
  const toggleTelemetry = useUIStore((state) => state.toggleTelemetry);
  const activePanel = useUIStore((state) => state.activePanel);
  const agents = useAgentStore((state) => state.agents);
  const tasks = useTaskStore((state) => state.tasks);

  if (!showTelemetry || activePanel === 'agent-detail') return null;

  const activeAgents = agents.filter((a) => a.status === 'working').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const loadPercent = agents.length > 0 ? Math.round((activeAgents / agents.length) * 100) : 0;

  return (
    <div className="absolute top-14 right-4 w-[248px] panel-card rounded-md border border-slate-200 p-3.5 pointer-events-auto bg-white shadow-md z-30">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-150">
        <div className="flex items-center gap-1.5">
          <Cpu size={13} className="text-slate-500" />
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            System Telemetry
          </span>
        </div>
        <button
          onClick={toggleTelemetry}
          className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={13} />
        </button>
      </div>

      {/* KPI Metric (Mitra UI Section 8) */}
      <div className="space-y-2.5">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[11px] text-slate-500 font-medium">Utilization</span>
            <span className="text-sm font-bold font-mono text-slate-900">{loadPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <div
              className="h-full bg-blue-700 transition-all duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
              Active Units
            </div>
            <div className="font-mono text-xs font-bold text-slate-800">
              {activeAgents}
              <span className="text-slate-400 text-[10px] font-normal"> / {agents.length}</span>
            </div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
              Done Tasks
            </div>
            <div className="font-mono text-xs font-bold text-slate-800">
              {completedTasks}
            </div>
          </div>
        </div>

        {/* Dot Status Indicator Footer (Mitra UI Section 4.2) */}
        <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Fleet Nominal
          </span>
          <Activity size={12} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
};
