import React from 'react';
import { FormattedText } from './SharedComponents';

export const ATSCreative = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? 'font-sans' : 'font-serif'}`}>
    {/* Right-Aligned Header */}
    <header className="flex flex-col items-end mb-10 text-right">
      <h1 className="text-4xl font-black mb-2 tracking-tight transition-colors" style={atsMode ? { color: '#111827' } : { color: themeColor }}>{data.fullName}</h1>
      <div className="flex flex-col items-end text-sm font-medium space-y-0.5">
        <span>{data.phone}</span>
        <span className="text-blue-600 underline decoration-blue-600/30">{data.email}</span>
        {data.location && <span className="text-gray-500">{data.location}</span>}
      </div>
    </header>

    <div className="space-y-8">
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Education</h2>
          <div className="space-y-4">
            {data.education?.map((edu) => (
              <div key={edu.id} className="text-[14px]">
                <div className="flex justify-between font-bold">
                  <span>{edu.institution}, <span className="font-normal">{edu.location || ''}</span></span>
                  <span>{edu.duration}</span>
                </div>
                <div className="text-gray-700">{edu.degree}</div>
                {edu.description && <div className="mt-2 text-[12px] text-gray-600 italic"><FormattedText text={edu.description} /></div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section aria-label="Experience">
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Experience</h2>
          <div className="space-y-8">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[14px]">
                  <span>{exp.company}, <span className="font-normal">{exp.location || ''}</span></span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-[13px] text-gray-800 mb-3">{exp.role}</div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mt-1 mb-4">
                    {client.name && <div className="text-[12px] font-bold text-gray-700 mb-1 transition-colors" style={atsMode ? {} : { color: themeColor }}>Project: {client.name}</div>}
                    <ul className="list-disc ml-5 text-[12px] text-gray-700 space-y-1.5">
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
        <section aria-label="Leadership">
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Campus and Community Leadership</h2>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[14px]">
                  <span>{proj.name}, <span className="font-normal italic">{proj.tech}</span></span>
                  <span>{proj.duration || ''}</span>
                </div>
                <div className="text-[12px] mt-2 text-gray-700">
                  <FormattedText text={proj.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section aria-label="Skills">
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: themeColor, borderColor: themeColor }}>Skills</h2>
          <div className="space-y-2 text-[13px] text-gray-800">
            {data.skills?.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <span className="font-bold shrink-0">{skill.category}:</span>
                <span><FormattedText text={skill.items} /></span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
);
