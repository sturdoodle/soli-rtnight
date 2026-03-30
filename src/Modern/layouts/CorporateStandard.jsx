import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Briefcase, GraduationCap, Award, FolderCode, FileText } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const CorporateStandard = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white px-12 py-16 min-h-[1122px] w-full ${atsMode ? 'text-black' : 'text-slate-900 font-sans'}`}>
    <header className={`text-center border-b-4 pb-8 mb-10 ${atsMode ? 'border-black' : ''}`} style={atsMode ? {} : { borderColor: themeColor }}>
      <h1 className="text-4xl font-bold tracking-tight mb-3 uppercase" style={atsMode ? { color: 'black' } : { color: themeColor }}>{data.fullName}</h1>
      <p className="text-xl font-semibold opacity-60 mb-6 tracking-widest">{data.jobTitle}</p>
      
      <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
        <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
        <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
        <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
        <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
      </div>
    </header>

    <div className={`grid ${atsMode ? 'grid-cols-1' : 'grid-cols-12 gap-10'}`}>
      <div className={`${atsMode ? 'space-y-10' : 'col-span-8 space-y-10'}`}>
        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Summary</SectionTitle>
          <p className="text-sm leading-relaxed text-justify">
            <FormattedText text={data.summary} />
          </p>
        </section>

        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Professional Experience</SectionTitle>
          <div className="space-y-8">
            {data.experience?.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      </div>

      <div className={`${atsMode ? 'space-y-10 mt-10' : 'col-span-4 space-y-10'}`}>
        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Core Competencies</SectionTitle>
          <div className="space-y-6">
            {data.skills?.map(skill => (
              <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Key Projects</SectionTitle>
            <div className="space-y-6">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Education</SectionTitle>
          <div className="space-y-6">
            {data.education?.map(edu => (
              <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
            ))}
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle atsMode={atsMode} style={atsMode ? {} : { color: themeColor }}>Certifications</SectionTitle>
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
