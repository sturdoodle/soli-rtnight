"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * SmartSectionNote: A reusable attention-grabbing note for editor sections.
 * @param {string} text - The message to display.
 * @param {string} color - The theme color (e.g., 'blue', 'sage', 'slate'). Defaults to 'blue'.
 * @param {string} className - Optional extra classes for the container.
 */
const SmartSectionNote = ({ text, color = 'blue', className = '' }) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-700',
      icon: 'text-blue-600'
    },
    sage: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-700',
      icon: 'text-emerald-600'
    },
    slate: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/20',
      text: 'text-slate-700',
      icon: 'text-slate-600'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-700',
      icon: 'text-amber-600'
    }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`xl:col-span-12 mt-4 px-3 py-2 rounded-xl border flex items-center gap-2 animate-pulse ${theme.bg} ${theme.border} ${className}`}>
      <Sparkles size={14} className={`${theme.icon} animate-bounce`} />
      <p className={`text-[8.5px] font-black uppercase tracking-widest ${theme.text}`}>
        {text}
      </p>
    </div>
  );
};

export default SmartSectionNote;
