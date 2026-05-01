"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const CompactGrid = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white ${atsMode ? 'px-12 py-16' : 'px-8 py-12 min-h-[1122px] shadow-xl'} w-full text-slate-900 `}>
    <div className={atsMode ? '' : 'bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200'}>
      <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'bg-slate-900 text-white p-12'}`}>
        <div className={atsMode ? '' : 'flex flex-col md:flex-row md:items-end justify-between gap-8'}>
          <div>
            <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-5xl font-bold tracking-tight mb-3'}`}>{data.fullName}</h1>
            <p className={`${atsMode ? 'text-xl font-bold' : 'text-lg opacity-60 font-medium uppercase tracking-[0.2em]'}`}>{data.jobTitle}</p>
          </div>
          <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'grid grid-cols-2 gap-x-8 gap-y-3 text-xs opacity-70'}`} aria-label="Contact Information">
            <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
            <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
            <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
            <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
          </div>
        </div>
      </header>

      <div className={atsMode ? 'space-y-10' : 'p-12 space-y-12'}>
        {data.summary && (
          <section className={`${atsMode ? 'mb-12' : 'grid grid-cols-12 gap-8 items-center bg-slate-50 p-8 rounded-[1.5rem]'}`} aria-label="Professional Summary">
            {!atsMode && <h2 className="col-span-3 text-xs font-black uppercase tracking-[0.3em] opacity-30">Summary</h2>}
            {atsMode && <SectionTitle themeColor={themeColor} atsMode={atsMode}>Summary</SectionTitle>}
            <div className={`${atsMode ? 'text-slate-700 leading-relaxed text-[15px]' : 'col-span-9 text-slate-700 leading-relaxed text-sm font-medium'}`}>
              <FormattedText text={data.summary} />
            </div>
          </section>
        )}
 
        <div className={`grid ${atsMode ? 'grid-cols-1 gap-10' : 'grid-cols-12 gap-12'}`}>
          <div className={atsMode ? 'space-y-10' : 'col-span-12 space-y-12'}>
            {data.experience && data.experience.length > 0 && (
              <section className={atsMode ? '' : 'bg-white p-8 rounded-[1.5rem] border border-slate-100'} aria-label="Work History">
                <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'border-b border-slate-100 pb-4 mb-8'}>Professional History</SectionTitle>
                <div className={`grid ${atsMode ? 'grid-cols-1 gap-10' : 'grid-cols-1 md:grid-cols-2 gap-12'}`}>
                  {data.experience?.map(exp => (
                    <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
                  ))}
                </div>
              </section>
            )}
 
            {data.projects && data.projects.length > 0 && (
              <section className={atsMode ? '' : 'bg-white p-8 rounded-[1.5rem] border border-slate-100'} aria-label="Personal Projects">
                <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'border-b border-slate-100 pb-4 mb-8'}>Personal Projects</SectionTitle>
                <div className={`grid ${atsMode ? 'grid-cols-1 gap-10' : 'grid-cols-1 md:grid-cols-2 gap-12'}`}>
                  {data.projects.map(proj => (
                    <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
                  ))}
                </div>
              </section>
            )}
          </div>
 
          {data.skills && data.skills.length > 0 && (
            <aside className={atsMode ? 'col-span-1' : 'col-span-6'}>
              <section className={atsMode ? '' : 'bg-white p-8 rounded-[1.5rem] border border-slate-100 h-full'} aria-label="Core Skills">
                <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'border-b border-slate-100 pb-4 mb-8'}>Specialized Skills</SectionTitle>
                <div className="space-y-6">
                  {data.skills?.map(skill => (
                    <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
                  ))}
                </div>
              </section>
            </aside>
          )}
 
          {data.education && data.education.length > 0 && (
            <aside className={atsMode ? 'col-span-1' : 'col-span-6'}>
              <section className={atsMode ? '' : 'bg-white p-8 rounded-[1.5rem] border border-slate-100 h-full'} aria-label="Education">
                <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'border-b border-slate-100 pb-4 mb-8'}>Education</SectionTitle>
                <div className="space-y-8">
                  {data.education?.map(edu => (
                    <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                  ))}
                </div>
              </section>
            </aside>
          )}
 
          {data.certifications && data.certifications.length > 0 && (
            <div className={atsMode ? 'col-span-1' : 'col-span-12'}>
              <section className={atsMode ? '' : 'bg-white p-8 rounded-[1.5rem] border border-slate-100'} aria-label="Certifications">
                <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'border-b border-slate-100 pb-4 mb-8'}>Certifications</SectionTitle>
                <div className={`grid ${atsMode ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3 gap-8'}`}>
                  {data.certifications.map(cert => (
                    <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  </main>
);

