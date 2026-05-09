"use client";

import React from 'react';
import { Zap, X } from 'lucide-react';

/**
 * OnboardingModal - A high-end welcome modal for first-time users.
 * 
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {function} onComplete - Action to trigger when 'Start Building' is clicked.
 * @param {string} accentColor - Theme color for the primary button.
 * @param {string} title - Main welcome title.
 * @param {string} description - Subtext description.
 */
const OnboardingModal = ({ 
  isOpen, 
  onComplete, 
  accentColor = '#3b82f6',
  title = "Welcome to Resume Builder",
  description = "Experience our most advanced builder yet. Professional-grade resume builder with real-time ATS optimization."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/60 dark:bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-8 sm:p-12 rounded-[3.5rem] bg-white dark:bg-[#1a1a1b] border border-black/5 dark:border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden text-center">
        {/* Progress Line */}
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: accentColor }} />
        
        <div className="flex flex-col items-center space-y-8">
          {/* Animated Icon Container */}
          <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-black/5 dark:bg-white/5 animate-bounce mb-4">
            <Zap size={48} style={{ color: accentColor }} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
              {description}
            </p>
          </div>
          
          <button 
            onClick={onComplete} 
            className="px-12 py-5 rounded-full text-white font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all" 
            style={{ backgroundColor: accentColor, boxShadow: `0 15px 30px ${accentColor}40` }}
          >
            Start Building
          </button>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

export default OnboardingModal;
