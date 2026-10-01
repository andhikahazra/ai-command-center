import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckSquare } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import { createAndAssignTask } from '../../services/taskService';
import type { TaskPriority } from '../../types/task';

/**
 * Mitra UI Task Creation Form Card (Form System Section 6):
 * - Clean modal with backdrop overlay
 * - Unified .field inputs with mandatory asterisk indicators
 * - Tactile action buttons
 */
export const TaskCreatePanel: React.FC = () => {
  const activePanel = useUIStore((state) => state.activePanel);
  const setActivePanel = useUIStore((state) => state.setActivePanel);
  const getWorkers = useAgentStore((state) => state.getWorkers);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [assigneeId, setAssigneeId] = useState<string>('auto');

  if (activePanel !== 'task-create') return null;

  const idleWorkers = getWorkers().filter((w) => w.status === 'idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createAndAssignTask(
      title.trim(),
      description.trim() || undefined,
      priority,
      assigneeId === 'auto' ? undefined : assigneeId
    );

    setActivePanel('none');
    setTitle('');
    setDescription('');
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
            <CheckSquare size={16} className="text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Create Task Assignment</h2>
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
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field font-medium"
              placeholder="e.g. Optimize Database Indexes & Query Cache"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Description / Scope
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field h-20 resize-none font-normal"
              placeholder="Provide technical scope or expectations for the unit..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="field capitalize"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Assigned Unit
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="field"
              >
                <option value="auto">Auto-Match Unit</option>
                {idleWorkers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.role})
                  </option>
                ))}
              </select>
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
              Create & Assign
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
