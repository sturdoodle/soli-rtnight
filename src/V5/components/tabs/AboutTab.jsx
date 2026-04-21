import React from 'react';
import { Mail, Github, Globe, ExternalLink, User, Heart } from 'lucide-react';

const AboutTab = ({ activeColor }) => {
  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-10 rounded-[3.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 relative overflow-hidden flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] mb-8">
          <span className="text-4xl font-black" style={{ fontFamily: 'Absans, sans-serif', color: activeColor }}>qp</span>
        </div>
        <h3 className="text-4xl font-black text-[var(--v5-heading)] tracking-tight mb-2" style={{ fontFamily: 'Absans, sans-serif' }}>qpkendra</h3>
        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Digital Ecosystem Accelerator</p>
        
        <div className="flex items-center gap-6 mb-8">
          <a href="https://qpkendra.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Globe size={20} /></a>
          <a href="https://github.com/shyamguptaa" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Github size={20} /></a>
          <a href="mailto:shyamgupta29@gmail.com" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Mail size={20} /></a>
        </div>

        <p className="max-w-md text-[11px] text-slate-500 font-medium leading-relaxed">
          Resume Builder V5 Liquid represents our commitment to democratizing professional design. Built by engineers, for engineers, with a focus on speed, privacy, and structural integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-8 rounded-[3rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl"><Heart size={20} /></div>
            <h4 className="text-sm font-black text-[var(--v5-heading)] uppercase tracking-tight">Our Mission</h4>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            To provide a zero-barrier, pro-grade toolkit for job seekers globally. We believe your professional story should be told through beautiful, accessible, and ATS-optimized design.
          </p>
        </div>

        <div className="p-8 rounded-[3rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl"><User size={20} /></div>
            <h4 className="text-sm font-black text-[var(--v5-heading)] uppercase tracking-tight">Lead Developer</h4>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-4">
            Architected and maintained by <b>Shyam Gupta</b>. A Senior Frontend Engineer passionate about UX, performance, and clean code.
          </p>
          <a href="https://shyamgupta.pro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-[#0ea5e9] uppercase tracking-widest hover:underline">
            View Portfolio <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
