import React from 'react';
import { FormattedText } from './SharedComponents';

export const ATSAcademic = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? 'font-sans' : 'font-serif'}`}>
    {/* Centered Header */}
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold uppercase mb-2 tracking-widest transition-colors" style={atsMode ? {} : { color: themeColor }}>{data.fullName}</h1>
      <div className="text-sm font-medium space-x-2">
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
    </header>

    <div className="space-y-6">
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Education</h2>
          <div className="space-y-4">
            {data.education?.map((edu) => (
              <div key={edu.id} className="text-[13px]">
                <div className="flex justify-between font-bold">
                  <span>{edu.institution}, <span className="font-normal">{edu.location || ''}</span></span>
                  <span>{edu.duration}</span>
                </div>
                <div className="italic">{edu.degree}</div>
                {edu.description && <div className="mt-1 text-[12px]"><FormattedText text={edu.description} /></div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section aria-label="Work Experience">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Work Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[13px]">
                  <span>{exp.company}, <span className="font-normal">{exp.location || ''}</span>, <span className="italic font-normal">{exp.role}</span></span>
                  <span>{exp.duration}</span>
                </div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mt-1">
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

      {/* Leadership */}
      {data.projects && data.projects.length > 0 && (
        <section aria-label="Leadership/Projects">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Leadership</h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[13px]">
                  <span>{proj.name}, <span className="font-normal italic">{proj.tech}</span></span>
                  <span>{proj.duration || ''}</span>
                </div>
                <div className="text-[12px] mt-1">
                  <FormattedText text={proj.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Interests */}
      {data.skills && data.skills.length > 0 && (
        <section aria-label="Skills & Interests">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Skills & Interests</h2>
          <div className="space-y-1.5 text-[12px]">
            {data.skills?.map((skill) => (
              <div key={skill.id}>
                <span className="font-bold underline">{skill.category}:</span> <FormattedText text={skill.items} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
);
