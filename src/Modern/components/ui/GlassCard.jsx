import React, { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

const GlassCard = memo(({ 
  children, 
  className = '', 
  title, 
  icon: Icon, 
  isCollapsible = false, 
  defaultOpen = false, 
  variant = 'glass',
  themeColor = '#0ea5e9',
  themeMode = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isLiquid = variant === 'liquid';

  const toggle = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`${isLiquid ? 'v5-glass' : 'glass-panel'} mb-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform border rounded-[2rem] overflow-hidden ${className} print:bg-white`}
      style={isLiquid ? {
        borderColor: isOpen ? `${themeColor}40` : 'rgba(0, 0, 0, 0.1)',
        boxShadow: isOpen
          ? `0 25px 50px -12px ${themeColor}25, 0 0 20px -5px ${themeColor}15`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        background: isOpen
          ? (themeMode === 'dark' ? 'rgba(13, 21, 28, 0.85)' : 'rgba(255, 255, 255, 0.98)')
          : 'var(--v5-glass-bg)'
      } : {}}
    >
      {title && (
        <div
          className={`flex items-center justify-between px-5 py-3 transition-all duration-200 ${isCollapsible ? 'cursor-pointer select-none group/card hover:bg-[var(--v5-canvas)]/50' : ''}`}
          onClick={toggle}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl transition-all duration-500 ${isOpen ? '' : 'bg-black/5 dark:bg-white/5 shadow-inner'}`}
              style={isOpen ? { backgroundColor: themeColor, color: 'white', boxShadow: `0 10px 20px -5px ${themeColor}40` } : {}}>
              {Icon && <Icon size={20} strokeWidth={2.5} />}
            </div>
            <h3 className={`modern-heading text-xl font-bold tracking-[-0.03em] transition-colors duration-300 ${isOpen ? (isLiquid ? 'text-[var(--v5-heading)]' : 'text-slate-900 dark:text-white') : 'text-slate-400'}`}>
              {title}
            </h3>
          </div>

          {isCollapsible ? (
            <div className={`transition-all duration-500 p-2 rounded-xl ${isOpen ? 'rotate-180 bg-sage-50 dark:bg-sage-900/40 text-sage-600' : 'rotate-0 bg-transparent text-sage-300'} group-hover/card:bg-white dark:group-hover/card:bg-slate-800 shadow-sm border border-transparent group-hover/card:border-sage-100 dark:group-hover/card:border-white/10`}>
              <ChevronDown size={20} strokeWidth={3} />
            </div>
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-sage-400 dark:bg-sage-600 opacity-30 animate-pulse" />
          )}
        </div>
      )}

      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 invisible overflow-hidden'}`}>
        <div className={`px-6 relative z-10 ${isOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
          {isOpen && (
            <>
              <div className="h-px bg-slate-200/50 dark:bg-white/5 mb-4 -mx-6" />
              {children}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default GlassCard;
