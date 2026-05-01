"use client";

import React from 'react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';
import { FileText } from 'lucide-react';

const V6SummaryEditor = () => {
  const { resumeData, updateField } = useResume();

  const textareaClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-5 px-6 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[220px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all resize-none shadow-sm selection:bg-blue-500/20";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Professional Summary</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          A brief overview of your professional background and key achievements.
        </p>
      </div>

      <V6Card 
        title="Resume Summary" 
        description="Capture your career's essence in 3-4 powerful sentences. This is your first impression."
        icon={FileText}
        horizontal={false}
      >
        <textarea 
          value={resumeData.summary || ''} 
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Highly motivated Software Engineer with 5+ years of experience..."
          className={textareaClasses}
        />
      </V6Card>

      <div className="pt-4">
        <AdUnit 
            slot="8331566456" 
            minHeight="120px" 
            className="rounded-[2rem]"
        />
      </div>
    </div>
  );
};

export default V6SummaryEditor;

