import React, { useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  BarChart3,
  Plus,
  Compass,
  Footprints,
  RotateCcw,
  CheckCircle2,
  Info,
  Award,
} from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { useTaskStore } from '../../store/taskStore';
import { useEventStore } from '../../store/eventStore';
import { useUIStore } from '../../store/uiStore';
import { ProgressBar } from '../ui/ProgressBar';

/**
 * Mitra UI Bottom Control Console (Sims / Tycoon Style):
 * - Grounded bottom control console tray docked to screen bottom
 * - Tabbed view: [Team] | [Activity] | [Workload]
 * - Unobstructed 3D scene with natural workplace terminology (no AI slop)
 */
export const BottomConsole: React.FC = () => {
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const selectAgent = useAgentStore((s) => s.selectAgent);
  const visitAgent = useAgentStore((s) => s.visitAgent);
  const returnBossHome = useAgentStore((s) => s.returnBossHome);

  const tasks = useTaskStore((s) => s.tasks);
  const consoleTab = useUIStore((s) => s.consoleTab);
  const isConsoleOpen = useUIStore((s) => s.isConsoleOpen);
  const isRunMode = useUIStore((s) => s.isRunMode);

  const setConsoleTab = useUIStore((s) => s.setConsoleTab);
  const toggleConsoleOpen = useUIStore((s) => s.toggleConsoleOpen);
  const setActivePanel = useUIStore((s) => s.setActivePanel);
  const setCameraMode = useUIStore((s) => s.setCameraMode);
  const toggleRunMode = useUIStore((s) => s.toggleRunMode);

  const selectedAgent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId),
    [agents, selectedAgentId]
  );

  const activeTasksCount = useMemo(
    () => tasks.filter((t) => ['assigned', 'running', 'pending'].includes(t.status)).length,
    [tasks]
  );
  const completedTasksCount = useMemo(
    () => tasks.filter((t) => t.status === 'completed').length,
    [tasks]
  );
  const activeWorkersCount = useMemo(
    () => agents.filter((a) => a.status === 'working').length,
    [agents]
  );
  const loadPercent = agents.length > 0 ? Math.round((activeWorkersCount / agents.length) * 100) : 0;

  const handleSelectUnit = (id: string) => {
    selectAgent(id);
    const agent = agents.find((a) => a.id === id);
    if (agent?.isBoss) {
      setCameraMode('focus-boss');
    } else {
      setCameraMode('focus-agent');
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'idle':
        return 'bg-slate-300';
      case 'working':
      case 'running':
        return 'bg-blue-600';
      case 'completed':
        return 'bg-emerald-500';
      case 'thinking':
        return 'bg-amber-500';
      case 'error':
        return 'bg-rose-500';
      default:
        return 'bg-slate-300';
    }
  };

  const getRoomName = (role: string, isBoss: boolean) => {
    if (isBoss) return 'Executive Office';
    switch (role) {
      case 'coder':
        return 'Development Lab';
      case 'researcher':
        return 'Research Lab';
      case 'browser':
        return 'Web Research Lab';
      case 'data-analyst':
        return 'Data Analytics';
      case 'designer':
        return 'Design Studio';
      case 'writer':
        return 'Content Suite';
      case 'qa':
        return 'QA Testing Lab';
      default:
        return 'Studio Desk';
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-xl pointer-events-auto transition-all select-none">
      {/* 1. TOP TOOLBAR STRIP (Height: 40px) */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-slate-150 bg-slate-50/70 text-xs">
        {/* Left: Active Member Summary / Quick Actions */}
        <div className="flex items-center gap-3">
          {selectedAgent ? (
            <div className="flex items-center gap-2.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  selectedAgent.isBoss
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-200 text-slate-700 font-mono'
                }`}
              >
                {selectedAgent.isBoss ? <Award size={12} /> : selectedAgent.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{selectedAgent.name}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{getRoomName(selectedAgent.role, selectedAgent.isBoss)}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 capitalize">
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(selectedAgent.status)}`} />
                  {selectedAgent.status}
                </span>
              </div>

              {/* Quick Actions for Selected Unit */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <button
                  onClick={() => (selectedAgent.isBoss ? setCameraMode('focus-boss') : setCameraMode('focus-agent'))}
                  className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer active:scale-[0.98]"
                >
                  <Compass size={11} />
                  <span>Focus</span>
                </button>

                {selectedAgent.isBoss ? (
                  <button
                    onClick={returnBossHome}
                    className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-amber-800 text-[11px] font-medium flex items-center gap-1 cursor-pointer active:scale-[0.98]"
                  >
                    <RotateCcw size={11} />
                    <span>Return Desk</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setActivePanel('task-create')}
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer active:scale-[0.98]"
                    >
                      <Plus size={11} />
                      <span>Task</span>
                    </button>
                    <button
                      onClick={() => visitAgent(selectedAgent.id)}
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer active:scale-[0.98]"
                      title="Send Commander to visit this room"
                    >
                      <Footprints size={11} />
                      <span>Visit</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => setActivePanel('agent-detail')}
                  className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium flex items-center gap-1 cursor-pointer active:scale-[0.98]"
                  title="Open detailed inspector"
                >
                  <Info size={11} />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Office operational. Click any character or room to view.</span>
            </div>
          )}
        </div>

        {/* Center: Clean Tabs Switcher (Mitra UI Section 8) */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-md">
          <button
            onClick={() => setConsoleTab('fleet')}
            className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] ${
              consoleTab === 'fleet' && isConsoleOpen
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Users size={12} />
            <span>Team ({agents.length})</span>
          </button>

          <button
            onClick={() => setConsoleTab('activity')}
            className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] ${
              consoleTab === 'activity' && isConsoleOpen
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Clock size={12} />
            <span>Activity</span>
          </button>

          <button
            onClick={() => setConsoleTab('telemetry')}
            className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] ${
              consoleTab === 'telemetry' && isConsoleOpen
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <BarChart3 size={12} />
            <span>Workload ({loadPercent}%)</span>
          </button>
        </div>

        {/* Right: Quick Tools & Collapse Button */}
        <div className="flex items-center gap-2">
          {/* Run Mode Toggle Button */}
          <button
            onClick={toggleRunMode}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98] ${
              isRunMode
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
            }`}
            title="Toggle Sprint / Run Mode (Key R)"
          >
            <Footprints size={12} className={isRunMode ? 'text-amber-200' : 'text-slate-500'} />
            <span className="hidden md:inline">Run Mode</span>
            <kbd className={`px-1 rounded text-[9px] font-mono ${isRunMode ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-500'}`}>
              R
            </kbd>
          </button>

          {/* Assign Task Button */}
          <button
            onClick={() => setActivePanel('objective-input')}
            className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-xs flex items-center gap-1 cursor-pointer active:scale-[0.98]"
          >
            <Plus size={13} />
            <span>Assign Task</span>
            <kbd className="hidden lg:inline px-1 rounded text-[9px] font-mono bg-blue-900 text-blue-100">
              O
            </kbd>
          </button>

          <div className="h-4 w-px bg-slate-300" />

          {/* Tray Expand / Collapse Toggle */}
          <button
            onClick={toggleConsoleOpen}
            className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title={isConsoleOpen ? 'Collapse Console Tray' : 'Expand Console Tray'}
          >
            {isConsoleOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* 2. CONSOLE TRAY BODY (Height: ~135px, when open) */}
      {isConsoleOpen && (
        <div className="h-[135px] overflow-hidden bg-white">
          {/* TAB 1: TEAM ROSTER (The Sims Character Bar) */}
          {consoleTab === 'fleet' && (
            <div className="h-full flex items-center gap-3 px-4 overflow-x-auto custom-scrollbar">
              {agents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                const isWorking = agent.status === 'working';
                const room = getRoomName(agent.role, agent.isBoss);

                return (
                  <div
                    key={agent.id}
                    onClick={() => handleSelectUnit(agent.id)}
                    className={`w-[172px] shrink-0 h-[105px] p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600/20'
                        : agent.isBoss
                        ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50/70'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          agent.isBoss
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 font-mono border border-slate-200'
                        }`}
                      >
                        {agent.isBoss ? <Award size={14} /> : agent.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs truncate">{agent.name}</span>
                          {agent.isBoss && (
                            <span className="text-[9px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-1 rounded uppercase">
                              Lead
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{room}</div>
                      </div>
                    </div>

                    {/* Progress / Status Bottom Line */}
                    <div className="mt-1 pt-1.5 border-t border-slate-150">
                      {isWorking ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-blue-700">
                            <span>Working</span>
                            <span className="font-mono">{agent.progress}%</span>
                          </div>
                          <ProgressBar progress={agent.progress} color="#2563eb" size="sm" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-slate-500 capitalize">
                          <span className="text-slate-400 text-[10px] uppercase font-semibold">{agent.role}</span>
                          <span className="flex items-center gap-1 font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(agent.status)}`} />
                            <span>{agent.status}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Member Card */}
              <div
                onClick={() => setActivePanel('agent-create')}
                className="w-[120px] shrink-0 h-[105px] rounded-lg border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:text-slate-800 active:scale-[0.98]"
              >
                <Plus size={18} />
                <span className="text-xs font-semibold">Add Member</span>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY FEED */}
          {consoleTab === 'activity' && <ActivityFeed />}

          {/* TAB 3: WORKLOAD / STATS */}
          {consoleTab === 'telemetry' && (
            <div className="h-full px-6 py-3 flex items-center justify-between gap-6">
              {/* Utilization Card */}
              <div className="flex-1 max-w-sm space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Team Workload</span>
                  <span className="font-mono font-bold text-slate-900">{loadPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-blue-700 transition-all duration-300"
                    style={{ width: `${loadPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeWorkersCount} of {agents.length} members currently working on tasks.
                </div>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Working Now</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {activeWorkersCount} <span className="text-xs font-normal text-slate-400">/ {agents.length}</span>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Tasks</div>
                  <div className="text-base font-bold font-mono text-blue-700 mt-0.5">{activeTasksCount}</div>
                </div>

                <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Done Tasks</div>
                  <div className="text-base font-bold font-mono text-emerald-700 mt-0.5">{completedTasksCount}</div>
                </div>

                <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Office State</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1.5 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Ready
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </footer>
  );
};

// Sub-component for Activity Feed inside the Console
function ActivityFeed() {
  const events = useEventStore((s) => s.events);
  const recentEvents = React.useMemo(() => events.slice(0, 30), [events]);

  return (
    <div className="h-full px-4 py-2 overflow-y-auto custom-scrollbar text-xs">
      {recentEvents.length === 0 ? (
        <div className="text-slate-400 text-center py-8">
          No recent activity. Assign a task to observe team progress.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {recentEvents.map((ev) => (
            <div key={ev.id} className="p-2 rounded bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <span className="font-mono text-[10px] text-slate-400 shrink-0 mt-0.5">
                {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="text-slate-700 truncate leading-snug">{ev.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
