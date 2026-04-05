import React from 'react';
import { Target, TrendingUp, Users, Zap, Mail, Phone, MapPin, Github } from 'lucide-react';
import { SectionTitle, ExperienceItem, EducationItem, FormattedText, ProjectItem, CertificationItem, ContactItem } from './SharedComponents';

export const MarketingCreative = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white min-h-[1122px] w-full text-slate-800 font-sans ${atsMode ? 'text-black print:p-0' : 'shadow-2xl relative overflow-hidden print:p-0 print:shadow-none'}`}>
    {!atsMode && <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: themeColor }}></div>}
    
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8 p-12' : 'p-8 pb-0 flex flex-col md:flex-row justify-between items-center gap-10'}`}>
      <div className={`${atsMode ? 'text-center' : 'text-center md:text-left flex-1'}`}>
        <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-6xl font-black mb-3 tracking-tighter uppercase leading-none'}`} style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
        <p className={`${atsMode ? 'text-xl font-bold uppercase' : 'text-lg font-bold text-slate-400 uppercase tracking-[0.4em] mb-8'}`}>{data.jobTitle}</p>
      </div>
      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-col gap-3 text-xs font-bold opacity-70 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner'}`}>
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`p-8 space-y-10 ${atsMode ? 'py-0' : ''}`}>
      {data.summary && (
        <section aria-label="Brand Story">
          <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40 text-center'}>The Vision</SectionTitle>
          <div className={`${atsMode ? 'text-slate-700 leading-relaxed text-[15px]' : 'text-2xl font-light leading-snug text-slate-900 tracking-tight text-center md:text-left max-w-4xl mx-auto'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-12 gap-10'}`}>
        <div className={atsMode ? '' : 'col-span-12 md:col-span-7 space-y-10'}>
          {data.experience && data.experience.length > 0 && (
            <section aria-label="Career Impact">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40'}>Impact & Growth</SectionTitle>
              <div className="space-y-10">
                {data.experience?.map((exp) => (
                  <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section className="mt-10" aria-label="Creative Projects">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40'}>Key Campaigns</SectionTitle>
              <div className="space-y-10">
                {data.projects.map((proj) => (
                  <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={atsMode ? 'space-y-10 mt-10' : 'col-span-12 md:col-span-5 space-y-10'}>
          {data.skills && data.skills.length > 0 && (
            <section aria-label="Strategic Skills">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40'}>Expertise</SectionTitle>
              <div className="space-y-8">
                {data.skills?.map((skill) => (
                  <div key={skill.id} className={atsMode ? '' : 'relative'}>
                    {!atsMode && <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 block">{skill.category}</span>}
                    {atsMode && <h4 className="text-sm font-bold mb-1">{skill.category}</h4>}
                    <div className={`${atsMode ? 'text-slate-700 text-sm' : 'text-base font-bold text-slate-800'}`}>{skill.items}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section aria-label="Academic Roots">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40'}>Academic</SectionTitle>
              <div className="space-y-6">
                {data.education?.map((edu) => (
                  <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section aria-label="Certifications">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-40'}>Certifications</SectionTitle>
              <div className="space-y-3">
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
