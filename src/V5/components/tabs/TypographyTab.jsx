"use client";

import React from 'react';
import { Layout, AlertCircle } from 'lucide-react';
import { useResume } from '../../../Modern/context/ResumeContext';

const TypographyTab = ({ activeColor }) => {
  const { resumeData, updateField } = useResume();

  const fontOptions = [
    { name: 'Inter Modern', desc: 'Modern, high-velocity technical sans.', font: 'Inter', type: 'Sans' },
    { name: 'Satoshi Signature', desc: 'Modern & Minimal professional sans.', font: 'Satoshi', type: 'Sans' },
    { name: 'Geist Technical', desc: 'Clean & Tech industrial aesthetic.', font: 'Geist', type: 'Sans' },
    { name: 'Plus Jakarta Sans', desc: 'Friendly & Geometric accessibility.', font: 'PlusJakartaSans', type: 'Sans' },
    { name: 'Playfair Heritage', desc: 'Classic, high-contrast luxury serif.', font: 'Playfair Display', type: 'Serif' },
    { name: 'Poppins Modern', desc: 'Clean, versatile and approachable.', font: 'Poppins', type: 'Sans' },
    { name: 'Montserrat Classic', desc: 'Timeless geometric corporate sans.', font: 'Montserrat', type: 'Sans' },
    { name: 'Space Grotesk', desc: 'Eccentric, technical monospace-inspired.', font: 'Space Grotesk', type: 'Sans' },
    { name: 'Merriweather Focus', desc: 'High-readability news-grade serif.', font: 'Merriweather', type: 'Serif' },
    { name: 'Figtree Minimal', desc: 'Minimalist & Functional clarity.', font: 'Figtree', type: 'Sans' },
    { name: 'DM Sans Balanced', desc: 'Clear & Balanced editorial tone.', font: 'DMSans', type: 'Sans' },
    { name: 'Mona Sans Stylish', desc: 'Versatile & Stylish editorial presence.', font: 'MonaSans', type: 'Sans' },
    { name: 'Lora Professional Serif', desc: 'Sophisticated professional serif style.', font: 'Lora', type: 'Serif' },
    { name: 'Roboto Technical', desc: 'Precise engineering-grade monospace.', font: 'Roboto Mono', type: 'Mono' },
    { name: 'Outfit Modern', desc: 'Clean, approachable geometric typeface.', font: 'Outfit', type: 'Sans' }
  ];

  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Choose Your Font</h3>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6">
          Change the font for your entire resume. Selecting a new font will update all headings, body text, and information across your resume to maintain a consistent look and professional style.
        </p>
        
        {/* Enhanced ATS Priority Note */}
        <div className={`p-4 rounded-2xl border transition-all duration-300 ${resumeData.atsMode ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-blue-500/5 border-blue-500/20 shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-1.5 rounded-lg ${resumeData.atsMode ? 'bg-amber-500/20 text-amber-600' : 'bg-blue-500/20 text-blue-600'}`}>
              <AlertCircle size={14} className={resumeData.atsMode ? 'animate-bounce' : ''} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${resumeData.atsMode ? 'text-amber-600' : 'text-blue-600'}`}>
              Smart Auto-Format
            </span>
            {resumeData.atsMode && (
              <span className="ml-auto text-[8px] font-black bg-amber-500 text-white px-2.5 py-1 rounded-full animate-pulse shadow-lg shadow-amber-500/40">Active Override</span>
            )}
          </div>
          <p className={`text-[11px] leading-relaxed font-bold ${resumeData.atsMode ? 'text-amber-900/80 dark:text-amber-200/80' : 'text-slate-600 dark:text-slate-300'}`}>
            When <span className={resumeData.atsMode ? 'text-amber-600 underline decoration-2' : 'text-blue-600 font-black'}>ATS Optimizer</span> is active, the system enforces ATS standard fonts. Your selected font will be preserved in the editor but automatically replaced in the export to ensure 100% parsing accuracy.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2rem] overflow-hidden">
        {/* System Default Architecture */}
        <button
          onClick={() => updateField('fontFamily', 'Default')}
          className={`py-8 px-7 transition-all group relative text-left bg-[var(--v5-card)]/40 backdrop-blur-sm rounded-t-[2rem] md:rounded-tr-none md:rounded-tl-[2rem] ${resumeData.fontFamily === 'Default' || !resumeData.fontFamily ? 'font-tile-active bg-blue-500/5 dark:bg-blue-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Default Fonts</h4>
            {(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Active</span>
              </div>
            )}
          </div>
          <p className="text-2xl font-medium text-[var(--v5-heading)] leading-snug tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
            The quick brown fox jumps over the lazy dog
          </p>
          <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Original Style</span>
            <span className="text-[9px] font-mono text-slate-400">Aa-Zz 0-9</span>
          </div>
        </button>

        {fontOptions.map((f, index) => {
          const isActive = resumeData.fontFamily === f.font;
          const fontKey = f.font.toLowerCase().split(' ')[0];
          const fontClass = `v5-font-${fontKey}`;
          
          return (
            <button
              key={f.name}
              onClick={() => updateField('fontFamily', f.font)}
              className={`py-8 px-7 transition-all group relative text-left bg-[var(--v5-card)]/40 backdrop-blur-sm 
                ${index === 0 ? 'md:rounded-tr-[2rem]' : ''} 
                ${index === fontOptions.length - 2 ? 'md:rounded-bl-[2rem]' : ''} 
                ${index === fontOptions.length - 1 ? 'rounded-b-[2rem] md:rounded-bl-none' : ''}
                ${isActive ? 'font-tile-active bg-blue-500/5 dark:bg-blue-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{f.name}</h4>
                {isActive ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Applied</span>
                  </div>
                ) : (
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors">{f.type}</span>
                )}
              </div>
              
              <div className={`${fontClass} mb-4 transition-transform group-hover:translate-x-1 duration-500`}>
                <p className="text-2xl text-[var(--v5-heading)] leading-snug tracking-tight">
                  Everyone has the right to freedom of thought
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-[8px] text-slate-400 uppercase tracking-[0.15em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                  {f.desc.split(' ').slice(0, 3).join(' ')} Style
                </p>
                <span className="text-[9px] font-mono text-slate-300 dark:text-slate-600 group-hover:text-slate-400 transition-colors">Aa-Zz 0-9</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypographyTab;

