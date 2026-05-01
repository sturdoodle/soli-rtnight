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
            <div className="relative p-1 bg-gradient-to-br from-slate-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] sm:rounded-[2.5rem]">
              <div className="bg-white dark:bg-[#0c0c0e] p-4 sm:p-10 rounded-[1.8rem] sm:rounded-[2.4rem] shadow-sm border border-slate-200 dark:border-white/[0.05]">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                        <Code size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{skill.category || 'New Skill Category'}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">{skill.items ? `${skill.items.split(',').length} Skills Listed` : 'Add specific skills'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all border border-slate-100 dark:border-white/[0.05] hover:border-red-100 dark:hover:border-red-900/30 shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <V6Card title="Category Title" description="e.g. Backend, Cloud, Soft Skills." icon={Zap} horizontal={true}>
                      <div className="w-full">
                        <input 
                          type="text" 
                          value={skill.category} 
                          onChange={(e) => handleUpdateSkill(skill.id, 'category', e.target.value)}
                          placeholder="e.g. Frontend Development"
                          className={inputClasses}
                        />
                      </div>
                    </V6Card>

                    <V6Card title="Skill Set" description="List items separated by commas." icon={Award}>
                      <textarea 
                        value={skill.items} 
                        onChange={(e) => handleUpdateSkill(skill.id, 'items', e.target.value)}
                        placeholder="e.g. React, TypeScript, Next.js, Tailwind CSS"
                        className={textareaClasses}
                      />
                    </V6Card>
                  </div>
                </div>
              </div>
            </div>

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
