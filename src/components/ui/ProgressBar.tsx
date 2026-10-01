import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'var(--accent-blue)', 
  size = 'md',
  showLabel = false 
}) => {
  const heightClass = size === 'sm' ? 'h-1' : 'h-2';
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full flex items-center gap-2">
      <div className={`flex-1 ${heightClass} bg-black/50 rounded-full overflow-hidden`}>
        <div 
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] font-mono text-text-secondary w-8 text-right">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
};
