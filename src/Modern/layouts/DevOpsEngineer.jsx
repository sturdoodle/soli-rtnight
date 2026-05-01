"use client";

import React from 'react';
import { Terminal, Shield, Cpu, Activity, Mail, Phone, MapPin, Github } from 'lucide-react';
import { SectionTitle, ExperienceItem, EducationItem, FormattedText, ProjectItem, CertificationItem, ContactItem } from './SharedComponents';

export const DevOpsEngineer = ({ data, themeColor, atsMode }) => (
  <main className={`bg-slate-900 min-h-[1122px] w-full text-slate-100 font-mono shadow-2xl relative overflow-hidden ${atsMode ? 'bg-white text-black ' : ''}`}>
    {!atsMode && (
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 items-center justify-center flex">
        <div className="bg-slate-900 px-4 py-1 rounded-full text-[10px] font-black tracking-widest text-cyan-400 border border-cyan-500/30 uppercase animate-pulse">System Online</div>
      </div>
    )}

    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8 p-12' : 'p-12 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-5xl font-black text-white mb-2 tracking-tighter uppercase'}`} style={atsMode ? { color: 'black' } : {}}>{data.fullName}</h1>
          <p className={`${atsMode ? 'text-xl font-bold italic' : 'text-xl font-bold text-cyan-400 opacity-80 uppercase tracking-widest'}`}>{data.jobTitle}</p>
        </div>
        <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'grid grid-cols-2 gap-x-8 gap-y-3 px-6 py-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-[11px] opacity-70'}`}>
          <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
          <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
          <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
          <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
        </div>
      </div>
    </header>

    <div className={`p-12 space-y-12 ${atsMode ? 'py-0' : ''}`}>
      {data.summary && (
        <section aria-label="Systems Summary">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-6 font-black uppercase text-xs tracking-[0.4em]'}>01. Summary</SectionTitle>
          <div className={`${atsMode ? 'text-slate-700 leading-relaxed text-[15px]' : 'bg-slate-800/30 p-8 rounded-3xl border border-slate-700/30 leading-relaxed text-sm text-slate-300 ml-4 font-mono'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16 ml-4'}`}>
        <div className={atsMode ? '' : 'col-span-8 space-y-12'}>
          {data.experience && data.experience.length > 0 && (
            <section aria-label="Deployment History">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-10 font-black uppercase text-xs tracking-[0.4em]'}>02. Experience</SectionTitle>
              <div className={`space-y-10 ${atsMode ? '' : 'border-l border-slate-800 pl-8'}`}>
                {data.experience?.map((exp) => (
                  <div key={exp.id} className="relative">
                    {!atsMode && <span className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>}
                    <ExperienceItem exp={exp} themeColor={themeColor} atsMode={atsMode} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section aria-label="Key Infrastructure">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-10 font-black uppercase text-xs tracking-[0.4em]'}>03. Infrastructure</SectionTitle>
              <div className="space-y-12">
                {data.projects.map((proj) => (
                  <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-12'}>
          {data.skills && data.skills.length > 0 && (
            <section aria-label="Technical Stack">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-8 font-black uppercase text-xs tracking-[0.4em]'}>04. Stack</SectionTitle>
              <div className="space-y-6">
                {data.skills?.map((skill) => (
                  <div key={skill.id} className={atsMode ? '' : 'bg-slate-800/30 p-4 rounded-xl border border-slate-700/30'}>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${atsMode ? 'text-xs text-black' : 'text-cyan-500 opacity-60'}`}>{skill.category}</h4>
                    <p className={`text-xs leading-relaxed ${atsMode ? 'text-slate-700' : 'text-slate-400 text-[11px] font-mono'}`}>{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section aria-label="Academic Roots">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-8 font-black uppercase text-xs tracking-[0.4em]'}>05. Academy</SectionTitle>
              <div className="space-y-6 text-sm">
                {data.education?.map((edu) => (
                  <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section aria-label="System Validation">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-cyan-400 mb-8 font-black uppercase text-xs tracking-[0.4em]'}>06. Validate</SectionTitle>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
    
    {!atsMode && (
      <footer className="p-12 border-t border-slate-800 opacity-20 text-[10px] uppercase font-black tracking-widest flex justify-between items-center bg-slate-900/50">
        <span>{data.GENERATED_BY}</span>
        <span className="flex items-center gap-2">
          <Activity size={10} className="text-cyan-500 animate-pulse" /> Status: Nominal
        </span>
      </footer>
    )}
  </main>
);

