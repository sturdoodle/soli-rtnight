import React from 'react';
import { Compass, Home, ArrowLeft, RefreshCcw } from 'lucide-react';
import { useResume } from './Modern/context/ResumeContext';

const NotFoundPage = () => {
  const { resumeData } = useResume();
  const themeMode = resumeData?.themeMode || 'light';
  const isDark = themeMode === 'dark';
  const accentColor = resumeData?.themeColor || '#0ea5e9';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans transition-colors duration-700 ${isDark ? 'bg-[#050A0F] text-white' : 'bg-[#FDFDFD] text-slate-900'}`}>
      {/* Background Architectural Elements - Refined for Light Theme */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${isDark ? 'opacity-20' : 'opacity-[0.08]'}`} 
           style={{ backgroundColor: accentColor }} />
      <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] ${isDark ? 'opacity-10' : 'opacity-[0.05]'}`} 
           style={{ backgroundColor: isDark ? '#6366f1' : accentColor }} />
      
      {/* Grid Pattern */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? '' : 'mix-blend-multiply'}`} 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'white' : '#64748b'} 1px, transparent 0)`, backgroundSize: '48px 48px' }} />

      <div className="max-w-xl w-full text-center relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="mb-12 relative">
          {/* 404 Background Text - Improved Visibility in Light Theme */}
          <div className={`text-[160px] sm:text-[220px] font-black leading-none tracking-tighter select-none ${isDark ? 'opacity-[0.03] text-white' : 'opacity-[0.05] text-slate-900'}`}>404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Card Depth - Premium Shadow for Light Theme */}
            <div className={`w-32 h-32 rounded-[3.5rem] backdrop-blur-2xl border flex items-center justify-center animate-bounce ${isDark ? 'bg-white/5 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]' : 'bg-white border-black/[0.03] shadow-[0_30px_70px_rgba(0,0,0,0.08)]'}`}>
              <Compass size={64} style={{ color: accentColor }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: 'Absans, sans-serif' }}>Navigation Lost</h1>
            <p className={`text-sm font-black uppercase tracking-[0.4em] opacity-80`} style={{ color: accentColor }}>Architectural Node Not Found</p>
          </div>
          
          <p className={`text-lg leading-relaxed max-w-md mx-auto ${isDark ? 'text-slate-500' : 'text-slate-500 font-medium'}`}>
            The page you are looking for has been moved, deleted, or never existed in this ecosystem. Let's get you back to your professional blueprint.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#/"
              className={`group flex items-center gap-3 px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl ${isDark ? 'bg-white text-black shadow-white/5' : 'bg-slate-900 text-white shadow-black/10 hover:shadow-black/20'}`}
              style={{ backgroundColor: !isDark ? '#0F172A' : '#FFFFFF' }}
            >
              <Home size={16} /> Return to Dashboard
            </a>
            <button
              onClick={() => window.history.back()}
              className={`flex items-center gap-3 px-10 py-5 border rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-slate-50 border-black/[0.06] shadow-sm text-slate-800'}`}
            >
              <ArrowLeft size={16} /> Previous Page
            </button>
          </div>
        </div>

        <div className={`mt-24 pt-12 border-t flex flex-col items-center gap-4 opacity-40 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <span className="text-[10px] font-black" style={{ color: accentColor }}>qp</span>
            </div>
            <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${isDark ? '' : 'text-slate-900'}`}>qpkendra Ecosystem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;