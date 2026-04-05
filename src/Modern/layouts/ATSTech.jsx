import React from 'react';
import { FormattedText } from './SharedComponents';

export const ATSTech = ({ data, themeColor, atsMode, sectionThemingEnabled }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? 'font-sans' : 'font-serif'}`}>
    {/* Header with GitHub */}
    {/* Header with GitHub */}
    <header className="text-center mb-6">
      <h1 className="text-3xl font-bold uppercase mb-2 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>{data.fullName}</h1>
      <div className="flex flex-col items-center text-sm font-medium space-y-1">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span>{data.phone}</span>
          <span>|</span>
          <span>{data.email}</span>
          {data.location && (
            <>
              <span>|</span>
              <span>{data.location}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center text-[12px] opacity-80">
          {data.github && <span className="underline italic">{data.github}</span>}
          {data.linkedin && (
            <>
              {data.github && <span>|</span>}
              <span className="underline italic">{data.linkedin}</span>
            </>
          )}
          {data.portfolio && (
            <>
              {(data.github || data.linkedin) && <span>|</span>}
              <span className="underline italic">{data.portfolio}</span>
            </>
          )}
        </div>
      </div>
    </header>

    <div className="space-y-6">
      {/* Summary */}
      {data.summary && (
        <section aria-label="Professional Summary">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Professional Summary</h2>
          <div className="text-[13px] leading-relaxed">
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Education</h2>
          <div className="space-y-3">
            {data.education?.map((edu) => (
              <div key={edu.id} className="text-[13px]">
                <div className="flex justify-between font-bold">
                  <span>{edu.institution}, <span className="font-normal">{edu.location || ''}</span></span>
                  <span>{edu.duration}</span>
                </div>
                <div className="italic">{edu.degree}</div>
                {edu.description && <div className="mt-1 text-[12px] opacity-80"><FormattedText text={edu.description} /></div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <section aria-label="Technical Skills">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Technical Skills</h2>
          <div className="space-y-1 text-[12px]">
            {data.skills?.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <span className="font-bold shrink-0">{skill.category}:</span>
                <span className="flex-1"><FormattedText text={skill.items} /></span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section aria-label="Projects">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Projects</h2>
          <div className="space-y-5">
            {data.projects?.map((proj) => (
              <div key={proj.id} className="text-[13px]">
                <div className="flex justify-between font-bold">
                  <span>{proj.name}, <span className="font-normal italic">{proj.tech}</span></span>
                  <span>{proj.duration || ''}</span>
                </div>
                <div className="mt-1 text-[12px] leading-relaxed">
                  <FormattedText text={proj.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section aria-label="Experience">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[13px]">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-[12px] mb-2">{exp.role}</div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mt-1 mb-3">
                    {client.name && <div className="text-[12px] font-bold opacity-80 mb-1 transition-colors" style={atsMode ? {} : { color: themeColor }}>{client.name}</div>}
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
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Certifications</h2>
          <ul className="list-disc ml-5 text-[12px] space-y-1">
            {data.certifications?.map((cert) => (
              <li key={cert.id}>{cert.name} {cert.expiryDate && `| Expires: ${cert.expiryDate}`}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </main>
);
