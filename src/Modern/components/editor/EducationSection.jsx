import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

const EducationSection = () => {
  const { resumeData, updateSection } = useResume();

  const handleUpdateEdu = (id, field, value) => {
    const updatedEdu = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateSection('education', updatedEdu);
  };

  const handleAddEdu = () => {
    const newEdu = {
      id: Date.now(),
      degree: 'Master of Science',
      institution: 'Example University',
      duration: '2020-2022'
    };
    updateSection('education', [...resumeData.education, newEdu]);
  };

  const handleRemoveEdu = (id) => {
    updateSection('education', resumeData.education.filter(edu => edu.id !== id));
  };

  return (
    <GlassCard title="Education" icon={GraduationCap} isCollapsible={true}>
      <div className="space-y-6">
        {(resumeData.education || []).map((edu) => (
          <div key={edu.id} className="p-4 sm:p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <GraduationCap size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Education Unit</span>
              </div>
              <PillButton 
                variant="danger" 
                className="z-20 scaled-icon"
                onClick={() => handleRemoveEdu(edu.id)}
                icon={Trash2}
              />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-6">
              <div className="xl:col-span-2">
                <MinimalistInput 
                  label="Degree / Course" 
                  value={edu.degree} 
                  onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)} 
                />
              </div>
              <MinimalistInput 
                label="Institution" 
                value={edu.institution} 
                onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)} 
              />
              <MinimalistInput 
                label="Duration" 
                value={edu.duration} 
                onChange={(e) => handleUpdateEdu(edu.id, 'duration', e.target.value)} 
              />
            </div>
          </div>
        ))}

        <PillButton 
          variant="glass" 
          icon={Plus} 
          onClick={handleAddEdu} 
          className="w-full py-6 mt-10 border-dashed border-2 border-sage-200/50 dark:border-sage-800/50 hover:border-sage-400"
        >
          Add New Education
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default EducationSection;
