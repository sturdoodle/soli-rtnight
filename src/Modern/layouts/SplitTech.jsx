import React from 'react';
import { Mail, Phone, MapPin, Github, Code, Layout, Globe } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const SplitTech = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white min-h-[1122px] w-full ${atsMode ? 'text-black' : 'text-slate-900 font-sans shadow-2xl'}`}>
    <header className={`${atsMode ? 'px-12 py-10 mb-8 pb-8 border-b-2 border-black text-center' : 'hidden'}`}>
      <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase">{data.fullName}</h1>
      <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">{data.jobTitle}</p>
      <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium mt-6">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`flex ${atsMode ? 'flex-col px-12' : 'flex-row'}`}>
      {/* Left Sidebar (Dark) */}
      <aside className={`${atsMode ? 'w-full space-y-10 order-2 mt-10' : 'w-[320px] bg-slate-900 text-white p-10 flex flex-col gap-10'}`}>
        {!atsMode && (
          <header>
            <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase">{data.fullName}</h1>
            <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">{data.jobTitle}</p>
          </header>
        )}

        {!atsMode && (
          <section aria-label="Contact Information">
            <SectionTitle className="text-slate-400 border-b border-slate-800 pb-2 mb-6" themeColor="#fff" atsMode={atsMode}>Contact</SectionTitle>
            <div className="space-y-4 text-xs font-medium">
              <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
              <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
              <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
              <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
            </div>
          </section>
        )}

        <section aria-label="Skills">
          <SectionTitle className={atsMode ? '' : 'text-slate-400 border-b border-slate-800 pb-2 mb-6'} themeColor={atsMode ? 'black' : '#fff'} atsMode={atsMode}>Tech Stack</SectionTitle>
          <div className="space-y-6">
            {data.skills?.map(skill => (
              <div key={skill.id} className={atsMode ? '' : 'bg-slate-800/50 p-4 rounded-xl border border-slate-700/50'} aria-label={skill.category}>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${atsMode ? 'text-black' : 'text-slate-400'}`}>
                  {!atsMode && <Code size={12} style={{ color: themeColor }} />} {skill.category}
                </h3>
                <p className={`text-xs leading-relaxed ${atsMode ? 'text-black' : 'text-slate-300 font-mono'}`}>{skill.items}</p>
              </div>
            ))}
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section aria-label="Certifications">
            <SectionTitle className={atsMode ? '' : 'text-slate-400 border-b border-slate-800 pb-2 mb-6'} themeColor={atsMode ? 'black' : '#fff'} atsMode={atsMode}>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {!atsMode && (
          <footer className="mt-auto pt-8 opacity-20 text-[10px] lowercase font-bold tracking-[0.3em]">
            {data.GENERATED_BY}
          </footer>
        )}
      </aside>

      {/* Main Content */}
      <div className={`${atsMode ? 'w-full' : 'flex-1 p-12'} bg-white`}>
        {data.summary && (
          <section className="mb-12" aria-label="Professional Overview">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Professional Summary</SectionTitle>
            <div className={`${atsMode ? 'text-slate-600 leading-relaxed text-sm' : 'text-slate-600 leading-relaxed text-sm bg-slate-50 p-8 rounded-3xl border-l-[6px]'}`} style={atsMode ? {} : { borderColor: themeColor }}>
              <FormattedText text={data.summary} />
            </div>
          </section>
        )}

        <section className="mb-12" aria-label="Work Experience">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
          <div className="space-y-12">
            {data.experience?.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.projects && data.projects.length > 0 && (
          <section className="mb-12" aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-8">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        <section aria-label="Academic Background">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Education</SectionTitle>
          <div className={`grid ${atsMode ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
            {data.education?.map(edu => (
              <div key={edu.id} className={atsMode ? '' : 'bg-slate-50 p-6 rounded-2xl border border-slate-100'}>
                <EducationItem edu={edu} atsMode={atsMode} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </main>
);
