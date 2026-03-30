import React, { useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

const SkillsSection = () => {
  const { resumeData, updateSection } = useResume();
  const [newCategory, setNewCategory] = useState('');
  const [newItems, setNewItems] = useState('');

  const handleUpdateSkill = (id, field, value) => {
    const updatedSkills = (resumeData.skills || []).map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateSection('skills', updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      category: newCategory || 'New Category',
      items: newItems || 'Skill 1, Skill 2'
    };
    updateSection('skills', [...(resumeData.skills || []), newSkill]);
    setNewCategory('');
    setNewItems('');
  };

  const handleRemoveSkill = (id) => {
    const updatedSkills = (resumeData.skills || []).filter((skill) => skill.id !== id);
    updateSection('skills', updatedSkills);
  };

  return (
    <GlassCard title="Skills" icon={Award} isCollapsible={true}>
      <div className="space-y-6">
        {(resumeData.skills || []).map((skill) => (
          <div key={skill.id} className="p-4 sm:p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Award size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Skill Category</span>
              </div>
              <PillButton
                variant="danger"
                className="z-20 scaled-icon"
                onClick={() => handleRemoveSkill(skill.id)}
                icon={Trash2}
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-1">
                <MinimalistInput
                  label="Category"
                  value={skill.category}
                  onChange={(e) => handleUpdateSkill(skill.id, 'category', e.target.value)}
                  placeholder="e.g. Frontend"
                />
              </div>
              <div className="xl:col-span-2">
                <MinimalistInput
                  label="Items (comma-separated)"
                  value={skill.items}
                  onChange={(e) => handleUpdateSkill(skill.id, 'items', e.target.value)}
                  placeholder="e.g. React, Tailwind, Framer Motion"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="p-8 mt-10 rounded-3xl bg-sage-50/10 dark:bg-sage-900/10 border-2 border-dashed border-sage-200/50 dark:border-sage-800/50">
          <div className="flex items-center gap-2 mb-6 text-sage-400">
            <Plus size={16} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Add New Category</h4>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 mb-6">
            <MinimalistInput
              label="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Backend"
            />
            <MinimalistInput
              label="Skills"
              value={newItems}
              onChange={(e) => setNewItems(e.target.value)}
              placeholder="e.g. Node.js, Express, MongoDB"
            />
          </div>
          <PillButton variant="glass" icon={Plus} onClick={handleAddSkill} className="w-full py-4">
            Add Skill Category
          </PillButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default SkillsSection;
