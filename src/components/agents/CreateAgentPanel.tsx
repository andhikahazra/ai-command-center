import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import type { AgentRole } from '../../types/agent';
import { AGENT_ROLE_CONFIG } from '../../types/agent';
import { createNewAgent } from '../../services/agentService';
import { useEventStore } from '../../store/eventStore';
import { motion } from 'framer-motion';
import { X, UserPlus, Check } from 'lucide-react';

const WORKER_ROLES: AgentRole[] = [
  'researcher',
  'coder',
  'browser',
  'data-analyst',
  'writer',
  'designer',
  'qa',
  'database',
];

/**
 * Mitra UI Agent Deployment Modal (Form System Section 6):
 * - Clean modal with backdrop overlay
 * - Unified .field inputs with micro tags for capabilities
 * - Tactile action buttons
 */
export const CreateAgentPanel: React.FC = () => {
  const activePanel = useUIStore((state) => state.activePanel);
  const setActivePanel = useUIStore((state) => state.setActivePanel);

  const [name, setName] = useState('');
  const [role, setRole] = useState<AgentRole>('researcher');

  if (activePanel !== 'agent-create') return null;

  const config = AGENT_ROLE_CONFIG[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const agentName = name.trim() || `Agent-${Math.floor(Math.random() * 1000)}`;
    const agent = createNewAgent(agentName, role);

    useEventStore.getState().addEvent({
      type: 'AGENT_CREATED',
      agentId: agent.id,
      agentName: agent.name,
      message: `Deployed unit ${agent.name} (${AGENT_ROLE_CONFIG[role].label}) to operations floor`,
    });

    setActivePanel('none');
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs pointer-events-auto">
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        className="w-full max-w-md panel-card rounded-lg border border-slate-200 shadow-2xl bg-white overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <UserPlus size={16} className="text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Deploy New Agent Unit</h2>
          </div>
          <button
            onClick={() => setActivePanel('none')}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body (Mitra UI Section 6.3) */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Unit Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field font-medium"
              placeholder="e.g. Orion, Echo, Titan"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Specialized Role <span className="text-red-500">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AgentRole)}
              className="field"
            >
              {WORKER_ROLES.map((r) => (
                <option key={r} value={r}>
                  {AGENT_ROLE_CONFIG[r].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Default Tooling Matrix
            </label>
            <div className="flex flex-wrap gap-1.5">
              {config.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  <Check size={11} className="text-emerald-600" />
                  <span>{cap}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-150">
            <button
              type="button"
              onClick={() => setActivePanel('none')}
              className="btn btn-secondary px-3.5 py-1.5"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 py-1.5">
              Deploy Unit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
