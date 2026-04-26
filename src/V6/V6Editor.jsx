import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../Modern/context/ResumeContext';
import V6Sidebar from './components/V6Sidebar';
import V6Header from './components/V6Header';
import V6Card from './ui/V6Card';
import V6ConfirmModal from './ui/V6ConfirmModal';
import V6ContactEditor from './components/editor/V6ContactEditor';
import V6SummaryEditor from './components/editor/V6SummaryEditor';
import V6SkillsEditor from './components/editor/V6SkillsEditor';
import V6ExperienceEditor from './components/editor/V6ExperienceEditor';
import V6EducationEditor from './components/editor/V6EducationEditor';
import V6ProjectsEditor from './components/editor/V6ProjectsEditor';
import V6CertificationsEditor from './components/editor/V6CertificationsEditor';
import V6PrintAdModal from './components/V6PrintAdModal';
import { templates } from '../Modern/layouts';
import { isDevelopmentMode } from '../V5/V5Constants';
import {
  Mail, Globe, Palette, Clock, Trash2, CheckCircle2, SplitSquareHorizontal,
  ChevronLeft, ChevronRight, Moon, Sun, RefreshCw, AlertTriangle, Download, Upload, FileCode, FileText,
  Check, Type, Sparkles, Box, Shield, Zap, Settings, Eye, Edit3, X, Maximize2, GripVertical, Printer
} from 'lucide-react';
import ModernLivePreview from '../Modern/components/preview/ModernLivePreview';
import { useSplitPane } from '../hooks/useSplitPane';
import { motion, AnimatePresence } from 'framer-motion';

const PREMIUM_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Slate', value: '#334155' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Crimson', value: '#991b1b' },
  { name: 'Royal', value: '#1e40af' },
];

const FONTS = [
  { id: 'Default', name: 'System Default', class: '' },
  { id: 'Inter', name: 'Inter Architecture', class: 'v5-font-inter' },
  { id: 'Satoshi', name: 'Satoshi Signature', class: 'v5-font-satoshi' },
  { id: 'Geist', name: 'Geist Technical', class: 'v5-font-geist' },
  { id: 'PlusJakartaSans', name: 'Plus Jakarta Sans', class: 'v5-font-plusjakartasans' },
  { id: 'Playfair Display', name: 'Playfair Heritage', class: 'v5-font-playfair' },
  { id: 'Poppins', name: 'Poppins Modern', class: 'v5-font-poppins' },
  { id: 'Montserrat', name: 'Montserrat Classic', class: 'v5-font-montserrat' },
  { id: 'Space Grotesk', name: 'Space Grotesk', class: 'v5-font-space' },
  { id: 'Merriweather', name: 'Merriweather Focus', class: 'v5-font-merriweather' },
  { id: 'Figtree', name: 'Figtree Minimal', class: 'v5-font-figtree' },
  { id: 'DMSans', name: 'DM Sans Balanced', class: 'v5-font-dmsans' },
  { id: 'MonaSans', name: 'Mona Sans Stylish', class: 'v5-font-monasans' },
  { id: 'Lora', name: 'Lora Elegant', class: 'v5-font-lora' },
  { id: 'Roboto Mono', name: 'Roboto Technical', class: 'v5-font-roboto' },
  { id: 'Outfit', name: 'Outfit Modern', class: 'v5-font-outfit' }
];

