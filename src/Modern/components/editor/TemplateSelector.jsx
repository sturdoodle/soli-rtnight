import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { templates } from '../../layouts';
import { Check, Palette, Database, ShieldCheck, Info, Trash2, Layout } from 'lucide-react';
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
  const { resumeData, updateTemplate, updateThemeColor, updateStorageType, resetResume, toggleSectionTheming } = useResume();
  const [showWipeConfirm, setShowWipeConfirm] = React.useState(false);
  const currentTemplate = resumeData.selectedTemplate || 'template-1';
  const currentThemeColor = resumeData.themeColor || '#4f46e5';
  const sectionThemingEnabled = resumeData.sectionThemingEnabled ?? true;
  const atsMode = resumeData.atsMode || false;
  const storageType = resumeData.storageType || 'persistent';

  return (
    <GlassCard title="Design & Appearance" icon={Palette} isCollapsible={false} defaultOpen={true}>
      <div className="space-y-6">
        {/* Theme Colors */}
        <div className="space-y-4 px-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 transition-colors" style={{ color: currentThemeColor }}>
              <Palette size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Theme Colors</span>
            </div>
            {/* Minimalist Section Color Toggle */}
            <button 
              onClick={toggleSectionTheming}
              disabled={atsMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group ai-glow-wrapper ${atsMode ? 'opacity-40 grayscale pointer-events-none cursor-not-allowed bg-slate-100' : sectionThemingEnabled ? 'bg-white/10 active shadow-lg' : 'bg-slate-100 hover:bg-slate-200'}`}
              title={atsMode ? "Section coloring is disabled in ATS Mode" : "Toggle Section Theme Compliance"}
            >
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                {atsMode ? "Section Color (N/A)" : "Section Color"}
              </span>
              <div className={`w-8 h-4 rounded-full relative transition-all ${sectionThemingEnabled ? 'bg-white/20' : 'bg-slate-400/20'}`}
                style={sectionThemingEnabled ? { backgroundColor: `${currentThemeColor}40` } : {}}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all shadow-sm ${sectionThemingEnabled ? 'right-0.5 animate-pulse' : 'left-0.5'}`}
                  style={{ 
                    backgroundColor: sectionThemingEnabled ? currentThemeColor : '#94a3b8',
                    boxShadow: sectionThemingEnabled ? `0 0 8px ${currentThemeColor}` : 'none'
                  }} />
              </div>
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {PREMIUM_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateThemeColor(color.value)}
                className={`w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95 flex items-center justify-center border-2 ${currentThemeColor === color.value ? 'border-white ring-2 ring-offset-2' : 'border-transparent'
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
          <div className="flex items-center gap-2 mb-2 transition-colors" style={{ color: currentThemeColor }}>
            <Layout size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Choose Resume / C.V  Layout</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(templates).map((template) => (
              <button
                key={template.id}
                onClick={() => updateTemplate(template.id)}
                className={`p-3 rounded-2xl border-2 transition-all text-left flex items-start gap-2 group relative overflow-hidden ${currentTemplate === template.id
                    ? 'bg-white/80 dark:bg-white/5 shadow-lg shadow-black/5 ring-4'
                    : 'border-white dark:border-white/5 bg-white/40 dark:bg-zinc-900/5 hover:border-black/10 dark:hover:border-white/10 hover:bg-white/60 dark:hover:bg-zinc-900/10'
                  }`}
                style={currentTemplate === template.id ? { borderColor: currentThemeColor, '--tw-ring-color': `${currentThemeColor}10` } : {}}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {template.thumbnail}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${currentTemplate === template.id ? '' : 'text-slate-400 dark:text-slate-600'}`}
                    style={currentTemplate === template.id ? { color: currentThemeColor } : {}}>
                    {template.id.replace('template-', 'Design ')}
                  </span>
                  <span className={`text-xs font-semibold ${currentTemplate === template.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-400'
                    }`}>
                    {template.name}
                  </span>
                </div>
                {currentTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-1.5 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: currentThemeColor, boxShadow: `0 0 8px ${currentThemeColor}80` }}></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-sage-100 dark:bg-sage-800/50 mx-2" />

        {/* Storage & Privacy */}
        <div className="space-y-4 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 transition-colors" style={{ color: currentThemeColor }}>
              <ShieldCheck size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Storage & Privacy</span>
            </div>
            <div className="group relative">
              <Info size={14} className="text-sage-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-[10px] text-white rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-slate-700">
                Persistent: Data stays on your device.<br />Temporary: Data is cleared when you close the tab.
              </div>
            </div>
          </div>

          <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
            <button
              onClick={() => updateStorageType('persistent')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${storageType === 'persistent'
                  ? 'bg-white dark:bg-white/10 shadow-sm'
                  : 'text-slate-400 hover:text-slate-500'
                }`}
              style={storageType === 'persistent' ? { color: currentThemeColor } : {}}
            >
              <Database size={14} />
              Persistent
            </button>
            <button
              onClick={() => updateStorageType('temporary')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${storageType === 'temporary'
                  ? 'bg-white dark:bg-white/10 text-rose-500 shadow-sm'
                  : 'text-sage-400 hover:text-sage-500'
                }`}
            >
              <ShieldCheck size={14} />
              Temporary
            </button>
          </div>

          <button
            onClick={() => setShowWipeConfirm(true)}
            className="w-full py-3 px-4 rounded-xl border border-rose-100 dark:border-rose-900/30 text-rose-500 text-[10px] uppercase tracking-widest font-black hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={14} />
            Wipe Master Cache
          </button>
        </div>
      </div>

      {/* Local Wipe Confirmation Modal for Structural Blueprint */}
      {showWipeConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 text-rose-500">
                <Trash2 size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Wipe Engine Cache?</h3>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">This will erase all your resume data and reset the structural blueprint to factory defaults. This action cannot be undone.</p>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setShowWipeConfirm(false)}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { resetResume(); setShowWipeConfirm(false); }}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5"
                >
                  Confirm Wipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default TemplateSelector;
