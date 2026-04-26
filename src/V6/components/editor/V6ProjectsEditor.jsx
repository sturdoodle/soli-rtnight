import React from 'react';
import { Layout, Plus, Trash2, Link as LinkIcon, Code, Globe, Terminal } from 'lucide-react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';

const V6ProjectsEditor = () => {
  const { resumeData, updateSection } = useResume();
  const projects = resumeData.projects || [];

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";
  const textareaClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-4 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[140px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all resize-none shadow-sm selection:bg-blue-500/20";

  const handleUpdateProject = (id, field, value) => {
    const updatedProjects = projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    updateSection('projects', updatedProjects);
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      tech: '',
      description: '',
      link: ''
    };
    updateSection('projects', [...projects, newProject]);
  };

  const handleRemoveProject = (id) => {
    updateSection('projects', projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Personal Projects</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Showcase your personal work, side projects, or open source contributions.
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <V6Card 
              title={project.name || "New Portfolio Project"} 
              description={project.tech ? `Stack: ${project.tech}` : "Outline the technologies and core features."}
              icon={Layout}
              action={
                <button 
                  onClick={() => handleRemoveProject(project.id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                >
                  <Trash2 size={18} />
                </button>
              }
            >
              <div className="space-y-5 w-full">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <Terminal size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Project Title</label>
                  </div>
                  <input 
                    type="text" 
                    value={project.name} 
                    onChange={(e) => handleUpdateProject(project.id, 'name', e.target.value)}
                    placeholder="e.g. EduMetric Platform"
                    className={inputClasses}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <Code size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Tech Stack</label>
                  </div>
                  <input 
                    type="text" 
                    value={project.tech} 
                    onChange={(e) => handleUpdateProject(project.id, 'tech', e.target.value)}
                    placeholder="e.g. React.js, Tailwind CSS, Firebase"
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <Globe size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Project Description</label>
                  </div>
                  <textarea 
                    value={project.description} 
                    onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe your architectural decisions and key features..."
                    className={textareaClasses}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <LinkIcon size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Live URL / Repo</label>
                  </div>
                  <input 
                    type="text" 
                    value={project.link} 
                    onChange={(e) => handleUpdateProject(project.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className={inputClasses}
                  />
                </div>
              </div>
            </V6Card>

            {/* Dynamic Ad Injection: Show after EACH project item (except the last one to avoid double spacing with button) */}
            <div className="py-2">
              <AdUnit slot="8331566456" minHeight="120px" className="rounded-[2.5rem]" />
            </div>
          </React.Fragment>
        ))}

        <button 
          onClick={handleAddProject}
          className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-[2rem] flex flex-col items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/[0.02] transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
            <Plus size={24} />
          </div>
          Add New Project
        </button>
      </div>
    </div>
  );
};

export default V6ProjectsEditor;
