import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Menu, Download, Upload, Sun, Moon, Maximize2, X, Printer, Zap, FileText, Layout, Type, Settings, Braces
} from 'lucide-react';
import { useResume, ResumeProvider } from '../Modern/context/ResumeContext';
import { useAtsScore } from '../hooks/useAtsScore';
import { useResumeActions } from '../hooks/useResumeActions';
import { useSplitPane } from '../hooks/useSplitPane';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import AdSenseAd from '../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../MainConstant.js';
import { isDevelopmentMode, TAB_META } from './V5Constants';

import V5Navbar from './components/V5Navbar';
import V5Sidebar from './components/V5Sidebar';

// Lazy Loaded Components for Tree Shaking & Performance Optimization
const TypographyTab = lazy(() => import('./components/tabs/TypographyTab'));
const SettingsTab = lazy(() => import('./components/tabs/SettingsTab'));
const HelpTab = lazy(() => import('./components/tabs/HelpTab'));
const AboutTab = lazy(() => import('./components/tabs/AboutTab'));
const V5JsonEditor = lazy(() => import('./components/V5JsonEditor'));
const EditorForm = lazy(() => import('../components/editor/EditorForm'));
const TemplateSelector = lazy(() => import('../Modern/components/editor/TemplateSelector'));
const PrintAdModal = lazy(() => import('./components/PrintAdModal'));
const V5WipeModal = lazy(() => import('./components/V5WipeModal'));

// Synchronous import specifically for the Print Buffer to avoid lazy-loading race conditions
import ModernLivePreview from '../Modern/components/preview/ModernLivePreview';

// Premium Shimmer Loading Skeleton
const TabLoadingSkeleton = () => (
  <div className="w-full h-full p-4 sm:p-6 space-y-8 animate-pulse text-center flex flex-col items-center justify-center">
    <div className="w-full h-32 bg-slate-200/20 dark:bg-white/5 rounded-[3rem]" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-slate-200/10 dark:bg-white/5 rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);

