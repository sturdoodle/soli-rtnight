"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const CreativeBold = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white min-h-[1122px] w-full ${atsMode ? 'text-black' : 'text-slate-900  shadow-2xl overflow-hidden'}`}>
    <header className={`${atsMode ? 'px-12 py-10 mb-8 pb-8 border-b-2 border-black' : 'p-12 mb-8 text-white relative overflow-hidden'}`} style={atsMode ? {} : { backgroundColor: themeColor }}>
      {!atsMode && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        </>
      )}
      
      <div className={atsMode ? '' : 'relative z-10'}>
        <h1 className={`text-6xl font-black mb-2 leading-none ${atsMode ? '' : 'tracking-tighter'}`}>{data.fullName}</h1>
        {!atsMode && <div className="h-1.5 w-24 bg-white/40 mb-6 rounded-full"></div>}
        <p className={`text-xl font-medium tracking-[0.15em] uppercase ${atsMode ? '' : 'opacity-80'}`}>{data.jobTitle}</p>
      </div>

      <div className={`mt-10 ${atsMode ? 'grid grid-cols-1 md:grid-cols-2 gap-2 text-sm' : 'flex flex-wrap gap-8 items-center justify-between border-t border-white/20 pt-8 text-sm font-semibold relative z-10'}`}>
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`px-12 pb-12 grid ${atsMode ? 'grid-cols-1 gap-10' : 'grid-cols-12 gap-12'}`}>
      <div className={atsMode ? '' : 'col-span-12'}>
        {data.summary && (
          <section className="mb-12" aria-label="Professional Summary">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Profile</SectionTitle>
            <div className={`text-slate-700 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-lg font-medium'}`}>
              <FormattedText text={data.summary} />
            </div>
          </section>
        )}
      </div>

      <div className={atsMode ? 'space-y-10' : 'col-span-7 space-y-12'}>
        {data.experience && data.experience.length > 0 && (
          <section aria-label="Professional Experience">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
            <div className="space-y-10">
              {data.experience?.map(exp => (
                <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-8">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-5 space-y-12'}>
        <section className={`${atsMode ? '' : 'bg-slate-50 p-8 rounded-3xl border border-slate-100'}`} aria-label="Skills & Expertise">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Expertise</SectionTitle>
          <div className="space-y-6">
            {data.skills?.map(skill => (
              <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        <section aria-label="Education">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Education</SectionTitle>
          <div className="space-y-6">
            {data.education?.map(edu => (
              <div key={edu.id} className={atsMode ? '' : 'p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors'}>
                <EducationItem edu={edu} atsMode={atsMode} />
              </div>
            ))}
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  </main>
);

