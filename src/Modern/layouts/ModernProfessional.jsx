"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Calendar, User } from 'lucide-react';
import { EditableText, ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ModernProfessional = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-16 min-h-[1122px] w-full ${atsMode ? 'text-black print:p-0' : 'text-slate-800  print:p-0 print:shadow-none'}`}>
    <header className={`flex flex-col md:flex-row justify-between items-start border-b-2 pb-10 mb-10 ${atsMode ? 'border-black' : ''}`} style={atsMode ? {} : { borderColor: themeColor }}>
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={atsMode ? { color: 'black' } : { color: themeColor }}>
          <EditableText text={data.fullName} path="fullName" />
        </h1>
        <p className="text-xl font-bold opacity-75 uppercase tracking-wider">
          <EditableText text={data.jobTitle} path="jobTitle" />
        </p>
      </div>
      <div className={`mt-6 md:mt-0 grid gap-2 text-sm justify-items-start md:justify-items-end ${atsMode ? 'grid-cols-1' : 'opacity-70'}`}>
        <ContactItem icon={Mail} text={data.email} path="email" atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} path="phone" atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} path="location" atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} path="github" atsMode={atsMode} />
      </div>
    </header>

    <div className={`grid ${atsMode ? 'grid-cols-1' : 'grid-cols-12 gap-10'}`}>
      <div className={`${atsMode ? 'space-y-10' : 'col-span-8 space-y-10'}`}>
        <section>
          <SectionTitle atsMode={atsMode} themeColor={themeColor}>Profile Summary</SectionTitle>
          <p className="text-[15px] leading-relaxed opacity-90">
            <FormattedText text={data.summary} path="summary" />
          </p>
        </section>

        {data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} themeColor={themeColor}>Work Experience</SectionTitle>
            <div className="space-y-8">
              {data.experience?.map((exp, idx) => (
                <ExperienceItem key={exp.id} exp={exp} path={`experience.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} themeColor={themeColor}>Key Projects</SectionTitle>
            <div className="space-y-8">
              {data.projects.map((proj, idx) => (
                <ProjectItem key={proj.id} proj={proj} path={`projects.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={`${atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-10'}`}>
        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} themeColor={themeColor}>Core Expertise</SectionTitle>
            <div className="space-y-6">
              {data.skills?.map((skill, idx) => (
                <SkillCategory key={skill.id} skill={skill} path={`skills.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} themeColor={themeColor}>Academic Background</SectionTitle>
            <div className="space-y-6">
              {data.education?.map((edu, idx) => (
                <EducationItem key={edu.id} edu={edu} path={`education.${idx}`} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} themeColor={themeColor}>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map((cert, idx) => (
                <CertificationItem key={cert.id} cert={cert} path={`certifications.${idx}`} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </main>
);

