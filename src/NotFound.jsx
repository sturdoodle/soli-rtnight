import React from 'react';
import { Home, ArrowLeft, Search, CloudOff } from 'lucide-react';
import { useResume } from './Modern/context/ResumeContext';

const NotFoundPage = () => {
  const { resumeData } = useResume();
  const themeMode = resumeData?.themeMode || 'light';
  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-sans ${isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Icon Illustration */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-center relative z-10 mx-auto">
            <Search className="w-10 h-10 sm:w-16 sm:h-16 text-blue-500 animate-pulse" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg animate-bounce delay-100">
            <CloudOff size={24} />
          </div>
          <div className="absolute -bottom-2 -left-2 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-0" />
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">404</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            The professional blueprint you're looking for seems to have vanished from the ecosystem.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <a
            href="/#/"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            <Home size={16} /> Return to Dashboard
          </a>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>

        {/* Footer Branding */}
        <div className="pt-12 flex flex-col items-center gap-3 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-[8px] font-black text-white">QP</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">qpkendra Ecosystem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;