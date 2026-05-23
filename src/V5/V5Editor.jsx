"use client";

import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Menu, Download, Upload, Sun, Moon, Maximize2, X, Printer, Zap, FileText, Layout, Type, Settings, Braces, Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useResume, ResumeProvider } from '../Modern/context/ResumeContext';
import { useAtsScore } from '../hooks/useAtsScore';
import { useResumeActions } from '../hooks/useResumeActions';
import { useSplitPane } from '../hooks/useSplitPane';
import { useRouter } from 'next/navigation';
import { usePWAInstall } from '../hooks/usePWAInstall';

import logo from '../assets/logo.png';
const AdSenseAd = lazy(() => import('../AdsenseAdsBlock.jsx'));
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../MainConstant.js';
import { TAB_META } from './V5Constants';
import { isDevelopmentMode } from '../lib/env';

import V5Navbar from './components/V5Navbar';
import V5Sidebar from './components/V5Sidebar';

// Lazy Loaded Components for Tree Shaking & Performance Optimization
const ModernLivePreview = lazy(() => import('../Modern/components/preview/ModernLivePreview'));
const TypographyTab = lazy(() => import('./components/tabs/TypographyTab'));
const SettingsTab = lazy(() => import('./components/tabs/SettingsTab'));
const HelpTab = lazy(() => import('./components/tabs/HelpTab'));
const AboutTab = lazy(() => import('./components/tabs/AboutTab'));
const V5JsonEditor = lazy(() => import('./components/V5JsonEditor'));
const EditorForm = lazy(() => import('../components/editor/EditorForm'));
const TemplateSelector = lazy(() => import('../Modern/components/editor/TemplateSelector'));
// Heavy UI Components - Lazy Loaded for 4G performance
const UniversalPrintModal = lazy(() => import('../components/shared/UniversalPrintModal'));
const OnboardingModal = lazy(() => import('../components/shared/OnboardingModal'));
const PWAInstallBanner = lazy(() => import('../components/shared/PWAInstallBanner'));
const V5WipeModal = lazy(() => import('./components/V5WipeModal'));

// Premium Shimmer Loading Skeleton
const TabLoadingSkeleton = () => (
  <div className="w-full h-full p-4 sm:p-8 space-y-10 animate-pulse flex flex-col">
    <div className="space-y-4">
      <div className="h-10 w-48 bg-slate-200/30 dark:bg-white/10 rounded-2xl" />
      <div className="h-4 w-full max-w-md bg-slate-200/20 dark:bg-white/5 rounded-xl" />
    </div>
    <div className="space-y-6 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-slate-200/10 dark:bg-white/5 space-y-4">
          <div className="h-6 w-1/4 bg-slate-200/20 dark:bg-white/10 rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-slate-200/10 dark:bg-white/5 rounded-xl" />
            <div className="h-12 bg-slate-200/10 dark:bg-white/5 rounded-xl" />
          </div>
          <div className="h-24 bg-slate-200/10 dark:bg-white/5 rounded-2xl" />
        </div>
      ))}
    </div>
  </div>
);

