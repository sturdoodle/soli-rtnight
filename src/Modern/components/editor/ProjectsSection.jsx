import React from 'react';
import { Briefcase, Plus, Trash2, FolderCode, Link as LinkIcon, Code, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';
import AdSenseAd from '../../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../../MainConstant.js';

const ProjectsSection = () => {
  const { resumeData, updateSection } = useResume();

  const handleUpdateProject = (id, field, value) => {
    const updatedProjects = (resumeData.projects || []).map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateSection('projects', updatedProjects);
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: 'New Project',
      tech: 'React, Node.js',
      description: 'Project description with **highlights**',
      link: '',
      icon: '🚀'
    };
    updateSection('projects', [...(resumeData.projects || []), newProject]);
  };

  const handleRemoveProject = (id) => {
    updateSection('projects', resumeData.projects.filter(proj => proj.id !== id));
  };

  return (
    <GlassCard title="Personal Projects" icon={FolderCode} isCollapsible={true}>
      <div className="space-y-2">
        <div className="px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 mb-2 animate-in fade-in duration-700">
          <Sparkles size={14} className="text-blue-500/50" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Smart Section: This will be automatically removed from your CV if left empty.
          </p>
        </div>
        {(resumeData.projects || []).map((proj, index) => (
          <React.Fragment key={proj.id}>
            <div className="p-3 sm:p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <FolderCode size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Project Unit</span>
                </div>
                <PillButton 
                  variant="danger" 
                  className="z-20 scaled-icon"
                  onClick={() => handleRemoveProject(proj.id)}
                  icon={Trash2}
                />
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 mb-2">
                <div className="xl:col-span-8">
                  <MinimalistInput 
                    id={`v5-proj-${proj.id}-name`}
                    label="Project Title" 
                    value={proj.name} 
                    onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)} 
                  />
                </div>
                <div className="xl:col-span-4">
                  <MinimalistInput 
                    id={`v5-proj-${proj.id}-tech`}
                    label="Tech Stack" 
                    icon={Code}
                    value={proj.tech} 
                    onChange={(e) => handleUpdateProject(proj.id, 'tech', e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
                <div className="xl:col-span-12">
                  <MinimalistInput 
                    id={`v5-proj-${proj.id}-desc`}
                    textarea 
                    label="Description" 
                    value={proj.description} 
                    onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)} 
                    showFormatTip={true}
                    placeholder="Tell us about the project..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-1">
                <MinimalistInput 
                  id={`v5-proj-${proj.id}-link`}
                  label="Project Link (Optional)" 
                  icon={LinkIcon}
                  value={proj.link || ''} 
                  onChange={(e) => handleUpdateProject(proj.id, 'link', e.target.value)} 
                  placeholder="https://github.com/..."
                />
                <MinimalistInput 
                  id={`v5-proj-${proj.id}-icon`}
                  label="Icon / Emoji" 
                  value={proj.icon || '🚀'} 
                  onChange={(e) => handleUpdateProject(proj.id, 'icon', e.target.value)} 
                  placeholder="🚀"
                />
              </div>
            </div>

            {/* In-Section Intelligent Ad Injection */}
            {index === 1 && (resumeData.projects || []).length > 2 && (
              <div className="p-6 rounded-2xl bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-700 my-2 flex items-center justify-center">
                 <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" />
              </div>
            )}
          </React.Fragment>
        ))}
        
        <PillButton 
          variant="add" 
          icon={Plus} 
          onClick={handleAddProject} 
          className="w-full py-4 mt-6"
        >
          Add New Project
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default ProjectsSection;
