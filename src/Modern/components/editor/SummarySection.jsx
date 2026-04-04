import React from 'react';
import { FileText } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import { useResume } from '../../context/ResumeContext';

const SummarySection = () => {
  const { resumeData, updateField } = useResume();

  const handleChange = (e) => {
    updateField('summary', e.target.value);
  };

  return (
    <GlassCard title="Professional Summary" icon={FileText} isCollapsible={true}>
      <div className="px-2">
        <MinimalistInput
          textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          showFormatTip={true}
          placeholder="Briefly describe your career goals and achievements..."
        />
      </div>
    </GlassCard>
  );
};

export default SummarySection;
