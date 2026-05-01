"use client";

import React, { useState } from 'react';
import { Info, X, Bold, Italic, Underline, Link as LinkIcon, Sparkles, Download } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import GlassCard from '../ui/GlassCard';

const FormattingTip = () => {
  const { resumeData } = useResume();
  const activeColor = resumeData.themeColor || '#0ea5e9';
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
      <div className="absolute -inset-1 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
        style={{ background: `linear-gradient(to right, ${activeColor}, #818cf8)` }}></div>
      <div className="relative glass-panel p-6 border-black/5 dark:border-white/5 overflow-hidden">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1 rounded-full transition-colors opacity-50 hover:opacity-100"
          style={{ color: activeColor }}
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl text-white shadow-lg"
            style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}40` }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm tracking-tight">Smart Formatting Tip</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 dark:opacity-90" style={{ color: activeColor }}>Enhance your resume</p>
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
      </div>
    </div>
  );
};

export default FormattingTip;

