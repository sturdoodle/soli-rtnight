import React from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const ProfessionalSlate = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white flex flex-col ${atsMode ? 'px-12' : 'min-h-[1122px]'} py-12 w-full text-zinc-900 font-sans shadow-lg`}>
    {/* Header - In ATS mode, move header out of sidebar */}
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'w-1/3 p-10 pb-0'}`}>
      <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1" style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
      <p className="text-sm font-bold opacity-50 tracking-[0.2em]">{data.jobTitle}</p>
      
      {atsMode && (
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium mt-6">
          <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
          <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
          <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
          <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
        </div>
      )}
    </header>

    <div className={`flex ${atsMode ? 'flex-col' : 'flex-row'}`}>
      {/* Sidebar Content */}
      <aside className={`${atsMode ? 'w-full space-y-10 order-2 mt-10' : 'w-1/3 bg-zinc-50 border-r border-zinc-100 p-10 pt-0 flex flex-col gap-10'}`}>
        {!atsMode && (
          <section aria-label="Contact Information" className="mt-10">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Contact</SectionTitle>
            <div className="space-y-4 text-xs font-semibold">
              <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
              <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
              <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
              <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section aria-label="Core Expertise">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Core Expertise</SectionTitle>
            <div className="space-y-6">
              {data.skills?.map(skill => (
                <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

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

        {!atsMode && (
          <footer className="mt-auto pt-10 border-t border-zinc-200 opacity-30 text-[10px] uppercase font-bold tracking-widest">
            {data.GENERATED_BY}
          </footer>
        )}
      </aside>

      {/* Main Content */}
      <div className={`${atsMode ? 'w-full' : 'w-2/3 p-12 pt-0'} space-y-12 bg-white`}>
        {data.summary && (
        <section aria-label="Professional Overview">
          <SectionTitle themeColor={themeColor} atsMode={atsMode}>Overview</SectionTitle>
          <div className={`text-zinc-700 leading-relaxed text-sm ${atsMode ? '' : 'italic'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section aria-label="Work Experience">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
            <div className="space-y-10">
              {data.experience?.map(exp => (
                <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Personal Projects</SectionTitle>
            <div className="space-y-8">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section aria-label="Education">
            <SectionTitle themeColor={themeColor} atsMode={atsMode}>Education</SectionTitle>
            <div className="space-y-6">
              {data.education?.map(edu => (
                <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </main>
);
