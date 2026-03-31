import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus, Edit3, Layout, Palette, Type, History,
  Sparkles, ShieldCheck, Moon, Sun, Download, Upload,
  Trash2, Search, Maximize2, Zap, BarChart3, User, Briefcase, GraduationCap, Award, FileText, FolderCode, Mail, Phone, MapPin, Github, ArrowLeft, X, Rocket, ExternalLink, Menu, ChevronLeft, ChevronRight, Printer, Settings
} from 'lucide-react';
import { useResume, ResumeProvider } from '../Modern/context/ResumeContext';
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
import logo from '../V4/components/shared/o-logo.png';
import AdSenseAd from '../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../MainConstant.js';

const SidebarItem = ({ icon: Icon, label, active, onClick, disabled, activeColor, collapsed }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'lg:justify-start justify-center'} gap-4 py-4 px-4 rounded-2xl transition-all group ${disabled ? 'opacity-20 cursor-not-allowed' : ''}`}
    style={active ? {
      backgroundColor: `${activeColor}15`,
      color: activeColor,
      borderColor: `${activeColor}20`,
      borderWidth: '1px'
    } : {}}
    title={collapsed ? label : undefined}
  >
    <Icon size={18} className={`shrink-0 transition-all ${active ? 'scale-110 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'group-hover:scale-110 text-slate-500 group-hover:text-[var(--v5-heading)]'}`} />
    {!collapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden lg:block whitespace-nowrap">{label}</span>}
  </button>
);

const V5EditorContent = () => {
  const {
    resumeData, updateField, setResumeData, toggleAts, toggleTheme,
    updateStorageType, resetResume, setEditorStyle
  } = useResume();
  const [activeTab, setActiveTab] = useState('content'); // content, layout, theme, analytics
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const navigate = useNavigate();
  const atsMode = resumeData.atsMode;
  const themeMode = resumeData.themeMode;
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navbarFileInputRef = React.useRef(null);
  const mobileFileInputRef = React.useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('v5_onboarding_completed');
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

  const tabMeta = {
    content: { title: "Identity", subtitle: "Create a compelling professional profile" },
    layout: { title: "Layout", subtitle: "Select a professional structure for your resume" },
    typography: { title: "Typography", subtitle: "Choose professional fonts for maximum readability" },
    snapshots: { title: "Backups", subtitle: "Save and manage your resume drafts" },
    history: { title: "Backups", subtitle: "Save and manage your resume drafts" },
    about: { title: "About Us", subtitle: "Privacy First: Your data remains secure and private." }
  };

  const currentMeta = tabMeta[activeTab] || tabMeta.content;

  useEffect(() => {
    setEditorStyle('liquid');
  }, []);

  const handleDownload = () => window.print();

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataRow = "data:text/json;charset=utf-8," + encodeURIComponent(dataStr);
    const downloadAnchorNode = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    downloadAnchorNode.setAttribute("href", dataRow);
    downloadAnchorNode.setAttribute("download", `resume-snapshot-${date}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setResumeData(json);
      } catch (err) {
        alert("Invalid JSON snapshot file.");
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
            <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-[var(--v5-heading)] transition-colors pr-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
              style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}60` }}>
              <img src={logo} alt="Logo" className="w-5 h-5 object-contain brightness-0 invert" />
            </div>
            <h1 className="text-xl font-black tracking-[-0.05em] text-[var(--v5-heading)] hidden sm:block cursor-pointer">Resume Builder | QPkendra</h1>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-5 pt-5 border-b-2 transition-all`}
              style={activeTab === 'content' ? { borderColor: activeColor, color: activeColor } : { borderColor: 'transparent' }}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`pb-5 pt-5 border-b-2 transition-all`}
              style={activeTab === 'layout' ? { borderColor: activeColor, color: activeColor } : { borderColor: 'transparent' }}
            >
              Structure
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-5 pt-5 border-b-2 transition-all`}
              style={activeTab === 'about' ? { borderColor: activeColor, color: activeColor } : { borderColor: 'transparent' }}
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
              <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Export</span>
            </button>
            
            <button 
              onClick={() => navbarFileInputRef.current?.click()}
              className="flex flex-row items-center gap-2 h-full px-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group text-slate-500 hover:text-blue-500 cursor-pointer whitespace-nowrap"
              title="Import Snapshot (JSON)"
            >
              <Upload size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Import</span>
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
            <span className={`pl-2 pr-0.5 text-[9px] font-black uppercase tracking-widest transition-all ${atsMode ? 'text-white' : 'text-slate-500'}`}>
              ATS
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-all ${atsMode ? 'bg-white/20 shadow-inner' : 'bg-slate-700/20'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${atsMode ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </div>

          <button onClick={toggleTheme} className="p-2 sm:p-2.5 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
            {themeMode === 'dark' ? <Sun size={18} className="text-amber-400 group-hover:rotate-45 transition-transform" /> : <Moon size={18} style={{ color: activeColor }} className="group-hover:rotate-[-45deg] transition-transform" />}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: activeColor, boxShadow: `0 10px 25px -5px ${activeColor}50` }}
          >
            <Download size={14} className="hidden xs:block" />
            <span className="hidden xs:inline">Publish</span>
            <span className="xs:hidden">GO</span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--v5-card)]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-40 shadow-xl shadow-black/10 animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 text-[11px] font-black uppercase tracking-[0.2em] max-w-7xl mx-auto space-y-1">
            <button
              onClick={() => { setActiveTab('content'); setIsMobileMenuOpen(false); }}
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'content' ? 'bg-black/5 dark:bg-white/5' : ''}`}
              style={{ color: activeTab === 'content' ? activeColor : 'var(--v5-text)' }}
            >
              Editor
            </button>
            <button
              onClick={() => { setActiveTab('layout'); setIsMobileMenuOpen(false); }}
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'layout' ? 'bg-black/5 dark:bg-white/5' : ''}`}
              style={{ color: activeTab === 'layout' ? activeColor : 'var(--v5-text)' }}
            >
              Structure
            </button>
            <button
              onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
              className={`py-4 text-left px-6 rounded-xl transition-all ${activeTab === 'about' ? 'bg-black/5 dark:bg-white/5' : ''}`}
              style={{ color: activeTab === 'about' ? activeColor : 'var(--v5-text)' }}
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
        <aside className={`hidden lg:flex ${isSidebarCollapsed ? 'w-24' : 'w-72'} border-r border-black/5 dark:border-white/5 bg-[var(--v5-bg)] flex-col pt-10 print:hidden transition-all duration-300 relative`}>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-10 w-6 h-6 bg-[var(--v5-card)] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:scale-110 transition-all z-10 hidden lg:flex text-slate-500 hover:text-[var(--v5-heading)]"
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <div className={`px-8 hidden lg:block transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-0 max-h-0 mb-0 overflow-hidden' : 'opacity-100 max-h-[200px] mb-12'}`}>
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

          <nav className="flex-1 space-y-3 px-4 transition-all">
            <SidebarItem icon={FileText} label="Identity" active={activeTab === 'content'} onClick={() => setActiveTab('content')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Layout} label="Structure" active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Type} label="Typeface" active={activeTab === 'typography'} onClick={() => setActiveTab('typography')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'snapshots'} onClick={() => setActiveTab('snapshots')} activeColor={activeColor} collapsed={isSidebarCollapsed} />
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

        {/* Editor Canvas */}
        <main className="flex-1 overflow-y-auto bg-[var(--v5-canvas)]/10 p-2 sm:p-6 lg:px-4 lg:py-6 pb-24 lg:pb-8 custom-scrollbar print:hidden will-change-transform">
          <div className="max-w-7xl mx-auto h-full">
            <div className="min-h-full rounded-2xl sm:rounded-[3rem] bg-[var(--v5-card)]/50 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] pt-8 pb-32 px-4 sm:px-8 lg:px-12 py-8">
              <header className="mb-8 lg:mb-10">
                <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.05em] text-[var(--v5-heading)] mb-2 leading-[0.9] transition-all duration-700">{currentMeta.title}</h1>
                <p className="text-sm sm:text-base text-[var(--v5-text)] font-medium tracking-tight transition-all duration-700 delay-100 opacity-80">{currentMeta.subtitle}</p>
              </header>

              {activeTab === 'content' && (
                <div className="mb-8 p-6 sm:p-10 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-700">
                  <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" />
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                </div>
              )}

              {activeTab === 'layout' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <TemplateSelector />
                </div>
              ) : null}

              {activeTab === 'typography' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      onClick={() => updateField('fontFamily', 'Default')}
                      className={`p-10 rounded-[2.5rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${resumeData.fontFamily === 'Default' || !resumeData.fontFamily ? 'border-[var(--v5-accent)] shadow-[0_0_25px_-5px_var(--v5-accent)] scale-[1.02]' : 'border-black/5 dark:border-white/5 hover:scale-105'}`}
                      style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { borderColor: activeColor } : {}}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-500/10 rounded-xl"><Layout size={18} className="text-slate-500" /></div>
                        <h4 className="text-xl font-black text-[var(--v5-heading)]">System Default</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Revert to the layout's original architectural typeface intent.</p>
                      <div className="mt-8 flex justify-end">
                        <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'text-white' : 'text-slate-400'}`}
                          style={(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? { backgroundColor: activeColor } : {}}>
                          {(resumeData.fontFamily === 'Default' || !resumeData.fontFamily) ? 'Engine Reset' : 'Restore Native'}
                        </div>
                      </div>
                    </button>

                    {[
                      { name: 'Inter Architecture', desc: 'Modern, high-velocity technical sans.', font: 'Inter' },
                      { name: 'Lora Elegant', desc: 'Sophisticated professional serif architecture.', font: 'Lora' },
                      { name: 'Roboto Technical', desc: 'Precise engineering-grade monospace.', font: 'Roboto Mono' },
                      { name: 'Outfit Modern', desc: 'Clean, approachable geometric typeface.', font: 'Outfit' }
                    ].map((f) => {
                      const isActive = resumeData.fontFamily === f.font;
                      return (
                        <button
                          key={f.name}
                          onClick={() => updateField('fontFamily', f.font)}
                          className={`p-10 rounded-[2.5rem] bg-[var(--v5-card)]/30 border transition-all group relative overflow-hidden text-left ${isActive ? 'border-[var(--v5-accent)] shadow-[0_0_25px_-5px_var(--v5-accent)] scale-[1.02]' : 'border-black/5 dark:border-white/5 hover:scale-105'}`}
                          style={isActive ? { borderColor: activeColor } : {}}
                        >
                          <h4 className="text-xl font-black text-[var(--v5-heading)] mb-2" style={{ fontFamily: f.font }}>{f.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">{f.desc}</p>
                          <div className="mt-8 flex justify-end">
                            <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${isActive ? 'text-white' : 'text-[#0ea5e9]'}`}
                              style={isActive ? { backgroundColor: activeColor } : {}}>
                              {isActive ? 'Engine Active' : 'Activate Engine'}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'snapshots' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button onClick={handleExportJSON} className="group p-10 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 text-center hover:bg-emerald-500/10 transition-all hover:scale-105">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Download className="text-emerald-500" size={28} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Export Snapshot</span>
                    </button>

                    <label className="group p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 text-center hover:bg-blue-500/10 transition-all hover:scale-105 cursor-pointer">
                      <input type="file" className="hidden" accept=".json" onChange={handleImportJSON} />
                      <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Plus className="text-blue-500" size={28} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Import Snapshot</span>
                    </label>

                    <button onClick={() => setShowWipeConfirm(true)} className="group p-10 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 text-center hover:bg-rose-500/10 transition-all hover:scale-105">
                      <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Trash2 className="text-rose-500" size={28} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">Wipe Engine</span>
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
                              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-400'}`}
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
                </div>
              )}

              {activeTab === 'about' && (
                <div className="p-10 space-y-8 max-w-3xl mx-auto rounded-[3rem] bg-[var(--v5-card)]/40 border border-black/5 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            </div>
          </div>
        </main>

        {/* Live Preview Pane */}
        <section className="hidden xl:flex w-[650px] border-l border-white/5 bg-[var(--v5-bg)] flex-col p-4 sm:p-6 print:hidden shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: activeColor, boxShadow: `0 0-10px ${activeColor}80` }} />
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Simulation</span>
            </div>
            <div className="flex items-center gap-5">
              <button className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-[var(--v5-heading)]"><Search size={18} /></button>
              <button onClick={() => setIsEnlarged(true)} className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-[var(--v5-heading)]"><Maximize2 size={18} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center py-6 bg-[var(--v5-canvas)]/20 rounded-[2.5rem] border border-black/5 dark:border-white/5 relative">
            <div
              className="transition-all duration-700"
              style={{
                transform: 'scale(0.65)', // Perfectly balanced for 650px width
                transformOrigin: 'top center',
                width: '800px',
                height: '0',
                paddingBottom: 'calc(100% * 1.40 + 200px)' // Force a scrolling height that matches the content without being excessive
              }}
            >
              <div className="shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[1.5rem] overflow-hidden pointer-events-none">
                <ModernLivePreview />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Wipe Confirmation Modal */}
      {showWipeConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 text-rose-500">
                <Trash2 size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Wipe Engine Cache?</h3>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">This will erase all your resume data and reset the structural blueprint to factory defaults. This action cannot be undone.</p>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setShowWipeConfirm(false)}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { resetResume(); setShowWipeConfirm(false); }}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5"
                >
                  Confirm Wipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 v5-modal-overlay">
          <div className="max-w-xl w-full v5-modal rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-y-auto max-h-[min(90vh,800px)] custom-scrollbar animate-in zoom-in-95 duration-300">
            {/* Background Glows for Modal */}
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20" style={{ backgroundColor: activeColor }} />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/20">
                <Sparkles className="text-indigo-500" size={40} />
              </div>

              <h2 className="text-3xl font-black text-[var(--v5-heading)] mb-4 tracking-tight">Resume Builder | QPkendra V5</h2>
              <p className="text-slate-500 leading-relaxed mb-8">Build a professional, ATS-friendly resume in minutes. Precision-crafted templates designed to help you land your dream role.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full mb-8 sm:mb-10 text-left">
                <div className="p-4 sm:p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg"><Settings size={14} className="text-blue-500" /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Time Machine</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Use the Settings tab to export master JSON snapshots or restore any past career version.</p>
                </div>
                <div className="p-4 sm:p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg"><ShieldCheck size={14} className="text-emerald-500" /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Data Guard</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Toggle between Permanent and Temporary storage depending on your work environment.</p>
                </div>
              </div>

              <button
                onClick={completeOnboarding}
                className="w-full py-5 text-white font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                style={{ backgroundColor: activeColor, boxShadow: `0 20px 40px -10px ${activeColor}40` }}
              >
                Activate Engine
              </button>
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
          <button onClick={() => setIsEnlarged(true)} className="p-2 xs:p-3 rounded-full text-white bg-white/10 ml-1 hover:scale-110 transition-transform">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const V5Editor = () => (
  <ResumeProvider>
    <V5EditorContent />
  </ResumeProvider>
);

export default V5Editor;
