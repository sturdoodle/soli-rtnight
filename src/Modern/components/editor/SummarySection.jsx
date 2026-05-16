import React, { memo } from 'react';
import { FileText } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import { useResume } from '../../context/ResumeContext';

const SummarySection = memo(() => {
  const { resumeData, updateField } = useResume();
  const themeColor = resumeData.themeColor || '#0ea5e9';
  const themeMode = resumeData.themeMode || 'light';
  const variant = resumeData.editorStyle || 'glass';

  const handleChange = (e) => {
    updateField('summary', e.target.value);
  };

  return (
    <GlassCard 
      title="Professional Summary" 
      icon={FileText} 
      isCollapsible={true}
      themeColor={themeColor}
      themeMode={themeMode}
      variant={variant}
    >
      <div className="px-2">
        <MinimalistInput
          id="v5-input-summary"
          label="Summary"
          textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          showFormatTip={true}
          placeholder="Briefly describe your career goals and achievements..."
          activeColor={themeColor}
          variant={variant}
        />
      </div>
    </GlassCard>
  );
});

export default SummarySection;

