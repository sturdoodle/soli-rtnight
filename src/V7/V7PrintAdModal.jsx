import React from 'react';
import { Printer, X, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import AdSenseAd from '../AdsenseAdsBlock.jsx'; // Optional: if available

const V7PrintAdModal = ({ show, countdown, onFinalize, onClose, accentColor }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-3xl"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#1a1a1b] rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col items-center p-10 text-center"
          >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[100px] pointer-events-none" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all active:scale-90"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="w-16 h-16 rounded-[2rem] bg-white dark:bg-black shadow-xl flex items-center justify-center mb-6 border border-black/5 dark:border-white/10">
              <Printer className="text-blue-500" size={28} />
            </div>

            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">Preparing Your Resume</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">High-fidelity rendering in progress</p>

            {/* Pro Tips Area */}
            <div className="w-full bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-[2rem] p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <Settings className="text-blue-500" size={16} />
                </div>
                <h4 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Pixel-Perfect Export Tip</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Deselect "Headers & Footers"', color: 'text-blue-500' },
                  { label: 'Select "Background Graphics"', color: 'text-indigo-500' }
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                    <span>Please <span className={`${tip.color} underline decoration-dotted`}>{tip.label}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Placeholder Ad Space (High-fidelity) */}
            <div className="w-full h-48 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center mb-8 relative group overflow-hidden">
               <Sparkles className="text-slate-200 dark:text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={80} />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">Supporting the free version</p>
            </div>

            {/* Action Area */}
            <div className="w-full max-w-xs">
              {countdown > 0 ? (
                <div className="flex items-center justify-center gap-4 py-4 px-8 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    Generating in <span className="text-blue-500">{countdown}s</span>
                  </span>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={onFinalize}
                  className="w-full py-4 rounded-full text-white font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl flex items-center justify-center gap-3 group overflow-hidden relative"
                  style={{ backgroundColor: accentColor, boxShadow: `0 20px 40px -10px ${accentColor}40` }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  <Printer size={18} className="group-hover:-translate-y-1 transition-transform" />
                  Continue to Print
                </motion.button>
              )}
            </div>

            <p className="mt-8 text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">
              Your support keeps this professional builder free for everyone.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default V7PrintAdModal;
