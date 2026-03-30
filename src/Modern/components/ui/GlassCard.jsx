import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GlassCard = ({ children, className = '', title, icon: Icon, isCollapsible = false, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`group/glass glass-panel mb-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:translate-y-[-2px] border border-white/60 dark:border-white/10 rounded-[2.5rem] overflow-hidden ${className} print:bg-white`}>
      {title && (
        <div 
          className={`flex items-center justify-between px-8 py-7 transition-all duration-300 ${isCollapsible ? 'cursor-pointer select-none group/card hover:bg-white/40 dark:hover:bg-white/5' : ''}`}
          onClick={toggle}
        >
          <div className="flex items-center gap-5">
            <div className={`p-3 rounded-[1.25rem] transition-all duration-300 ${isOpen ? 'bg-sage-600 text-white shadow-lg shadow-sage-600/30' : 'bg-sage-50 dark:bg-sage-900/50 text-sage-500 dark:text-sage-400'} shadow-inner`}>
              {Icon && <Icon size={24} strokeWidth={2.5} />}
            </div>
            <h3 className={`modern-heading text-2xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              {title}
            </h3>
          </div>
          
          {isCollapsible ? (
            <div className={`transition-all duration-500 p-2.5 rounded-2xl ${isOpen ? 'rotate-180 bg-sage-50 dark:bg-sage-900/40 text-sage-600' : 'rotate-0 bg-transparent text-sage-300'} group-hover/card:bg-white dark:group-hover/card:bg-slate-800 shadow-sm border border-transparent group-hover/card:border-sage-100 dark:group-hover/card:border-white/10`}>
              <ChevronDown size={20} strokeWidth={3} />
            </div>
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-sage-400 dark:bg-sage-600 opacity-30 animate-pulse" />
          )}
        </div>
      )}
      
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100 py-10 pt-0' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
        <div className="px-10 relative z-10">
          {isOpen && <div className="h-px bg-sage-100 dark:bg-white/5 mb-10 -mx-10" />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
