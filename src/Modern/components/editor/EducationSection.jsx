"use client";

import React from 'react';
import { GraduationCap, Plus, Trash2, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import SmartSectionNote from './SmartSectionNote';
import { useResume } from '../../context/ResumeContext';
import AdSenseAd from '../../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../../MainConstant.js';

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
      <div className="space-y-2">
        <div className="px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 mb-2 animate-in fade-in duration-300">
          <Sparkles size={14} className="text-blue-500/50" />
          <p className="text-[8.5px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Smart Section: This will be automatically removed from your CV if left empty.
          </p>
        </div>
        {(resumeData.education || []).map((edu, index) => (
          <React.Fragment key={edu.id}>
            <div className="p-3 sm:p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
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
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2">
                <div className="xl:col-span-2">
                  <MinimalistInput 
                    id={`v5-edu-${edu.id}-degree`}
                    label="Degree / Course" 
                    value={edu.degree} 
                    onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)} 
                  />
                </div>
                <MinimalistInput 
                  id={`v5-edu-${edu.id}-institution`}
                  label="Institution" 
                  value={edu.institution} 
                  onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)} 
                />
                <MinimalistInput 
                  id={`v5-edu-${edu.id}-duration`}
                  label="Duration" 
                  value={edu.duration} 
                  onChange={(e) => handleUpdateEdu(edu.id, 'duration', e.target.value)} 
                />
                <SmartSectionNote 
                  text="Important: If marks left empty, they will not be shown in the PDF." 
                  color="blue" 
                />
                <MinimalistInput 
                  id={`v5-edu-${edu.id}-gpaLabel`}
                  label="Mark Type" 
                  value={edu.gpaLabel || ''} 
                  placeholder="e.g. CGPA, Percentage"
                  onChange={(e) => handleUpdateEdu(edu.id, 'gpaLabel', e.target.value)} 
                />
                <MinimalistInput 
                  id={`v5-edu-${edu.id}-gpaValue`}
                  label="Marks" 
                  value={edu.gpaValue || ''} 
                  placeholder="e.g. 8.5, 85%"
                  onChange={(e) => handleUpdateEdu(edu.id, 'gpaValue', e.target.value)} 
                />
              </div>
            </div>
            
            {/* In-Section Intelligent Ad Injection */}
            {index === 1 && (resumeData.education || []).length > 2 && (
              <div className="p-6 rounded-2xl bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-300 my-2 flex items-center justify-center min-h-[150px]">
                 <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" minHeight="150px" />
              </div>
            )}
          </React.Fragment>
        ))}

        <PillButton 
          variant="add" 
          icon={Plus} 
          onClick={handleAddEdu} 
          className="w-full py-4 mt-6"
        >
          Add New Education
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default EducationSection;

