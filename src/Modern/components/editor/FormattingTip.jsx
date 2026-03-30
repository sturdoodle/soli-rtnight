import React, { useState } from 'react';
import { Info, X, Bold, Italic, Underline, Link as LinkIcon, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const FormattingTip = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const tipItems = [
    { icon: Bold, label: 'Bold', syntax: '**text**' },
    { icon: Italic, label: 'Italic', syntax: '*text*' },
    { icon: Underline, label: 'Underline', syntax: '__text__' },
    { icon: LinkIcon, label: 'Link', syntax: '[title](url)' },
  ];

  return (
    <div className="mb-8 relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-sage-400 to-indigo-400 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative glass-panel p-6 border-sage-200/50 dark:border-sage-800/30 overflow-hidden">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1 hover:bg-sage-100 dark:hover:bg-sage-900/50 rounded-full transition-colors text-sage-400"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-sage-100 dark:bg-sage-900/50 p-2 rounded-xl text-sage-600 dark:text-sage-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sage-900 dark:text-white text-sm">Smart Formatting Tip</h3>
            <p className="text-[10px] text-sage-500 uppercase tracking-widest font-bold">Enhance your resume</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tipItems.map((item, index) => (
            <div key={index} className="bg-white/60 dark:bg-white/5 p-3 rounded-2xl border border-white dark:border-white/5 flex flex-col items-center text-center backdrop-blur-sm shadow-sm transition-all hover:bg-white/80 dark:hover:bg-white/10">
              <item.icon size={16} className="mb-2 text-sage-700 dark:text-sage-400" />
              <span className="text-[10px] font-bold text-sage-900 dark:text-zinc-300 mb-1">{item.label}</span>
              <code className="text-[9px] px-1.5 py-0.5 bg-sage-100/50 dark:bg-sage-900/30 text-sage-800 dark:text-sage-400 rounded border border-sage-200/50 dark:border-sage-800/50">
                {item.syntax}
              </code>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-sage-100 dark:border-sage-800/50 flex items-center gap-2">
          <Info size={12} className="text-sage-400" />
          <p className="text-[10px] text-sage-500 italic">
            Pro-tip: We automatically highlight <strong>metrics</strong> (40%, $500k) to make your wins pop!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormattingTip;
