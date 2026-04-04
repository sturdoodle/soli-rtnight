import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PillButton = ({ children, onClick, type = 'button', variant = 'primary', className = '', icon: Icon }) => {
  const { resumeData } = useResume();
  const activeColor = resumeData.themeColor || '#4f46e5';
  const baseClasses = 'flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-500 active:scale-95 shadow-sm hover:shadow-md h-fit whitespace-nowrap';
  const variants = {
    primary: 'bg-sage-600 text-white hover:bg-sage-700 shadow-sage-200/50 dark:shadow-none',
    secondary: 'bg-white dark:bg-sage-900 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800 hover:border-sage-400 dark:hover:border-sage-600 shadow-sm',
    danger: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40',
    ghost: 'bg-transparent text-sage-500 dark:text-sage-400 hover:bg-sage-100 dark:hover:bg-sage-900/50 hover:text-sage-800 dark:hover:text-sage-100 shadow-none hover:shadow-none',
    glass: 'bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white dark:border-white/10 text-sage-700 dark:text-sage-300 hover:bg-white/60 dark:hover:bg-white/10',
    add: 'text-white border border-white/20 hover:scale-[1.02] active:scale-95'
  };

  const isAdd = variant === 'add';
  const dynamicStyle = isAdd ? {
    backgroundColor: activeColor,
    boxShadow: `0 20px 35px -10px ${activeColor}60`,
    border: 'none'
  } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      style={dynamicStyle}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default PillButton;
