import React from 'react';
import { Layout } from 'lucide-react';
import { useResume } from '../../../Modern/context/ResumeContext';

const TypographyTab = ({ activeColor }) => {
  const { resumeData, updateField } = useResume();

  const fontOptions = [
    { name: 'Inter Architecture', desc: 'Modern, high-velocity technical sans.', font: 'Inter', type: 'Sans' },
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
    { name: 'Lora Elegant', desc: 'Sophisticated professional serif architecture.', font: 'Lora', type: 'Serif' },
    { name: 'Roboto Technical', desc: 'Precise engineering-grade monospace.', font: 'Roboto Mono', type: 'Mono' },
    { name: 'Outfit Modern', desc: 'Clean, approachable geometric typeface.', font: 'Outfit', type: 'Sans' }
  ];

  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Architectural Typeface</h3>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
          Global document font replacement. Selecting a new typeface will re-index all headers, body text, and semantic metadata across your resume to maintain a unified visual hierarchy and aesthetic intent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => updateField('fontFamily', 'Default')}
          className={`py-4 px-5 rounded-[1.25rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${resumeData.fontFamily === 'Default' || !resumeData.fontFamily ? 'border-[var(--v5-accent)] shadow-[0_4px_15px_-5px_var(--v5-accent)] scale-[1.01]' : 'border-black/5 dark:border-white/5 hover:scale-[1.02]'}`}
          style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { borderColor: activeColor } : {}}
        >
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-500/10 rounded-lg"><Layout size={14} className="text-slate-500" /></div>
              <h4 className="text-sm font-black text-[var(--v5-heading)]">System Default</h4>
            </div>
            <div className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'text-white' : 'text-slate-400'}`}
              style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { backgroundColor: activeColor } : {}}>
              {(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'Active' : 'Restore'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 flex-1">Revert to the original architectural intent.</p>
            <span className="text-xs font-medium text-slate-400/50 select-none">AaBbCc 123</span>
          </div>
        </button>

        {fontOptions.map((f) => {
          const isActive = resumeData.fontFamily === f.font;
          return (
            <button
              key={f.name}
              onClick={() => updateField('fontFamily', f.font)}
              className={`py-4 px-5 rounded-[1.25rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${isActive ? 'border-[var(--v5-accent)] shadow-[0_4px_15px_-5px_var(--v5-accent)] scale-[1.01]' : 'border-black/5 dark:border-white/5 hover:scale-[1.02]'}`}
              style={isActive ? { borderColor: activeColor } : {}}
            >
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-[var(--v5-heading)]" style={{ fontFamily: f.font }}>{f.name}</h4>
                  <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-md bg-slate-500/5 text-slate-400 uppercase tracking-tighter border border-slate-500/10">{f.type}</span>
                </div>
                <div className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${isActive ? 'text-white' : 'text-[#0ea5e9]'}`}
                  style={isActive ? { backgroundColor: activeColor } : {}}>
                  {isActive ? 'Applied' : 'Select'}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 flex-1">{f.desc}</p>
                <span className="text-xs font-medium text-slate-400/50 select-none" style={{ fontFamily: f.font }}>AaBbCc 123</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypographyTab;
