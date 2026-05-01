"use client";

import React from 'react';
import { useResume } from '../../Modern/context/ResumeContext';

/**
 * AtsToggle - A premium switch to toggle ATS optimization mode.
 * 
 * @param {string} accentColor - Color used when the toggle is active.
 * @param {string} className - Optional styling classes.
 */
const AtsToggle = ({ accentColor = '#3b82f6', className = "" }) => {
  const { resumeData, toggleAts } = useResume();
  const isActive = resumeData.atsMode;

  return (
    <div 
      className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3 p-1 sm:p-1.5 min-w-[32px] sm:min-w-[auto] rounded-xl sm:rounded-full border transition-all duration-300 group cursor-pointer ${isActive ? 'border-transparent shadow-lg' : 'bg-white/5 border-black/5 dark:border-white/10'} ${className}`}
      style={isActive ? { backgroundColor: accentColor } : {}}
      onClick={toggleAts}
      title={isActive ? "Disable ATS Mode" : "Enable ATS Optimization Mode"}
    >
      <span className={`text-[7px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white' : 'text-slate-500'}`}>
        ATS
      </span>
      <div className={`w-6 h-3 sm:w-8 sm:h-4 rounded-full relative transition-all ${isActive ? 'bg-white/20 shadow-inner' : 'bg-slate-700/20'}`}>
        <div className={`absolute top-0.5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white transition-all shadow-sm ${isActive ? 'right-0.5' : 'left-0.5'}`} />
      </div>
    </div>
  );
};

export default AtsToggle;
