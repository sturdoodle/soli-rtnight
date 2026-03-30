import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { templates } from '../../layouts';
import { Check, Palette, Database, ShieldCheck, Info, Trash2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const PREMIUM_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Slate', value: '#334155' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Crimson', value: '#991b1b' },
  { name: 'Royal', value: '#1e40af' },
];

const TemplateSelector = () => {
  const { resumeData, updateTemplate, updateThemeColor, updateStorageType, resetResume } = useResume();
  const currentTemplate = resumeData.selectedTemplate || 'template-1';
  const currentThemeColor = resumeData.themeColor || '#4f46e5';
  const storageType = resumeData.storageType || 'persistent';

  return (
    <GlassCard title="Design & Appearance" icon={Palette} isCollapsible={true} defaultOpen={false}>
      <div className="space-y-8">
        {/* Theme Colors */}
        <div className="space-y-4 px-2">
          <div className="flex items-center gap-2 text-sage-400 dark:text-sage-500 mb-2">
            <Palette size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Theme Colors</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {PREMIUM_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateThemeColor(color.value)}
                className={`w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95 flex items-center justify-center border-2 ${
                  currentThemeColor === color.value ? 'border-white ring-2 ring-offset-2' : 'border-transparent'
                }`}
                style={{ 
                  backgroundColor: color.value,
                  '--tw-ring-color': color.value 
                }}
                title={color.name}
              >
                {currentThemeColor === color.value && <Check size={14} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Layouts */}
        <div className="space-y-4 px-2">
          <div className="flex items-center gap-2 text-sage-400 dark:text-sage-500 mb-2">
            <Palette size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Choose Layout</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(templates).map((template) => (
              <button
                key={template.id}
                onClick={() => updateTemplate(template.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-3 group relative overflow-hidden ${
                currentTemplate === template.id
                  ? 'border-sage-500 bg-white/80 dark:bg-white/5 shadow-lg shadow-sage-500/10 ring-4 ring-sage-500/5'
                  : 'border-white dark:border-white/5 bg-white/40 dark:bg-zinc-900/5 hover:border-sage-300 dark:hover:border-sage-600 hover:bg-white/60 dark:hover:bg-zinc-900/10'
              }`}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {template.thumbnail}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${
                    currentTemplate === template.id ? 'text-sage-600 dark:text-sage-400' : 'text-sage-400 dark:text-sage-600'
                  }`}>
                    {template.id.replace('template-', 'Design ')}
                  </span>
                  <span className={`text-xs font-semibold ${
                    currentTemplate === template.id ? 'text-sage-900 dark:text-white' : 'text-sage-600 dark:text-zinc-400'
                  }`}>
                    {template.name}
                  </span>
                </div>
                {currentTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sage-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-sage-100 dark:bg-sage-800/50 mx-2" />

        {/* Storage & Privacy */}
        <div className="space-y-5 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sage-400 dark:text-sage-500">
              <ShieldCheck size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Storage & Privacy</span>
            </div>
            <div className="group relative">
              <Info size={14} className="text-sage-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-[10px] text-white rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-slate-700">
                Persistent: Data stays on your device.<br/>Temporary: Data is cleared when you close the tab.
              </div>
            </div>
          </div>

          <div className="flex p-1 bg-sage-50 dark:bg-sage-900/50 rounded-xl border border-sage-100 dark:border-white/5">
            <button
              onClick={() => updateStorageType('persistent')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                storageType === 'persistent'
                  ? 'bg-white dark:bg-white/10 text-sage-600 dark:text-white shadow-sm'
                  : 'text-sage-400 hover:text-sage-500'
              }`}
            >
              <Database size={14} />
              Persistent
            </button>
            <button
              onClick={() => updateStorageType('temporary')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                storageType === 'temporary'
                  ? 'bg-white dark:bg-white/10 text-rose-500 shadow-sm'
                  : 'text-sage-400 hover:text-sage-500'
              }`}
            >
              <ShieldCheck size={14} />
              Temporary
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Wipe all resume data and reset to default? This cannot be undone.')) {
                resetResume();
              }
            }}
            className="w-full py-3 px-4 rounded-xl border border-rose-100 dark:border-rose-900/30 text-rose-500 text-[10px] uppercase tracking-widest font-black hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={14} />
            Wipe Master Cache
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default TemplateSelector;
