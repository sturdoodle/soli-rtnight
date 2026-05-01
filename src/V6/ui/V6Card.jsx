import React from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

const V6Card = ({ title, description, children, icon: Icon, action, className = "", horizontal = false }) => {
  const VisualIcon = Icon || Circle;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div className={`flex ${horizontal ? 'flex-row flex-wrap items-center justify-between' : 'flex-col'} p-4 sm:p-8 gap-4 sm:gap-6`}>
        <div className={`flex items-start justify-between ${horizontal ? 'flex-grow basis-[240px] min-w-0' : 'w-full'}`}>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <VisualIcon size={16} className={`transition-colors ${Icon ? 'text-slate-400 group-hover:text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h3>
            </div>
            {description && (
              <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400 max-w-xl">
                {description}
              </p>
            )}
          </div>
          
          {action && !horizontal && (
            <div className="shrink-0 ml-4">
              {action}
            </div>
          )}
        </div>
        
        <div className={`${horizontal ? 'flex-grow basis-[300px] @md:basis-auto @md:shrink-0 @md:w-auto flex items-center gap-4 max-w-full' : 'w-full'}`}>
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>
          {action && horizontal && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default V6Card;
