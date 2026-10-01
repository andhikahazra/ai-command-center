import React, { useState, useEffect, useRef } from 'react';
import { CheckSquare, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { simulationEngine } from '../../services/simulationEngine';
import { motion, AnimatePresence } from 'framer-motion';

const COMMON_OBJECTIVES = [
  {
    title: 'Full-Stack Architecture & Database Setup',
    category: 'BACKEND',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    title: 'Automated Code Quality & Unit Test Suite',
    category: 'TESTING',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    title: 'Technical Landscape & Competitor Benchmark',
    category: 'RESEARCH',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    title: 'Component Library & Design System Sync',
    category: 'DESIGN',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
];

export const ObjectiveInput: React.FC = () => {
  const activePanel = useUIStore((state) => state.activePanel);
  const setActivePanel = useUIStore((state) => state.setActivePanel);
  const [objective, setObjective] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isVisible = activePanel === 'objective-input';

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (objective.trim()) {
      simulationEngine.startObjective(objective.trim());
      setObjective('');
      setActivePanel('none');
    }
  };

  const handleSelectObjective = (text: string) => {
    simulationEngine.startObjective(text);
    setObjective('');
    setActivePanel('none');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/35 backdrop-blur-xs pointer-events-auto">
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-white rounded-lg border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Command Header & Input */}
            <form onSubmit={handleSubmit} className="flex items-center px-4 py-3.5 gap-3 border-b border-slate-150">
              <CheckSquare size={18} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Assign a goal or task to the team..."
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                {objective && (
                  <button
                    type="submit"
                    className="btn btn-primary px-2.5 py-1 text-xs"
                    title="Submit (Enter)"
                  >
                    <span>Assign</span>
                    <CornerDownLeft size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActivePanel('none')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </form>

            {/* Recommended Tasks List */}
            <div className="p-3 bg-slate-50/50">
              <div className="px-2 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Common Tasks
              </div>
              <div className="space-y-1">
                {COMMON_OBJECTIVES.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectObjective(item.title)}
                    className="w-full flex items-center justify-between p-2.5 rounded-md hover:bg-white border border-transparent hover:border-slate-200 transition-all text-left group cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${item.badge}`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                        {item.title}
                      </span>
                    </div>
                    <ArrowRight size={13} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-150 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400">
              <span>The Lead will coordinate and assign tasks to available members.</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500 font-mono text-[10px]">
                Esc to cancel
              </kbd>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
