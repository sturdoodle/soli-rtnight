import React from 'react';

const AtsScoreIndicator = ({ score, activeColor, collapsed = false }) => {
  if (collapsed) return null;

  return (
    <div className="p-6 rounded-[2.5rem] bg-[var(--v5-canvas)]/50 border border-black/5 dark:border-white/5 hidden lg:block shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.8)]"
            style={{ backgroundColor: activeColor }}
          />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global ATS</span>
        </div>
        <span className="text-xs font-black transition-all duration-300" style={{ color: activeColor }}>
          {score}%
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800/10 dark:bg-slate-800/40 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out shadow-lg"
          style={{
            width: `${score}%`,
            backgroundColor: activeColor,
            boxShadow: `0 0 12px ${activeColor}60`,
          }}
        />
      </div>
    </div>
  );
};

export default AtsScoreIndicator;
