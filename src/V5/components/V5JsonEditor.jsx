import React, { useState, useEffect, useRef } from 'react';
import { Check, AlertCircle, Copy, SquareTerminal, RefreshCw } from 'lucide-react';

const V5JsonEditor = ({ data, onUpdate, activeColor, className = "" }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const textareaRef = useRef(null);

  // Initialize with formatted JSON
  useEffect(() => {
    try {
      setJsonText(JSON.stringify(data, null, 2));
      setError(null);
    } catch (e) {
      setError("Failed to format initial data");
    }
  }, [data]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setJsonText(value);
    
    try {
      const parsed = JSON.parse(value);
      setError(null);
      // We only update the parent when valid JSON is present
      onUpdate(parsed);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCursorPosition = (e) => {
    const textarea = e.target;
    const textBefore = textarea.value.substring(0, textarea.selectionStart);
    const lines = textBefore.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const handleScroll = (e) => {
    updateCursorPosition(e);
  };

  const prettify = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError("Cannot prettify: " + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col h-full bg-[#050A0F] overflow-hidden animate-in fade-in duration-500 ${className}`}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-2">
            <SquareTerminal size={14} className="text-slate-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">JSON Inspector</span>
        </div>
        
        <div className="flex items-center gap-2">
          {error ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded text-rose-500 animate-pulse">
              <AlertCircle size={10} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">Syntax Error</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-500">
              <Check size={10} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">Valid JSON</span>
            </div>
          )}
          
          <div className="h-4 w-px bg-white/10 mx-1" />
          
          <button 
            onClick={prettify}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all"
            title="Prettify JSON"
          >
            <RefreshCw size={14} />
          </button>
          
          <button 
            onClick={handleCopy}
            className={`p-1 transition-all rounded ${isCopied ? 'text-emerald-500 bg-emerald-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Copy to Clipboard"
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className="flex-1 relative min-h-[450px] sm:min-h-[500px] overflow-hidden" style={{ backgroundColor: '#050A0F' }}>
        <textarea
          ref={textareaRef}
          value={jsonText}
          onChange={handleTextChange}
          onKeyUp={updateCursorPosition}
          onClick={updateCursorPosition}
          onSelect={updateCursorPosition}
          onScroll={handleScroll}
          spellCheck="false"
          className="absolute inset-0 w-full h-full p-4 sm:p-8 font-mono text-[10px] sm:text-xs leading-relaxed outline-none resize-none custom-scrollbar transition-all"
          placeholder="Enter raw JSON data here..."
          style={{ 
            backgroundColor: 'transparent',
            color: '#E0E7FF',
            caretColor: activeColor, // Restore native cursor
            fontFamily: "'Roboto Mono', 'Geist Mono', monospace",
            border: 'none',
            boxShadow: 'none'
          }}
        />
        
        {/* Error Footer Overlay */}
        {error && (
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-rose-500/10 border border-rose-500/20 backdrop-blur-md rounded-xl text-[10px] text-rose-400 font-medium z-10">
                {error}
            </div>
        )}
      </div>
      
      {/* Editor Status Bar */}
      <div className="px-4 py-1.5 border-t border-white/5 bg-slate-900/40 flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-4">
            <span 
              className="text-white brightness-200 transition-all px-2 py-0.5 rounded bg-white/5 border border-white/10"
              style={{ textShadow: `0 0 8px ${activeColor}`, borderColor: `${activeColor}40` }}
            >
              Ln {cursorPos.line}, Col {cursorPos.col}
            </span>
            <div className="w-px h-2 bg-white/5" />
            <span className="opacity-60">Characters: {jsonText.length}</span>
          </div>
          <span>Sync Status: {error ? 'Paused' : 'Live'}</span>
      </div>
    </div>
  );
};

export default V5JsonEditor;
