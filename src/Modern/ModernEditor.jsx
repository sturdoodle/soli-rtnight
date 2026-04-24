import React, { useRef, useState, useEffect } from 'react';
import { Share2, Sparkles, WandSparkles, ArrowLeft, FileDown, FileUp, Printer, Edit3, Eye, Zap } from 'lucide-react';
import PersonalDetails from './components/editor/PersonalDetails';
import SummarySection from './components/editor/SummarySection';
import ExperienceSection from './components/editor/ExperienceSection';
import EducationSection from './components/editor/EducationSection';
import SkillsSection from './components/editor/SkillsSection';
import ProjectsSection from './components/editor/ProjectsSection';
import CertificationsSection from './components/editor/CertificationsSection';
import FormattingTip from './components/editor/FormattingTip';
import TemplateSelector from './components/editor/TemplateSelector';
import ModernLivePreview from './components/preview/ModernLivePreview';
import PillButton from './components/ui/PillButton';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { useNotification } from '../context/NotificationContext';
import { useResumeActions } from '../hooks/useResumeActions';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './components/ui/ThemeToggle';
import EditorForm from '../components/editor/EditorForm';
import logo from '../assets/logo.png';
import { downloadPdf } from './utils/pdfGenerator';

const ModernEditorContent = () => {
  const { resumeData, setResumeData, updateTemplate, updateThemeColor, toggleAts, setEditorStyle } = useResume();
  const themeMode = resumeData.themeMode;
  const atsMode = resumeData.atsMode;
  const previewRef = useRef();
  const fileInputRef = useRef();
  const { handleExportJSON, handleImportJSON, handlePrint } = useResumeActions(resumeData, setResumeData);
  const goInstead = useNavigate();
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'

  useEffect(() => {
    setEditorStyle('modern');
  }, []);


  const handleDownload = async (type = 'print') => {
    // Set document title to traveler name for better PDF filename
    const originalTitle = document.title;
    const fileName = resumeData.fullName ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume` : 'Resume';
    document.title = fileName;
    
    if (type === 'download') {
      const element = previewRef.current;
      if (element) {
        try {
          await downloadPdf(element, `${fileName}.pdf`);
        } catch (err) {
          console.error("PDF download failed, falling back to print:", err);
          window.print();
        }
      }
    } else {
      window.print();
    }
    
    // Restore title after a short delay to ensure print dialog captures it
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div className="min-h-screen modern-bg-gradient py-6 px-4 sm:px-8 transition-colors duration-500 relative overflow-hidden print:bg-white print:p-0 print:overflow-visible">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage-500/10 dark:bg-sage-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation / Header */}
      <header className="max-w-[1600px] mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 px-6 sticky top-4 z-50 print:hidden">
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <PillButton variant="ghost" onClick={() => goInstead('/')} icon={ArrowLeft} className="shrink-0">
            Back to V4
          </PillButton>
          <div className="flex items-baseline gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
                <Sparkles className="text-sage-600 dark:text-sage-400" size={20} />
              </div>
              <h1 className="modern-heading text-2xl tracking-tighter">Modern Editor</h1>
            </div>
            <span className="text-[10px] font-bold text-sage-400 dark:text-sage-500 uppercase tracking-[0.2em] translate-y-[-2px]">v1.0 Premium</span>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto flex-wrap pb-2 sm:pb-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-50/50 dark:bg-sage-900/50 border border-sage-200/50 dark:border-sage-800/50 shadow-sm transition-all hover:bg-white dark:hover:bg-sage-900 group">
            <span className="text-[10px] font-bold text-sage-500 dark:text-sage-400 uppercase tracking-widest">ATS Safe</span>
            <button
              onClick={toggleAts}
              className={`w-9 h-5 rounded-full transition-all relative border border-transparent ${atsMode ? 'bg-sage-500 shadow-[0_0_10px_rgba(45,212,191,0.3)]' : 'bg-sage-200 dark:bg-sage-800'}`}
            >
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-all duration-300 ${atsMode ? 'left-4.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2">
            <PillButton
              variant="glass"
              icon={Zap}
              onClick={() => goInstead('/v5')}
              className="text-sky-500 hover:bg-sky-50 transition-all font-bold"
            >
              V5 Liquid
            </PillButton>
            <div className="h-4 w-px bg-sage-200 dark:bg-sage-800 hidden sm:block mx-1" />
            <PillButton
              variant="glass"
              icon={FileDown}
              onClick={handleExportJSON}
              className="text-sage-600 dark:text-sage-400 py-1.5 px-3 sm:py-2 sm:px-4 text-xs font-semibold"
            >
              JSON
            </PillButton>
            <PillButton
              variant="glass"
              icon={FileUp}
              onClick={() => fileInputRef.current.click()}
              className="text-sage-600 dark:text-sage-400 py-1.5 px-3 sm:py-2 sm:px-4 text-xs font-semibold"
            >
              JSON
            </PillButton>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />

          <div className="h-4 w-px bg-sage-200 dark:bg-sage-800 hidden sm:block mx-1" />

          <div className="flex items-center gap-2">
            <PillButton
              variant="glass"
              icon={FileDown}
              onClick={() => handleDownload('download')}
              className="hover:bg-sage-100 dark:hover:bg-sage-800 !px-3 sm:!px-4"
            >
              <span className="hidden sm:inline">Download</span> PDF
            </PillButton>
            <PillButton
              icon={Printer}
              onClick={() => handleDownload('print')}
              className="!px-3 sm:!px-4"
            >
              <span className="hidden sm:inline">Print</span> PDF
            </PillButton>
          </div>
        </div>
      </header>

      {/* Main Content: Split Screen */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4 sm:px-8 lg:px-12 pb-24 md:pb-12 print:block print:p-0 print:m-0 print:max-w-none print:overflow-visible">

        {/* Editor Column */}
        <div className={`space-y-6 pb-20 overflow-y-auto max-h-[85vh] pr-6 custom-scrollbar ${mobileTab === 'preview' ? 'hidden md:block' : 'block'} print:hidden`}>
          <div className="flex items-center gap-2 text-sage-400 mb-2 ml-2">
            <WandSparkles size={16} />
            <span className="text-xs uppercase tracking-widest font-bold text-sage-500 dark:text-sage-400">Smart Editor</span>
          </div>

          <TemplateSelector />

          <EditorForm />
        </div>

        {/* Preview Column: Sticky on Desktop with internal scroll */}
        <div className={`lg:sticky lg:top-32 h-[calc(100vh-180px)] flex-col ${mobileTab === 'editor' ? 'hidden md:flex' : 'flex'} print:!block print:p-0 print:m-0 print:static print:h-auto print:w-full print:bg-white`}>
          <div className="flex items-center justify-between mb-4 px-2 print:hidden">
            <div className="flex items-center gap-2 text-sage-400">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Live Premium Preview</span>
            </div>
            <span className="text-[10px] font-bold text-sage-300 uppercase tracking-tighter">Scroll to view all</span>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden print:overflow-visible print:p-0 rounded-3xl shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-white custom-scrollbar border border-white/20 print:shadow-none print:border-none print:rounded-none">
            <div ref={previewRef}>
              <ModernLivePreview />
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="max-w-[1600px] mx-auto mt-20 p-8 pt-0 pb-28 md:pb-8 text-center text-sage-400 text-sm md:block hidden print:hidden">
        <p>© {new Date().getFullYear()} Resume Builder | Modern Modular Architecture</p>
      </footer>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel !rounded-none !border-x-0 !border-b-0 border-t border-sage-200/30 dark:border-white/10 p-3 pt-4 z-50 flex justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex flex-col items-center gap-1.5 transition-all ${mobileTab === 'editor' ? 'text-sage-600 dark:text-sage-300 scale-110' : 'text-sage-400 dark:text-sage-600 hover:text-sage-500'}`}
        >
          <Edit3 size={20} strokeWidth={mobileTab === 'editor' ? 2.5 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Editor</span>
        </button>

        <button
          onClick={() => setMobileTab('preview')}
          className={`flex flex-col items-center gap-1.5 transition-all ${mobileTab === 'preview' ? 'text-sage-600 dark:text-sage-300 scale-110' : 'text-sage-400 dark:text-sage-600 hover:text-sage-500'}`}
        >
          <Eye size={20} strokeWidth={mobileTab === 'preview' ? 2.5 : 2} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Preview</span>
        </button>
      </nav>
    </div>
  );
};

const ModernEditor = () => (
  <ResumeProvider>
    <ModernEditorContent />
  </ResumeProvider>
);

export default ModernEditor;
