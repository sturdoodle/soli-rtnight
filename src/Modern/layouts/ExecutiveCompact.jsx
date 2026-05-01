"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink, Award } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ExecutiveCompact = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white ${atsMode ? 'px-12 py-16' : 'p-10 max-w-4xl mx-auto  shadow-2xl border-t-[12px]'} min-h-[1122px] w-full text-slate-900`} style={atsMode ? {} : { borderColor: themeColor }}>
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'flex justify-between items-start mb-8 gap-8'}`}>
      <div className="flex-1">
        <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-4xl font-black tracking-tight mb-2 uppercase tracking-tighter'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
        <p className={`${atsMode ? 'text-xl font-bold' : 'text-lg font-bold opacity-60 uppercase tracking-widest'}`}>{data.jobTitle}</p>
      </div>
      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] font-bold opacity-70 whitespace-nowrap border-l-2 pl-6'}`} style={atsMode ? {} : { borderColor: themeColor }} aria-label="Contact Information">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={atsMode ? 'space-y-10' : 'space-y-6'}>
      {data.summary && (
        <section aria-label="Executive Overview" className={atsMode ? 'mb-10 text-sm' : 'bg-slate-50/50 p-6 rounded-2xl border border-slate-100'}>
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-widest mb-3 opacity-40'}>Executive Summary</SectionTitle>
          <div className={`leading-relaxed ${atsMode ? 'text-[15px]' : 'text-sm opacity-90'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}
 
      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-10'}`}>
        <div className={atsMode ? '' : 'col-span-8 space-y-8'}>
          {data.experience && data.experience.length > 0 && (
            <section aria-label="Professional Experience">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-widest mb-6 opacity-40 border-b pb-2'}>Professional Experience</SectionTitle>
              <div className="space-y-8">
                {data.experience?.map((exp) => (
                  <div key={exp.id} className="group">
                    <div className={`flex justify-between items-baseline mb-1 ${atsMode ? 'mb-2' : ''}`}>
                      <h3 className="font-bold text-lg" style={atsMode ? { color: 'black' } : { color: themeColor }}>{exp.role}</h3>
                      <span className={atsMode ? 'text-sm font-bold' : 'text-xs font-bold opacity-40 uppercase'}>{exp.duration}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={atsMode ? 'text-base font-bold' : 'text-sm font-bold opacity-70 uppercase tracking-wider'}>{exp.company}</span>
                    </div>
                    {exp.clients?.map((client) => (
                      <div key={client.id} className="mb-4 pl-0">
                        {!atsMode && client.name && <div className="text-xs font-black mb-2 opacity-100 uppercase tracking-widest underline decoration-2 underline-offset-4 transition-colors" style={{ color: themeColor, textDecorationColor: themeColor }}>Project: {client.name}</div>}
                        {atsMode && client.name && <div className="text-sm font-bold mb-1">Project: {client.name}</div>}
                        <ul className={`list-disc ml-5 space-y-1 ${atsMode ? 'text-sm' : 'text-sm opacity-90'}`}>
                          {client.bulletPoints?.map((point, idx) => (
                            <li key={idx}><FormattedText text={point} /></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
 
        <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-8'}>
          {data.skills && data.skills.length > 0 && (
            <section aria-label="Core Skills">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-widest mb-6 opacity-40 border-b pb-2'}>Expertise</SectionTitle>
              <div className={`grid ${atsMode ? 'grid-cols-1 gap-2' : 'grid-cols-1 gap-4'}`}>
                {data.skills?.map((skill) => (
                  <div key={skill.id} className={atsMode ? '' : 'bg-slate-50 p-4 rounded-xl border border-slate-100'}>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${atsMode ? 'text-xs text-black opacity-100' : 'opacity-40 transition-opacity'}`} style={atsMode ? {} : { color: themeColor }}>{skill.category}</h4>
                    <p className={`text-xs leading-relaxed font-medium ${atsMode ? 'opacity-100' : 'opacity-80'}`}>{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
 
          {data.education && data.education.length > 0 && (
            <section aria-label="Educational Background">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-widest mb-6 opacity-40 border-b pb-2'}>Academic</SectionTitle>
              <div className="space-y-6">
                {data.education?.map((edu) => (
                  <div key={edu.id}>
                    <div className={`font-bold leading-tight mb-1 ${atsMode ? 'text-sm' : 'opacity-90'}`}>{edu.degree}</div>
                    <div className={atsMode ? 'text-sm' : 'text-xs font-bold opacity-40 uppercase leading-tight'}>{edu.institution}</div>
                    <div className={atsMode ? 'text-sm italic mt-1' : 'text-[10px] opacity-40 italic mt-1'}>{edu.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
 
          {data.projects && data.projects.length > 0 && (
            <section aria-label="Notable Projects">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-widest mb-6 opacity-40 border-b pb-2'}>Key Projects</SectionTitle>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h4 className={`font-bold ${atsMode ? 'text-sm border-b border-black inline-block' : 'text-sm opacity-90 underline decoration-2 underline-offset-4 decoration-slate-100 text-slate-800'}`}>{proj.name}</h4>
                    <p className={atsMode ? 'text-xs font-bold mt-1' : 'text-[11px] font-bold opacity-40 uppercase tracking-widest mt-1 mb-1'}>{proj.tech}</p>
                    <p className={`text-xs leading-relaxed ${atsMode ? 'mt-2' : 'opacity-70'}`}><FormattedText text={proj.description} /></p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  </main>
);

