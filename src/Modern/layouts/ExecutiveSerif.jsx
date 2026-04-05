import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ExecutiveSerif = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-16 py-20 min-h-[1122px] w-full shadow-xl ${atsMode ? 'text-black' : 'text-[#1a1a1a] font-serif'}`}>
    <header className={`text-center space-y-4 ${atsMode ? 'mb-10 border-b-2 border-black pb-8' : 'mb-16'}`}>
      <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-5xl font-light uppercase tracking-[0.2em] mb-4'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>
        {data.fullName}
      </h1>
      <div className={`${atsMode ? 'text-lg font-bold' : 'flex items-center justify-center gap-6 text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-zinc-400'}`}>
        {!atsMode && <div className="h-px w-20 bg-zinc-200"></div>}
        {data.jobTitle}
        {!atsMode && <div className="h-px w-20 bg-zinc-200"></div>}
      </div>
      <div className={`flex flex-wrap justify-center gap-6 ${atsMode ? 'text-sm mt-4' : 'text-xs font-sans opacity-60'}`}>
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    {data.summary && (
      <section className={`mb-16 ${atsMode ? '' : 'text-center max-w-3xl mx-auto'}`} aria-label="Professional Summary">
        <div className={`leading-relaxed text-zinc-700 ${atsMode ? 'text-[15px]' : 'text-lg italic'}`}>
          <FormattedText text={data.summary} />
        </div>
      </section>
    )}
 
    <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16'}`}>
      <div className={atsMode ? '' : 'col-span-8'}>
      {data.experience && data.experience.length > 0 && (
        <section className={atsMode ? 'space-y-10' : 'space-y-12'} aria-label="Professional Experience">
          <SectionTitle className={atsMode ? '' : 'border-b border-zinc-100 pb-2 mb-8 font-sans'} themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
          <div className="space-y-12">
            {data.experience?.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

        {data.projects && data.projects.length > 0 && (
          <section className="mt-16" aria-label="Personal Projects">
            <SectionTitle className={atsMode ? '' : 'border-b border-zinc-100 pb-2 mb-8 font-sans'} themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-12">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className={`${atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-16'}`}>
        {data.education && data.education.length > 0 && (
          <section aria-label="Education">
            <SectionTitle className={atsMode ? '' : 'border-b border-zinc-100 pb-2 mb-8 font-sans'} themeColor={themeColor} atsMode={atsMode}>Education</SectionTitle>
            <div className="space-y-8">
              {data.education?.map(edu => (
                <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications">
            <SectionTitle className={atsMode ? '' : 'border-b border-zinc-100 pb-2 mb-8 font-sans'} themeColor={themeColor} atsMode={atsMode}>Certifications</SectionTitle>
            <div className="space-y-6">
              {data.certifications.map(cert => (
                <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section aria-label="Professional Skills">
            <SectionTitle className={atsMode ? '' : 'border-b border-zinc-100 pb-2 mb-8 font-sans'} themeColor={themeColor} atsMode={atsMode}>Skills</SectionTitle>
            <div className={`space-y-8 ${atsMode ? '' : 'font-sans'}`}>
              {data.skills?.map(skill => (
                <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  </main>
);
