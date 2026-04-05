import React from 'react';
import { Printer, Download } from 'lucide-react';
import AdSenseAd from '../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../MainConstant.js';

const PrintAdModal = ({ showPrintAd, adCountdown, activeColor, finalizePrintAction }) => {
  if (!showPrintAd) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/90 backdrop-blur-3xl" />
      
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-white dark:bg-[#0A0C10] rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-y-auto animate-in zoom-in-95 duration-500 custom-scrollbar">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10" style={{ backgroundColor: activeColor }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 blur-[80px] opacity-10 bg-indigo-500" />

        <div className="relative z-10 p-6 sm:p-10 flex flex-col items-center">
          {/* Compact Header Icon */}
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-black/5 dark:border-white/5">
            <Printer className="text-indigo-500" size={24} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[var(--v5-heading)] mb-1 tracking-tight text-center">Preparing Your Masterpiece</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center opacity-70">Stand by while we render your high-fidelity resume</p>

          {/* Maximized Ad Container */}
          <div className="w-full bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10 p-2 sm:p-6 mb-6 min-h-[350px] lg:min-h-[450px] flex flex-col items-center justify-center relative group overflow-hidden">
            <div className="absolute top-2 right-4 text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-30 z-10">Sponsored Content</div>
            <div className="w-full h-full flex items-center justify-center">
              <AdSenseAd
                client={ADSENSE_CLIENT_ID}
                slot={ADSENSE_INBETWEEN_SLOT_ID}
                format="auto"
                responsive="true"
              />
            </div>
          </div>

          {/* Countdown / Action Area */}
          <div className="w-full flex flex-col items-center max-w-sm mx-auto">
            {adCountdown > 0 ? (
              <div className="flex items-center gap-3 py-3.5 px-8 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 w-full justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-indigo-500 animate-spin" />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Ready in <span className="text-indigo-500">{adCountdown}s</span>
                </span>
              </div>
            ) : (
              <button
                onClick={finalizePrintAction}
                className="w-full py-4 text-white font-black uppercase tracking-[0.25em] rounded-full shadow-2xl hover:scale-[1.01] active:scale-95 transition-all text-[11px] flex items-center justify-center gap-3 group"
                style={{ backgroundColor: activeColor, boxShadow: `0 20px 40px -10px ${activeColor}40` }}
              >
                <Printer size={18} className="group-hover:-translate-y-1 transition-transform" />
                Continue to Print
              </button>
            )}
            
            <p className="mt-5 text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40 text-center">
              Ads help us keep this pro-grade builder free for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintAdModal;
