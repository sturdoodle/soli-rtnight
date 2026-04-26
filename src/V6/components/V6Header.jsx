import { HelpCircle, User, Zap, Menu, Moon, Sun, Eye, Check, SplitSquareHorizontal, Edit3, Settings, Download, RefreshCw } from 'lucide-react';
import { useResume } from '../../Modern/context/ResumeContext';

const V6Header = ({ onMenuClick, activeSection, onSectionChange, showPreview, onTogglePreview, isMobileView, onDownload }) => {
  const { resumeData, toggleTheme } = useResume();

  return (
    <header className="h-20 border-b border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-black/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] rounded-xl transition-all active:scale-95 text-slate-600 dark:text-slate-400"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 text-slate-400">
          <Zap size={18} className="text-blue-500 fill-blue-500/10" />
          <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest truncate max-w-[80px] sm:max-w-none">
            {activeSection || 'Profile'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={onDownload}
          className="hidden sm:flex items-center gap-3 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl shadow-slate-900/20 dark:shadow-white/5 active:scale-95 transition-all group"
        >
          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Download PDF</span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-xl transition-colors text-slate-500"
        >
          {resumeData.themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          onClick={onTogglePreview}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl transition-all shadow-xl active:scale-95 whitespace-nowrap ${
            showPreview 
              ? 'bg-blue-600 text-white shadow-blue-500/30' 
              : 'bg-white dark:bg-white/[0.05] text-slate-500 border border-slate-200 dark:border-white/[0.08]'
          }`}
        >
          {showPreview ? <Edit3 size={16} /> : <Eye size={16} />}
          <span className="text-[10px] font-black uppercase tracking-[0.1em] hidden xs:block">
            {showPreview ? (isMobileView ? "Edit" : "Hide") : (isMobileView ? "Preview" : "Split")}
          </span>
        </button>

        <button 
          onClick={() => onSectionChange('settings')}
          className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-slate-500 border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/50 transition-all shrink-0 active:scale-95"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default V6Header;
