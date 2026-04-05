import React from 'react';
import { Rocket, Target, Globe, Github, Mail, Phone, MapPin } from 'lucide-react';
import { SectionTitle, ExperienceItem, EducationItem, FormattedText, ProjectItem, CertificationItem, ContactItem } from './SharedComponents';

export const StartupFounder = ({ data, themeColor, atsMode }) => (
  <main className={`bg-slate-50 min-h-[1122px] w-full text-slate-900 font-sans shadow-2xl relative overflow-hidden ${atsMode ? 'bg-white text-black' : ''}`}>
    {!atsMode && (
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900 skew-x-[-15deg] translate-x-32 z-0 hidden lg:block"></div>
    )}

    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8 p-12' : 'p-12 pb-24 relative z-10'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-6xl font-black mb-4 tracking-tighter leading-none'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
          <p className={`${atsMode ? 'text-xl font-bold uppercase' : 'text-2xl font-bold text-slate-500 uppercase tracking-widest'}`}>{data.jobTitle}</p>
        </div>
        <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-col gap-4 text-sm font-bold text-white bg-slate-800 p-8 rounded-[2rem] shadow-2xl border border-slate-700'}`}>
          <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
          <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
          <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
          <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
        </div>
      </div>
    </header>

    <div className={`p-12 space-y-16 relative z-10 ${atsMode ? 'py-0' : '-mt-16'}`}>
      {data.summary && (
        <section aria-label="Founder Profile" className={atsMode ? '' : 'bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100'}>
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-30 text-center'}>Venture Overview</SectionTitle>
          <div className={`${atsMode ? 'text-slate-700 leading-relaxed text-[15px]' : 'text-2xl font-medium leading-relaxed text-slate-700 text-center max-w-4xl mx-auto'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-16'}`}>
        <div className={atsMode ? '' : 'col-span-8 space-y-16'}>
          {data.experience && data.experience.length > 0 && (
            <section aria-label="Leadership Timeline">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-40'}>Leadership History</SectionTitle>
              <div className="space-y-12">
                {data.experience?.map((exp) => (
                  <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section className="mt-16" aria-label="Key Initiatives">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-40'}>Key Initiatives</SectionTitle>
              <div className="space-y-12">
                {data.projects.map((proj) => (
                  <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-20'}>
          {data.skills && data.skills.length > 0 && (
            <section aria-label="Core Competencies">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-40'}>Competencies</SectionTitle>
              <div className="space-y-10">
                {data.skills?.map((skill) => (
                  <div key={skill.id}>
                    <h4 className={`font-bold mb-2 ${atsMode ? 'text-sm' : 'text-lg text-slate-900 border-b-2 inline-block'}`} style={atsMode ? {} : { borderColor: themeColor }}>{skill.category}</h4>
                    <p className={`text-slate-600 leading-relaxed ${atsMode ? 'text-sm' : 'text-[13px] font-medium opacity-80'}`}>{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section aria-label="Educational Roots">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-40'}>Education</SectionTitle>
              <div className="space-y-8">
                {data.education?.map((edu) => (
                  <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section aria-label="Certifications">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-sm font-black uppercase tracking-[0.4em] mb-10 opacity-40'}>Credentials</SectionTitle>
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
  </main>
);
