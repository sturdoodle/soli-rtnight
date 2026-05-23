"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../Modern/context/ResumeContext';
import { templates } from '../Modern/layouts';
import { 
  ChevronLeft, ChevronRight, Check, Eye, X, Moon, Sun, Settings, Printer, Maximize2,
  Palette, User, Briefcase, GraduationCap, Code, Layout, Award, FileText, Trash2, Plus, Download, Upload, Monitor, Type
} from 'lucide-react';
import { useResumeActions } from '../hooks/useResumeActions';
import { useNotification } from '../context/NotificationContext';
import ModernLivePreview from '../Modern/components/preview/ModernLivePreview';
import { useSplitPane } from '../hooks/useSplitPane';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalPrintModal from '../components/shared/UniversalPrintModal';
import { isDevelopmentMode } from '../lib/env';

// ─── Design Tokens ────────────────────────────────────────────────────────────
// All spacing, typography, and color decisions live here.
// Mobile → Desktop scale: compact → comfortable

const STEPS = [
  { id: 'contact',        title: 'Contact',       label: 'Personal',      icon: User          },
  { id: 'summary',        title: 'Bio',           label: 'About',         icon: FileText      },
  { id: 'experience',     title: 'Work History',  label: 'Experience',    icon: Briefcase     },
  { id: 'education',      title: 'Education',     label: 'School',        icon: GraduationCap },
  { id: 'skills',         title: 'Skills',        label: 'Strengths',     icon: Code          },
  { id: 'projects',       title: 'Projects',      label: 'Portfolio',     icon: Layout        },
  { id: 'certifications', title: 'Certifications',label: 'Awards',        icon: Award         },
  { id: 'appearance',     title: 'Design',        label: 'Style',         icon: Palette       },
];

// ─── Spring Config ────────────────────────────────────────────────────────────
const SPRING = { type: 'spring', damping: 28, stiffness: 220 };
const SPRING_SLOW = { type: 'spring', damping: 24, stiffness: 160 };

// ─── Main Editor ──────────────────────────────────────────────────────────────
const V7Editor = () => {
  return (
    <ErrorBoundary>
      <V7EditorContent />
    </ErrorBoundary>
  );
};

export default V7Editor;

// ─── Error Boundary (Premium UX) ──────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] flex items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white dark:bg-[#1a1a1b] rounded-[3rem] p-12 shadow-2xl border border-black/5 dark:border-white/5"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-8">
              <X size={40} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4">Something went wrong</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              The editor encountered an unexpected glitch. Don't worry, your data is safe in local storage.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
            >
              Reload Workspace
            </button>
          </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Internal Editor Logic ────────────────────────────────────────────────────