const V5EditorContent = ({ initialTab }) => {
  const {
    resumeData, updateField, setResumeData, toggleAts, toggleTheme,
    updateStorageType, resetResume, setEditorStyle
  } = useResume();

  const navigate = useRouter();

  // Map URL slugs to internal tab IDs
  const tabMap = {
    'editor': 'content',
    'template': 'layout',
    'setting': 'snapshots',
    'help': 'help',
    'aboutus': 'about'
  };

  const [activeTab, setActiveTab] = useState(tabMap[initialTab] || 'content');

  // Reverse map for URL synchronization
  const reverseTabMap = {
    'content': 'editor',
    'layout': 'template',
    'snapshots': 'setting',
    'help': 'help',
    'about': 'aboutus'
  };
  
  useEffect(() => {
    if (initialTab && tabMap[initialTab]) {
      setActiveTab(tabMap[initialTab]);
    }
  }, [initialTab]);

  // Synchronize URL with activeTab
  useEffect(() => {
    const slug = reverseTabMap[activeTab];
    if (slug) {
      const currentPath = window.location.pathname;
      const targetPath = `/${slug}`;
      // Only navigate if we are on a tab route (not home / or /v5)
      if (currentPath !== targetPath && !['/', '/v5'].includes(currentPath)) {
        navigate.push(targetPath, { scroll: false });
      }
    }
  }, [activeTab, navigate]);


  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  const atsScore = useAtsScore(resumeData);
  const { splitWidth, isResizing, setIsResizing, isDesktop } = useSplitPane(50, isSidebarCollapsed);
  const { handleExportJSON, handleImportJSON, handlePrint } = useResumeActions(resumeData, setResumeData);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrintAd, setShowPrintAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);
  const [downloadIntent, setDownloadIntent] = useState('print'); // 'print' | 'download'
  const [previewMode, setPreviewMode] = useState('preview');
  const { isInstallable, isInstalled, handleInstallClick } = usePWAInstall();

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
    setAdCountdown(10);
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
    <div className="flex flex-col fixed inset-0 bg-[var(--v5-bg)] text-[var(--v5-text)] selection:bg-blue-500/30 font-sans print:static print:h-auto print:bg-white print:overflow-visible overflow-hidden"
      style={{ '--v5-accent': activeColor, '--v5-accent-rgb': hexToRgb(activeColor), WebkitOverflowScrolling: 'touch' }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* 1. Surgical Hiding: Hide the entire document body */
          body {
            visibility: hidden !important;
            background: white !important;
          }

          /* 2. Precision Reveal: Only show the intended printable resume content */
          #print-buffer, 
          .printable-area {
            visibility: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: block !important;
          }

          /* 3. Recursive Reveal: Ensure all children of the resume are visible */
          #print-buffer *, 
          .printable-area * {
            visibility: visible !important;
          }

          /* 4. Absolute Suppression: Force-hide ads and UI elements even if they are children */
          .print-hidden, .ads-block, .adsense-wrapper, .print\\:hidden, .adsbygoogle, .no-print {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}} />

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={completeOnboarding}
        accentColor={activeColor}
      />

      <UniversalPrintModal
        isOpen={showPrintAd}
        countdown={adCountdown}
        onFinalize={finalizePrintAction}
        onClose={() => setShowPrintAd(false)}
        accentColor={activeColor}
      />

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
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--v5-card)]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-40 shadow-xl animate-in slide-in-from-top-2 max-h-[calc(100dvh-64px)] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col p-2 text-[10px] font-black uppercase tracking-[0.2em] space-y-0.5">
            {[
              { id: 'content', label: 'Editor' },
              { id: 'typography', label: 'Fonts' },
              { id: 'layout', label: 'Layout' },
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

          {/* Mobile Install Promotion */}
          {(isInstallable && !isInstalled) && (
            <div className="px-8 pt-2 pb-4">
               <motion.button 
                 initial={{ x: 0 }}
                 animate={{ x: [0, -1, 1, -1, 1, 0] }}
                 transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
                 onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
                 className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-between shadow-lg shadow-amber-500/20 group active:scale-95 transition-all"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                     <Smartphone size={20} />
                   </div>
                   <div className="text-left">
                     <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Install App</p>
                     <p className="text-[8px] font-medium opacity-80 dark:opacity-100 dark:text-orange-100 leading-none">Access your resumes offline</p>
                   </div>
                 </div>
                 <Zap size={16} className="opacity-50 animate-pulse" />
               </motion.button>
            </div>
          )}
          
          {/* Premium Mobile Quick Actions Redesign */}
          <div className="px-8 py-6 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Export', icon: Download, color: '#10b981', action: handleExportJSON, aria: 'Export resume backup as JSON' },
                { label: 'Import', icon: Upload, color: '#3b82f6', action: () => navbarFileInputRef.current?.click(), aria: 'Import resume snapshot from JSON' },
                { label: 'Resume', icon: FileText, color: activeColor, action: triggerDownload, aria: 'Download resume as PDF' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => { item.action(); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center gap-2.5 group"
                  aria-label={item.aria}
                >
                  <div 
                    className="w-12 h-12 rounded-[1.1rem] flex items-center justify-center text-white shadow-xl transition-all duration-300 group-active:scale-90 group-hover:scale-105"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 10px 20px -5px ${item.color}60`
                    }}
                  >
                    <item.icon size={20} className="drop-shadow-md" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400 group-active:opacity-70 transition-opacity">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 print:h-auto print:block relative z-20 min-h-0 overflow-hidden">
        <V5Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={activeColor}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          atsScore={atsScore}
        />

        <main
          className={`flex-1 min-h-0 overflow-y-auto bg-[var(--v5-canvas)]/10 lg:bg-[var(--v5-canvas)]/25 pt-4 pb-[calc(110px+env(safe-area-inset-bottom))] lg:pt-6 lg:pb-8 px-0 custom-scrollbar print:hidden lg:m-2 lg:rounded-2xl lg:border lg:border-black/5 dark:lg:border-white/5 shadow-sm overscroll-auto touch-pan-y ${isResizing ? 'transition-none' : 'transition-[width] duration-300'}`}
          style={isDesktop ? { width: `${splitWidth}%`, WebkitOverflowScrolling: 'touch' } : { width: '100%', WebkitOverflowScrolling: 'touch' }}
        >

          <div className="max-w-[1400px] mx-auto min-h-full">
            <div className="min-h-full rounded-xl sm:rounded-2xl bg-[var(--v5-card)]/50 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] px-1.5 sm:px-4 lg:px-6 py-4 relative">
              <Suspense fallback={null}>
                <V5WipeModal
                  isOpen={showWipeConfirm}
                  onClose={() => setShowWipeConfirm(false)}
                  onConfirm={resetResume}
                  title="Reset Resume Data?"
                  description="This will erase all your resume data and reset the resume structure to factory defaults."
                />
              </Suspense>
              
              <PWAInstallBanner className="print:hidden" />

              <Suspense fallback={<TabLoadingSkeleton />}>
                {activeTab === 'content' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-2 p-3 sm:p-4 rounded-2xl bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block min-h-[150px] print:hidden no-print">
                      <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" minHeight="150px" />
                    </div>
                    <EditorForm />
                    <div className="p-6 rounded-2xl bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 flex flex-col items-center text-center justify-center min-h-[160px] print:hidden no-print">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg">
                        <span className="text-3xl font-black" style={{ fontFamily: 'Absans, sans-serif', color: activeColor }}>qp</span>
                      </div>
                      <h3 className="text-3xl font-black text-[var(--v5-heading)] opacity-90" style={{ fontFamily: 'Absans, sans-serif' }}>qpkendra</h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">Crafted with <span className="text-blue-500 text-sm inline-block animate-pulse mx-1">💙</span> in India</p>
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
          onTouchStart={() => setIsResizing(true)}
          className={`hidden xl:flex w-2 hover:w-2.5 bg-transparent cursor-col-resize relative z-50 group items-center justify-center transition-all ${isResizing ? 'w-2.5' : ''}`}
        >
          <div className={`w-1 h-12 rounded-full transition-all duration-300 ${isResizing ? 'bg-amber-500 scale-y-125' : 'bg-black/5 dark:bg-white/10 group-hover:bg-amber-500/50'}`} />
          
          {/* Subtle Glow when resizing */}
          {isResizing && (
            <div className="absolute inset-0 bg-amber-500/5 blur-md -z-10" />
          )}
        </div>

        <section
          className={`hidden xl:flex border-l border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col p-4 lg:p-8 shadow-2xl overflow-hidden relative ${isResizing ? 'transition-none' : 'transition-[width] duration-300'}`}
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
        <Suspense fallback={null}>
          <ModernLivePreview />
        </Suspense>
      </div>

      {isEnlarged && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col print:bg-white print:backdrop-blur-none">
          <div className="flex items-center justify-between py-1.5 px-6 border-b border-white/10 print:hidden">
            <div className="flex items-center gap-3 text-white">
              <Zap size={18} className="text-amber-400" />
              <h3 className="text-sm font-black tracking-tight">Preview Mode</h3>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsEnlarged(false)} className="p-2 bg-white/10 text-white rounded-full"><X size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-12 lg:max-w-6xl lg:mx-auto w-full print:p-0 print:max-w-none overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
            <Suspense fallback={<TabLoadingSkeleton />}>
              <div className="print:block print:w-full">
                <ModernLivePreview contentRef={previewRef} />
              </div>
            </Suspense>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - Liquid Dock */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] print:hidden animate-in slide-in-from-bottom-4 duration-300">
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
          <button onClick={() => triggerDownload('print')} className="p-2 xs:p-3 rounded-full text-white hover:bg-white/10 transition-colors" title="Print/Download PDF" aria-label="Print or Download PDF">
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

const V5Editor = ({ tab }) => (
  <V5EditorContent initialTab={tab} />
);

export default V5Editor;
