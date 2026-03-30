import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ModernTimeline = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-16 min-h-[1122px] w-full shadow-2xl ${atsMode ? 'text-black' : 'text-slate-800 font-sans leading-relaxed'}`}>
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'mb-16 border-l-8 pl-10 py-4'}`} style={atsMode ? {} : { borderColor: themeColor }}>
      <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-7xl font-black tracking-tighter mb-2'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
      <p className={`${atsMode ? 'text-xl font-bold' : 'text-2xl font-bold opacity-30 uppercase tracking-[0.3em] mb-10'}`}>{data.jobTitle}</p>
      
      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-wrap gap-x-12 gap-y-3 text-sm font-bold opacity-60'}`} aria-label="Contact Information">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16'}`}>
      <div className={atsMode ? '' : 'col-span-8'}>
        {data.summary && (
          <section className="mb-16" aria-label="Professional Profile">
            <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-8 opacity-40'}>Profile</SectionTitle>
            <div className={`text-slate-600 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-lg'}`}>
              <FormattedText text={data.summary} />
            </div>
          </section>
        )}
 
        <section aria-label="Experience Timeline">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-12 opacity-40'}>Timeline</SectionTitle>
          <div className={`space-y-12 ${atsMode ? '' : 'relative before:absolute before:left-[1px] before:top-2 before:bottom-0 before:w-px before:bg-slate-100'}`}>
            {data.experience?.map(exp => (
              <div key={exp.id} className={atsMode ? '' : 'relative pl-10 before:absolute before:left-[-4px] before:top-2 before:w-2 before:h-2 before:bg-white before:border-2 before:rounded-full'} style={atsMode ? {} : { borderColor: themeColor }}>
                <ExperienceItem exp={exp} themeColor={themeColor} atsMode={atsMode} />
              </div>
            ))}
          </div>
        </section>
 
        {data.projects && data.projects.length > 0 && (
          <section className="mt-20" aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-12 opacity-40'}>Projects</SectionTitle>
            <div className="space-y-12">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>
 
      <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-16'}>
        <section aria-label="Skills & Expertise">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-8 opacity-40'}>Expertise</SectionTitle>
          <div className="space-y-8">
            {data.skills?.map(skill => (
              <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
 
        <section aria-label="Academic Background">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-8 opacity-40'}>Academic</SectionTitle>
          <div className="space-y-10">
            {data.education?.map(edu => (
              <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
            ))}
          </div>
        </section>
 
        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications & Awards">
            <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'mb-8 opacity-40'}>Awards</SectionTitle>
            <div className="space-y-6">
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
