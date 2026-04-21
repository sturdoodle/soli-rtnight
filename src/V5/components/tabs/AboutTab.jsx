import React from 'react';
import { Mail, Github, Globe, ExternalLink, User, Heart, Zap, FileUp, Timer, Landmark } from 'lucide-react';

const AboutTab = ({ activeColor }) => {
  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-10 rounded-[3.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 relative overflow-hidden flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] mb-8">
          <span className="text-4xl font-black" style={{ fontFamily: 'Absans, sans-serif', color: activeColor }}>qp</span>
        </div>
        <h3 className="text-4xl font-black text-[var(--v5-heading)] tracking-tight mb-2" style={{ fontFamily: 'Absans, sans-serif' }}>qpkendra</h3>
        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Professional Career Ecosystem</p>
        
        <div className="flex items-center gap-6 mb-8">
          <a href="https://qpkendra.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Globe size={20} /></a>
          <a href="https://github.com/qpkendra" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Github size={20} /></a>
          <a href="mailto:hello@qpkendra.com" className="p-4 bg-slate-500/5 hover:bg-slate-500/10 rounded-2xl transition-all hover:scale-110 text-slate-500 hover:text-[var(--v5-heading)]"><Mail size={20} /></a>
        </div>

        <p className="max-w-md text-[11px] text-slate-500 font-medium leading-relaxed">
          The Resume Builder represents our commitment to democratizing professional design. Built by engineers, for engineers, with a focus on speed, privacy, and document quality.
        </p>
      </div>

      {/* QPkendra Ecosystem Tree Section */}
      <div className="py-12 relative overflow-hidden">
        <div className="text-center mb-16 relative z-10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: activeColor }}>The QPkendra Network</h4>
          <h3 className="text-3xl font-black text-[var(--v5-heading)] tracking-tight">Ecosystem Architecture</h3>
        </div>

        <div className="relative max-w-2xl mx-auto px-4">
          {/* Vertical Trunk Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5 -translate-x-1/2 hidden md:block">
            <div className="absolute top-0 bottom-0 w-full animate-pulse" style={{ backgroundColor: `${activeColor}30` }} />
          </div>

          <div className="space-y-12 relative">
            {/* Root Node: qpkendra.com */}
            <div className="flex flex-col items-center relative z-10">
              <a href="https://qpkendra.com" target="_blank" rel="noopener noreferrer" 
                 className="group flex flex-col items-center transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center relative z-10 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all">
                  <Globe size={28} style={{ color: activeColor }} />
                  <div className="absolute inset-0 rounded-[1.5rem] animate-ping opacity-20" style={{ backgroundColor: activeColor }} />
                </div>
                <div className="mt-4 px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[var(--v5-heading)]">qpkendra.com</span>
                </div>
              </a>
            </div>

            {/* Subdomain Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16 relative">
              {[
                { url: "https://resume-builder.qpkendra.com", name: "Resume Builder", icon: Zap, side: "left", desc: "This Platform" },
                { url: "https://mypdf.qpkendra.com", name: "MyPDF Studio", icon: FileUp, side: "right", desc: "PDF Engineering" },
                { url: "https://timer.qpkendra.com", name: "QP Timer", icon: Timer, side: "left", desc: "Precision Timing" },
                { url: "https://bankifsccode.qpkendra.com", name: "Bank IFSC", icon: Landmark, side: "right", desc: "Financial Intelligence" }
              ].map((node, i) => (
                <div key={i} className={`flex flex-col items-center md:items-${node.side === 'left' ? 'end' : 'start'} relative group`}>
                  {/* Branch Line */}
                  <div className={`absolute top-8 ${node.side === 'left' ? 'right-1/2' : 'left-1/2'} w-1/4 h-px bg-black/5 dark:bg-white/5 hidden md:block group-hover:bg-opacity-50 transition-colors`}
                       style={{ backgroundColor: `${activeColor}20` }} />
                  
                  <a href={node.url} target="_blank" rel="noopener noreferrer" 
                     className={`flex flex-col items-center ${node.side === 'left' ? 'md:mr-16' : 'md:ml-16'} transition-all hover:scale-105`}>
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 shadow-lg flex items-center justify-center relative z-10 group-hover:border-[var(--v5-accent)]/30 transition-colors">
                      <node.icon size={22} className="text-slate-500 group-hover:text-[var(--v5-heading)] transition-colors" />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--v5-heading)]">{node.name}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{node.desc}</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
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
            <h4 className="text-sm font-black text-[var(--v5-heading)] uppercase tracking-tight">Core Development</h4>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-4">
            Designed and maintained by the <b>QPkendra Technical Team</b>. A collective focused on building high-performance professional career tools.
          </p>
          <a href="https://qpkendra.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-[#0ea5e9] uppercase tracking-widest hover:underline">
            Visit Ecosystem <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
