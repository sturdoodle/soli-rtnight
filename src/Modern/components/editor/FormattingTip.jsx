import React, { useState, memo } from 'react';
import { Info, X, Bold, Italic, Underline, Link as LinkIcon, Sparkles, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../../context/ResumeContext';

const FormattingTip = memo(() => {
  const { resumeData } = useResume();
  const activeColor = resumeData.themeColor || '#0ea5e9';
  const [isOpen, setIsOpen] = useState(false);

  const tipItems = [
    { icon: Bold, label: 'Bold', syntax: '**text**' },
    { icon: Italic, label: 'Italic', syntax: '*text*' },
    { icon: Underline, label: 'Underline', syntax: '__text__' },
    { icon: LinkIcon, label: 'Link', syntax: '[title](url)' },
  ];

  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-full overflow-hidden rounded-[24px] p-[1px] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            {/* Pulsing Attention Grabber Background */}
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20" />
            
            <div className="relative flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl px-5 py-3 rounded-[23px] border border-white/40 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 animate-ping rounded-full opacity-20" style={{ backgroundColor: activeColor }} />
                  <div className="relative p-1.5 rounded-lg text-white" style={{ backgroundColor: activeColor }}>
                    <Sparkles size={14} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">Smart Formatting Tips</span>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">Click to reveal markdown shortcuts & pro-tips</p>
                </div>
              </div>
              <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(15px)' }}
            className="relative group overflow-hidden rounded-[2rem]"
          >
            <div className="absolute -inset-1 rounded-[2rem] blur opacity-20"
              style={{ background: `linear-gradient(to right, ${activeColor}, #818cf8)` }}></div>
            
            <div className="relative glass-panel p-6 border-black/5 dark:border-white/5 rounded-[2rem]">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all group/close"
                style={{ color: activeColor }}
              >
                <X size={14} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl text-white shadow-lg"
                  style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}40` }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-sm tracking-tight">Smart Formatting Tips</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 dark:opacity-90" style={{ color: activeColor }}>Enhance your resume presence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tipItems.map((item, index) => (
                  <div key={index} className="bg-white/40 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col items-center text-center backdrop-blur-sm shadow-sm transition-all hover:bg-white/60 dark:hover:bg-white/10 group/item">
                    <item.icon size={16} className="mb-2 transition-colors" style={{ color: activeColor }} />
                    <span className="text-[10px] font-black text-slate-800 dark:text-white mb-1 uppercase tracking-wider">{item.label}</span>
                    <code className="text-[9px] px-1.5 py-0.5 rounded border transition-all font-bold"
                      style={{ 
                        backgroundColor: `${activeColor}20`, 
                        color: activeColor,
                        borderColor: `${activeColor}30` 
                      }}>
                      {item.syntax}
                    </code>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex flex-col gap-3">
                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-3">
                  <Info size={14} style={{ color: activeColor }} />
                  <p className="text-[10px] text-slate-600 dark:text-slate-200 leading-relaxed italic font-medium flex-1">
                    Pro-tip: We automatically highlight <strong style={{ color: activeColor }} className="dark:brightness-125">metrics</strong> (40%, $500k) to make your wins pop!
                  </p>
                </div>
                
                <div className="p-3.5 bg-black/5 dark:bg-white/10 rounded-2xl border border-black/5 dark:border-white/10 flex items-start gap-3">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg mt-0.5 shadow-sm">
                    <Download size={14} className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">Export Protocol</h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-200 leading-relaxed font-semibold">
                      Click the <span className="font-black text-slate-900 dark:text-white">"Resume"</span> button to save as PDF. 
                      <span className="ml-1 opacity-70 italic text-slate-500 dark:text-slate-400">Standard shortcut: Ctrl+P</span>
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-black/5 dark:bg-white/5 rounded-2xl border border-transparent hover:border-black/5 dark:hover:border-white/10"
              >
                <ChevronUp size={14} />
                Minimize Tips
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default FormattingTip;

