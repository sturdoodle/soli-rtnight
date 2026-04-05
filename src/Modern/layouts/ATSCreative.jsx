import React from 'react';
import { FormattedText } from './SharedComponents';

export const ATSCreative = ({ data, themeColor, atsMode, sectionThemingEnabled }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? 'font-sans' : 'font-serif'}`}>
    {/* Right-Aligned Header */}
    <header className="flex justify-between items-start mb-8 border-b-2 border-black pb-4 transition-colors" style={atsMode ? {} : { borderColor: sectionThemingEnabled ? themeColor : 'black' }}>
      <h1 className="text-4xl font-black mb-2 tracking-tight transition-colors" style={atsMode ? { color: '#111827' } : { color: sectionThemingEnabled ? themeColor : '#111827' }}>{data.fullName}</h1>
      <div className="flex flex-col items-end text-sm font-medium space-y-0.5 text-right">
        <span>{data.phone}</span>
        <span className="text-black/70 underline decoration-black/10">{data.email}</span>
        {data.location && <span className="text-gray-500">{data.location}</span>}
        <div className="flex items-center gap-2 mt-1 text-[11px] opacity-70">
          {data.portfolio && <span className="underline">{data.portfolio}</span>}
          {data.linkedin && (
            <>
              {data.portfolio && <span>|</span>}
              <span className="underline">{data.linkedin}</span>
            </>
          )}
          {data.github && (
            <>
              {(data.portfolio || data.linkedin) && <span>|</span>}
              <span className="underline">{data.github}</span>
            </>
          )}
        </div>
      </div>
    </header>

    <div className="space-y-6">
      {/* Summary Section */}
      {data.summary && (
        <section aria-label="Professional Summary">
          <h2 className="text-sm font-bold uppercase mb-3 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>Professional Summary</h2>
          <div className="text-[13px] leading-relaxed italic">
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Education</h2>
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
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Experience</h2>
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
                    {client.name && <div className="text-[12px] font-bold text-gray-700 mb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>Project: {client.name}</div>}
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
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Campus and Community Leadership</h2>
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
          <h2 className="text-sm font-black uppercase border-b-2 border-black mb-4 pb-1 tracking-[0.2em] transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Skills</h2>
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
      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications" className="flex flex-col items-end text-right">
          <h2 className="text-sm font-bold uppercase mb-3 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>Certifications</h2>
          <ul className="text-[12px] space-y-1">
            {data.certifications?.map((cert) => (
              <li key={cert.id}>{cert.name} {cert.expiryDate && <span className="opacity-60 italic">| {cert.expiryDate}</span>}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </main>
);
