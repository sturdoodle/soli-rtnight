"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github, Code, FileText, Briefcase, GraduationCap } from 'lucide-react';
import { EditableText, ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';
import { useResume } from '../context/ResumeContext';

export const MinimalClean = ({ data, themeColor, atsMode }) => {
  const { addItem } = useResume();
  return (
  <main className={`bg-white px-16 py-20 min-h-[1122px] w-full ${atsMode ? 'text-black print:p-0' : 'text-zinc-900  tracking-tight print:p-0 print:shadow-none'}`}>
    <header className="mb-16">
      <h1 className="text-6xl font-light tracking-tighter mb-4" style={atsMode ? { color: 'black' } : { color: themeColor }}>
        <EditableText text={data.fullName} path="fullName" />
      </h1>
      <p className="text-xl opacity-40 font-light uppercase tracking-[0.3em] mb-10">
        <EditableText text={data.jobTitle} path="jobTitle" />
      </p>
      
      <div className="flex flex-wrap gap-8 text-[11px] opacity-60 font-medium uppercase tracking-widest border-t border-zinc-100 pt-6">
        <ContactItem icon={Mail} text={data.email} path="email" atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} path="phone" atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} path="location" atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} path="github" atsMode={atsMode} />
      </div>
    </header>

    <div className="space-y-16">
      <section>
        <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300" path="summary_title">Summary</SectionTitle>
        <p className="text-lg leading-relaxed font-light opacity-90">
          <FormattedText text={data.summary} path="summary" />
        </p>
      </section>

      <section>
        <SectionTitle 
          atsMode={atsMode} 
          style={atsMode ? {} : { color: themeColor }} 
          className="text-zinc-300" 
          onAdd={() => addItem('experience', { id: Date.now(), company: 'New Company', role: 'Role', duration: '2024', clients: [{ id: Date.now()+1, name: 'Project', bulletPoints: ['...'] }] })}
        >
          Experience
        </SectionTitle>
        <div className="space-y-12">
          {data.experience?.map((exp, idx) => (
            <ExperienceItem key={exp.id} exp={exp} path={`experience.${idx}`} themeColor={themeColor} atsMode={atsMode} />
          ))}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section>
          <SectionTitle 
            atsMode={atsMode} 
            style={atsMode ? {} : { color: themeColor }} 
            className="text-zinc-300" 
            onAdd={() => addItem('projects', { id: Date.now(), name: 'New Project', description: '...', tech: '...' })}
          >
            Projects
          </SectionTitle>
          <div className="space-y-10">
            {data.projects.map((proj, idx) => (
              <ProjectItem key={proj.id} proj={proj} path={`projects.${idx}`} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle 
              atsMode={atsMode} 
              themeColor={themeColor} 
              onAdd={() => addItem('skills', { id: Date.now(), category: 'New Category', items: '...' })}
            >
              Skills
            </SectionTitle>
            <div className="space-y-4">
              {data.skills?.map((skill, idx) => (
                <SkillCategory key={skill.id} skill={skill} path={`skills.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

      {data.certifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle 
            atsMode={atsMode} 
            style={atsMode ? {} : { color: themeColor }} 
            className="text-zinc-300" 
            onAdd={() => addItem('certifications', { id: Date.now(), name: 'Certification' })}
          >
            Certifications
          </SectionTitle>
          <div className="space-y-4">
            {data.certifications.map((cert, idx) => (
              <CertificationItem key={cert.id} cert={cert} path={`certifications.${idx}`} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
  );
};

