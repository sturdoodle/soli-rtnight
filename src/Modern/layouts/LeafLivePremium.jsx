import React from 'react';
import { Mail, Phone, MapPin, Github, Award, CheckCircle } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const LeafLivePremium = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white ${atsMode ? 'px-12 py-16 print:p-0' : 'p-8 md:p-12 print:p-0 max-w-4xl mx-auto font-serif shadow-2xl'} min-h-[1122px] w-full text-slate-800`}>
    <header className={`${atsMode ? 'mb-10 text-center border-b-2 border-black pb-8' : 'pb-6 print:pb-3 border-b-2 mb-8 print:mb-4'}`} style={atsMode ? {} : { borderColor: themeColor }}>
      <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-4xl font-bold text-slate-900 tracking-tight mb-2'}`}>{data.fullName}</h1>
      <h2 className={`${atsMode ? 'text-xl font-bold mb-6' : 'text-xl font-medium text-slate-600 mb-4'}`}>{data.jobTitle}</h2>

      <div className={`${atsMode ? 'mt-6 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-wrap text-sm text-slate-600 gap-x-6 gap-y-2'}`} aria-label="Contact Details">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`${atsMode ? 'space-y-12 print:space-y-6' : 'space-y-10 print:space-y-5'}`}>
      {data.summary && (
        <section aria-label="Professional Summary">
          <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Summary</SectionTitle>
          <div className={`text-slate-700 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-sm'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      <section aria-label="Skills">
        <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Skills</SectionTitle>
        <div className={`grid ${atsMode ? 'grid-cols-1 gap-1' : 'md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2'}`}>
          {data.skills?.map((skill) => (
            <div key={skill.id} className={atsMode ? 'text-base' : 'text-sm'}>
              <span className={`font-bold text-slate-800 mr-2 ${atsMode ? '' : ''}`}>{skill.category}:</span>
              <span className="text-slate-700">{skill.items}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Work Experience">
        <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Experience</SectionTitle>
        <div className="space-y-8 print:space-y-4">
          {data.experience?.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
          ))}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section aria-label="Key Projects">
          <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Projects</SectionTitle>
          <div className="space-y-6 print:space-y-3">
            {data.projects.map((proj) => (
              <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications & Awards">
          <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Certifications</SectionTitle>
          <div className="space-y-4 print:space-y-2">
            {data.certifications.map((cert) => (
              <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

      <section aria-label="Education">
        <SectionTitle className={atsMode ? '' : 'text-lg font-bold text-slate-900 tracking-wider mb-4 pb-1 border-b border-slate-200'} themeColor={themeColor} atsMode={atsMode}>Education</SectionTitle>
        <div className="space-y-6 print:space-y-3">
          {data.education?.map((edu) => (
            <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
          ))}
        </div>
      </section>
    </div>
  </main>
);
