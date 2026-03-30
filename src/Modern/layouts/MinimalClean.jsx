import React from 'react';
import { Mail, Phone, MapPin, Github, Code, FileText, Briefcase, GraduationCap } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const MinimalClean = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-16 py-20 min-h-[1122px] w-full ${atsMode ? 'text-black print:p-0' : 'text-zinc-900 font-sans tracking-tight print:p-0 print:shadow-none'}`}>
    <header className="mb-16">
      <h1 className="text-6xl font-light tracking-tighter mb-4" style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
      <p className="text-xl opacity-40 font-light uppercase tracking-[0.3em] mb-10">{data.jobTitle}</p>
      
      <div className="flex flex-wrap gap-8 text-[11px] opacity-60 font-medium uppercase tracking-widest border-t border-zinc-100 pt-6">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className="max-w-[700px] space-y-16">
      <section>
        <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Summary</SectionTitle>
        <p className="text-lg leading-relaxed font-light opacity-90">
          <FormattedText text={data.summary} />
        </p>
      </section>

      <section>
        <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Experience</SectionTitle>
        <div className="space-y-12">
          {data.experience?.map(exp => (
            <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
          ))}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Projects</SectionTitle>
          <div className="space-y-10">
            {data.projects.map(proj => (
              <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

      <div className={`grid ${atsMode ? 'grid-cols-1' : 'grid-cols-2'} gap-16`}>
        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Expertise</SectionTitle>
          <div className="space-y-6 text-sm">
            {data.skills?.map(skill => (
              <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Education</SectionTitle>
          <div className="space-y-6">
            {data.education?.map(edu => (
              <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
            ))}
          </div>
        </section>
      </div>

      {data.certifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }} className="text-zinc-300">Certifications</SectionTitle>
          <div className="space-y-4">
            {data.certifications.map(cert => (
              <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
);
