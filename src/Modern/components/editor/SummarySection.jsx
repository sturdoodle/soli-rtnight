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

  const isBullets = Array.isArray(resumeData.summary) || 
    (resumeData.summary && typeof resumeData.summary === 'object' && Array.isArray(resumeData.summary.bulletPoints));

  let displayValue = '';
  if (isBullets) {
    if (Array.isArray(resumeData.summary)) {
      displayValue = resumeData.summary.join('\n');
    } else {
      displayValue = resumeData.summary.bulletPoints.join('\n');
    }
  } else {
    // If it's an object but not bulletPoints, just stringify safely (fallback)
    displayValue = typeof resumeData.summary === 'string' ? resumeData.summary : (resumeData.summary ? JSON.stringify(resumeData.summary) : '');
  }

  const handleChange = (e) => {
    if (isBullets) {
      updateField('summary', e.target.value.split('\n'));
    } else {
      updateField('summary', e.target.value);
    }
  };

  const toggleMode = () => {
    if (isBullets) {
      // Switch to paragraph: preserve newlines
      updateField('summary', displayValue);
    } else {
      // Switch to bullets: split by newlines if any, else just one bullet
      const newArray = displayValue ? displayValue.split('\n').filter(Boolean) : [''];
      updateField('summary', newArray.length > 0 ? newArray : ['']);
    }
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
      <div className="px-2 pb-2">
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleMode}
            className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            {isBullets ? 'Switch to Paragraph' : 'Switch to Bullets'}
          </button>
        </div>
        <MinimalistInput
          id="v5-input-summary"
          label={isBullets ? "Summary (One bullet per line)" : "Summary"}
          textarea
          name="summary"
          value={displayValue}
          onChange={handleChange}
          showFormatTip={true}
          placeholder={isBullets ? "• First point\n• Second point" : "Briefly describe your career goals and achievements..."}
          activeColor={themeColor}
          variant={variant}
        />
      </div>
    </GlassCard>
  );
});

export default SummarySection;

