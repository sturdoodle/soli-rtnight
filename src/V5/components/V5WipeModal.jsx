import React from 'react';
import { Trash2 } from 'lucide-react';

/**
 * V5WipeModal - A unified, premium confirmation modal for destructive actions.
 * Perfect for wiping cache, engine resets, or data deletion.
 */
const V5WipeModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Wipe Engine Cache?",
  description = "This will erase all your resume data and reset the structural blueprint to factory defaults. This action cannot be undone.",
  isAbsolute = true
}) => {
  if (!isOpen) return null;

  return (
    <div className={`${isAbsolute ? 'absolute' : 'fixed'} inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 rounded-[inherit]`}>
      <div
        className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon Container */}
          <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 text-rose-500">
            <Trash2 size={30} />
          </div>

          {/* Text Content */}
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Confirm Wipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V5WipeModal;
