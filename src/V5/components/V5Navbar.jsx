import React from 'react';
import { Menu, Sun, Moon, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../assets/logo.png';
import { useResume } from '../../Modern/context/ResumeContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Smartphone } from 'lucide-react';
import { AtsToggle, ThemeToggle } from '../../components/shared';

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
  const { isInstallable, isInstalled, handleInstallClick } = usePWAInstall();

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
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer relative overflow-hidden"
            style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}60` }}>
            <Image 
              src={logo} 
              alt="QPkendra AI Resume Builder Logo" 
              width={20}
              height={20}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <h1 className="sr-only">Free ATS Resume Builder 2026 | Professional CV Maker & AI Resume Creator</h1>
          <div className="text-lg sm:text-xl font-black tracking-[-0.05em] text-[var(--v5-heading)] flex items-center gap-2 cursor-pointer" aria-hidden="true">
            <span className="hidden xs:inline">Resume Builder</span>
            <span className="hidden lg:inline font-light opacity-90">| QPkendra</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          {[
            { id: 'content', label: 'Editor' },
            { id: 'layout', label: 'Layout' },
            { id: 'help', label: 'Help' },
            { id: 'about', label: 'About Us' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative py-5 transition-all ${activeTab === item.id ? 'text-[var(--v5-heading)]' : 'text-slate-500 dark:text-slate-400 hover:text-[var(--v5-heading)]'}`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full z-0"
                  style={{ backgroundColor: activeColor }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
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

        <AtsToggle accentColor={activeColor} />

        <div className="flex items-center gap-3">
          {(isInstallable && !isInstalled) && (
            <div className="relative">
              <motion.div
                initial={{ y: 0 }}
                animate={{ 
                  x: [0, -2, 2, -2, 2, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-amber-500 text-white text-[7px] font-black rounded-full shadow-lg z-20 pointer-events-none whitespace-nowrap"
              >
                INSTALL
              </motion.div>
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all active:scale-95 group relative"
                aria-label="Install App"
              >
                <Smartphone size={14} className="group-hover:animate-bounce" />
                <span className="hidden xs:inline">App</span>
              </button>
            </div>
          )}

          <ThemeToggle />
        </div>

        <button
          onClick={triggerDownload}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
          style={{ backgroundColor: activeColor, boxShadow: `0 10px 25px -5px ${activeColor}50` }}
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline relative z-10">Resume</span>
        </button>
      </div>
    </nav>
  );
};

export default V5Navbar;