const V5EditorContent = () => {
  const {
    resumeData, updateField, setResumeData, toggleAts, toggleTheme,
    updateStorageType, resetResume, setEditorStyle
  } = useResume();

  const [activeTab, setActiveTab] = useState('content');
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const navigate = useNavigate();

  const atsScore = useAtsScore(resumeData);
  const { splitWidth, isResizing, setIsResizing, isDesktop } = useSplitPane(50, isSidebarCollapsed);
  const { handleExportJSON, handleImportJSON, handlePrint } = useResumeActions(resumeData, setResumeData);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrintAd, setShowPrintAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(7);
  const [downloadIntent, setDownloadIntent] = useState('print'); // 'print' | 'download'
  const [previewMode, setPreviewMode] = useState('preview');

  const navbarFileInputRef = React.useRef(null);
  const settingsFileInputRef = React.useRef(null);
  const previewRef = React.useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('v5_onboarding_completed');
    if (!hasVisited) setShowOnboarding(true);
    setEditorStyle('liquid');
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('v5_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const triggerDownload = (intent = 'print') => {
    setDownloadIntent(intent);
    if (isDevelopmentMode) {
      finalizePrintAction();
      return;
    }
    setShowPrintAd(true);
    setAdCountdown(7);
  };

  const finalizePrintAction = () => {
    setShowPrintAd(false);

    // Increased timeout to ensure the buffer is fully visible to the browser's print engine
    setTimeout(async () => {
      const fileName = resumeData.fullName ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume` : 'Resume';

      if (downloadIntent === 'download') {
        const { downloadPdf } = await import('../Modern/utils/pdfGenerator');
        const printBuffer = document.getElementById('print-buffer');
        if (printBuffer) {
          try {
            await downloadPdf(printBuffer, `${fileName}.pdf`);
          } catch (err) {
            console.error("PDF generation failed:", err);
            window.print(); // Fallback to print
          }
        }
      } else {
        const originalTitle = document.title;
        document.title = fileName;
        window.print();
        setTimeout(() => {
          document.title = originalTitle;
        }, 1000);
      }
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        triggerDownload('print');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeData, downloadIntent]);

  // Advertisement Countdown Timer Logic
  useEffect(() => {
    let timer;
    if (showPrintAd && adCountdown > 0) {
      timer = setInterval(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    } else if (showPrintAd && adCountdown === 0) {
      // Auto-trigger finalize is sometimes annoying, but let's keep it consistent
      // Actually, standard behavior usually waits for user to click button in modal
    }
    return () => clearInterval(timer);
  }, [showPrintAd, adCountdown]);

  const activeColor = resumeData.themeColor || '#0ea5e9';

  // Helper to convert hex to rgb for glow effects
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '14, 165, 233';
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--v5-bg)] text-[var(--v5-text)] selection:bg-blue-500/30 font-sans print:h-auto print:bg-white print:overflow-visible overflow-hidden"
      style={{ '--v5-accent': activeColor, '--v5-accent-rgb': hexToRgb(activeColor) }}>

      {showOnboarding && (
        <div className="fixed inset-0 z-[200] bg-[var(--v5-bg)]/80 backdrop-blur-2xl animate-in fade-in duration-1000 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-8 sm:p-12 rounded-[3.5rem] bg-[var(--v5-card)] border border-black/5 dark:border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: activeColor }} />
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-black/5 dark:bg-white/5 animate-bounce mb-4">
                <Zap size={48} style={{ color: activeColor }} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight text-[var(--v5-heading)]">Welcome to Resume Builder</h2>
                <p className="text-slate-500 text-lg leading-relaxed">Experience our most advanced builder yet. Professional-grade resume builder with real-time ATS optimization.</p>
              </div>
              <button onClick={completeOnboarding} className="px-12 py-5 rounded-full text-white font-black uppercase tracking-[0.2em] shadow-xl" style={{ backgroundColor: activeColor }}>Start Building</button>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <PrintAdModal
          showPrintAd={showPrintAd}
          adCountdown={adCountdown}
          finalizePrintAction={finalizePrintAction}
          onClose={() => setShowPrintAd(false)}
          activeColor={activeColor}
        />
      </Suspense>

      <V5Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeColor={activeColor}
        triggerDownload={() => triggerDownload('print')}
        handleExportJSON={handleExportJSON}
        handleImportJSON={handleImportJSON}
        navbarFileInputRef={navbarFileInputRef}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--v5-card)]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-40 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col p-2 text-[10px] font-black uppercase tracking-[0.2em] space-y-0.5">
            {[
              { id: 'content', label: 'Editor' },
              { id: 'typography', label: 'Typeface' },
              { id: 'layout', label: 'Structure' },
              { id: 'help', label: 'Help' },
              { id: 'about', label: 'About Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`py-2.5 text-left px-6 rounded-xl transition-all ${activeTab === item.id ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
                style={{ color: activeTab === item.id ? 'var(--v5-heading)' : 'var(--v5-text)' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Import/Export Quick Actions */}
          <div className="p-3 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
            <h4 className="text-[6.5px] font-black uppercase tracking-[0.2em] text-slate-400 text-center mb-3 opacity-50">Resume Snapshot Ops</h4>
            <div className="grid grid-cols-3 gap-1">
              <button 
                onClick={() => { handleExportJSON(); setIsMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span className="text-[6px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center h-3 flex items-center">Export</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm active:scale-95 transition-all">
                  <Download size={16} />
                </div>
              </button>

              <button 
                onClick={() => { navbarFileInputRef.current?.click(); setIsMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span className="text-[6px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center h-3 flex items-center">Import</span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm active:scale-95 transition-all">
                  <Upload size={16} />
                </div>
              </button>

              <button 
                onClick={() => { triggerDownload(); setIsMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span className="text-[6px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center h-3 flex items-center">Resume</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm active:scale-95 transition-all"
                  style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}30` }}>
                  <FileText size={16} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 print:h-auto print:block relative z-10 overflow-hidden">
        <V5Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={activeColor}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          atsScore={atsScore}
        />

        <main
          className="flex-1 h-full overflow-y-auto bg-[var(--v5-canvas)]/10 lg:bg-[var(--v5-canvas)]/25 pt-8 pb-[calc(110px+env(safe-area-inset-bottom))] lg:pt-14 lg:pb-16 px-0 custom-scrollbar print:hidden lg:m-4 lg:rounded-[2.5rem] lg:border lg:border-black/5 dark:lg:border-white/5 shadow-sm"
          style={isDesktop ? { width: `${splitWidth}%` } : { width: '100%' }}
        >
          <div className="max-w-[1400px] mx-auto min-h-full">
            <div className="min-h-full rounded-2xl sm:rounded-[3rem] bg-[var(--v5-card)]/50 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] px-1.5 sm:px-6 lg:px-8 py-6 relative">
              <Suspense fallback={null}>
                <V5WipeModal
                  isOpen={showWipeConfirm}
                  onClose={() => setShowWipeConfirm(false)}
                  onConfirm={resetResume}
                  title="Wipe Engine Cache?"
                  description="This will erase all your resume data and reset the structural blueprint to factory defaults."
                />
              </Suspense>

              <Suspense fallback={<TabLoadingSkeleton />}>
                {activeTab === 'content' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-4 p-4 sm:p-6 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block">
                      <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" />
                    </div>
                    <EditorForm />
                    <div className="p-10 rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 flex flex-col items-center text-center justify-center min-h-[220px]">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg">
                        <span className="text-3xl font-black" style={{ fontFamily: 'Absans, sans-serif', color: activeColor }}>qp</span>
                      </div>
                      <h3 className="text-3xl font-black text-[var(--v5-heading)] opacity-90" style={{ fontFamily: 'Absans, sans-serif' }}>qpkendra</h3>
                      <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Crafted with <span className="text-blue-500 text-sm inline-block animate-pulse mx-1">💙</span> in India</p>
                    </div>
                  </div>
                )}

                {activeTab === 'layout' && <TemplateSelector />}
                {activeTab === 'typography' && <TypographyTab activeColor={activeColor} />}

                {activeTab === 'json' && (
                  <div className="h-full flex flex-col space-y-4 px-1 sm:px-6">
                    <V5JsonEditor data={resumeData} onUpdate={setResumeData} activeColor={activeColor} className="flex-1" />
                  </div>
                )}

                {activeTab === 'snapshots' && (
                  <SettingsTab
                    activeColor={activeColor}
                    handleExportJSON={handleExportJSON}
                    handleImportJSON={handleImportJSON}
                    settingsFileInputRef={settingsFileInputRef}
                    setShowWipeConfirm={setShowWipeConfirm}
                  />
                )}

                {activeTab === 'help' && <HelpTab activeColor={activeColor} />}
                {activeTab === 'about' && <AboutTab activeColor={activeColor} />}
              </Suspense>
            </div>
          </div>
        </main>

        <div
          onMouseDown={() => setIsResizing(true)}
          className="hidden xl:flex w-1.5 hover:w-2 bg-transparent cursor-col-resize relative z-50 group items-center justify-center"
        >
          <div className="w-px h-10 bg-black/5 dark:bg-white/10 group-hover:bg-amber-500/50 rounded-full transition-colors" />
        </div>

        <section
          className="hidden xl:flex border-l border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col p-4 lg:p-8 shadow-2xl overflow-hidden relative"
          style={isDesktop ? { width: `${100 - splitWidth}%` } : {}}
        >
          <div className="flex items-center justify-between mb-4 px-4 h-12 print:hidden">
            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-black/5 dark:border-white/5">
              {['preview', 'json'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${previewMode === mode ? 'bg-white dark:bg-slate-700 text-[var(--v5-heading)] shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <button onClick={() => setIsEnlarged(true)} className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-slate-500 hover:text-[var(--v5-heading)]">
              <Maximize2 size={16} />
            </button>
          </div>

          <div className="flex-1 min-h-0 relative overflow-hidden">
            <Suspense fallback={<TabLoadingSkeleton />}>
              {previewMode === 'preview' ? (
                <div className="h-full overflow-y-auto custom-scrollbar print:hidden bg-[var(--v5-canvas)]/30">
                  <div className="w-full min-h-full py-8 lg:py-12">
                    <ModernLivePreview contentRef={previewRef} />
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl flex flex-col bg-[#050A0F] print:hidden">
                  <V5JsonEditor data={resumeData} onUpdate={setResumeData} activeColor={activeColor} className="flex-1" />
                </div>
              )}
            </Suspense>
          </div>
        </section>
      </div>

      {/* Synchronous Background Print Buffer: Ensures zero-latency printing from any tab */}
      <div id="print-buffer" className="hidden print:block bg-white" aria-hidden="true">
        <ModernLivePreview />
      </div>

      {isEnlarged && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col print:bg-white print:backdrop-blur-none">
          <div className="flex items-center justify-between py-1.5 px-6 border-b border-white/10 print:hidden">
            <div className="flex items-center gap-3 text-white">
              <Zap size={18} className="text-amber-400" />
              <h3 className="text-sm font-black tracking-tight">Preview Mode</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerDownload('print')}
                className="px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
                style={{ backgroundColor: activeColor, boxShadow: `0 0 20px ${activeColor}40` }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <Printer size={14} className="group-hover:rotate-12 transition-transform" />
                Final Print
              </button>
              <button onClick={() => setIsEnlarged(false)} className="p-2 bg-white/10 text-white rounded-full"><X size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-12 lg:max-w-6xl lg:mx-auto w-full print:p-0 print:max-w-none">
            <Suspense fallback={<TabLoadingSkeleton />}>
              <div className="print:block print:w-full">
                <ModernLivePreview contentRef={previewRef} />
              </div>
            </Suspense>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - Liquid Dock */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] print:hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="bg-black/80 dark:bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center justify-around shadow-2xl">
          {[
            { id: 'content', icon: FileText, label: 'Content' },
            { id: 'layout', icon: Layout, label: 'Layout' },
            { id: 'typography', icon: Type, label: 'Fonts' },
            { id: 'json', icon: Braces, label: 'JSON' },
            { id: 'snapshots', icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 relative transition-all rounded-2xl group ${activeTab === item.id ? 'bg-white/10 scale-105' : 'text-slate-400 opacity-60 hover:opacity-100 hover:bg-white/5'}`}
              style={activeTab === item.id ? { color: activeColor } : {}}
            >
              <item.icon size={18} className="mb-1" />
              <span className="text-[8px] font-black uppercase tracking-widest leading-none xs:block hidden">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: activeColor, color: activeColor }} />
              )}
            </button>
          ))}
          <div className="w-px h-8 bg-white/10 mx-1" />
          <button onClick={() => triggerDownload('print')} className="p-2 xs:p-3 rounded-full text-white hover:bg-white/10 transition-colors" title="Print/Download PDF">
            <Printer size={20} />
          </button>
          <button onClick={() => setIsEnlarged(true)} className="p-2 xs:p-3 rounded-full text-white bg-white/10 ml-1 hover:scale-110 transition-transform">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const V5Editor = () => (
  <V5EditorContent />
);

export default V5Editor;
