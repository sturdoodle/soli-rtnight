import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const V6ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  const isDanger = type === 'danger';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[360px] bg-[#0f1115] border border-white/[0.08] rounded-[2rem] p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1.5 ${isDanger ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`} />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`w-16 h-16 rounded-[1.5rem] ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'} flex items-center justify-center`}>
                <AlertTriangle size={32} />
              </div>
              
              <div className="space-y-2 px-2">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase">{title || 'Confirm Action'}</h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed tracking-wide">{message || 'Are you sure you want to proceed?'}</p>
              </div>
              
              <div className="flex flex-col gap-2 w-full pt-4">
                <button 
                  onClick={() => { onConfirm(); onClose(); }}
                  className={`w-full py-4 ${isDanger ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-white text-black hover:bg-slate-200'} rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl ${isDanger ? 'shadow-red-900/20' : 'shadow-black/20'}`}
                >
                  Confirm action
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-white/[0.03] text-slate-500 hover:text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all border border-white/[0.05] hover:bg-white/[0.08]"
                >
                  Nevermind
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default V6ConfirmModal;
