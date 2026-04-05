import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import { ContactItem, SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const SkyBlueMinimal = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white ${atsMode ? 'px-12 py-16' : 'bg-[#f8fafc] px-16 py-20 min-h-[1122px] shadow-xl'} w-full text-slate-900 font-sans`}>
    <div className={`max-w-4xl mx-auto ${atsMode ? 'space-y-10' : 'space-y-16'}`}>
      <header className="flex flex-col items-center text-center">
        {!atsMode && (
          <div className="w-24 h-24 rounded-full mb-8 flex items-center justify-center text-white text-4xl font-black shadow-lg" style={{ backgroundColor: themeColor }} aria-hidden="true">
            {data.fullName.charAt(0)}
          </div>
        )}
        <h1 className={`${atsMode ? 'text-4xl font-bold mb-2' : 'text-5xl font-black tracking-tight mb-4'}`} style={atsMode ? { color: 'black' } : {}}>{data.fullName}</h1>
        <p className={`${atsMode ? 'text-xl font-bold mb-6' : 'text-xl font-bold opacity-40 uppercase tracking-[0.3em] mb-10'}`}>{data.jobTitle}</p>
        
        <div className={`${atsMode ? 'flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm font-medium' : 'flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold opacity-60'}`} aria-label="Contact Information">
          <ContactItem icon={Mail} text={data.email} atsMode={atsMode} />
          <ContactItem icon={Phone} text={data.phone} atsMode={atsMode} />
          <ContactItem icon={MapPin} text={data.location} atsMode={atsMode} />
          <ContactItem icon={Github} text={data.github} atsMode={atsMode} />
        </div>
      </header>

      {data.summary && (
        <section className={`${atsMode ? 'mb-12' : 'bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 text-center'}`} aria-label="Professional Summary">
          <div className={`text-slate-600 leading-relaxed ${atsMode ? 'text-[15px]' : 'text-lg italic'}`}>
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}
 
      <div className={`grid ${atsMode ? 'grid-cols-1 gap-12' : 'grid-cols-1 md:grid-cols-2 gap-16'}`}>
        {data.experience && data.experience.length > 0 && (
          <section className="space-y-12" aria-label="Work Experience">
            <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-center font-black'}>Success Stories</SectionTitle>
            <div className="space-y-12">
              {data.experience?.map(exp => (
                <ExperienceItem key={exp.id} exp={exp} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
 
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-12" aria-label="Personal Projects">
            <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-center font-black'}>Featured Projects</SectionTitle>
            <div className="space-y-12">
              {data.projects.map(proj => (
                <ProjectItem key={proj.id} proj={proj} themeColor={themeColor} atsMode={atsMode} />
              ))}
            </div>
          </section>
        )}
 
        <div className={`space-y-16 ${atsMode ? 'col-span-1' : 'md:col-span-2 lg:col-span-1'}`}>
          {data.skills && data.skills.length > 0 && (
            <section className={atsMode ? '' : 'bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100'} aria-label="Core Capabilities">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-center font-black'}>Capabilities</SectionTitle>
              <div className={`space-y-8 mt-8 ${atsMode ? '' : 'text-center'}`}>
                {data.skills?.map(skill => (
                  <SkillCategory key={skill.id} skill={skill} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section className={atsMode ? '' : 'bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100'} aria-label="Educational Credentials">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-center font-black'}>Credentials</SectionTitle>
              <div className={`space-y-8 mt-8 ${atsMode ? '' : 'text-center text-sm'}`}>
                {data.education?.map(edu => (
                  <EducationItem key={edu.id} edu={edu} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
 
          {data.certifications && data.certifications.length > 0 && (
            <section className={atsMode ? '' : 'bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100'} aria-label="Professional Certifications">
              <SectionTitle themeColor={themeColor} atsMode={atsMode} className={atsMode ? '' : 'text-center font-black'}>Professional Certs</SectionTitle>
              <div className={`space-y-6 mt-8 ${atsMode ? '' : 'text-center'}`}>
                {data.certifications.map(cert => (
                  <CertificationItem key={cert.id} cert={cert} themeColor={themeColor} atsMode={atsMode} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  </main>
);
