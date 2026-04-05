import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ProfessionalBold = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-16 min-h-[1122px] w-full ${atsMode ? 'text-black' : 'text-slate-900 font-sans shadow-2xl relative overflow-hidden'}`}>
    {!atsMode && <div className="absolute top-0 right-0 w-32 h-full opacity-5 pointer-events-none" style={{ backgroundColor: themeColor }}></div>}
    
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'mb-16'}`}>
      <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-6xl font-black mb-4 flex items-center gap-4'}`}>
        {!atsMode && <span className="w-4 h-16 rounded-full" style={{ backgroundColor: themeColor }}></span>}
        {data.fullName}
      </h1>
      <p className={`${atsMode ? 'text-xl font-bold' : 'text-2xl font-black opacity-30 uppercase tracking-[0.2em] ml-8'}`}>{data.jobTitle}</p>
      
      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'grid grid-cols-4 gap-8 mt-12 bg-slate-50 p-6 rounded-3xl border border-slate-100 ml-8'}`} aria-label="Contact Information">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`${atsMode ? '' : 'ml-8'} space-y-16`}>
      {data.summary && (
        <section aria-label="Professional Snapshot">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-8'}>Snapshot</SectionTitle>
          <div className={`text-slate-600 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-lg max-w-4xl'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}
 
      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16'}`}>
        <div className={atsMode ? '' : 'col-span-7 space-y-16'}>
          {data.experience && data.experience.length > 0 && (
            <section aria-label="Work Experience">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-10'}>Career History</SectionTitle>
              <div className="space-y-12">
                {data.experience?.map(exp => (
                  <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
 
          {data.projects && data.projects.length > 0 && (
            <section className="mt-16" aria-label="Major Projects">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-10'}>Key Projects</SectionTitle>
              <div className="space-y-12">
                {data.projects.map(proj => (
                  <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </div>
 
        <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-5 space-y-16'}>
          {data.skills && data.skills.length > 0 && (
            <section aria-label="Core Skills">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-10'}>Skills</SectionTitle>
              <div className="space-y-8">
                {data.skills?.map(skill => (
                  <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
 
          {data.education && data.education.length > 0 && (
            <section aria-label="Educational Background">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-10'}>Education</SectionTitle>
              <div className="space-y-8">
                {data.education?.map(edu => (
                  <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
 
          {data.certifications && data.certifications.length > 0 && (
            <section aria-label="Professional Credentials">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'bg-slate-900 text-white px-6 py-2 inline-block rounded-full mb-10'}>Credentials</SectionTitle>
              <div className="space-y-6">
                {data.certifications.map(cert => (
                  <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  </main>
);
