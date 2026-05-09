"use client";

import React, { useState } from 'react';
import { Award, Plus, Trash2, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

const SkillsSection = () => {
  const { resumeData, updateSection } = useResume();

  const handleUpdateSkill = (id, field, value) => {
    const updatedSkills = (resumeData.skills || []).map((skill) =>
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
    updateSection('skills', [...(resumeData.skills || []), newSkill]);
  };

  const handleRemoveSkill = (id) => {
    const updatedSkills = (resumeData.skills || []).filter((skill) => skill.id !== id);
    updateSection('skills', updatedSkills);
  };

  return (
    <GlassCard title="Skills" icon={Award} isCollapsible={true}>
      <div className="space-y-2">
        <div className="px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 mb-2 animate-in fade-in duration-300">
          <Sparkles size={14} className="text-blue-500/50" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Smart Section: This will be automatically removed from your CV if left empty.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {(resumeData.skills || []).map((skill) => (
            <div key={skill.id} className="p-3 sm:p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Award size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Skill Grouping</span>
                </div>
                <PillButton
                  variant="danger"
                  className="z-20 scaled-icon"
                  onClick={() => handleRemoveSkill(skill.id)}
                  icon={Trash2}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-4">
                  <MinimalistInput
                    id={`v5-skill-${skill.id}-category`}
                    label="Skill Group (e.g. Frontend)"
                    value={skill.category}
                    onChange={(e) => handleUpdateSkill(skill.id, 'category', e.target.value)}
                    placeholder="e.g. Programming Languages"
                  />
                </div>
                <div className="lg:col-span-8">
                  <MinimalistInput
                    id={`v5-skill-${skill.id}-items`}
                    label="List of Skills (comma-separated)"
                    textarea
                    value={skill.items}
                    onChange={(e) => handleUpdateSkill(skill.id, 'items', e.target.value)}
                    placeholder="e.g. React, Tailwind CSS, Framer Motion, JavaScript"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <PillButton
          variant="add"
          icon={Plus}
          onClick={handleAddSkill}
          className="w-full py-4 mt-2"
        >
          Add Skill Group
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default SkillsSection;

