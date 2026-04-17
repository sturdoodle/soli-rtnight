import React from 'react';
import { Printer, Download, X, Settings } from 'lucide-react';
import AdSenseAd from '../../AdsenseAdsBlock.jsx';
import { ANALYTICS_CONFIG } from '../../config/analyticsConfig.js';

const PrintAdModal = ({ showPrintAd, adCountdown, activeColor, finalizePrintAction, onClose }) => {
  // To strictly follow Google Ads policy, we only render the ad when the modal is intended to be seen.
  // We use CSS visibility to keep it 'loaded' after the first trigger for better UX.
  if (!showPrintAd && !window._printAdTriggered) return null;
  
  // Mark as triggered once it has been shown once
  if (showPrintAd) window._printAdTriggered = true;

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${showPrintAd ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
    >
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/90 backdrop-blur-3xl" onClick={onClose} />

      <div className={`relative w-full max-w-4xl max-h-[95vh] bg-white dark:bg-[#0A0C10] rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-y-auto custom-scrollbar transition-all duration-500 ${showPrintAd ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-20 bg-black/5 dark:bg-white/5 rounded-xl hover:scale-110 active:scale-95"
          aria-label="Cancel Printing"
        >
          <X size={20} />
        </button>

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

          {/* Printer Settings Pro-Tip */}
          <div className="w-full mb-8 py-4 px-6 bg-amber-500/5 dark:bg-amber-400/10 border border-amber-500/20 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <Settings className="text-amber-500" size={18} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5">Pixel-Perfect PDF Tip</h4>
              <ul className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold space-y-1.5">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                  <span>Please <span className="text-amber-600 dark:text-amber-400 font-black italic underline-offset-2 underline decoration-wavy decoration-amber-500/50">Deselect</span> "Headers & Footers"</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                  <span>Please <span className="text-indigo-500 dark:text-indigo-400 font-black italic underline-offset-2 underline decoration-wavy decoration-indigo-500/50">Select</span> "Background Graphics"</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Maximized Ad Container */}
          <div className="w-full bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10 p-2 sm:p-6 mb-6 min-h-[350px] lg:min-h-[450px] flex flex-col items-center justify-center relative group overflow-hidden">
            <div className="absolute top-2 right-4 text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-30 z-10">Sponsored Content</div>
            <div className="w-full h-full flex items-center justify-center">
              <AdSenseAd
                slot={ANALYTICS_CONFIG.ADSENSE_INBETWEEN_SLOT || '1239783582'}
                format="auto"
              />
            </div>
          </div>

          {/* Countdown / Action Area */}
          <div className="w-full flex flex-col items-center max-w-sm mx-auto">
            {adCountdown > 0 ? (
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-3 py-3.5 px-8 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 w-full justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-indigo-500 animate-spin" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    Ready in <span className="text-indigo-500">{adCountdown}s</span>
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors py-2"
                >
                  Cancel and return
                </button>
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
