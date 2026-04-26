import React, { memo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useDebounce } from '../../../hooks/useDebounce';
import { templates } from '../../layouts';

const ModernLivePreview = memo(() => {
  const { resumeData } = useResume();
  const debouncedResumeData = useDebounce(resumeData, 300); // 300ms debounce

  if (!debouncedResumeData) return null;

  const currentTemplateId = debouncedResumeData.selectedTemplate || 'template-1';
  const TemplateComponent = templates[currentTemplateId]?.component || templates['template-1'].component;
  const themeColor = debouncedResumeData.themeColor || '#4f46e5';
  const atsMode = debouncedResumeData.atsMode || false;
  const sectionThemingEnabled = debouncedResumeData.sectionThemingEnabled ?? true;

  const fontFamily = debouncedResumeData.fontFamily || 'Default';
  const fontKey = fontFamily === 'Default' ? '' : fontFamily.toLowerCase().split(' ')[0];
  const fontClass = fontKey ? `v5-font-${fontKey}` : '';

  return (
    <div
      className={`bg-white print:shadow-none shadow-2xl w-full max-w-[800px] print:max-w-none mx-auto relative transition-all duration-700 printable-area ${fontClass} rounded-[2.5rem] overflow-hidden print:rounded-none print:overflow-visible`}
      data-pdf-content="resume"
    >
      <TemplateComponent 
        data={debouncedResumeData} 
        themeColor={debouncedResumeData.themeColor} 
        atsMode={debouncedResumeData.atsMode}
        sectionThemingEnabled={debouncedResumeData.atsMode ? false : (debouncedResumeData.sectionThemingEnabled ?? true)}
      />

      <footer className="p-8 bg-zinc-50 border-t border-zinc-100 text-center text-[10px] text-zinc-400 uppercase tracking-[0.2em] print:hidden">
        Draft generated via {debouncedResumeData.GENERATED_BY || 'Resume Builder'} • {templates[currentTemplateId]?.name}
      </footer>
    </div>
  );
});

export default ModernLivePreview;
