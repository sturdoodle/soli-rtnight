"use client";

import React from 'react';
import { Rocket, Sparkles, Zap, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

const HelpTab = ({ activeColor }) => {
  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-8 rounded-[3rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-widest mb-1">How to Use</h4>
          <h3 className="text-3xl font-black text-[var(--v5-heading)] tracking-tight mb-4">Features & Help</h3>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-xl">
            Welcome to the Resume Builder. Our platform is designed for fast and professional resume creation. Learn how to use all features and optimization tools.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150"><Rocket size={120} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Sparkles, title: "ATS Optimization", desc: "Our system analyzes your content for keyword density and professional scoring in real-time. Fill in sections to increase your ATS match score.", color: "amber" },
          { icon: Zap, title: "Real-time Auto-Save", desc: "Every keystroke is saved to your preferred storage mode instantly. Transitions between editor modes are safe and fast.", color: "blue" },
          { icon: ShieldCheck, title: "Data Privacy & Security", desc: "No data tracking. Your professional data never leaves your browser. We value data privacy above all else.", color: "emerald" },
          { icon: Mail, title: "Technical Support", desc: "Encountered a bug or need assistance? Reach out to our support team at hello@qpkendra.com for direct help.", color: "indigo" }
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
        <h4 className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-widest mb-4">App Version</h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[var(--v5-heading)]">v5.0.0</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Version</span>
          </div>
          <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[var(--v5-heading)]">2026</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Year</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-sm">
          Our App is our most stable build. Major updates are pushed quarterly with security patches as needed.
        </p>
      </div>

    </div>
  );
};

export default HelpTab;

