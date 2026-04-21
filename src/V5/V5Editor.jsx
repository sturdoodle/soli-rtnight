import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus, Edit3, Layout, Palette, Type, History,
  Sparkles, ShieldCheck, Moon, Sun, Download, Upload,
  Trash2, Search, Maximize2, Zap, BarChart3, User, Briefcase, GraduationCap, Award, FileText, FolderCode, Mail, Phone, MapPin, Github, ArrowLeft, X, Rocket, ExternalLink, Menu, ChevronLeft, ChevronRight, Printer, Settings, Timer, BookOpen, Code, Braces
} from 'lucide-react';
import { useResume, ResumeProvider } from '../Modern/context/ResumeContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import ModernLivePreview from '../Modern/components/preview/ModernLivePreview';
import TemplateSelector from '../Modern/components/editor/TemplateSelector';
import PersonalDetails from '../Modern/components/editor/PersonalDetails';
import SummarySection from '../Modern/components/editor/SummarySection';
import ExperienceSection from '../Modern/components/editor/ExperienceSection';
import ProjectsSection from '../Modern/components/editor/ProjectsSection';
import EducationSection from '../Modern/components/editor/EducationSection';
import CertificationsSection from '../Modern/components/editor/CertificationsSection';
import SkillsSection from '../Modern/components/editor/SkillsSection';
import FormattingTip from '../Modern/components/editor/FormattingTip';
import logo from '../assets/logo.png';
import AdSenseAd from '../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../MainConstant.js';
import { isDevelopmentMode, TAB_META, ONBOARDING_STEPS } from './V5Constants';
import SidebarItem from './components/SidebarItem';
import PrintAdModal from './components/PrintAdModal';
import V5JsonEditor from './components/V5JsonEditor';
import V5WipeModal from './components/V5WipeModal';


