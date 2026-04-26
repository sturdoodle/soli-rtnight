import React from 'react';
import { Code, Plus, Trash2, Award, Zap } from 'lucide-react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';

const V6SkillsEditor = () => {
  const { resumeData, updateSection } = useResume();
  const skills = resumeData.skills || [];

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";
  const textareaClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-4 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[120px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all resize-none shadow-sm selection:bg-blue-500/20";

  const handleUpdateSkill = (id, field, value) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateSection('skills', updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      category: '',
      items: ''
    };
    updateSection('skills', [...skills, newSkill]);
  };

  const handleRemoveSkill = (id) => {
    updateSection('skills', skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Skills & Tools</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Group your technical expertise and professional tools into categories.
        </p>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <React.Fragment key={skill.id}>
            <V6Card 
              title={skill.category || "New Skill Category"} 
              description={skill.items ? `Highlights: ${skill.items.substring(0, 50)}...` : "Define your tech stack or core competencies."}
              icon={Code}
              action={
                <button 
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                >
                  <Trash2 size={18} />
                </button>
              }
            >
              <div className="space-y-5 w-full">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Category Title</label>
                  <input 
                    type="text" 
                    value={skill.category} 
                    onChange={(e) => handleUpdateSkill(skill.id, 'category', e.target.value)}
                    placeholder="e.g. Frontend Development"
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Skill Set (Comma Separated)</label>
                  <textarea 
                    value={skill.items} 
                    onChange={(e) => handleUpdateSkill(skill.id, 'items', e.target.value)}
                    placeholder="e.g. React, TypeScript, Next.js, Tailwind CSS"
                    className={textareaClasses}
                  />
                </div>
              </div>
            </V6Card>

            {/* Intelligent Ad Injection Logic from V5: Show after the 2nd entry if more than 2 exist */}
            {index === 1 && skills.length > 2 && (
              <div className="py-4">
                <AdUnit slot="8331566456" minHeight="120px" className="rounded-[2.5rem]" />
              </div>
            )}
          </React.Fragment>
        ))}

        <button 
          onClick={handleAddSkill}
          className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-[2rem] flex flex-col items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/[0.02] transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
            <Plus size={24} />
          </div>
          Add New Category
        </button>
      </div>
    </div>
  );
};

export default V6SkillsEditor;
