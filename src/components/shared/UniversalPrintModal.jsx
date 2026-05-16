"use client";

import React from 'react';
import { Printer, X, Settings, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdSenseAd from '../../AdsenseAdsBlock.jsx';

/**
 * UniversalPrintModal - Consolidates the print ad/guidance modal across all editor versions.
 * 
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {number} countdown - Seconds remaining before print is enabled.
 * @param {string} accentColor - Main theme color for buttons and highlights.
 * @param {function} onFinalize - Action to trigger the actual print.
 * @param {function} onClose - Action to close the modal.
 * @param {string} adSlot - AdSense slot ID.
 */
const UniversalPrintModal = ({ 
  isOpen, 
  countdown, 
  accentColor = '#3b82f6', 
  onFinalize, 
  onClose,
  adSlot = '8331566456'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#08080a]/60 backdrop-blur-2xl" 
            onClick={onClose} 
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0e] rounded-[3rem] border border-slate-200 dark:border-white/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh] print:hidden"
          >
            {/* Header Bar */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/[0.05] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                  <Printer size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Print Engine</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aura Render Buffer</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-10">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Preparing High-Fidelity PDF</h2>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    We're optimizing your resume for pixel-perfect printing. Please wait while we render all typographic assets.
                  </p>
                </div>

                {/* Print Tips */}
                <div className="p-6 bg-amber-500/[0.03] dark:bg-amber-400/5 border border-amber-500/10 dark:border-amber-400/10 rounded-[2rem] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Settings size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 text-left">Printer Pro-Tips</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Deselect <span className="font-black italic">"Headers & Footers"</span></p>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Select <span className="font-black italic">"Background Graphics"</span></p>
                    </div>
                  </div>
                </div>

                {/* Ad Space */}
                <div className="w-full bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/[0.1] rounded-[2.5rem] p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                  <div className="absolute top-4 left-6 flex items-center gap-2">
                    <Sparkles size={10} className="text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-50">Sponsored Content</span>
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <AdSenseAd slot={adSlot} format="auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="px-8 py-8 border-t border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.01] shrink-0">
              {countdown > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="w-full py-4 px-8 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl flex items-center justify-center gap-3 shadow-sm">
                    <RefreshCw size={18} className="text-blue-500 animate-spin" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Engine warming up... <span className="text-blue-500 ml-1">{countdown}s</span>
                    </span>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all text-center"
                  >
                    Cancel and return
                  </button>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onFinalize}
                  className="w-full py-5 text-white font-black uppercase tracking-[0.25em] rounded-[1.5rem] shadow-2xl flex items-center justify-center gap-4 text-[11px] group relative overflow-hidden"
                  style={{ backgroundColor: accentColor, boxShadow: `0 20px 40px ${accentColor}40` }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  <Printer size={18} className="group-hover:-translate-y-1 transition-transform relative z-10" />
                  <span className="relative z-10">Continue to Final Print</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UniversalPrintModal;
