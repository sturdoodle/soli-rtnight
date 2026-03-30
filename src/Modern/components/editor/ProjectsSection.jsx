import React from 'react';
import { Briefcase, Plus, Trash2, FolderCode, Link as LinkIcon, Code } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

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
      <div className="space-y-8">
        {(resumeData.projects || []).map((proj) => (
          <div key={proj.id} className="relative p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
            <PillButton 
              variant="danger" 
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveProject(proj.id)}
              icon={Trash2}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-4">
              <div className="xl:col-span-8">
                <MinimalistInput 
                  label="Project Title" 
                  value={proj.name} 
                  onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)} 
                />
              </div>
              <div className="xl:col-span-4">
                <MinimalistInput 
                  label="Tech Stack" 
                  icon={Code}
                  value={proj.tech} 
                  onChange={(e) => handleUpdateProject(proj.id, 'tech', e.target.value)} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-12">
                <MinimalistInput 
                  textarea 
                  label="Description" 
                  value={proj.description} 
                  onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)} 
                  placeholder="Tell us about the project..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2">
              <MinimalistInput 
                label="Project Link (Optional)" 
                icon={LinkIcon}
                value={proj.link || ''} 
                onChange={(e) => handleUpdateProject(proj.id, 'link', e.target.value)} 
                placeholder="https://github.com/..."
              />
              <MinimalistInput 
                label="Icon / Emoji" 
                value={proj.icon || '🚀'} 
                onChange={(e) => handleUpdateProject(proj.id, 'icon', e.target.value)} 
                placeholder="🚀"
              />
            </div>
          </div>
        ))}
        
        <PillButton 
          variant="glass" 
          icon={Plus} 
          onClick={handleAddProject} 
          className="w-full py-6 border-dashed border-2 border-sage-200/50 dark:border-sage-800/50 hover:border-sage-400"
        >
          Add New Project
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default ProjectsSection;
