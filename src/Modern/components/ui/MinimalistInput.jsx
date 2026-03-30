import React from 'react';
import { useResume } from '../../context/ResumeContext';

const MinimalistInput = ({ label, name, value, onChange, placeholder, type = 'text', textarea = false, className = '', variant }) => {
  const { resumeData } = useResume();
  const activeVariant = variant || resumeData.editorStyle || 'glass';
  const isLiquid = activeVariant === 'liquid';
  
  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    className: `${isLiquid ? 'liquid-input w-full' : 'glass-input w-full focus:ring-2 focus:ring-sage-200 focus:border-sage-400 placeholder-sage-300 dark:placeholder-sage-500 text-sage-900 dark:text-sage-50'} transition-all ${className}`
  };

  return (
    <div className="mb-4">
      {label && <label className={`block text-[10px] font-black uppercase tracking-[0.2em] ${isLiquid ? 'text-[var(--v5-heading)] mb-1 ml-1 opacity-90' : 'text-sage-700 dark:text-sage-300 mb-1 ml-1'}`}>{label}</label>}
      {textarea ? (
        <textarea {...inputProps} rows={4} style={{ resize: 'vertical' }} />
      ) : (
        <input {...inputProps} type={type} />
      )}
    </div>
  );
};

export default MinimalistInput;
