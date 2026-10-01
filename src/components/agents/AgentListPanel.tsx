import React, { useMemo, useState } from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import { Plus, Crown, Search } from 'lucide-react';

/**
 * Mitra UI Fleet Directory Sidebar (App Shell Section 5.2):
 * - Grounded left sidebar from topbar to bottom edge
 * - Search filter, clean category dividers, and restrained status dots
 * - Tactile row items and deploy action
 */
export const AgentListPanel: React.FC = () => {
  const showAgentList = useUIStore((state) => state.showAgentList);
  const setActivePanel = useUIStore((state) => state.setActivePanel);
  const setCameraMode = useUIStore((state) => state.setCameraMode);

  const agents = useAgentStore((state) => state.agents);
  const selectAgent = useAgentStore((state) => state.selectAgent);
  const selectedAgentId = useAgentStore((state) => state.selectedAgentId);

  const [search, setSearch] = useState('');

  const boss = useMemo(() => agents.find((a) => a.isBoss), [agents]);
  const workers = useMemo(() => {
    return agents
      .filter((a) => !a.isBoss)
      .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()));
  }, [agents, search]);

  if (!showAgentList) return null;

  const handleAgentClick = (id: string) => {
    selectAgent(id);
    const targetAgent = agents.find((a) => a.id === id);
    if (targetAgent?.isBoss) {
      setCameraMode('focus-boss');
    } else {
      setCameraMode('focus-agent');
    }
    setActivePanel('agent-detail');
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

  return (
    <aside className="absolute top-12 bottom-0 left-0 w-64 border-r border-slate-200 bg-white flex flex-col pointer-events-auto z-30 shadow-xs">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-150">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter fleet units..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Directory List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar text-xs">
        {/* Command Lead Section */}
        {boss && !search && (
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Command Suite
            </div>
            <div
              onClick={() => handleAgentClick(boss.id)}
              className={`p-2 rounded-md cursor-pointer transition-all border active:scale-[0.99] ${
                selectedAgentId === boss.id
                  ? 'bg-amber-50/80 border-amber-300 text-slate-900 shadow-xs'
                  : 'border-slate-200/60 hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Crown size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 truncate">{boss.name}</span>
                    <span className="text-[10px] font-mono text-amber-700 font-bold uppercase">HQ</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 capitalize mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(boss.status)}`} />
                    <span>{boss.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operational Fleet Section */}
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Operations Units</span>
            <span className="font-mono">{workers.length}</span>
          </div>

          <div className="space-y-0.5">
            {workers.map((agent) => {
              const isSelected = selectedAgentId === agent.id;
              const isWorking = agent.status === 'working';

              return (
                <div
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className={`px-2.5 py-2 rounded-md cursor-pointer transition-all border active:scale-[0.99] ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 text-blue-950 font-medium'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono font-bold text-slate-600 shrink-0">
                      {agent.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-800">
                        <span className="truncate">{agent.name}</span>
                        {isWorking && (
                          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1 rounded border border-blue-200">
                            {agent.progress}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 capitalize mt-0.5">
                        <span className="truncate text-slate-500">{agent.role}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(agent.status)}`} />
                          <span className="text-[10px] text-slate-400">{agent.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Deploy Action */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <button
          onClick={() => setActivePanel('agent-create')}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus size={13} />
          <span>Deploy New Unit</span>
        </button>
      </div>
    </aside>
  );
};
