import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const RefinedMinimalist = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-12 min-h-[1122px] w-full ${atsMode ? 'text-black print:p-0' : 'text-slate-800 font-sans leading-relaxed print:p-0 print:shadow-none'}`}>
    <header className={`${atsMode ? 'border-b-2 border-black pb-8 mb-8' : 'border-b-4 pb-6 mb-8'}`} style={atsMode ? {} : { borderColor: themeColor }}>
      <h1 className="text-5xl font-bold tracking-tight mb-3" style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
      <p className="text-2xl opacity-60 font-medium mb-6 uppercase tracking-widest">{data.jobTitle}</p>
      
      <div className={`grid ${atsMode ? 'grid-cols-1 gap-2' : 'grid-cols-2 lg:grid-cols-4 gap-4 text-sm opacity-60'}`}>
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

      <section className="mb-8">
        <SectionTitle themeColor={themeColor} atsMode={atsMode}>Professional Summary</SectionTitle>
        <div className={`${atsMode ? '' : 'opacity-90 leading-relaxed text-lg italic border-l pl-4'}`} style={atsMode ? {} : { borderColor: themeColor }}>
          <FormattedText text={data.summary} />
        </div>
      </section>

    <div className={`grid ${atsMode ? 'grid-cols-1' : 'grid-cols-12 gap-8'}`}>
      <div className={`${atsMode ? 'space-y-8' : 'col-span-8 space-y-8'}`}>
        <section>
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Professional Experience</SectionTitle>
          <div className="space-y-6">
            {data.experience?.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.projects && data.projects.length > 0 && (
          <section aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-6">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={`${atsMode ? 'space-y-8 mt-8' : 'col-span-4 space-y-8'}`}>
        <section aria-label="Core Skills">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Core Skills</SectionTitle>
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
              <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
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
      </div>
    </div>
  </main>
);