const V6Editor = () => {
  const { resumeData, updateField, toggleTheme, resetResume, setResumeData, updateTemplate, updateThemeColor } = useResume();
  const [activeSection, setActiveSection] = useState('contact');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState('preview');
  const [jsonValue, setJsonValue] = useState(JSON.stringify(resumeData, null, 2));
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Print & Ad Logic (V5 Parity)
  const [showPrintAd, setShowPrintAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);
  const fileInputRef = useRef(null);

  const { splitWidth, isResizing, setIsResizing, isDesktop } = useSplitPane(60, isSidebarCollapsed);

  const sectionsList = [
    'contact', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
    'templates', 'typography', 'appearance', 'settings'
  ];

  const themeColor = resumeData.themeColor || '#4f46e5';

  // Ad Countdown Timer Logic
  useEffect(() => {
    let timer;
    if (showPrintAd && adCountdown > 0) {
      timer = setInterval(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPrintAd, adCountdown]);

  const triggerDownload = () => {
    if (isDevelopmentMode) {
      finalizePrintAction();
      return;
    }
    setShowPrintAd(true);
    setAdCountdown(10);
  };

  const finalizePrintAction = () => {
    setShowPrintAd(false);
    setTimeout(() => {
      const fileName = resumeData.fullName ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume` : 'Resume';
      const originalTitle = document.title;
      document.title = fileName;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    if (isDesktop) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (previewMode !== 'json') {
      setJsonValue(JSON.stringify(resumeData, null, 2));
    }
  }, [resumeData, previewMode]);

  const handleJsonChange = (val) => {
    setJsonValue(val);
    try {
      const parsed = JSON.parse(val);
      setResumeData(parsed);
    } catch (e) { }
  };

  const navigateToSection = (direction) => {
    const idx = sectionsList.indexOf(activeSection);
    if (direction === 'next' && idx < sectionsList.length - 1) {
      setActiveSection(sectionsList[idx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'prev' && idx > 0) {
      setActiveSection(sectionsList[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `resume_data_${Date.now()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    if (!event.target.files[0]) return;
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setResumeData(json);
        alert("Data imported successfully!");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
  };

  const handleWipe = () => {
    resetResume();
    setActiveSection('contact');
  };

  return (
    <div
      className={`flex flex-col fixed inset-0 bg-[#fcfcfc] dark:bg-[#08080a] font-sans selection:bg-blue-500/30 overflow-hidden print:static print:h-auto print:overflow-visible text-slate-900 dark:text-slate-100 relative ${isResizing ? 'cursor-col-resize select-none' : ''}`}
      style={{ '--v6-primary': themeColor }}
    >
      <V6ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleWipe}
        title="Erase Workstation?"
        message="This will permanently delete all your resume data. This action cannot be undone."
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="hidden lg:flex h-full shrink-0 overflow-hidden print:hidden">
        <V6Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-row min-w-0 h-full overflow-hidden print:h-auto print:overflow-visible relative z-10">
        <motion.div
          layout
          className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar print:hidden overscroll-auto touch-pan-y"
          style={isDesktop && showPreview ? { width: `${splitWidth}%` } : { width: '100%' }}
        >
          <V6Header
            onMenuClick={() => setIsSidebarOpen(true)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            showPreview={isDesktop ? showPreview : false}
            onTogglePreview={() => setShowPreview(!showPreview)}
            isMobileView={!isDesktop}
            onDownload={triggerDownload}
          />

          <main className="flex-1 p-3 sm:p-4 lg:p-10 max-w-4xl mx-auto w-full space-y-8 pb-32 sm:pb-24">
            <div className="min-h-[calc(100vh-200px)] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Content Sections */}
                  {activeSection === 'contact' && <V6ContactEditor />}
                  {activeSection === 'summary' && <V6SummaryEditor />}
                  {activeSection === 'experience' && <V6ExperienceEditor />}
                  {activeSection === 'education' && <V6EducationEditor />}
                  {activeSection === 'skills' && <V6SkillsEditor />}
                  {activeSection === 'projects' && <V6ProjectsEditor />}
                  {activeSection === 'certifications' && <V6CertificationsEditor />}

                  {/* Design Sections */}
                  {activeSection === 'templates' && (
                    <div className="space-y-8 px-2 sm:px-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ color: themeColor }}>
                          <Sparkles size={18} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Visual Architecture</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Choose Template</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">Select a layout that best represents your professional brand.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.values(templates).map((template) => (
                          <motion.button
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            key={template.id}
                            onClick={() => updateTemplate(template.id)}
                            className={`group relative p-5 sm:p-6 rounded-3xl border-2 text-left transition-all overflow-hidden ${resumeData.selectedTemplate === template.id
                                ? 'border-slate-900 dark:border-white shadow-2xl'
                                : 'border-slate-100 dark:border-white/[0.05] hover:border-slate-200 dark:hover:border-white/[0.1] bg-white dark:bg-white/[0.02]'
                              }`}
                          >
                            {resumeData.selectedTemplate === template.id && (
                              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900">
                                <Check size={14} />
                              </div>
                            )}
                            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wider">{template.name}</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{template.desc || 'Professional Layout'}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'typography' && (
                    <div className="space-y-8 px-2 sm:px-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ color: themeColor }}>
                          <Type size={18} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Textual Identity</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Typography Engine</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">Curated typefaces designed for maximum readability and impact.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FONTS.map((font) => (
                          <motion.button
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            key={font.id}
                            onClick={() => updateField('fontFamily', font.id)}
                            className={`p-5 sm:p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden ${resumeData.fontFamily === font.id
                                ? 'border-slate-900 dark:border-white shadow-2xl bg-slate-50 dark:bg-white/5'
                                : 'border-slate-100 dark:border-white/[0.05] hover:border-slate-200 dark:hover:border-white/[0.1] bg-white dark:bg-white/[0.02]'
                              }`}
                          >
                            <h3 className={`text-base sm:text-lg mb-1 text-slate-900 dark:text-white ${font.class}`}>{font.name}</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-sans">Professional Font Face</p>
                            {resumeData.fontFamily === font.id && (
                              <div className="absolute top-4 right-4 text-slate-900 dark:text-white">
                                <Check size={16} />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'appearance' && (
                    <div className="space-y-8 px-2 sm:px-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ color: themeColor }}>
                          <Palette size={18} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Visual Atmosphere</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Theme & Aura</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">Personalize the workstation aesthetic to match your style.</p>
                      </div>

                      <V6Card title="Signature Color" subtitle="The primary accent for your workspace and resume">
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 pt-2">
                          {PREMIUM_COLORS.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => updateThemeColor(color.value)}
                              className={`aspect-square rounded-full transition-all flex items-center justify-center group relative ${resumeData.themeColor === color.value ? 'scale-110 shadow-lg' : 'hover:scale-105'
                                }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            >
                              {resumeData.themeColor === color.value && (
                                <motion.div layoutId="color-active" className="absolute -inset-1.5 border-2 rounded-full" style={{ borderColor: color.value }} />
                              )}
                              {resumeData.themeColor === color.value && (
                                <Check size={14} className="text-white drop-shadow-md" />
                              )}
                            </button>
                          ))}
                        </div>
                      </V6Card>

                      <V6Card title="Visual Mode" subtitle="Switch between Light and Dark focus modes">
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => toggleTheme('light')} className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${resumeData.themeMode !== 'dark' ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-white/5' : 'border-slate-100 dark:border-white/[0.05] hover:border-slate-200'}`}>
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600"><Sun size={24} /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Zen Light</span>
                          </button>
                          <button onClick={() => toggleTheme('dark')} className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${resumeData.themeMode === 'dark' ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-white/5' : 'border-slate-100 dark:border-white/[0.05] hover:border-slate-200'}`}>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-900 flex items-center justify-center text-indigo-400"><Moon size={24} /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Aura Dark</span>
                          </button>
                        </div>
                      </V6Card>
                    </div>
                  )}

                  {activeSection === 'settings' && (
                    <div className="space-y-8 px-2 sm:px-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ color: themeColor }}>
                          <Settings size={18} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Data Management</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Controls</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">Export your data for backup or import an existing configuration.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <V6Card title="Export Data" subtitle="Download your resume as a JSON file">
                          <motion.button whileTap={{ scale: 0.95 }} onClick={handleExport} className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"><Download size={14} /> Export Backup</motion.button>
                        </V6Card>
                        <V6Card title="Import Data" subtitle="Restore from a previously exported file">
                          <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => fileInputRef.current.click()} className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"><Upload size={14} /> Import File</motion.button>
                        </V6Card>
                      </div>

                      <div className="pt-10">
                        <V6Card
                          title="Danger Zone"
                          subtitle="Reset the workstation to factory defaults"
                          className="border-red-200/50 dark:border-red-900/20"
                        >
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsConfirmOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /> WIPE ALL DATA</motion.button>
                        </V6Card>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="pt-10 border-t border-slate-200 dark:border-white/[0.06] flex flex-col gap-8 pb-12">
              <div className="flex items-center justify-between gap-4">
                <button onClick={() => navigateToSection('prev')} disabled={activeSection === 'contact'} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-all"><ChevronLeft size={18} /> Prev</button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigateToSection('next')} disabled={activeSection === 'settings'} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl disabled:opacity-20 transition-all" style={{ backgroundColor: themeColor, boxShadow: `0 10px 20px ${themeColor}40` }}>{activeSection === 'certifications' ? 'Design' : 'Next'} <ChevronRight size={18} /></motion.button>
              </div>
            </footer>
          </main>
        </motion.div>

        {isDesktop && showPreview && (
          <>
            <div
              onMouseDown={() => setIsResizing(true)}
              className={`w-1.5 h-full bg-transparent hover:bg-blue-500/10 cursor-col-resize flex items-center justify-center group transition-colors relative z-20 ${isResizing ? 'bg-blue-500/20' : ''}`}
            >
              <div className={`w-[1px] h-full bg-slate-200 dark:bg-white/[0.08] transition-colors ${isResizing ? 'bg-blue-500' : 'group-hover:bg-blue-400'}`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.1] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-400 transition-all scale-90 group-hover:scale-100">
                <GripVertical size={14} />
              </div>
            </div>

            <aside className="flex flex-col shrink-0 overflow-hidden bg-[#f8f9fa] dark:bg-[#08080a] print:hidden" style={{ width: `${100 - splitWidth}%` }}>
              <div className="h-20 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between px-8 bg-white/80 dark:bg-black/20 backdrop-blur-xl shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Engine</span>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl relative">
                  <button onClick={triggerDownload} className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative z-10 text-slate-500 hover:text-slate-900 dark:hover:text-white group">
                    <span className="relative z-10 flex items-center gap-2">
                      <Printer size={12} className="group-hover:-translate-y-0.5 transition-transform" /> Print
                    </span>
                  </button>
                  <button onClick={() => setPreviewMode('preview')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${previewMode === 'preview' ? '' : 'text-slate-500'}`} style={{ color: previewMode === 'preview' ? themeColor : undefined }}>
                    {previewMode === 'preview' && <motion.div layoutId="prev-bg-pro" className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-lg" />}
                    <span className="relative z-10 flex items-center gap-2">
                      <FileText size={12} /> Preview
                    </span>
                  </button>
                  <button onClick={() => setPreviewMode('json')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${previewMode === 'json' ? '' : 'text-slate-500'}`} style={{ color: previewMode === 'json' ? themeColor : undefined }}>
                    {previewMode === 'json' && <motion.div layoutId="prev-bg-pro" className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-lg" />}
                    <span className="relative z-10 flex items-center gap-2">
                      <FileCode size={12} /> JSON
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 z-10">
                <AnimatePresence mode="wait">
                  {previewMode === 'preview' ? (
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[800px] mx-auto shadow-2xl"><ModernLivePreview /></motion.div>
                  ) : (
                    <motion.div key="json" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-950/50 backdrop-blur-md font-mono text-[11px] p-6"><textarea value={jsonValue} onChange={(e) => handleJsonChange(e.target.value)} spellCheck={false} className="w-full h-full bg-transparent text-slate-600 dark:text-slate-400 resize-none outline-none custom-scrollbar" /></motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
          </>
        )}
      </div>

      <V6PrintAdModal
        isOpen={showPrintAd}
        adCountdown={adCountdown}
        activeColor={themeColor}
        onFinalize={finalizePrintAction}
        onClose={() => setShowPrintAd(false)}
      />

      {/* Print Buffer (V5 Style) */}
      <div id="print-buffer" className="hidden print:block bg-white printable-area" aria-hidden="true">
        <ModernLivePreview />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="relative w-72 h-full shadow-2xl">
              <V6Sidebar activeSection={activeSection} onSectionChange={(s) => { setActiveSection(s); setIsSidebarOpen(false); }} isMobile={true} onClose={() => setIsSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Preview Modal (V5 Style) */}
      <AnimatePresence>
        {!isDesktop && showPreview && (
          <div className="fixed inset-0 z-[150] flex flex-col bg-white dark:bg-[#08080a]">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="h-20 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between px-6 bg-white dark:bg-[#08080a] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Preview Engine</span>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/[0.05] rounded-xl text-slate-500 font-black text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/[0.08]"
                >
                  Close <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-slate-50 dark:bg-black/20">
                <div className="w-full max-w-[800px] mx-auto shadow-2xl rounded-sm overflow-hidden bg-white">
                  <ModernLivePreview />
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#08080a]">
                <div className="flex flex-row gap-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all border border-slate-200 dark:border-white/[0.08]"
                  >
                    Return
                  </button>
                  <button
                    onClick={triggerDownload}
                    className="flex-1 py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: themeColor, boxShadow: `0 10px 20px ${themeColor}40` }}
                  >
                    <Download size={14} />
                    PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Preview Trigger for Mobile */}
      {!isDesktop && !showPreview && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPreview(true)}
          className="fixed bottom-8 right-6 z-[60] px-6 h-14 text-white rounded-2xl flex items-center gap-3 shadow-2xl border border-white/20"
          style={{ backgroundColor: themeColor, boxShadow: `0 10px 20px ${themeColor}40` }}
        >
          <Eye size={20} />
          <span className="text-[11px] font-black uppercase tracking-widest">Live Preview</span>
        </motion.button>
      )}
    </div>
  );
};

export default V6Editor;
