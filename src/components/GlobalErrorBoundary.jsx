import React from 'react';
import { AlertOctagon, RefreshCcw, Download, Trash2, Home, Terminal } from 'lucide-react';
import { useResume } from '../Modern/context/ResumeContext';

// Functional UI Component to handle Hooks (Theme Sync)
const ErrorFallback = ({ error }) => {
  const { resumeData } = useResume();
  const themeMode = resumeData?.themeMode || 'light';
  const isDark = themeMode === 'dark';
  const themeColor = resumeData?.themeColor || '#ef4444';

  const handleHardReset = () => {
    if (confirm("ARCHITECTURAL WARNING: This will clear your career blueprint cache. This action is final. Proceed?")) {
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
      link.download = `emergency_blueprint_backup_${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert("Emergency blueprint exported. You can import this into a stable session.");
    } catch (e) {
      alert("Emergency export failed. Database state might be corrupted.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#050A0F] text-white' : 'bg-[#FDFDFD] text-slate-900'}`}>
      {/* Background Glitch Effects - Synchronized with Theme Color */}
      <div className={`absolute top-0 left-0 w-full h-1 opacity-20 animate-pulse`} style={{ backgroundColor: themeColor }} />
      <div className={`absolute bottom-0 left-0 w-full h-1 opacity-20 animate-pulse`} style={{ backgroundColor: themeColor }} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] blur-[150px] ${isDark ? 'opacity-[0.1]' : 'opacity-[0.05]'}`} 
           style={{ backgroundColor: themeColor }} />

      <div className="max-w-3xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className={`backdrop-blur-3xl border rounded-[3.5rem] overflow-hidden ${isDark ? 'bg-[#0A0F14]/80 border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)]' : 'bg-white border-black/[0.03] shadow-[0_30px_70px_rgba(0,0,0,0.08)]'}`}>
          {/* Header */}
          <div className={`p-10 flex flex-col items-center text-center border-b`} 
               style={{ backgroundColor: isDark ? `${themeColor}08` : `${themeColor}05`, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 border animate-pulse"
                 style={{ backgroundColor: `${themeColor}15`, borderColor: `${themeColor}30` }}>
              <AlertOctagon size={48} style={{ color: themeColor }} />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: 'Absans, sans-serif' }}>System Overload</h1>
            <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-80" style={{ color: themeColor }}>Critical Runtime Exception</p>
            <div className={`p-4 rounded-2xl border w-full max-w-xl overflow-hidden ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-black/5'}`}>
              <div className="flex items-center gap-2 mb-2 opacity-40">
                <Terminal size={12} style={{ color: themeColor }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: themeColor }}>Error Stack</span>
              </div>
              <p className={`text-[10px] font-mono text-left line-clamp-3 leading-relaxed whitespace-pre-wrap select-all ${isDark ? 'opacity-80' : 'text-slate-600 font-medium'}`}>
                {error?.toString()}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-10 space-y-8">
            <p className={`text-center text-lg leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              The liquid engine encountered a structural failure. We've isolated the crash to protect your data integrity. Your blueprint might still be recoverable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => window.location.reload()}
                className={`flex flex-col items-center text-center p-6 border rounded-[2rem] transition-all group ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-white hover:bg-slate-50 border-black/[0.06] shadow-sm'}`}
              >
                <RefreshCcw size={24} className="text-blue-500 mb-3 group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-xs font-black uppercase tracking-widest text-blue-500 mb-1">Relaunch Engine</span>
                <span className={`text-[10px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Standard boot protocol</span>
              </button>

              <button
                onClick={handleEmergencyExport}
                className={`flex flex-col items-center text-center p-6 border rounded-[2rem] transition-all group ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-white hover:bg-slate-50 border-black/[0.06] shadow-sm'}`}
              >
                <Download size={24} className="text-emerald-500 mb-3 group-hover:-translate-y-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">Emergency Snapshot</span>
                <span className={`text-[10px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Download local database</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <a href="/#/" className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                <Home size={14} /> Safe Zone Dashboard
              </a>
              <button 
                onClick={handleHardReset}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
              >
                <Trash2 size={14} /> Wipe & Factory Reset
              </button>
            </div>
          </div>
        </div>
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
    console.error("Global Catch Protocol Activated:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
