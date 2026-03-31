import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ElegantIndigo = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-12 min-h-[1122px] w-full ${atsMode ? 'text-black print:p-0' : 'text-indigo-950 font-sans print:p-0 print:shadow-none'}`}>
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'flex justify-between items-start gap-12 mb-10 border-b border-indigo-100 pb-10'}`}>
      <div className="flex-1">
        <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-6xl font-black tracking-tight mb-2'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
        <p className={`${atsMode ? 'text-xl font-bold' : 'text-xl font-bold opacity-60 uppercase tracking-widest'}`}>{data.jobTitle}</p>
      </div>
      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-col gap-3 items-end text-xs font-bold opacity-70 whitespace-nowrap'}`} aria-label="Contact Details">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`grid ${atsMode ? 'grid-cols-1 gap-10' : 'grid-cols-12 gap-10'}`}>
      <div className={atsMode ? '' : 'col-span-12'}>
        {data.summary && (
          <section className="mb-10" aria-label="About Me">
            <h2 className={`${atsMode ? 'text-lg font-bold mb-4' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-30'}`}>About Me</h2>
            <div className={`leading-relaxed ${atsMode ? 'text-[15px] text-black' : 'text-xl font-light text-indigo-900/80'}`}>
              <FormattedText text={data.summary} />
            </div>
          </section>
        )}
      </div>

      <div className={atsMode ? 'space-y-10' : 'col-span-7 space-y-10'}>
        <section aria-label="Work Experience">
          <SectionTitle className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30'} themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
          <div className="space-y-8">
            {data.experience?.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.projects && data.projects.length > 0 && (
          <section className="mt-10" aria-label="Personal Projects">
            <SectionTitle className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30'} themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-8">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-5 space-y-10'}>
        <section aria-label="Core Skills">
          <SectionTitle className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30'} themeColor={themeColor} atsMode={atsMode}>Core Skills</SectionTitle>
          <div className="grid grid-cols-1 gap-8">
            {data.skills?.map(skill => (
              <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        <section aria-label="Educational Background">
          <SectionTitle className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30'} themeColor={themeColor} atsMode={atsMode}>Academic Background</SectionTitle>
          <div className="space-y-10">
            {data.education?.map(edu => (
              <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications">
            <SectionTitle className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30'} themeColor={themeColor} atsMode={atsMode}>Certifications</SectionTitle>
            <div className="space-y-8">
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
