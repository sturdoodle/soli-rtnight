import React from 'react';
import { FileText, Layout, Type, Settings, Timer, BookOpen, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import SidebarItem from './SidebarItem';
import AtsScoreIndicator from '../../components/ui/AtsScoreIndicator';
import AdSenseAd from '../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../MainConstant.js';
import { useResume } from '../../Modern/context/ResumeContext';

const V5Sidebar = ({
  activeTab,
  setActiveTab,
  activeColor,
  isCollapsed,
  setIsCollapsed,
  atsScore
}) => {
  const { resumeData } = useResume();

  return (
    <aside className={`hidden lg:flex ${isCollapsed ? 'w-20' : 'w-72'} border-r border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col pt-4 print:hidden transition-[width] duration-300 relative h-full max-h-screen sticky top-0 overflow-y-auto custom-scrollbar`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-[var(--v5-card)] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:scale-110 transition-all z-10 hidden lg:flex text-slate-500 hover:text-[var(--v5-heading)]"
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`px-6 hidden lg:block transition-all duration-200 ease-in-out ${isCollapsed ? 'opacity-0 max-h-0 mb-0 overflow-hidden' : 'opacity-100 max-h-[200px] mb-4'}`}>
        <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-3 whitespace-nowrap">Resume Editor</h2>
        <div className="p-3 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-4 shadow-sm group cursor-pointer hover:bg-black/5 transition-all w-full overflow-hidden"
          style={{ backgroundColor: `${activeColor}05` }}>
          <div className="p-2.5 rounded-2xl text-white shadow-lg shrink-0"
            style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}40` }}>
            <Edit3 size={18} />
          </div>
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <span className="text-xs font-black text-[var(--v5-heading)] tracking-tight">Current Resume</span>
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5"
              style={{ color: activeColor }}>Live Editing</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 transition-all">
        <SidebarItem icon={FileText} label="Personal Info" active={activeTab === 'content'} onClick={() => setActiveTab('content')} activeColor={activeColor} collapsed={isCollapsed} />
        <SidebarItem icon={Layout} label="Layout" active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} activeColor={activeColor} collapsed={isCollapsed} />
        <SidebarItem icon={Type} label="Fonts" active={activeTab === 'typography'} onClick={() => setActiveTab('typography')} activeColor={activeColor} collapsed={isCollapsed} />
        <SidebarItem icon={Settings} label="Settings" active={activeTab === 'snapshots'} onClick={() => setActiveTab('snapshots')} activeColor={activeColor} collapsed={isCollapsed} />

        <div className="h-px bg-black/5 dark:border-white/5 my-2 mx-4" />
        
        {[
          { href: "https://timer.qpkendra.com", icon: Timer, label: "Timer", title: "Timer / Focus Mode" },
          { href: "https://mypdf.qpkendra.com/", icon: FileText, label: "My PDF", title: "My PDF Tools - PDF Conversion & Editing" },
          { href: "https://qpkendra.com", icon: BookOpen, label: "QPkendra", title: "QPKendra Main Site" }
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group"
          >
            <div className="p-2 rounded-xl transition-all group-hover:scale-110" style={{ color: activeColor, backgroundColor: `${activeColor}15` }}>
              <link.icon size={18} />
            </div>
            {!isCollapsed && (
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[var(--v5-heading)]">{link.label}</span>
            )}
          </a>
        ))}
      </nav>

      {resumeData.predictiveScoreEnabled && resumeData.atsMode && (
        <div className={`px-6 pt-6 transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 max-h-0 overflow-hidden p-0 pointer-events-none' : 'opacity-100 max-h-[500px]'}`}>
          <AtsScoreIndicator score={atsScore} activeColor={activeColor} collapsed={isCollapsed} />
        </div>
      )}

      {!isCollapsed && (
        <div className="px-6 mb-4 animate-in fade-in duration-300 delay-100">
          <div className="p-2 rounded-xl bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden min-h-[120px] ads-block shadow-sm group">
            <AdSenseAd
              client={ADSENSE_CLIENT_ID}
              slot={ADSENSE_INBETWEEN_SLOT_ID}
              format="auto"
              minHeight="120px"
              containerClassName="w-full opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      )}

      <div className={`mt-auto p-4 mb-2 flex flex-col items-center justify-center text-center transition-all duration-300 ${isCollapsed ? 'opacity-0 max-h-0 overflow-hidden scale-90' : 'opacity-100 max-h-[200px] scale-100'}`}>
        <h3 className="text-xl font-black tracking-[-0.05em] text-[var(--v5-heading)] opacity-80 dark:opacity-90 transition-opacity" style={{ fontFamily: 'Absans, sans-serif' }}>
          qpkendra
        </h3>
        <p className="text-[9px] font-bold text-slate-500 mt-1 tracking-wide">
          Crafted with <span className="text-blue-500 text-[11px] inline-block hover:scale-125 transition-transform cursor-default">💙</span> in India
        </p>
      </div>
    </aside>
  );
};

export default V5Sidebar;
