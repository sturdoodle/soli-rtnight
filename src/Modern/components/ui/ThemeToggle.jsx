import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const ThemeToggle = () => {
  const { resumeData, toggleTheme } = useResume();
  const themeMode = resumeData.themeMode;

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-sage-100 dark:bg-sage-900/40 text-sage-600 dark:text-sage-400 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm border border-sage-200 dark:border-sage-800/50"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            themeMode === 'dark' ? 'translate-y-[-120%] opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <Sun size={24} />
        </div>
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            themeMode === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
          }`}
        >
          <Moon size={24} />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
