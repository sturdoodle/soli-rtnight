import React from 'react';
import { Rocket, Sparkles, Zap, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

const HelpTab = ({ activeColor }) => {
  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-8 rounded-[3rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-widest mb-1">Knowledge Base</h4>
          <h3 className="text-3xl font-black text-[var(--v5-heading)] tracking-tight mb-4">Master the Ecosystem</h3>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-xl">
            Welcome to the V5 Liquid architectural framework. Our engine is designed for high-velocity career engineering. Learn how to leverage the full power of our real-time optimization protocols.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150"><Rocket size={120} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Sparkles, title: "ATS Intelligence", desc: "Our engine analyzes your content for keyword density and professional scoring in real-time. Fill in sections to increase your technical authority score.", color: "amber" },
          { icon: Zap, title: "Live Sync Engine", desc: "Every keystroke is indexed and synced to your preferred storage mode instantly. Transitions between editor modes are non-destructive and low-latency.", color: "blue" },
          { icon: ShieldCheck, title: "Privacy Protocol", desc: "Zero telemetry tracking. Your professional data never leaves your browser's execution context. We value structural privacy above all else.", color: "emerald" },
          { icon: Mail, title: "Technical Support", desc: "Encountered a bug or schema mismatch? Reach out to our lead dev at shyamgupta29@gmail.com for direct architectural assistance.", color: "indigo" }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 hover:bg-black/5 transition-all group">
            <div className={`p-3 rounded-2xl w-fit mb-4 bg-${item.color}-500/10 text-${item.color}-500 group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <h4 className="text-sm font-black text-[var(--v5-heading)] mb-1.5 uppercase tracking-tight">{item.title}</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[3rem] bg-[#0ea5e9]/5 border border-[#0ea5e9]/10 flex flex-col items-center text-center">
        <h4 className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-widest mb-4">Version Control</h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[var(--v5-heading)]">v5.0.0</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Stable Core</span>
          </div>
          <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[var(--v5-heading)]">2026</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Release Cycle</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-sm">
          Liquid Core is our most stable build. Major architectural updates are pushed quarterly with security patches as needed.
        </p>
      </div>
    </div>
  );
};

export default HelpTab;
