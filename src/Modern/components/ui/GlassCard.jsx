import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const GlassCard = ({ children, className = '', title, icon: Icon, isCollapsible = false, defaultOpen = false, variant }) => {
  const { resumeData } = useResume();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const activeVariant = variant || resumeData.editorStyle || 'glass';
  const isLiquid = activeVariant === 'liquid';

  const toggle = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  const activeColor = resumeData.themeColor || '#0ea5e9';

  return (
    <div 
      className={`${isLiquid ? 'v5-glass' : 'glass-panel'} mb-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-2px] border rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden ${className} print:bg-white`}
      style={isLiquid ? {
        borderColor: isOpen ? `${activeColor}40` : 'rgba(0, 0, 0, 0.15)',
        boxShadow: isOpen 
          ? `0 20px 40px -15px ${activeColor}30, 0 0 15px -5px ${activeColor}20` 
          : 'var(--v5-shadow)',
        background: isOpen 
          ? (resumeData.themeMode === 'dark' ? 'rgba(13, 21, 28, 0.8)' : 'rgba(255, 255, 255, 0.95)')
          : 'var(--v5-glass-bg)'
      } : {}}
    >
      {title && (
        <div 
          className={`flex items-center justify-between px-4 sm:px-8 py-5 transition-all duration-200 ${isCollapsible ? 'cursor-pointer select-none group/card hover:bg-[var(--v5-canvas)]/50' : ''}`}
          onClick={toggle}
        >
          <div className="flex items-center gap-5">
            <div className={`p-3 rounded-2xl transition-all duration-500 ${isOpen ? '' : 'bg-black/5 dark:bg-white/5 shadow-inner'}`}
                 style={isOpen ? { backgroundColor: activeColor, color: 'white', boxShadow: `0 10px 20px -5px ${activeColor}40` } : {}}>
              {Icon && <Icon size={22} strokeWidth={2.5} />}
            </div>
            <h3 className={`modern-heading text-xl font-bold tracking-[-0.03em] transition-colors duration-300 ${isOpen ? (isLiquid ? 'text-[var(--v5-heading)]' : 'text-slate-900 dark:text-white') : 'text-slate-400'}`}>
              {title}
            </h3>
          </div>
          
          {isCollapsible ? (
            <div className={`transition-all duration-500 p-2 rounded-2xl ${isOpen ? 'rotate-180 bg-sage-50 dark:bg-sage-900/40 text-sage-600' : 'rotate-0 bg-transparent text-sage-300'} group-hover/card:bg-white dark:group-hover/card:bg-slate-800 shadow-sm border border-transparent group-hover/card:border-sage-100 dark:group-hover/card:border-white/10`}>
              <ChevronDown size={18} strokeWidth={3} />
            </div>
          ) : (
            <div className="h-1 w-1 rounded-full bg-sage-400 dark:bg-sage-600 opacity-30 animate-pulse" />
          )}
        </div>
      )}
      
      <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-4 sm:pb-8' : 'grid-rows-[0fr] opacity-0 invisible overflow-hidden'}`}>
        <div className="px-4 sm:px-8 relative z-10 overflow-hidden">
          {isOpen && <div className="h-px bg-sage-100 dark:bg-white/5 mb-6 sm:mb-8 -mx-4 sm:-mx-8" />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
