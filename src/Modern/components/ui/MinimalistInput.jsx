import React, { useRef, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Bold, Italic, Underline, Link as LinkIcon, Info } from 'lucide-react';

const MinimalistInput = ({ label, name, value, onChange, placeholder, type = 'text', textarea = false, className = '', variant, showFormatTip = false, id }) => {
  const { resumeData } = useResume();
  const activeVariant = variant || resumeData.editorStyle || 'glass';
  const activeColor = resumeData.themeColor || '#0ea5e9';
  const isLiquid = activeVariant === 'liquid';
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Generate a unique ID if none is provided for accessibility mapping
  const inputId = id || `v5-input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  const applyFormat = (formatType) => {
    if (!inputRef.current) return;
    
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    const selectedText = value.substring(start, end);
    let beforeText = value.substring(0, start);
    let afterText = value.substring(end);
    
    let replacement = '';
    switch(formatType) {
      case 'bold': replacement = `**${selectedText}**`; break;
      case 'italic': replacement = `*${selectedText}*`; break;
      case 'underline': replacement = `__${selectedText}__`; break;
      case 'link': 
        const url = prompt('Enter the destination URL:', 'https://');
        if (url === null) return; // User cancelled
        replacement = `[${selectedText || 'link text'}](${url || 'https://'})`; 
        break;
      default: replacement = selectedText;
    }
    
    const newValue = beforeText + replacement + afterText;
    
    // Simulate an event to match the standard onChange pattern
    const mockEvent = {
      target: {
        name,
        value: newValue
      }
    };
    onChange(mockEvent);

    // Refocus and select the new text after a brief delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const offset = formatType === 'link' ? 1 : (formatType === 'bold' ? 2 : 1);
        inputRef.current.setSelectionRange(start + offset, start + offset + (selectedText.length || 9));
      }
    }, 10);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key.toLowerCase()) {
        case 'b': e.preventDefault(); applyFormat('bold'); break;
        case 'i': e.preventDefault(); applyFormat('italic'); break;
        case 'u': e.preventDefault(); applyFormat('underline'); break;
        case 'k': e.preventDefault(); applyFormat('link'); break;
        default: break;
      }
    }
  };
  
  const inputProps = {
    id: inputId, // Map the ID for accessibility
    ref: inputRef,
    name,
    value,
    onChange,
    onKeyDown: handleKeyDown,
    onFocus: () => setIsFocused(true),
    onBlur: () => setTimeout(() => setIsFocused(false), 200),
    placeholder,
    className: `${isLiquid ? 'liquid-input w-full' : 'glass-input w-full focus:ring-2 focus:ring-sage-200 focus:border-sage-400 placeholder-sage-300 dark:placeholder-sage-500 text-sage-900 dark:text-sage-50'} transition-all ${className}`
  };

  return (
    <div className="mb-1.5 relative group">
      <div className="flex items-center justify-between mb-0.5 ml-1">
        {label && (
          <label 
            htmlFor={inputId} // Associate label with input
            className={`block text-[7px] font-black uppercase tracking-[0.2em] opacity-80 cursor-pointer ${isLiquid ? 'text-[var(--v5-heading)]' : 'text-sage-700 dark:text-sage-300'}`}
          >
            {label}
          </label>
        )}
        
        {/* Floating Toolbar for Textareas */}
        {textarea && isFocused && (
          <div className="flex items-center gap-1.5 p-1 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 toolbar-pulse-glow">
            <button onClick={() => applyFormat('bold')} type="button" className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all"><Bold size={11} /></button>
            <button onClick={() => applyFormat('italic')} type="button" className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all"><Italic size={11} /></button>
            <button onClick={() => applyFormat('underline')} type="button" className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all"><Underline size={11} /></button>
            <div className="w-px h-3 bg-black/10 dark:bg-white/20 mx-0.5" />
            <button onClick={() => applyFormat('link')} type="button" className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all"><LinkIcon size={11} /></button>
          </div>
        )}
      </div>

      {showFormatTip && isFocused && (
        <div className="flex items-center gap-1.5 mb-1.5 ml-1 animate-in slide-in-from-top-1 duration-300">
          <Info size={9} style={{ color: activeColor }} />
          <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
            Shortcuts active: <span className="text-slate-600 dark:text-slate-300 underline underline-offset-2">Ctrl+B</span> (Bold) • <span className="text-slate-600 dark:text-slate-300 underline underline-offset-2">Ctrl+I</span> (Italic)
          </p>
        </div>
      )}

      {textarea ? (
        <div className="relative group/textarea">
          <textarea {...inputProps} rows={4} style={{ resize: 'vertical', minHeight: '120px' }} />
          {/* Custom Premium Resize Grip */}
          <div className="absolute bottom-2 right-2 pointer-events-none flex flex-col items-end gap-0.5 opacity-30 group-hover/textarea:opacity-100 transition-all duration-500 group-focus-within:text-blue-500">
            <div className="w-4 h-0.5 bg-current rounded-full rotate-[-45deg] translate-y-1 translate-x-1" />
            <div className="w-2.5 h-0.5 bg-current rounded-full rotate-[-45deg] translate-y-0.5 translate-x-0.5" />
            <div className="w-1 h-0.5 bg-current rounded-full rotate-[-45deg]" />
          </div>
        </div>
      ) : (
        <input {...inputProps} type={type} />
      )}
    </div>
  );
};

export default MinimalistInput;
