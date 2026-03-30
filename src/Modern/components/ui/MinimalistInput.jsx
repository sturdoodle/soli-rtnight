import React from 'react';

const MinimalistInput = ({ label, name, value, onChange, placeholder, type = 'text', textarea = false, className = '' }) => {
  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    className: `glass-input w-full focus:ring-2 focus:ring-sage-200 focus:border-sage-400 placeholder-sage-300 dark:placeholder-sage-500 text-sage-900 dark:text-sage-50 transition-all ${className}`
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold text-sage-700 dark:text-sage-300 mb-1 ml-1">{label}</label>}
      {textarea ? (
        <textarea {...inputProps} rows={4} style={{ resize: 'vertical' }} />
      ) : (
        <input {...inputProps} type={type} />
      )}
    </div>
  );
};

export default MinimalistInput;
