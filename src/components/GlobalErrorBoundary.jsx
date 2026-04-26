import React from 'react';
import { AlertTriangle, RefreshCcw, Download, Trash2, Home, Terminal, ShieldAlert } from 'lucide-react';
import { useResume } from '../Modern/context/ResumeContext';

// Functional UI Component to handle Hooks (Theme Sync)
const ErrorFallback = ({ error }) => {
  const { resumeData } = useResume();
  const themeMode = resumeData?.themeMode || 'light';
  const isDark = themeMode === 'dark';
  const themeColor = resumeData?.themeColor || '#3b82f6';

  const handleHardReset = () => {
    if (confirm("DANGER ZONE: This will permanently delete your local resume data. This action cannot be undone. Proceed?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/#/';
    }
  };

  const handleEmergencyExport = () => {
    try {
      const data = localStorage.getItem('resume_data') || '{}';
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume_emergency_backup_${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Emergency export failed.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-10 font-sans ${isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4 shadow-xl shadow-red-500/10">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">System Exception</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
            The application encountered an unexpected error. We've isolated the issue to prevent data loss.
          </p>
        </div>

        <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Error Details</span>
            </div>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[10px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {error?.message || error?.toString() || 'Unknown runtime error'}
              </pre>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-4 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest">Reload App</p>
                <p className="text-[9px] opacity-80 font-medium">Attempt recovery</p>
              </div>
            </button>

            <button
              onClick={handleEmergencyExport}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm active:scale-95 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-500">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">Export Data</p>
                <p className="text-[9px] text-slate-500 font-medium">Backup your resume</p>
              </div>
            </button>
          </div>

          <div className="px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="/#/" className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest">
              <Home size={14} /> Back to Dashboard
            </a>
            <button 
              onClick={handleHardReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              <Trash2 size={14} /> Wipe Local Cache
            </button>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
          qpkendra safe recovery mode
        </p>
      </div>
    </div>
  );
};

// Standard Class Component for Error Boundary logic
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global Error Boundary caught an exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
