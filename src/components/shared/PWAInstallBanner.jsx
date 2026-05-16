"use client";

import React from 'react';
import { Smartphone, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export const PWAInstallBanner = () => {
  const { isInstallable, isInstalled, handleInstallClick } = usePWAInstall();
  const [isVisible, setIsVisible] = React.useState(true);
  const [hasDismissed, setHasDismissed] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already dismissed this in this session
    const dismissed = sessionStorage.getItem('pwa_banner_dismissed');
    if (dismissed) {
      setHasDismissed(true);
    }
  }, []);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  const showBanner = !isInstalled && !hasDismissed && isVisible && isInstallable;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          key="pwa-install-banner"
          initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ 
            opacity: 0, 
            scale: 0.9, 
            y: 20, 
            filter: 'blur(15px)',
            transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } 
          }}
          className="mb-4 relative group"
        >
          <div className="w-full bg-gradient-to-r from-[#ff8a00] to-[#ff5c00] rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-orange-500/20 gap-3 overflow-hidden relative">
            {/* Decorative Shimmer */}
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12 pointer-events-none" />

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Smartphone size={22} className="text-white drop-shadow-md" />
              </div>
              <div className="text-left text-white">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider mb-0.5 leading-none">Install App</h3>
                <p className="text-[9px] sm:text-[10px] font-medium opacity-90 leading-tight">Access your resumes offline & enjoy a faster experience</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end relative z-10">
              <Zap size={18} className="text-white/40 animate-pulse hidden md:block" />
              <button
                onClick={handleInstallClick}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-[#ff5c00] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Install Now
              </button>
            </div>
          </div>

          <button 
            onClick={handleDismiss}
            className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-lg flex items-center justify-center border border-black/5 transition-all z-20 hover:scale-110 active:scale-90"
            title="Dismiss"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PWAInstallBanner;
