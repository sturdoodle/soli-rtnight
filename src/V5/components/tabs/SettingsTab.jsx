"use client";

import React from 'react';
import { History, Download, Upload, ShieldCheck, Trash2, Zap, Palette, Rocket } from 'lucide-react';
import { useResume } from '../../../Modern/context/ResumeContext';

const SettingsTab = ({ 
  activeColor, 
  handleExportJSON, 
  handleImportJSON, 
  settingsFileInputRef,
  setShowWipeConfirm 
}) => {
  const { resumeData, updateStorageType } = useResume();

  return (
    <div className="space-y-8 px-1 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Backup & Restore</h3>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
          Manage your resume data. Exporting generates a portable JSON file containing all resume versions and settings. Importing a backup will restore all resume sections to that point in time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Snapshot Card */}
        <button
          onClick={handleExportJSON}
          className="p-6 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 transition-all hover:scale-[1.02] hover:border-emerald-500/20 group relative overflow-hidden text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
              <Download className="text-emerald-500" size={24} />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Export Resume</h4>
              <p className="text-lg font-black text-[var(--v5-heading)] tracking-tight">Save Backup</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-4">Download a complete copy of your resume in a portable JSON file. Perfect for local storage or transferring to another device.</p>
          <div className="text-[9px] font-black uppercase tracking-widest text-[#0ea5e9]">Download Backup</div>
        </button>

        {/* Import Snapshot Card */}
        <button
          onClick={() => settingsFileInputRef.current?.click()}
          className="p-6 rounded-[2.5rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 transition-all hover:scale-[1.02] hover:border-blue-500/20 group relative overflow-hidden text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
              <Upload className="text-blue-500" size={24} />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Import Resume</h4>
              <p className="text-lg font-black text-[var(--v5-heading)] tracking-tight">Restore Backup</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-4">Restore your workspace from a previously saved JSON backup. This action will replace all current data with the backup file data.</p>
          <div className="text-[9px] font-black uppercase tracking-widest text-[#0ea5e9]">Restore Backup</div>
          <input
            ref={settingsFileInputRef}
            type="file"
            className="hidden"
            accept=".json"
            onChange={handleImportJSON}
          />
        </button>
      </div>

      {/* Storage Governance */}
      <div className="p-8 rounded-[3rem] bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1">Storage Settings</h4>
            <h3 className="text-2xl font-black text-[var(--v5-heading)] tracking-tight">Data Storage</h3>
          </div>
          <div className="p-3 bg-slate-500/10 rounded-2xl text-slate-500"><ShieldCheck size={24} /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Choose how your data is persisted within the engine cache. We never upload your data to our servers—everything stays on your device.</p>
            <div className="flex bg-slate-200 dark:bg-black/40 p-1.5 rounded-2xl border border-black/5 dark:border-white/10 w-fit">
              {['persistent', 'session'].map((mode) => {
                const isActive = resumeData.storageType === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => updateStorageType(mode)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white shadow-lg shadow-black/20' : 'text-slate-500 hover:text-slate-400'}`}
                    style={isActive ? { backgroundColor: activeColor } : {}}
                  >
                    {mode === 'persistent' ? 'Permanent' : 'Temporary'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <History size={16} className="text-[#0ea5e9]" />
              <span className="text-[10px] font-black text-[var(--v5-text)] uppercase tracking-widest">Policy Details</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              {resumeData.storageType === 'persistent'
                ? "🚀 Permanent Mode: All changes are synced to localStorage instantly. Your data persists between tab closes and system restarts."
                : "🔒 Temporary Mode: Data is kept in sessionStorage. All progress is cleared automatically when you close the tab or browser."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Reset Options */}
      <div className="p-8 rounded-[3rem] bg-red-500/5 border border-red-500/10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-[11px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Reset Options</h4>
            <h3 className="text-2xl font-black text-[var(--v5-heading)] tracking-tight">Danger Zone</h3>
          </div>
          <div className="p-3 bg-red-500/10 rounded-2xl text-red-500"><Trash2 size={24} /></div>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6">Resetting the app data will reset all resume sections to factory defaults. This action cannot be undone unless you have a recent JSON backup.</p>
        <button
          onClick={() => setShowWipeConfirm(true)}
          className="flex items-center gap-2 px-8 py-4 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all"
        >
          <Zap size={14} /> Reset App Data
        </button>
      </div>

    </div>
  );
};

export default SettingsTab;

