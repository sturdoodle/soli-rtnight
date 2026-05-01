"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github, Award, CheckCircle } from 'lucide-react';
import { EditableText, ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';
import { useResume } from '../context/ResumeContext';

export const LeafLivePremium = ({ data, themeColor, atsMode }) => {
  const { addItem } = useResume();
  return (
    <main className={`bg-white ${atsMode ? 'px-12 py-16 print:p-0' : 'p-8 md:p-12 print:p-0 max-w-4xl mx-auto  shadow-2xl'} min-h-[1122px] w-full text-slate-800`}>
      <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'pb-6 print:pb-3 border-b-2 mb-8 print:mb-4'}`} style={atsMode ? {} : { borderColor: themeColor }}>
        <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-4xl font-bold text-slate-900 tracking-tight mb-2'}`}>
          <EditableText text={data.fullName} path="fullName" />
        </h1>
        <h2 className={`${atsMode ? 'text-xl font-bold mb-6' : 'text-xl font-medium text-slate-600 mb-4'}`}>
          <EditableText text={data.jobTitle} path="jobTitle" />
        </h2>

        <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-wrap text-sm text-slate-600 gap-x-6 gap-y-2'}`} aria-label="Contact Details">
          <ContactItem icon={Mail} text={data.email} path="email" atsMode={atsMode} />
          <ContactItem icon={Phone} text={data.phone} path="phone" atsMode={atsMode} />
          <ContactItem icon={MapPin} text={data.location} path="location" atsMode={atsMode} />
          <ContactItem icon={Github} text={data.github} path="github" atsMode={atsMode} />
        </div>
      </header>

      <div className={`${atsMode ? 'space-y-12 print:space-y-6' : 'space-y-10 print:space-y-5'}`}>
        {data.summary && (
          <section aria-label="Professional Summary">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              path="summary_title"
            >
              Summary
            </SectionTitle>
            <div className={`text-slate-700 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-sm'}`}>
              <FormattedText text={data.summary} path="summary" />
            </div>
          </section>
        )}
  
        {data.skills && data.skills.length > 0 && (
          <section aria-label="Skills">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              onAdd={() => addItem('skills', { id: Date.now(), category: 'New Category', items: 'Skill 1, Skill 2' })}
            >
              Skills
            </SectionTitle>
            <div className={`grid ${atsMode ? 'grid-cols-1 gap-1' : 'grid-cols-1 gap-4 print:gap-2'}`}>
              {data.skills?.map((skill, idx) => (
                <SkillCategory key={skill.id} skill={skill} path={`skills.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
  
        {data.experience && data.experience.length > 0 && (
          <section aria-label="Work Experience">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              onAdd={() => addItem('experience', { 
                id: Date.now(), company: 'New Company', role: 'Role', duration: '2024 - Present', 
                clients: [{ id: Date.now() + 1, name: 'Project Name', bulletPoints: ['New point...'] }] 
              })}
            >
              Experience
            </SectionTitle>
            <div className="space-y-8 print:space-y-4">
              {data.experience?.map((exp, idx) => (
                <ExperienceItem key={exp.id} exp={exp} path={`experience.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
  
        {data.projects && data.projects.length > 0 && (
          <section aria-label="Key Projects">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              onAdd={() => addItem('projects', { id: Date.now(), name: 'New Project', description: 'Description...', tech: 'React, Node' })}
            >
              Projects
            </SectionTitle>
            <div className="space-y-6 print:space-y-3">
              {data.projects.map((proj, idx) => (
                <ProjectItem key={proj.id} proj={proj} path={`projects.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
  
        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications & Awards">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              onAdd={() => addItem('certifications', { id: Date.now(), name: 'Certification Name' })}
            >
              Certifications
            </SectionTitle>
            <div className="space-y-4 print:space-y-2">
              {data.certifications.map((cert, idx) => (
                <CertificationItem key={cert.id} cert={cert} path={`certifications.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
  
        {data.education && data.education.length > 0 && (
          <section aria-label="Education">
            <SectionTitle 
              className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} 
              themeColor={themeColor} 
              atsMode={atsMode}
              onAdd={() => addItem('education', { id: Date.now(), institution: 'University', degree: 'Degree', duration: '2020-2024' })}
            >
              Education
            </SectionTitle>
            <div className="space-y-6 print:space-y-3">
              {data.education?.map((edu, idx) => (
                <EducationItem key={edu.id} edu={edu} path={`education.${idx}`} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