const V7EditorContent = () => {
  const { resumeData, updateTemplate, updateField, updateSection, updateThemeColor, toggleTheme, setResumeData } = useResume();
  const [step, setStep]           = useState(0);
  const [preview, setPreview]     = useState(false);  // mobile preview overlay
  const [showSettings, setShowSettings] = useState(false); // FAB Menu state
  const { splitWidth, isResizing, setIsResizing } = useSplitPane(58, false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [resumeScale, setResumeScale] = useState(1);
  const fileInputRef = useRef(null);

  const [showPrintAd, setShowPrintAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);
  const [downloadIntent, setDownloadIntent] = useState('print'); // 'print' | 'download'

  const { handleExportJSON, handleImportJSON, handlePrint } = useResumeActions(resumeData, setResumeData);

  // Container-Aware Layout (ResizeObserver)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setIsDesktop(entry.contentRect.width >= 1024); // Use 1024px for LG breakpoint
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Dynamic Resume Scaling (ResizeObserver)
  useEffect(() => {
    if (!previewContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        // Standard A4 width is ~794px at 96dpi
        const targetWidth = 794; 
        const padding = isDesktop ? 48 : 24; // Matches p-6 (desktop) and p-3 (mobile) approx
        const availableWidth = containerWidth - padding;
        const newScale = Math.max(0.4, Math.min(1, availableWidth / targetWidth));
        setResumeScale(newScale);
      }
    });

    observer.observe(previewContainerRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  // ─── Constants ───
  const activeColor = resumeData.themeColor || '#3b82f6';
  const cur = STEPS[step];

  // Helper to convert hex to rgb for glow effects
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246';
  };

  const go = (dir) => {
    const next = step + dir;
    if (next >= 0 && next < STEPS.length) {
      setStep(next);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── Advanced Print Logic (V5 Inspired) ───
  const triggerDownload = (intent = 'print') => {
    setDownloadIntent(intent);
    
    // SKip ad countdown in development mode for faster iterations
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
        const printBuffer = document.getElementById('print-buffer');
        if (printBuffer) {
          try {
            const { downloadPdf } = await import('../Modern/utils/pdfGenerator');
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
    let timer;
    if (showPrintAd && adCountdown > 0) {
      timer = setInterval(() => setAdCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showPrintAd, adCountdown]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        triggerDownload('print');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeData]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col h-screen bg-[#fafafa] dark:bg-[#0a0a0b] selection:bg-blue-500/30 overflow-hidden font-sans print:h-auto print:bg-white print:overflow-visible"
      style={{ '--v7-accent': activeColor, '--v7-accent-rgb': hexToRgb(activeColor) }}
    >
      {/* ── Unified Studio Header ── */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-xl z-50 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xl"
            style={{ backgroundColor: activeColor, boxShadow: `0 8px 20px -4px ${activeColor}40` }}>
            <span className="text-sm font-black tracking-tighter">V7</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">Studio Workspace</h1>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              Draft: {resumeData.fullName || 'Untitled'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Actions (Theme/ATS) */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all active:scale-95"
          >
            {resumeData.themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div 
            onClick={() => updateField('atsMode', !resumeData.atsMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
              resumeData.atsMode ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
            }`}
          >
            <span className="text-[10px] font-black tracking-widest uppercase">ATS</span>
            <div className={`w-6 h-3.5 rounded-full relative ${resumeData.atsMode ? 'bg-white/20' : 'bg-slate-300 dark:bg-slate-700'}`}>
              <motion.div 
                animate={{ x: resumeData.atsMode ? 10 : 2 }}
                className="absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm"
              />
            </div>
          </div>

          <button onClick={() => setPreview(true)} className="lg:hidden p-2 text-slate-400 hover:text-slate-800 transition-colors">
            <Eye size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative print:hidden">
        {/* ── Side A: Editor Pane ── */}
        <div 
          className="flex flex-1 lg:flex-none bg-white dark:bg-[#0a0a0b] min-h-0"
          style={isDesktop ? { width: `${splitWidth}%` } : { width: '100%' }}
        >
          {/* Vertical Navigation Rail */}
          <aside className="hidden sm:flex w-20 flex-col items-center py-6 border-r border-black/[0.04] dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 z-10">
            <div className="flex flex-col gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setStep(i); scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all group ${
                    i === step 
                      ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  title={s.title}
                >
                  <s.icon size={20} strokeWidth={2.5} className={i === step ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                  {i === step && (
                    <motion.div 
                      layoutId="rail-active"
                      className="absolute -right-3 w-1 h-6 bg-blue-500 rounded-full shadow-lg"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-black/[0.06] dark:border-white/[0.06] w-full flex flex-col items-center gap-4">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </aside>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 custom-scrollbar relative overscroll-contain"
          >
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={SPRING}
                >
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{cur.title}</h2>
                      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mt-1">Step {step + 1} of {STEPS.length} • {cur.label}</p>
                    </div>
                  </div>
              {/* ── Contact ── */}
              {cur.id === 'contact' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name"     placeholder="Alex Sterling"          value={resumeData.fullName} onChange={v => updateField('fullName', v)} />
                  <Field label="Current Role"  placeholder="Senior Product Designer" value={resumeData.jobTitle} onChange={v => updateField('jobTitle', v)} />
                  <Field label="Email"         placeholder="alex@studio.com"         value={resumeData.email}    onChange={v => updateField('email', v)} />
                  <Field label="Phone"         placeholder="+1 234 567 890"          value={resumeData.phone}    onChange={v => updateField('phone', v)} />
                  <Field label="Location"      placeholder="London, UK"              value={resumeData.address}  onChange={v => updateField('address', v)} />
                  <Field label="Website"       placeholder="alex.design"             value={resumeData.website}  onChange={v => updateField('website', v)} />
                </div>
              )}

              {/* ── Summary ── */}
              {cur.id === 'summary' && (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Professional Summary</p>
                  <textarea
                    value={resumeData.summary || ''}
                    onChange={e => updateField('summary', e.target.value)}
                    placeholder="Write 2–3 lines capturing who you are and what you bring…"
                    rows={6}
                    className="w-full bg-white dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/10 transition resize-none leading-relaxed"
                  />
                </div>
              )}

              {/* ── Experience ── */}
              {cur.id === 'experience' && (
                <ExperienceEditor
                  experience={resumeData.experience || []}
                  onChange={exp => updateSection('experience', exp)}
                />
              )}

              {/* ── Education ── */}
              {cur.id === 'education' && (
                <ListEditor
                  items={resumeData.education || []}
                  onAdd={() => updateSection('education', [...(resumeData.education || []), { id: Date.now(), school: '', degree: '', duration: '' }])}
                  onUpdate={(i, k, v) => { const a = [...(resumeData.education || [])]; a[i] = { ...a[i], [k]: v }; updateSection('education', a); }}
                  onRemove={i => updateSection('education', (resumeData.education || []).filter((_, j) => j !== i))}
                  addLabel="Add Education"
                  fields={[
                    { key: 'school',   label: 'School',  placeholder: 'MIT',                span: 1 },
                    { key: 'degree',   label: 'Degree',  placeholder: 'Computer Science',   span: 1 },
                    { key: 'duration', label: 'Duration',placeholder: '2017 – 2021',        span: 2 },
                  ]}
                />
              )}

              {/* ── Skills ── */}
              {cur.id === 'skills' && (
                <SkillsEditor
                  skills={resumeData.skills || []}
                  onChange={s => updateSection('skills', s)}
                />
              )}

              {/* ── Projects ── */}
              {cur.id === 'projects' && (
                <ListEditor
                  items={resumeData.projects || []}
                  onAdd={() => updateSection('projects', [...(resumeData.projects || []), { id: Date.now(), name: '', role: '', link: '', description: '' }])}
                  onUpdate={(i, k, v) => { const a = [...(resumeData.projects || [])]; a[i] = { ...a[i], [k]: v }; updateSection('projects', a); }}
                  onRemove={i => updateSection('projects', (resumeData.projects || []).filter((_, j) => j !== i))}
                  addLabel="Add Project"
                  fields={[
                    { key: 'name', label: 'Project Name', placeholder: 'Solaris OS',            span: 1 },
                    { key: 'role', label: 'Role',         placeholder: 'Lead Engineer',          span: 1 },
                    { key: 'link', label: 'Link',         placeholder: 'github.com/solaris',     span: 2 },
                  ]}
                  descKey="description"
                />
              )}

              {/* ── Certifications ── */}
              {cur.id === 'certifications' && (
                <ListEditor
                  items={resumeData.certifications || []}
                  onAdd={() => updateSection('certifications', [...(resumeData.certifications || []), { id: Date.now(), name: '', issuer: '', date: '' }])}
                  onUpdate={(i, k, v) => { const a = [...(resumeData.certifications || [])]; a[i] = { ...a[i], [k]: v }; updateSection('certifications', a); }}
                  onRemove={i => updateSection('certifications', (resumeData.certifications || []).filter((_, j) => j !== i))}
                  addLabel="Add Certification"
                  fields={[
                    { key: 'name',   label: 'Certification', placeholder: 'AWS Solutions Architect', span: 2 },
                    { key: 'issuer', label: 'Issuer',        placeholder: 'Amazon Web Services',     span: 1 },
                    { key: 'date',   label: 'Date',          placeholder: 'Jun 2023',                span: 1 },
                  ]}
                />
              )}

              {/* ── Appearance ── */}
              {cur.id === 'appearance' && (
                <div className="space-y-12 py-4">
                  {/* Section 1: Template */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Layout size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Choose Template</h3>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Select your preferred layout</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {Object.values(templates).map(t => {
                        const active = resumeData.selectedTemplate === t.id;
                        const getTag = (id) => {
                          if (id.includes('ats')) return { label: 'Reliable', color: 'slate' };
                          if (id.includes('tech')) return { label: 'Modern', color: 'blue' };
                          if (id.includes('leaf')) return { label: 'Creative', color: 'emerald' };
                          if (id.includes('indigo')) return { label: 'Sleek', color: 'indigo' };
                          return { label: 'Professional', color: 'slate' };
                        };
                        const tag = getTag(t.id);

                        return (
                          <button
                            key={t.id}
                            onClick={() => updateTemplate(t.id)}
                            className={`group relative flex items-center justify-between p-4 rounded-3xl border-2 transition-all duration-300 ${
                              active 
                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 shadow-lg shadow-blue-500/5' 
                                : 'border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-white/[0.02] hover:border-slate-200 dark:hover:border-white/[0.1] hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              {/* Small Preview Icon Chip */}
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                                active ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                              }`}>
                                <Layout size={20} />
                              </div>
                              
                              <div className="flex flex-col text-left">
                                <span className={`text-sm font-black tracking-tight ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                  {t.name}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                  {t.id === 'template-1' ? 'Classic Minimalist' : t.id === 'template-2' ? 'Visual Timeline' : 'Executive Layout'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Personality Chip */}
                              <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                                active 
                                  ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-white/10'
                              }`}>
                                {tag.label}
                              </span>
                              
                              {/* Selection Indicator */}
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                active ? 'bg-blue-500 text-white scale-100' : 'bg-slate-200 dark:bg-white/10 text-transparent scale-50 opacity-0'
                              }`}>
                                <Check size={14} strokeWidth={4} />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Section 2: Colors */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-500/10">
                          <Palette size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Signature Color</h3>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Define your brand accent</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 p-1">
                        {[
                          '#0f172a', '#1e40af', '#7c3aed', '#0f766e', 
                          '#b45309', '#be123c', '#166534', '#374151',
                          '#4f46e5', '#0891b2', '#ea580c', '#db2777'
                        ].map(color => {
                          const active = resumeData.themeColor === color;
                          return (
                            <button
                              key={color}
                              onClick={() => updateThemeColor(color)}
                              className={`group relative w-10 h-10 rounded-full transition-all duration-500 ${
                                active 
                                  ? 'scale-125 z-10 shadow-xl ring-4 ring-white dark:ring-[#0a0a0b] ring-offset-0' 
                                  : 'hover:scale-110 hover:shadow-lg'
                              }`}
                              style={{ 
                                backgroundColor: color,
                                boxShadow: active ? `0 10px 25px -5px ${color}80` : 'none'
                              }}
                            >
                              <div className={`absolute inset-0 rounded-full border-2 border-white/20 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                              {active && (
                                <motion.div 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 flex items-center justify-center text-white"
                                >
                                  <Check size={16} strokeWidth={4} />
                                </motion.div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Section 3: Fonts */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-500/10">
                          <Type size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Typography Engine</h3>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Curated high-fidelity typefaces</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-3 custom-scrollbar group/fonts">
                        {[
                          'Default', 'Inter', 'Lora', 'DM Sans', 
                          'Roboto', 'Poppins', 'Montserrat', 'Playfair Display',
                          'Plus Jakarta Sans', 'Space Grotesk', 'Merriweather', 'Figtree', 'Outfit'
                        ].map(font => {
                          const active = (resumeData.fontFamily || 'Default') === font;
                          return (
                            <button
                              key={font}
                              onClick={() => updateField('fontFamily', font)}
                              className={`relative px-4 py-3.5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                                active 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 shadow-lg shadow-blue-500/5' 
                                  : 'border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-white/[0.02] hover:border-slate-200 dark:hover:border-white/[0.1] hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span 
                                  className={`text-[11px] font-black uppercase tracking-widest transition-colors ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                                  style={{ fontFamily: font === 'Default' ? 'inherit' : font }}
                                >
                                  {font}
                                </span>
                                <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-0.5">
                                  {font === 'Default' ? 'System Standard' : 'Professional Face'}
                                </span>
                              </div>
                              {active && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </div>

                  {/* Section 4: Night Mode */}
                  <section className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-6 flex items-center justify-between border border-black/[0.03] dark:border-white/[0.03]">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        resumeData.themeMode === 'dark' ? 'bg-indigo-500 text-white rotate-12' : 'bg-amber-400 text-white'
                      }`}>
                        {resumeData.themeMode === 'dark' ? <Eye size={24} /> : <Palette size={24} />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Night Mode</h3>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Switch app appearance</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="relative w-20 h-10 rounded-full bg-slate-200 dark:bg-white/10 p-1 transition-colors group"
                    >
                      <motion.div 
                        animate={{ x: resumeData.themeMode === 'dark' ? 40 : 0 }}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center"
                      >
                        {resumeData.themeMode === 'dark' ? <X size={14} className="text-slate-400" /> : <div className="w-2 h-2 rounded-full bg-amber-400" />}
                      </motion.div>
                    </button>
                  </section>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>

        {/* ── Floating Command Menu (FAB) ── */}
        <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 z-[60]">
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="mb-4 bg-white/90 dark:bg-[#1a1a1b]/95 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.4)] min-w-[240px]"
              >
                <div className="grid grid-cols-2 gap-2">
                  <MenuButton icon={Download} label="Export" sub="Save JSON" color="emerald" onClick={handleExportJSON} />
                  <MenuButton icon={Upload} label="Import" sub="Load JSON" color="blue" onClick={() => fileInputRef.current?.click()} />
                  <MenuButton icon={Printer} label="Print" sub="Save PDF" color="indigo" onClick={() => triggerDownload('print')} />
                  <MenuButton icon={Monitor} label="Preview" sub="Split View" color="amber" onClick={() => setPreview(!preview)} />
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImportJSON} />
                
                <div className="mt-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between px-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Night Mode</span>
                  <button onClick={toggleTheme} className="w-10 h-6 rounded-full bg-slate-100 dark:bg-white/10 relative transition-all">
                    <motion.div 
                      animate={{ x: resumeData.themeMode === 'dark' ? 18 : 2 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-blue-500 shadow-sm"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-90 ${
              showSettings ? 'bg-slate-900 dark:bg-white text-white dark:text-black rotate-45' : 'bg-blue-500 text-white hover:scale-110'
            }`}
            style={!showSettings ? { backgroundColor: activeColor, boxShadow: `0 15px 30px -5px ${activeColor}60` } : {}}
          >
            {showSettings ? <X size={24} /> : <Settings size={24} className="animate-spin-slow" />}
          </button>
        </div>

        {/* ── Floating Liquid Navigation Dock (V5 Inspired) ── */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/90 dark:bg-[#1a1a1b]/95 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex items-center gap-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <button
              onClick={() => go(-1)}
              disabled={step === 0}
              className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-10 transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Progress Label */}
            <div className="px-4 py-1 flex flex-col items-center">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1">{cur.title}</span>
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-1 bg-white/20'}`} />
                ))}
              </div>
            </div>

            <button
              onClick={() => go(1)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xl ${
                step === STEPS.length - 1
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-black hover:scale-105'
              }`}
            >
              {step === STEPS.length - 1 ? <Check size={18} strokeWidth={3} /> : <ChevronRight size={20} strokeWidth={3} />}
            </button>
          </motion.div>
        </div>

        {/* ── Desktop Divider ── */}
        {isDesktop && (
          <div
            onMouseDown={() => setIsResizing(true)}
            className="w-px h-full bg-black/[0.06] dark:bg-white/[0.06] cursor-col-resize hover:bg-blue-400 transition-colors"
          />
        )}

        {/* ── Side B: Preview Pane ── */}
        <AnimatePresence>
          {(isDesktop || preview) && (
            <motion.aside
              key="preview"
              initial={isDesktop ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={SPRING_SLOW}
              className={`fixed lg:relative lg:flex-none inset-0 lg:inset-auto h-full flex flex-col bg-slate-100 dark:bg-[#111113] overflow-hidden ${
                preview && !isDesktop ? 'z-[70]' : 'z-0'
              }`}
              style={isDesktop ? { width: `${100 - splitWidth}%` } : { width: '100vw' }}
            >
              {/* Mobile Preview Header */}
              {!isDesktop && (
                <div className="flex-shrink-0 flex items-center justify-between px-4 h-14 border-b border-black/[0.06] dark:border-white/[0.06] bg-slate-100/95 dark:bg-[#111113]/95 backdrop-blur-md">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Preview</span>
                  <button
                    onClick={() => setPreview(false)}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Scroll area — no top padding hack needed anymore */}
              <div 
                ref={previewContainerRef}
                className="flex-1 min-h-0 overflow-auto flex flex-col items-center p-3 sm:p-5 lg:p-6"
              >
                <motion.div 
                  animate={{ scale: resumeScale }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full max-w-[794px] bg-white rounded-lg shadow-xl overflow-visible origin-top"
                >
                  <ModernLivePreview />
                </motion.div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ── Background Print Buffer (V5 Inspired) ── */}
      <div id="print-buffer" className="hidden print:block bg-white" aria-hidden="true">
        <ModernLivePreview />
      </div>

      {/* ── Print Ad Modal (V5 Inspired) ── */}
      <UniversalPrintModal
        isOpen={showPrintAd}
        countdown={adCountdown}
        onFinalize={finalizePrintAction}
        onClose={() => setShowPrintAd(false)}
        accentColor={resumeData.themeColor}
      />
    </div>
  );
};

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({ label, placeholder, value, onChange, span = 1, type = 'text' }) => (
  <div className={`flex flex-col gap-1 ${span === 2 ? 'sm:col-span-2' : ''}`}>
    <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">
      {label}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/10 transition"
    />
  </div>
);

// ─── List Editor ──────────────────────────────────────────────────────────────
const ListEditor = ({ items, onAdd, onUpdate, onRemove, addLabel, fields, descKey }) => (
  <div className="space-y-3">
    {/* Items */}
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.id || i} className="bg-white dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] rounded-xl p-4 relative group">
          {/* Remove */}
          <button
            onClick={() => onRemove(i)}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
          >
            <Trash2 size={13} />
          </button>

          <div className="grid grid-cols-2 gap-3 pr-8">
            {fields.map(f => (
              <div key={f.key} className={`flex flex-col gap-1 ${f.span === 2 ? 'col-span-2' : ''}`}>
                <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">
                  {f.label}
                </label>
                <input
                  type="text"
                  value={item[f.key] || ''}
                  onChange={e => onUpdate(i, f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-blue-400 transition"
                />
              </div>
            ))}
            {descKey && (
              <div className="col-span-2 flex flex-col gap-1 mt-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">
                  Description
                </label>
                <textarea
                  value={item[descKey] || ''}
                  onChange={e => onUpdate(i, descKey, e.target.value)}
                  placeholder="Describe your impact, achievements…"
                  rows={3}
                  className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none resize-none leading-relaxed border-b border-black/[0.07] dark:border-white/[0.07] pb-1 focus:border-blue-400 transition"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Add button */}
    <button
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-slate-400 dark:text-slate-500 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all active:scale-98"
    >
      <Plus size={14} />
      {addLabel}
    </button>
  </div>
);

// ─── Skills Editor ────────────────────────────────────────────────────────────
const SkillsEditor = ({ skills, onChange }) => (
  <div className="space-y-3">
    <div className="space-y-3">
      {skills.map((s, i) => (
        <div key={i} className="bg-white dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] rounded-xl p-4 relative group">
          <button
            onClick={() => onChange(skills.filter((_, j) => j !== i))}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
          >
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-1 gap-3 pr-8">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">Category</label>
              <input
                type="text"
                value={s.category || ''}
                onChange={e => { const a = [...skills]; a[i] = { ...a[i], category: e.target.value }; onChange(a); }}
                placeholder="e.g. Frontend"
                className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-blue-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">Skills (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(s.items) ? s.items.join(', ') : (s.items || '')}
                onChange={e => { const a = [...skills]; a[i] = { ...a[i], items: e.target.value.split(',').map(x => x.trim()).filter(Boolean) }; onChange(a); }}
                placeholder="React, TypeScript, Tailwind CSS"
                className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    <button
      onClick={() => onChange([...skills, { category: '', items: [] }])}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold text-slate-400 dark:text-slate-500 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all"
    >
      <Plus size={14} />
      Add Skill Category
    </button>
  </div>
);

// ─── Experience Editor ────────────────────────────────────────────────────────
const ExperienceEditor = ({ experience, onChange }) => {
  const addPosition = () => {
    onChange([...experience, { id: Date.now(), company: '', role: '', duration: '', clients: [] }]);
  };

  const updatePosition = (i, field, value) => {
    const a = [...experience];
    a[i] = { ...a[i], [field]: value };
    onChange(a);
  };

  const removePosition = (i) => {
    onChange(experience.filter((_, j) => j !== i));
  };

  const addClient = (posIndex) => {
    const a = [...experience];
    const clients = a[posIndex].clients || [];
    a[posIndex] = { 
      ...a[posIndex], 
      clients: [...clients, { id: Date.now(), name: '', bulletPoints: [] }] 
    };
    onChange(a);
  };

  const updateClient = (posIndex, clientIndex, field, value) => {
    const a = [...experience];
    const clients = [...(a[posIndex].clients || [])];
    clients[clientIndex] = { ...clients[clientIndex], [field]: value };
    a[posIndex] = { ...a[posIndex], clients };
    onChange(a);
  };

  const removeClient = (posIndex, clientIndex) => {
    const a = [...experience];
    const clients = (a[posIndex].clients || []).filter((_, j) => j !== clientIndex);
    a[posIndex] = { ...a[posIndex], clients };
    onChange(a);
  };

  return (
    <div className="space-y-6">
      {experience.map((item, i) => (
        <div key={item.id || i} className="bg-white dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] rounded-2xl p-5 sm:p-6 relative group">
          {/* Header with Icon and Remove */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-blue-500">
              <Briefcase size={14} className="opacity-70" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Experience Unit</span>
            </div>
            <button
              onClick={() => removePosition(i)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Company</label>
              <input
                type="text"
                value={item.company || ''}
                onChange={e => updatePosition(i, 'company', e.target.value)}
                placeholder="Global Tech Solutions Inc."
                className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none focus:border-blue-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Role</label>
              <input
                type="text"
                value={item.role || ''}
                onChange={e => updatePosition(i, 'role', e.target.value)}
                placeholder="Lead Consultant"
                className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none focus:border-blue-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Duration</label>
              <input
                type="text"
                value={item.duration || ''}
                onChange={e => updatePosition(i, 'duration', e.target.value)}
                placeholder="Jan 2022 – Present"
                className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Nested Clients */}
          <div className="space-y-6 ml-2 sm:ml-4 border-l-2 border-slate-100 dark:border-white/[0.05] pl-4 sm:pl-6">
            {(item.clients || []).map((client, ci) => (
              <div key={client.id || ci} className="relative group/client bg-slate-50/50 dark:bg-white/[0.01] rounded-xl p-4 border border-transparent hover:border-black/[0.05] dark:hover:border-white/[0.05] transition-all">
                <button
                  onClick={() => removeClient(i, ci)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 opacity-0 group-hover/client:opacity-100 transition-all"
                >
                  <Trash2 size={12} />
                </button>

                <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-500">
                  <ChevronRight size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Client / Project</span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Client / Project Name</label>
                    <input
                      type="text"
                      value={client.name || ''}
                      onChange={e => updateClient(i, ci, 'name', e.target.value)}
                      placeholder="HealthTech Systems Corp"
                      className="w-full bg-transparent border-b border-black/[0.07] dark:border-white/[0.07] pb-1 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-blue-400 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Bullet Points (One per line)</label>
                    <textarea
                      value={(client.bulletPoints || []).join('\n')}
                      onChange={e => updateClient(i, ci, 'bulletPoints', e.target.value.split('\n'))}
                      placeholder="• Data Visualization Engine: Orchestrated..."
                      rows={3}
                      className="w-full bg-transparent text-sm text-slate-600 dark:text-slate-400 outline-none resize-none leading-relaxed border-b border-black/[0.07] dark:border-white/[0.07] pb-1 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => addClient(i)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-black/[0.1] dark:border-white/[0.1] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"
            >
              <Plus size={12} />
              Add Project / Client
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addPosition}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center gap-2 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all group active:scale-[0.99]"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
          <Plus size={16} />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest">Add Position</span>
      </button>
    </div>
  );
};
// ─── Menu Button (FAB Item) ──────────────────────────────────────────────────
const MenuButton = ({ icon: Icon, label, sub, color, onClick }) => {
  const colorMap = {
    emerald: { bg: '#10b981', shadow: 'rgba(16, 185, 129, 0.2)' },
    blue:    { bg: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.2)' },
    indigo:  { bg: '#6366f1', shadow: 'rgba(99, 102, 241, 0.2)' },
    amber:   { bg: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.2)' },
    rose:    { bg: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.2)' },
    slate:   { bg: '#475569', shadow: 'rgba(71, 85, 105, 0.2)' },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left group"
    >
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg text-white"
        style={{ backgroundColor: theme.bg, boxShadow: `0 8px 20px -4px ${theme.shadow}` }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">{label}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sub}</p>
      </div>
    </button>
  );
};
