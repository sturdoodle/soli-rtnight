"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useResume } from '../../Modern/context/ResumeContext';

/**
 * ThemeToggle - A premium, animated theme switcher used across the application.
 * 
 * @param {string} className - Optional styling classes.
 */
const ThemeToggle = ({ className = "" }) => {
  const { resumeData, toggleTheme } = useResume();
  const isDark = resumeData.themeMode === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className={`w-9 h-9 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 hover:scale-105 transition-all active:scale-95 shadow-sm group relative overflow-hidden flex items-center justify-center ${className}`}
    >
      <div className="relative z-10 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-[360deg]">
        {isDark ? (
          <Sun size={18} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
        ) : (
          <Moon size={18} className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
        )}
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl scale-150"
        style={{ backgroundColor: isDark ? '#f59e0b' : '#818cf8' }}
      />
    </button>
  );
};

export default ThemeToggle;
