"use client";

import React from 'react';
import { GraduationCap, Plus, Trash2, School, Calendar, BookOpen } from 'lucide-react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';

const V6EducationEditor = () => {
  const { resumeData, updateSection } = useResume();
  const education = resumeData.education || [];

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";

  const handleUpdateEdu = (id, field, value) => {
    const updatedEdu = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateSection('education', updatedEdu);
  };

  const handleAddEdu = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      duration: '',
    };
    updateSection('education', [...education, newEdu]);
  };

  const handleRemoveEdu = (id) => {
    updateSection('education', education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Education</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          List your degrees, certifications, and academic background.
        </p>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <React.Fragment key={edu.id}>
            <div className="relative p-1 bg-gradient-to-br from-slate-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] sm:rounded-[2.5rem]">
              <div className="bg-white dark:bg-[#0c0c0e] p-4 sm:p-10 rounded-[1.8rem] sm:rounded-[2.4rem] shadow-sm border border-slate-200 dark:border-white/[0.05]">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{edu.institution || 'New Institution'}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">{edu.degree || 'Degree'} • {edu.duration || 'Period'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveEdu(edu.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all border border-slate-100 dark:border-white/[0.05] hover:border-red-100 dark:hover:border-red-900/30 shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <V6Card title="Institution Name" description="University or school name." icon={School} horizontal={true}>
                      <div className="w-full">
                        <input 
                          type="text" 
                          value={edu.institution} 
                          onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                          placeholder="e.g. Stanford University"
                          className={inputClasses}
                        />
                      </div>
                    </V6Card>

                    <div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
                      <V6Card title="Degree / Major" description="Your field of study." icon={BookOpen} horizontal={true}>
                        <div className="w-full">
                          <input 
                            type="text" 
                            value={edu.degree} 
                            onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                            placeholder="e.g. B.S. Computer Science"
                            className={inputClasses}
                          />
                        </div>
                      </V6Card>
                      <V6Card title="Duration" description="Graduation year or period." icon={Calendar} horizontal={true}>
                        <div className="w-full">
                          <input 
                            type="text" 
                            value={edu.duration} 
                            onChange={(e) => handleUpdateEdu(edu.id, 'duration', e.target.value)}
                            placeholder="e.g. 2018 - 2022"
                            className={inputClasses}
                          />
                        </div>
                      </V6Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Ad Injection: Show after EACH education item */}
            <div className="py-2">
              <AdUnit slot="8331566456" minHeight="120px" className="rounded-[2.5rem]" />
            </div>
          </React.Fragment>
        ))}

        <button 
          onClick={handleAddEdu}
          className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-[2rem] flex flex-col items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/[0.02] transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
            <Plus size={24} />
          </div>
          Add New Institution
        </button>
      </div>
    </div>
  );
};

export default V6EducationEditor;

