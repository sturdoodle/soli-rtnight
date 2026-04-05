import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { templates } from '../../layouts';

const ModernLivePreview = () => {
  const { resumeData } = useResume();

  if (!resumeData) return null;

  const currentTemplateId = resumeData.selectedTemplate || 'template-1';
  const TemplateComponent = templates[currentTemplateId]?.component || templates['template-1'].component;
  const themeColor = resumeData.themeColor || '#4f46e5';
  const atsMode = resumeData.atsMode || false;
  const sectionThemingEnabled = resumeData.sectionThemingEnabled ?? true;

  const fontFamily = resumeData.fontFamily || 'Default';
  const fontKey = fontFamily === 'Default' ? '' : fontFamily.toLowerCase().split(' ')[0];
  const fontClass = fontKey ? `v5-font-${fontKey}` : '';

  return (
    <div
      className={`bg-white print:shadow-none shadow-2xl w-full max-w-[800px] print:max-w-none mx-auto relative transition-all duration-700 printable-area ${fontClass} rounded-[2.5rem] overflow-hidden print:rounded-none print:overflow-visible`}
      data-pdf-content="resume"
    >
      <TemplateComponent 
        data={resumeData} 
        themeColor={themeColor} 
        atsMode={atsMode} 
        sectionThemingEnabled={sectionThemingEnabled}
      />

      <footer className="p-8 bg-zinc-50 border-t border-zinc-100 text-center text-[10px] text-zinc-400 uppercase tracking-[0.2em] print:hidden">
        Draft generated via {resumeData.GENERATED_BY || 'Resume Builder'} • {templates[currentTemplateId]?.name}
      </footer>
    </div>
  );
};

export default ModernLivePreview;