const V5EditorContent = () => {
  const {
    resumeData, updateField, setResumeData, toggleAts, toggleTheme,
    updateStorageType, resetResume, setEditorStyle
  } = useResume();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('content'); // content, layout, theme, analytics
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const navigate = useNavigate();
  const atsMode = resumeData.atsMode;
  const themeMode = resumeData.themeMode;
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Print Ad Interstitial Logic
  const [showPrintAd, setShowPrintAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(7);

  // Toggle Preview vs JSON Inspector
  const [previewMode, setPreviewMode] = useState('preview'); // 'preview' | 'json'

  const navbarFileInputRef = React.useRef(null);
  const mobileFileInputRef = React.useRef(null);
  const settingsFileInputRef = React.useRef(null);

  // Draggable Split Logic
  const [splitWidth, setSplitWidth] = useState(50); // percentage
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      // Calculate split percentage based on window width
      // Excluding the sidebar if it's visible
      const sidebarWidth = isSidebarCollapsed ? 80 : 280; // Approximate widths
      const availableWidth = window.innerWidth - sidebarWidth;
      const currentX = e.clientX - sidebarWidth;

      let newWidth = (currentX / availableWidth) * 100;

      // Safety constraints
      if (newWidth < 30) newWidth = 30; // Min editor width
      if (newWidth > 70) newWidth = 70; // Max editor width

      setSplitWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isSidebarCollapsed]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('v5_onboarding_completed');
    // const hasVisited = false;
    if (!hasVisited) setShowOnboarding(true);
  }, []);

  const atsScore = useMemo(() => {
    if (!resumeData.atsMode) return 0;
    let score = 0;
    const data = resumeData;

    // Pillar A: Content Integrity (85% Max)
    // 1. Professional Identity (20%) - 4% each for essentials
    if (data.fullName) score += 4;
    if (data.jobTitle) score += 4;
    if (data.location) score += 4;
    if (data.email) score += 4;
    if (data.phone) score += 4;

    // 2. Career Narrative (25%) - Increased weight for universal experience
    if (data.experience && data.experience.length > 0) {
      score += 10; // Foundational entry
      if (data.experience.length > 1) score += 10; // Career progression
      const hasDetailedBullets = data.experience.some(exp => exp.clients?.some(c => c.bulletPoints?.length > 0));
      if (hasDetailedBullets) score += 5; // Descriptive depth
    }

    // 3. Core Competencies (15%) - Skills & Expertise
    if (data.skills && data.skills.length > 0) {
      score += 10; // Skill categorization
      const totalSkillsCount = data.skills.reduce((acc, cat) => acc + (cat.items?.split(',').filter(i => i.trim()).length || 0), 0);
      if (totalSkillsCount > 8) score += 5; // Skill density
    }

    // 4. Academic Foundation (10%) - Education
    if (data.education && data.education.length > 0) {
      score += 5; // Institutional presence
      if (data.education.length > 1) score += 5; // Academic progression
    }

    // 5. Professional Summary (10%) - Strategic Narrative
    if (data.summary) {
      score += 5; // Existence
      if (data.summary.length > 120) score += 5; // Strategic depth
    }

    // 6. External Validation (5%) - Evidence & Supplemental
    if (data.github || (data.projects && data.projects.length > 0) || (data.certifications && data.certifications.length > 0)) {
      score += 5; // Validating proof
    }

    // Pillar B: Structural Optimization (15% Max)
    if (data.atsMode) {
      score += 15; // Machine-Readability Bonus
    }

    return Math.min(score, 100);
  }, [resumeData, resumeData.atsMode]);

  const completeOnboarding = () => {
    localStorage.setItem('v5_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const currentMeta = TAB_META[activeTab] || TAB_META.content;

  useEffect(() => {
    setEditorStyle('liquid');
  }, []);

  // --------------------------------------------------------------------------
  // Interactions & Actions
  // --------------------------------------------------------------------------

  const handleDownload = () => {
    if (isDevelopmentMode) {
      window.print();
      return;
    }
    setShowPrintAd(true);
    setAdCountdown(7);
  };

  const finalizePrintAction = () => {
    setShowPrintAd(false);
    // Short delay to allow modal to close before print dialog freezes UI
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Keyboard Shortcut Interceptor (Ctrl+P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleDownload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevelopmentMode]); // Re-bind if dev mode status somehow changes (rare)

  // Ad Countdown Timer
  useEffect(() => {
    let timer;
    if (showPrintAd && adCountdown > 0) {
      timer = setInterval(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPrintAd, adCountdown]);

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `resume-snapshot-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification("Resume snapshot exported successfully!", "success");
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setResumeData(json);
        showNotification("Resume snapshot imported successfully!", "success");
      } catch (err) {
        showNotification("Invalid JSON snapshot file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const activeColor = resumeData.themeColor || '#0ea5e9';

  return (
    <div className={`h-screen flex flex-col bg-[var(--v5-bg)] text-[var(--v5-text)] transition-all duration-500 font-sans print:bg-white print:block print:h-auto print:overflow-visible relative overflow-hidden ${resumeData.fontFamily && resumeData.fontFamily !== 'Default' ? `v5-font-${resumeData.fontFamily.toLowerCase()}` : ''}`}>

      {/* Print Portal: Hidden in UI, visible in Print */}
      <div className="hidden print:block printable-area">
        <ModernLivePreview />
      </div>

      {/* Mesh Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none opacity-60 dark:opacity-30 animate-liquid"
        style={{ backgroundColor: `${activeColor}15` }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full blur-[100px] pointer-events-none opacity-40 dark:opacity-20 translate-x-20 translate-y-20"
        style={{ backgroundColor: `${activeColor}10` }} />

      {/* Top Navbar */}
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
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-5 pt-5 border-b-2 transition-all ${activeTab === 'content' ? 'text-[var(--v5-heading)]' : 'text-slate-500 hover:text-[var(--v5-heading)]'}`}
              style={{ borderColor: activeTab === 'content' ? activeColor : 'transparent' }}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`pb-5 pt-5 border-b-2 transition-all ${activeTab === 'layout' ? 'text-[var(--v5-heading)]' : 'text-slate-500 hover:text-[var(--v5-heading)]'}`}
              style={{ borderColor: activeTab === 'layout' ? activeColor : 'transparent' }}
            >
              Structure
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`pb-5 pt-5 border-b-2 transition-all ${activeTab === 'help' ? 'text-[var(--v5-heading)]' : 'text-slate-500 hover:text-[var(--v5-heading)]'}`}
              style={{ borderColor: activeTab === 'help' ? activeColor : 'transparent' }}
            >
              Help
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-5 pt-5 border-b-2 transition-all ${activeTab === 'about' ? 'text-[var(--v5-heading)]' : 'text-slate-500 hover:text-[var(--v5-heading)]'}`}
              style={{ borderColor: activeTab === 'about' ? activeColor : 'transparent' }}
            >
              About Us
            </button>
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

          <div className={`flex items-center gap-1.5 sm:gap-3 p-1.5 rounded-full border transition-all duration-300 group cursor-pointer ${atsMode ? 'border-transparent shadow-lg' : 'bg-white/5 border-black/5 dark:border-white/10'}`}
            style={atsMode ? { backgroundColor: activeColor } : {}}
            onClick={toggleAts}>
            <span className={`pl-2 pr-0.5 text-[9px] font-black uppercase tracking-widest transition-all ${atsMode ? 'text-white' : 'text-slate-500'} hidden sm:inline`}>
              ATS
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-all ${atsMode ? 'bg-white/20 shadow-inner' : 'bg-slate-700/20'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${atsMode ? 'right-0.5' : 'left-0.5'}`} />
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

              {/* Dynamic Aura Animation */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl scale-150"
                style={{ backgroundColor: resumeData.themeMode === 'dark' ? '#f59e0b' : '#818cf8' }}
              />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: activeColor, boxShadow: `0 10px 25px -5px ${activeColor}50` }}
          >
            <Download size={14} />
            <span className="hidden sm:inline">Resume</span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--v5-card)]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-40 shadow-xl shadow-black/10 animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 text-[11px] font-black uppercase tracking-[0.2em] max-w-7xl mx-auto space-y-1">
            <button
              onClick={() => { setActiveTab('content'); setIsMobileMenuOpen(false); }}
              aria-label="Identity Editor"
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'content' ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
              style={{ color: activeTab === 'content' ? 'var(--v5-heading)' : 'var(--v5-text)' }}
            >
              Editor
            </button>
            <button
              onClick={() => { setActiveTab('typography'); setIsMobileMenuOpen(false); }}
              aria-label="Typography Settings"
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'typography' ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
              style={{ color: activeTab === 'typography' ? 'var(--v5-heading)' : 'var(--v5-text)' }}
            >
              Typeface
            </button>
            <button
              onClick={() => { setActiveTab('layout'); setIsMobileMenuOpen(false); }}
              aria-label="Structure Layout"
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'layout' ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
              style={{ color: activeTab === 'layout' ? 'var(--v5-heading)' : 'var(--v5-text)' }}
            >
              Structure
            </button>
            <button
              onClick={() => { setActiveTab('help'); setIsMobileMenuOpen(false); }}
              aria-label="Help and Guidance"
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'help' ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
              style={{ color: activeTab === 'help' ? 'var(--v5-heading)' : 'var(--v5-text)' }}
            >
              Help
            </button>
            <button
              onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
              aria-label="About the App"
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'about' ? 'bg-black/5 dark:bg-white/5 font-bold shadow-sm' : ''}`}
              style={{ color: activeTab === 'about' ? 'var(--v5-heading)' : 'var(--v5-text)' }}
            >
              About Us
            </button>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              <button
                onClick={() => { handleExportJSON(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-4 px-4 bg-emerald-500/5 text-emerald-600 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-emerald-500/10"
              >
                <Download size={14} /> Export
              </button>
              <button
                onClick={() => { mobileFileInputRef.current?.click(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-4 px-4 bg-blue-500/5 text-blue-600 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-blue-500/10 cursor-pointer"
              >
                <Upload size={14} /> Import
              </button>
              <input
                ref={mobileFileInputRef}
                id="mobile-import-json"
                type="file"
                className="hidden"
                accept=".json"
                onChange={(e) => { handleImportJSON(e); setIsMobileMenuOpen(false); }}
              />
            </div>

            {/* Mobile Branding Signature */}
            <div className="pt-6 pb-2 flex flex-col items-center justify-center text-center border-t border-black/5 dark:border-white/5 mt-4">
              <h3 className="text-lg font-black tracking-[-0.05em] text-[var(--v5-heading)] opacity-80 dark:opacity-90 normal-case" style={{ fontFamily: 'Absans, sans-serif' }}>
                qpkendra
              </h3>
              <p className="text-[9px] font-bold text-slate-500 mt-1 tracking-wide normal-case">
                Crafted with <span className="text-blue-500 text-[10px] inline-block">💙</span> in India
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Pane */}
      <div className="flex flex-1 h-[calc(100vh-64px)] print:h-auto print:block relative z-10 overflow-hidden">

        {/* Sidebar Navigation - Hidden on Mobile */}
        <aside className={`hidden lg:flex ${isSidebarCollapsed ? 'w-24' : 'w-72'} border-r border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col pt-6 print:hidden transition-all duration-300 relative`}>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-10 w-6 h-6 bg-[var(--v5-card)] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:scale-110 transition-all z-10 hidden lg:flex text-slate-500 hover:text-[var(--v5-heading)]"
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <div className={`px-8 hidden lg:block transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-0 max-h-0 mb-0 overflow-hidden' : 'opacity-100 max-h-[200px] mb-6'}`}>
            <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-4 whitespace-nowrap">Resume Editor</h2>
            <div className="p-5 rounded-3xl border border-black/5 dark:border-white/5 flex items-center gap-4 shadow-sm group cursor-pointer hover:bg-black/5 transition-all w-full overflow-hidden"
              style={{ backgroundColor: `${activeColor}05` }}>
              <div className="p-2.5 rounded-2xl text-white shadow-lg shrink-0"
                style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}40` }}>
                <Edit3 size={18} />
              </div>
              <div className="flex flex-col overflow-hidden whitespace-nowrap">
                <span className="text-xs font-black text-[var(--v5-heading)] tracking-tight">Active Draft</span>
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5"
                  style={{ color: activeColor }}>Editing Now</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 transition-all">
            <SidebarItem icon={FileText} label="Identity" active={activeTab === 'content'} onClick={() => setActiveTab('content')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Layout} label="Structure" active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Type} label="Typeface" active={activeTab === 'typography'} onClick={() => setActiveTab('typography')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'snapshots'} onClick={() => setActiveTab('snapshots')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <div className="h-px bg-black/5 dark:border-white/5 my-2 mx-4" />
            <a
              href="https://timer.qpkendra.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Timer / Focus Mode"
              className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group"
            >
              <div className="p-2 rounded-xl transition-all group-hover:scale-110" style={{ color: activeColor, backgroundColor: `${activeColor}15` }}>
                <Timer size={18} />
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[var(--v5-heading)]">Timer</span>
              )}
            </a>
            <a
              href="https://mypdf.qpkendra.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="My PDF Tools - PDF Conversion & Editing"
              className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group"
            >
              <div className="p-2 rounded-xl transition-all group-hover:scale-110" style={{ color: activeColor, backgroundColor: `${activeColor}15` }}>
                <FileText size={18} />
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[var(--v5-heading)]">My PDF</span>
              )}
            </a>
            <a
              href="https://qpkendra.com"
              target="_blank"
              rel="noopener noreferrer"
              title="QPKendra Main Site"
              className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group"
            >
              <div className="p-2 rounded-xl transition-all group-hover:scale-110" style={{ color: activeColor, backgroundColor: `${activeColor}15` }}>
                <BookOpen size={18} />
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[var(--v5-heading)]">QPkendra</span>
              )}
            </a>
          </nav>

          {resumeData.predictiveScoreEnabled && resumeData.atsMode && (
            <div className={`px-6 pt-6 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-0 max-h-0 overflow-hidden p-0 pointer-events-none' : 'opacity-100 max-h-[500px]'}`}>
              <div className="p-6 rounded-[2.5rem] bg-[var(--v5-canvas)]/50 border border-black/5 dark:border-white/5 hidden lg:block shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.8)]"
                      style={{ backgroundColor: activeColor }} />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global ATS</span>
                  </div>
                  <span className="text-xs font-black transition-all duration-300" style={{ color: activeColor }}>{atsScore}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800/10 dark:bg-slate-800/40 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out shadow-lg"
                    style={{
                      width: `${atsScore}%`,
                      backgroundColor: activeColor,
                      boxShadow: `0 0 12px ${activeColor}60`
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* AdSense Sidebar Block */}
          {!isSidebarCollapsed && (
            <div className="px-6 mb-4 animate-in fade-in duration-700 delay-500">
              <div className="p-4 rounded-3xl bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden min-h-[100px] ads-block shadow-sm group">
                <AdSenseAd
                  client={ADSENSE_CLIENT_ID}
                  slot={ADSENSE_INBETWEEN_SLOT_ID}
                  format="auto"
                  containerClassName="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          )}

          {/* QPKendra Branding Signature Side */}
          <div className={`mt-auto p-6 mb-4 flex flex-col items-center justify-center text-center transition-all duration-500 ${isSidebarCollapsed ? 'opacity-0 max-h-0 overflow-hidden scale-90' : 'opacity-100 max-h-[200px] scale-100'}`}>
            <h3 className="text-xl font-black tracking-[-0.05em] text-[var(--v5-heading)] opacity-80 dark:opacity-90 transition-opacity" style={{ fontFamily: 'Absans, sans-serif' }}>
              qpkendra
            </h3>
            <p className="text-[9px] font-bold text-slate-500 mt-1 tracking-wide">
              Crafted with <span className="text-blue-500 text-[11px] inline-block hover:scale-125 transition-transform cursor-default">💙</span> in India
            </p>
          </div>
        </aside>

        {/* Editor Canvas - Balanced 50:50 Split (Now Dynamic) */}
        <main
          className="overflow-y-auto bg-[var(--v5-canvas)]/10 lg:bg-[var(--v5-canvas)]/25 pt-8 pb-48 lg:pt-14 lg:pb-16 px-0 custom-scrollbar print:hidden will-change-transform lg:m-4 lg:rounded-[2.5rem] lg:border lg:border-black/5 dark:lg:border-white/5 transition-all duration-500 shadow-sm"
          style={isDesktop ? { width: `${splitWidth}%` } : { width: '100%' }}
        >
          {/* Hidden H1 for SEO Authority & AI Summary agents */}
          <h1 className="sr-only">QPkendra AI Resume Builder & CV Maker 2026 - Free ATS Friendly Resume Templates</h1>

          <div className="max-w-[1400px] mx-auto h-full">
            <div className="min-h-full rounded-2xl sm:rounded-[3rem] bg-[var(--v5-card)]/50 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] pt-6 pb-2 lg:pb-4 px-1.5 sm:px-6 lg:px-8 py-6 relative overflow-hidden">
              <V5WipeModal
                isOpen={showWipeConfirm}
                onClose={() => setShowWipeConfirm(false)}
                onConfirm={resetResume}
                title="Wipe Engine Cache?"
                description="This will erase all your resume data and reset the structural blueprint to factory defaults. This action cannot be undone."
              />
              {activeTab === 'content' && (
                <div className="mb-4 p-4 sm:p-6 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-700">
                  <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" />
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <FormattingTip />
                  <PersonalDetails />
                  <SummarySection />
                  <ExperienceSection />
                  <ProjectsSection />
                  <EducationSection />
                  <CertificationsSection />
                  <SkillsSection />

                  {/* QPKendra Branding Signature Card */}
                  <div className="p-10 rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 relative overflow-hidden group transition-all flex flex-col items-center text-center justify-center min-h-[220px]">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all group-hover:scale-110 group-hover:rotate-[-5deg]">

                      <span className="text-3xl font-black text-[var(--v5-heading)]" style={{ fontFamily: 'Absans, sans-serif', letterSpacing: '-0.05em', color: activeColor }}>qp</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-[-0.05em] text-[var(--v5-heading)] opacity-90 transition-opacity" style={{ fontFamily: 'Absans, sans-serif' }}>
                      qpkendra
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">
                      Crafted with <span className="text-blue-500 text-sm inline-block animate-pulse mx-1">💙</span> in India
                    </p>
                  </div>

                  <div className="h-32 lg:hidden" />
                </div>
              )}

              {activeTab === 'layout' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <TemplateSelector />
                </div>
              ) : null}

              {activeTab === 'typography' && (
                <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Architectural Typeface</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                      Global document font replacement. Selecting a new typeface will re-index all headers, body text, and semantic metadata across your resume to maintain a unified visual hierarchy and aesthetic intent.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateField('fontFamily', 'Default')}
                      className={`py-4 px-5 rounded-[1.25rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${resumeData.fontFamily === 'Default' || !resumeData.fontFamily ? 'border-[var(--v5-accent)] shadow-[0_4px_15px_-5px_var(--v5-accent)] scale-[1.01]' : 'border-black/5 dark:border-white/5 hover:scale-[1.02]'}`}
                      style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { borderColor: activeColor } : {}}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-500/10 rounded-lg"><Layout size={14} className="text-slate-500" /></div>
                          <h4 className="text-sm font-black text-[var(--v5-heading)]">System Default</h4>
                        </div>
                        <div className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'text-white' : 'text-slate-400'}`}
                          style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { backgroundColor: activeColor } : {}}>
                          {(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'Active' : 'Restore'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 flex-1">Revert to the original architectural intent.</p>
                        <span className="text-xs font-medium text-slate-400/50 select-none">AaBbCc 123</span>
                      </div>
                    </button>

                    {[
                      { name: 'Inter Architecture', desc: 'Modern, high-velocity technical sans.', font: 'Inter', type: 'Sans' },
                      { name: 'Satoshi Signature', desc: 'Modern & Minimal professional sans.', font: 'Satoshi', type: 'Sans' },
                      { name: 'Geist Technical', desc: 'Clean & Tech industrial aesthetic.', font: 'Geist', type: 'Sans' },
                      { name: 'Plus Jakarta Sans', desc: 'Friendly & Geometric accessibility.', font: 'PlusJakartaSans', type: 'Sans' },
                      { name: 'Figtree Minimal', desc: 'Minimalist & Functional clarity.', font: 'Figtree', type: 'Sans' },
                      { name: 'DM Sans Balanced', desc: 'Clear & Balanced editorial tone.', font: 'DMSans', type: 'Sans' },
                      { name: 'Mona Sans Stylish', desc: 'Versatile & Stylish editorial presence.', font: 'MonaSans', type: 'Sans' },
                      { name: 'Lora Elegant', desc: 'Sophisticated professional serif architecture.', font: 'Lora', type: 'Serif' },
                      { name: 'Roboto Technical', desc: 'Precise engineering-grade monospace.', font: 'Roboto Mono', type: 'Mono' },
                      { name: 'Outfit Modern', desc: 'Clean, approachable geometric typeface.', font: 'Outfit', type: 'Sans' }
                    ].map((f) => {
                      const isActive = resumeData.fontFamily === f.font;
                      return (
                        <button
                          key={f.name}
                          onClick={() => updateField('fontFamily', f.font)}
                          className={`py-4 px-5 rounded-[1.25rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${isActive ? 'border-[var(--v5-accent)] shadow-[0_4px_15px_-5px_var(--v5-accent)] scale-[1.01]' : 'border-black/5 dark:border-white/5 hover:scale-[1.02]'}`}
                          style={isActive ? { borderColor: activeColor } : {}}
                        >
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-[var(--v5-heading)]" style={{ fontFamily: f.font }}>{f.name}</h4>
                              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-md bg-slate-500/5 text-slate-400 uppercase tracking-tighter border border-slate-500/10">{f.type}</span>
                            </div>
                            <div className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${isActive ? 'text-white' : 'text-[#0ea5e9]'}`}
                              style={isActive ? { backgroundColor: activeColor } : {}}>
                              {isActive ? 'Applied' : 'Select'}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 flex-1">{f.desc}</p>
                            <span className="text-xs font-medium text-slate-400/50 select-none" style={{ fontFamily: f.font }}>AaBbCc 123</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'json' && (
                <div className="space-y-4 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
                  <div className="p-4 sm:p-6 bg-blue-500/5 dark:bg-blue-500/10 rounded-3xl border border-dashed border-blue-500/20 mb-2 sm:mb-6 font-medium">
                    <div className="flex items-center gap-3 mb-1 sm:mb-2">
                      <div className="p-1 sm:p-1.5 bg-blue-500/20 rounded-lg"><Code size={14} className="text-blue-500" /></div>
                      <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Direct JSON Inspector</h3>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Advanced architectural access. Edit raw data directly. Syncing is live.
                    </p>
                  </div>
                  <div className="flex-1 relative min-h-[700px] sm:min-h-[500px] overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col bg-[#050A0F]">
                    <V5JsonEditor
                      data={resumeData}
                      onUpdate={setResumeData}
                      activeColor={activeColor}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'snapshots' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid grid-cols-3 gap-2 sm:gap-6">
                    {/* Export Section */}
                    <button onClick={handleExportJSON} className="group p-3 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 text-center hover:bg-emerald-500/10 transition-all hover:scale-[1.02] flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px] shadow-sm">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5 group-hover:scale-110 transition-transform">
                        <Download className="text-emerald-500 w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <h4 className="text-[8px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-1 sm:mb-2.5">Export</h4>
                      <p className="text-[7px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight sm:leading-relaxed max-w-[140px] mx-auto opacity-70">Save your draft as a snapshot.</p>
                    </button>

                    {/* Import Section */}
                    <button
                      onClick={() => settingsFileInputRef.current?.click()}
                      className="group p-3 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 text-center hover:bg-blue-500/10 transition-all hover:scale-[1.02] flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px] shadow-sm relative"
                    >
                      <input
                        ref={settingsFileInputRef}
                        type="file"
                        className="hidden"
                        accept=".json"
                        onChange={handleImportJSON}
                      />
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5 group-hover:scale-110 transition-transform mx-auto">
                        <Plus className="text-blue-500 w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <h4 className="text-[8px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-1 sm:mb-2.5">Import</h4>
                      <p className="text-[7px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight sm:leading-relaxed max-w-[140px] mx-auto opacity-70">Restore a career version file.</p>
                    </button>

                    <button onClick={() => setShowWipeConfirm(true)} className="group p-3 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 text-center hover:bg-rose-500/10 transition-all hover:scale-[1.02] flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px] shadow-sm">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-rose-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5 group-hover:scale-110 transition-transform">
                        <Trash2 className="text-rose-500 w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <h4 className="text-[8px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-[0.2em] text-rose-600 dark:text-rose-400 mb-1 sm:mb-2.5">Wipe</h4>
                      <p className="text-[7px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight sm:leading-relaxed max-w-[140px] mx-auto opacity-70">Factory reset the entire engine.</p>
                    </button>
                  </div>

                  {/* Privacy & Storage Section */}
                  <div className="p-10 rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 space-y-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1">
                        <h4 className="text-sm font-black text-[var(--v5-heading)] uppercase tracking-widest mb-2">Storage Governance</h4>
                        <p className="text-xs text-slate-500 max-w-sm">Choose between persistent browser storage or temporary session-only data.</p>
                      </div>
                      <div className="flex bg-black/10 dark:bg-black/20 p-1.5 rounded-2xl border border-black/5 dark:border-white/10">
                        {['persistent', 'session'].map((mode) => {
                          const isActive = resumeData.storageType === mode;
                          return (
                            <button
                              key={mode}
                              onClick={() => updateStorageType(mode)}
                              aria-label={`Set storage to ${mode === 'persistent' ? 'Permanent' : 'Temporary'}`}
                              className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-400'}`}
                              style={isActive ? { backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}60` } : {}}
                            >
                              {mode === 'persistent' ? 'Permanent' : 'Temporary'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-black/5 dark:border-white/5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-sm font-black text-[var(--v5-heading)] uppercase tracking-widest">Predictive Engine</h4>
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 text-[8px] font-black rounded-md border border-indigo-500/20 uppercase tracking-widest">Beta</span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-sm">Enable real-time ATS scoring and career narrative evaluation based on content-density protocols.</p>
                      </div>
                      <button
                        onClick={() => updateField('predictiveScoreEnabled', !resumeData.predictiveScoreEnabled)}
                        className={`flex items-center gap-3 px-8 py-3 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest ${resumeData.predictiveScoreEnabled ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-600' : 'bg-slate-100/50 dark:bg-slate-800/50 border-black/5 dark:border-white/10 text-slate-500'}`}
                        style={resumeData.predictiveScoreEnabled ? { color: activeColor, borderColor: `${activeColor}50`, backgroundColor: `${activeColor}10` } : {}}
                      >
                        {resumeData.predictiveScoreEnabled ? 'Engine Active' : 'Enable Scorer'}
                        <div className={`w-8 h-4 rounded-full relative transition-all ${resumeData.predictiveScoreEnabled ? 'bg-white/20' : 'bg-slate-400/20'}`}
                          style={resumeData.predictiveScoreEnabled ? { backgroundColor: `${activeColor}30` } : {}}>
                          <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all shadow-sm ${resumeData.predictiveScoreEnabled ? 'right-0.5 bg-white' : 'left-0.5 bg-slate-400'}`}
                            style={resumeData.predictiveScoreEnabled ? { backgroundColor: activeColor } : {}} />
                        </div>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/5 dark:border-white/5">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <span className="text-emerald-500 font-bold text-xs">1</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--v5-heading)] mb-1">Export</p>
                          <p className="text-[9px] leading-relaxed text-slate-500">Saves your entire resume draft as a master JSON file. Key safety net before a wipe.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                          <span className="text-blue-500 font-bold text-xs">2</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--v5-heading)] mb-1">Import</p>
                          <p className="text-[9px] leading-relaxed text-slate-500">Restore any past career snapshot instantly. Overwrites your current draft.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                          <span className="text-rose-500 font-bold text-xs">3</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--v5-heading)] mb-1">Wipe</p>
                          <p className="text-[9px] leading-relaxed text-slate-500">Resets the editor to a clean sample state. Ensure you have exported a JSON first.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Humorous Ads Notice */}
                  <div className="w-full py-3 px-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-dashed border-black/10 dark:border-white/10 flex items-center gap-3">
                    <div className="text-lg text-slate-400 transition-transform">☕</div>
                    <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed uppercase tracking-wider text-left">
                      <span className="text-amber-600 dark:text-amber-500">Ad-Protocol Active:</span> We show Google Ads so we don't have to charge you. They pay for the electricity and the lead dev's questionable caffeine addiction.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="p-10 space-y-12 max-w-4xl mx-auto rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Rocket className="w-16 h-16" style={{ color: activeColor }} />
                    <h2 className="text-3xl font-black tracking-tight text-[var(--v5-heading)]">Master the V5 Ecosystem</h2>
                    <p className="text-sm text-slate-500 max-w-lg">Everything you need to know about our professional resume engineering engine.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pillar 1: Getting Started */}
                    <div className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4 group hover:bg-black/10 transition-all">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--v5-heading)]">1. Getting Started</h3>
                      <p className="text-xs leading-relaxed text-slate-500">Begin by filling out your <strong>Identity</strong> and <strong>Summary</strong>. Expand your narrative using the Experience, Projects, and Education modules. Each item you add builds your <strong>ATS score</strong> in real-time.</p>
                    </div>

                    {/* Pillar 2: Section Color Logic */}
                    <div className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4 group hover:bg-black/10 transition-all">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                        <Palette size={24} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--v5-heading)]">2. Design Compliance</h3>
                      <p className="text-xs leading-relaxed text-slate-500">In the <strong>Structure</strong> tab, use the <strong>Section Color</strong> toggle to switch between high-impact and neutral aesthetics. This allows you to apply theme colors to headers and icons or keep them professionally black.</p>
                    </div>

                    {/* Pillar 3: Smart Section Cleanup */}
                    <div className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4 group hover:bg-black/10 transition-all">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                        <Sparkles size={24} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--v5-heading)]">3. Intelligent Cleanup</h3>
                      <p className="text-xs leading-relaxed text-slate-500">Don't have any projects or certifications? <strong>No problem.</strong> Our engine automatically detects empty sections and removes their headers and spacing from both the <strong>Live Preview</strong> and the final <strong>PDF</strong>.</p>
                    </div>

                    {/* Pillar 4: ATS Optimization */}
                    <div className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4 group hover:bg-black/10 transition-all">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--v5-heading)]">4. ATS Blueprints</h3>
                      <p className="text-xs leading-relaxed text-slate-500">Toggle the <strong>ATS Switch</strong> to instantly transform your resume into a machine-readable blueprint. We force-disable section colors and optimize spacing to ensure your resume passes through screening software with <strong>100% fidelity</strong>.</p>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex items-start gap-4">
                    <Zap className="text-amber-500 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1">Pro Strategy</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Use the <strong>Export Snapshot</strong> button regularly to keep local backups of your different resume versions. You can restore them anytime using <strong>Import</strong>.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Rocket className="w-16 h-16" style={{ color: activeColor }} />
                    <h2 className="text-3xl font-black tracking-tight text-[var(--v5-heading)]">🚀 Build Your Professional Resume in Minutes</h2>
                  </div>
                  <div className="space-y-6 text-[var(--v5-text)] text-sm leading-relaxed">
                    <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
                      <p className="mb-2"><strong className="text-[var(--v5-heading)] text-lg">Privacy First: Your data stays with you!</strong></p>
                      <p className="text-slate-500">We are a simple, privacy-focused tool designed to help you generate a polished resume quickly. We do not store any of your personal information.</p>
                    </div>

                    <div className="space-y-4 py-4">
                      <h3 className="text-xl font-black text-[var(--v5-heading)] text-center mb-6">Explore the Ecosystem</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="https://qpkendra.com" target="_blank" rel="noreferrer" className="group p-5 rounded-2xl bg-[var(--v5-card)]/50 border border-black/5 dark:border-white/5 hover:border-[var(--v5-accent)] transition-all flex items-center justify-between" style={{ '--v5-accent': activeColor }}>
                          <span className="font-bold text-[var(--v5-heading)]">QPKendra Hub</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:text-[var(--v5-accent)]" />
                        </a>
                        <a href="https://bankifsccode.qpkendra.com" target="_blank" rel="noreferrer" className="group p-5 rounded-2xl bg-[var(--v5-card)]/50 border border-black/5 dark:border-white/5 hover:border-[var(--v5-accent)] transition-all flex items-center justify-between" style={{ '--v5-accent': activeColor }}>
                          <span className="font-bold text-[var(--v5-heading)]">Search Bank IFSC Code</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:text-[var(--v5-accent)]" />
                        </a>
                        <a href="https://timer.qpkendra.com" target="_blank" rel="noreferrer" className="group p-5 rounded-2xl bg-[var(--v5-card)]/50 border border-black/5 dark:border-white/5 hover:border-[var(--v5-accent)] transition-all flex items-center justify-between" style={{ '--v5-accent': activeColor }}>
                          <span className="font-bold text-[var(--v5-heading)]">Pomodoro Timer App</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:text-[var(--v5-accent)]" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.shyam.msbtemodelanswerpaper" target="_blank" rel="noreferrer" className="group p-5 rounded-2xl bg-[var(--v5-card)]/50 border border-black/5 dark:border-white/5 hover:border-[var(--v5-accent)] transition-all flex items-center justify-between" style={{ '--v5-accent': activeColor }}>
                          <span className="font-bold text-[var(--v5-heading)] overflow-hidden text-ellipsis whitespace-nowrap">MSBTE Answer Paper App</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:text-[var(--v5-accent)] min-w-[16px] ml-3" />
                        </a>
                      </div>
                    </div>

                    <p className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-blue-600 dark:text-blue-400 text-center"><strong>Note:</strong> This site uses Google Analytics to gather anonymous usage data to improve our service.</p>
                    <div className="pt-6 border-t border-black/5 dark:border-white/5 text-center">
                      <p className="font-bold text-[var(--v5-heading)] tracking-wider">© 2026 Resume Builder | QPKendra</p>
                      <p className="text-[10px] mt-3 max-w-lg mx-auto text-slate-500">We do not store any personal data. We are not responsible for any suggestions or content generated by the user.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Explicit Spacer for Mobile Dock Clearance */}
              <div className="h-32 lg:hidden pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </main>

        {/* Resizer Handle */}
        <div
          onMouseDown={() => setIsResizing(true)}
          className={`hidden xl:flex w-1.5 hover:w-2 bg-transparent hover:bg-${activeColor}/20 cursor-col-resize transition-all relative z-50 group items-center justify-center`}
        >
          <div className="w-px h-10 bg-black/5 dark:bg-white/10 group-hover:bg-amber-500/50 rounded-full transition-colors" />
        </div>

        {/* Live Preview Pane - Now Dynamic Split */}
        <section
          className="hidden xl:flex border-l border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col p-4 lg:p-8 print:hidden shadow-2xl overflow-hidden relative"
          style={isDesktop ? { width: `${100 - splitWidth}%` } : {}}
        >
          <div className="flex items-center justify-between mb-4 px-4 h-12">
            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-black/5 dark:border-white/5">
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${previewMode === 'preview' ? 'bg-white dark:bg-slate-700 text-[var(--v5-heading)] shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
              >
                Preview
              </button>
              <button
                onClick={() => setPreviewMode('json')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${previewMode === 'json' ? 'bg-white dark:bg-slate-700 text-[var(--v5-heading)] shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
              >
                JSON Editor
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-[var(--v5-heading)]"><Search size={16} /></button>
              <button onClick={() => setIsEnlarged(true)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-[var(--v5-heading)]"><Maximize2 size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-stretch relative">
            {previewMode === 'preview' ? (
              <div
                className="transition-all duration-700 mx-auto mt-5"
                style={{
                  transform: 'scale(0.90)', // Optimized for high-density 50:50 split
                  transformOrigin: 'top center',
                  width: '800px',
                  maxWidth: '100%',
                  height: '0',
                  paddingBottom: 'calc(100% * 1.40 + 200px)' // Maintaining vertical perspective
                }}
              >
                <div className="shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[1.5rem] overflow-hidden pointer-events-none border border-black/5 dark:border-white/5">
                  <ModernLivePreview />
                </div>
              </div>
            ) : (
              <div className="h-full pt-4 pb-20 flex flex-col items-center">
                <div className="w-full max-w-4xl h-full flex flex-col px-4">
                  <V5JsonEditor
                    data={resumeData}
                    onUpdate={setResumeData}
                    activeColor={activeColor}
                  />
                  <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-center flex items-center justify-center gap-2">
                    <Zap size={10} className="text-amber-500" /> Changes sync in real-time
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Global Modals moved to relative contexts or kept as fixed if needed */}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="v5-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
          <div className="v5-modal max-w-2xl w-full rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-10 relative overflow-y-auto max-h-[min(95vh,850px)] custom-scrollbar relative z-10">
            {/* Background Glows removed for solid look */}

            <div className="relative z-10 flex flex-col items-center">
              {/* Header */}
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-black/5 dark:border-white/5 overflow-hidden">
                <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              </div>

              <h2 className="text-3xl font-black text-[var(--v5-heading)] mb-1 tracking-tight text-center">ResumeBuilder v5</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center opacity-70">by qpkendra</p>

              {/* Privacy Notice Pill */}
              <div className="w-full mb-6 py-3.5 px-6 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <ShieldCheck className="text-emerald-500" size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-0.5">Absolute Privacy</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Your data stays on your device. We use browser storage—no accounts, no tracking, no cloud sync.</p>
                </div>
              </div>

              {/* Storage Selection Toggle */}
              <div className="w-full mb-8 sm:mb-10 p-4 sm:p-5 bg-[var(--v5-bg)] rounded-2xl sm:rounded-3xl border border-[var(--v5-border)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h4 className="text-[10px] sm:text-[11px] font-black text-[var(--v5-heading)] uppercase tracking-widest">Storage Preference</h4>
                  <div className="flex bg-slate-200 dark:bg-black/40 p-1 rounded-xl border border-[var(--v5-border)] w-fit">
                    {['persistent', 'session'].map((mode) => {
                      const isActive = resumeData.storageType === mode;
                      return (
                        <button
                          key={mode}
                          onClick={() => updateStorageType(mode)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}
                          style={isActive ? { backgroundColor: activeColor } : {}}
                        >
                          {mode === 'persistent' ? 'Permanent' : 'Temporary'}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium bg-[var(--v5-card)] p-3 rounded-xl border border-[var(--v5-border)] mb-3">
                  {resumeData.storageType === 'persistent'
                    ? "🚀 Permanent Mode: Your work is saved automatically."
                    : "🔒 Temporary Mode: Your work is deleted on tab close."
                  }
                </p>
                <p className="text-[9px] sm:text-[10px] font-black text-[var(--v5-text)] text-center flex items-center justify-center gap-2">
                  <span className="text-amber-500">💡</span> Change this in Settings later.
                </p>
              </div>

              {/* Workflow Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full mb-8 sm:mb-10">
                {ONBOARDING_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 sm:p-5 bg-[var(--v5-bg)] rounded-2xl border border-[var(--v5-border)] group hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                    <div className={`p-3 rounded-xl mb-3 bg-${step.color}-500/20 text-${step.color}-500 group-hover:scale-110 transition-transform`}>
                      <step.icon size={20} />
                    </div>
                    <h5 className="text-[11px] font-black uppercase tracking-widest mb-1.5 text-[var(--v5-heading)]">{step.title}</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Advanced Features (Row) */}
              <div className="w-full flex flex-col gap-3 mb-10">
                <div className="p-5 bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/10 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-indigo-500/20 rounded-lg mt-1"><Sparkles size={16} className="text-indigo-500" /></div>
                  <div>
                    <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.15em] mb-1">ATS Intelligence</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Monitor your keyword density and professional score in real-time. Smart sections auto-hide if left empty.</p>
                  </div>
                </div>
                <div className="p-5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/10 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-amber-500/20 rounded-lg mt-1"><Settings size={16} className="text-amber-500" /></div>
                  <div>
                    <h4 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.15em] mb-1">Time Machine (Snapshots)</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Use the Snapshots tab to save Master JSON backups. Restore any career version in seconds.</p>
                  </div>
                </div>
              </div>

              {/* Humorous Ads Notice */}
              <div className="w-full mb-8 py-3 px-5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-dashed border-black/10 dark:border-white/10 flex items-center gap-3">
                <div className="text-lg text-slate-400 group-hover:rotate-12 transition-transform">☕</div>
                <p className="text-[9px] font-bold text-slate-500/80 leading-relaxed uppercase tracking-wider">
                  <span className="text-amber-500">Ad-Protocol Active:</span> We show Google Ads so we don't have to charge you. They pay for the electricity and the lead dev's questionable caffeine addiction.
                </p>
              </div>

              <button
                onClick={completeOnboarding}
                className="w-full py-5 text-white font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-[1.01] active:scale-95 transition-all text-[11px]"
                style={{ backgroundColor: activeColor, boxShadow: `0 20px 40px -10px ${activeColor}40` }}
              >
                Enter Workspace
              </button>

              <p className="mt-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-50">Version 5.0.0 • Stable Release</p>
            </div>
          </div>
        </div>
      )}

      {/* Zen Mode / Enlarge Modal */}
      {isEnlarged && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setIsEnlarged(false)} />
          <button
            onClick={() => setIsEnlarged(false)}
            className="fixed top-6 right-6 p-4 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/10 rounded-full text-white transition-all z-[210] exit-button active:scale-95 shadow-2xl"
          >
            <X size={24} />
          </button>
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar p-4 sm:p-20 lg:p-20 scale-in-center animate-in zoom-in-95 duration-500">
            <div className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <ModernLivePreview />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - Liquid Dock */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] animate-in slide-in-from-bottom-8 duration-500">
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
          <button onClick={handleDownload} className="p-2 xs:p-3 rounded-full text-white hover:bg-white/10 transition-colors" title="Print as PDF">
            <Printer size={20} />
          </button>
          <button onClick={() => setIsEnlarged(true)} aria-label="Enter Zen Mode Fullscreen Preview" className="p-2 xs:p-3 rounded-full text-white bg-white/10 ml-1 hover:scale-110 transition-transform">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      <PrintAdModal
        showPrintAd={showPrintAd}
        adCountdown={adCountdown}
        activeColor={activeColor}
        finalizePrintAction={finalizePrintAction}
        onClose={() => setShowPrintAd(false)}
      />
    </div>
  );
};

const V5Editor = () => (
  <ResumeProvider>
    <V5EditorContent />
  </ResumeProvider>
);

export default V5Editor;
