import React from 'react';
import { SectionTitle, ExperienceItem, EducationItem, SkillCategory, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const StandardATS = ({ data, themeColor, atsMode, sectionThemingEnabled }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? 'font-sans' : 'font-serif'}`}>
    <header className="border-b-2 border-black pb-4 mb-8 transition-colors" style={atsMode ? {} : { borderColor: sectionThemingEnabled ? themeColor : 'black' }}>
      <h1 className="text-3xl font-bold uppercase mb-2 tracking-wide transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>{data.fullName}</h1>
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
        <span>{data.email}</span>
        <span>|</span>
        <span>{data.phone}</span>
        {data.location && (
          <>
            <span>|</span>
            <span>{data.location}</span>
          </>
        )}
        {data.github && (
          <>
            <span>|</span>
            <span>{data.github}</span>
          </>
        )}
        {data.linkedin && (
          <>
            <span>|</span>
            <span>{data.linkedin}</span>
          </>
        )}
        {data.portfolio && (
          <>
            <span>|</span>
            <span>{data.portfolio}</span>
          </>
        )}
      </div>
    </header>

    <div className="space-y-8">
      {data.summary && (
        <section aria-label="Summary">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Professional Summary</h2>
          <div className="text-[13px] leading-relaxed">
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section aria-label="Skills">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Skills</h2>
          <div className="space-y-2">
            {data.skills?.map((skill) => (
              <div key={skill.id} className="text-[13px]">
                <span className="font-bold">{skill.category}:</span> {skill.items}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section aria-label="Experience">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Professional Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[13px] mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-[12px] mb-2">{exp.role}</div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mb-4">
                    {client.name && <div className="text-[12px] font-bold mb-1 opacity-70 underline transition-colors" style={atsMode ? { textDecorationColor: 'rgba(0,0,0,0.2)' } : { color: themeColor, textDecorationColor: themeColor + '33' }}>Project: {client.name}</div>}
                    <ul className="list-disc ml-5 text-[12px] space-y-1">
                      {client.bulletPoints?.map((point, idx) => (
                        <li key={idx}><FormattedText text={point} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section aria-label="Projects">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Key Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[13px] mb-1">
                  <span>{proj.name}</span>
                  <span className="text-[11px] font-normal italic">{proj.tech}</span>
                </div>
                <div className="text-[12px] leading-relaxed">
                  <FormattedText text={proj.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Education</h2>
          <div className="space-y-4">
            {data.education?.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-[13px]">
                <div>
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-[12px] opacity-70">{edu.institution}</div>
                </div>
                <div className="text-[12px]">{edu.duration}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Certifications</h2>
          <ul className="list-disc ml-5 text-[12px] space-y-1">
            {data.certifications.map((cert) => (
              <li key={cert.id}>{cert.name} {cert.expiryDate && `| Expires: ${cert.expiryDate}`}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </main>
);
