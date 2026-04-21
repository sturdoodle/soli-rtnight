import React from 'react';
import { Menu, Sun, Moon, Download, Upload } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useResume } from '../../Modern/context/ResumeContext';

const V5Navbar = ({
  activeTab,
  setActiveTab,
  activeColor,
  triggerDownload,
  handleExportJSON,
  handleImportJSON,
  navbarFileInputRef,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { resumeData, toggleAts, toggleTheme } = useResume();

  return (
    <nav className="h-16 border-b border-black/5 dark:border-white/5 bg-[var(--v5-card)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 print:hidden shadow-sm transition-all duration-500">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 font-bold group">
          <button
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-[var(--v5-heading)] transition-colors pr-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
            style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}60` }}>
            <img src={logo} alt="Logo" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <h1 className="text-lg sm:text-xl font-black tracking-[-0.05em] text-[var(--v5-heading)] flex items-center gap-2 cursor-pointer">
            <span className="hidden xs:inline">Resume Builder</span>
            <span className="hidden lg:inline font-light opacity-90">| QPkendra</span>
          </h1>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          {[
            { id: 'content', label: 'Editor' },
            { id: 'layout', label: 'Structure' },
            { id: 'help', label: 'Help' },
            { id: 'about', label: 'About Us' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`pb-5 pt-5 border-b-2 transition-all ${activeTab === item.id ? 'text-[var(--v5-heading)]' : 'text-slate-500 hover:text-[var(--v5-heading)]'}`}
              style={{ borderColor: activeTab === item.id ? activeColor : 'transparent' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex flex-row items-center gap-2 sm:gap-2 mr-2 hidden md:flex h-9">
          <button
            onClick={handleExportJSON}
            className="flex flex-row items-center gap-2 h-full px-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all group text-slate-500 hover:text-emerald-500 whitespace-nowrap"
            title="Export Backup (JSON)"
          >
            <Download size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap hidden xl:inline">Export</span>
          </button>

          <button
            onClick={() => navbarFileInputRef.current?.click()}
            className="flex flex-row items-center gap-2 h-full px-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group text-slate-500 hover:text-blue-500 cursor-pointer whitespace-nowrap"
            title="Import Snapshot (JSON)"
          >
            <Upload size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap hidden xl:inline">Import</span>
          </button>
          <input
            ref={navbarFileInputRef}
            type="file"
            className="hidden"
            accept=".json"
            onChange={handleImportJSON}
          />
        </div>

        <div className={`flex items-center gap-1.5 sm:gap-3 p-1.5 rounded-full border transition-all duration-300 group cursor-pointer ${resumeData.atsMode ? 'border-transparent shadow-lg' : 'bg-white/5 border-black/5 dark:border-white/10'}`}
          style={resumeData.atsMode ? { backgroundColor: activeColor } : {}}
          onClick={toggleAts}>
          <span className={`pl-2 pr-0.5 text-[9px] font-black uppercase tracking-widest transition-all ${resumeData.atsMode ? 'text-white' : 'text-slate-500'} hidden sm:inline`}>
            ATS
          </span>
          <div className={`w-8 h-4 rounded-full relative transition-all ${resumeData.atsMode ? 'bg-white/20 shadow-inner' : 'bg-slate-700/20'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${resumeData.atsMode ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="w-9 h-9 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 hover:scale-105 transition-all active:scale-95 shadow-sm group relative overflow-hidden flex items-center justify-center"
          >
            <div className="relative z-10 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-[360deg]">
              {resumeData.themeMode === 'dark' ? (
                <Sun size={18} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              ) : (
                <Moon size={18} className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
              )}
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl scale-150"
              style={{ backgroundColor: resumeData.themeMode === 'dark' ? '#f59e0b' : '#818cf8' }}
            />
          </button>
        </div>

        <button
          onClick={triggerDownload}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: activeColor, boxShadow: `0 10px 25px -5px ${activeColor}50` }}
        >
          <Download size={14} />
          <span className="hidden sm:inline">Resume</span>
        </button>
      </div>
    </nav>
  );
};

export default V5Navbar;
