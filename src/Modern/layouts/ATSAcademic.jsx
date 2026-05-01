"use client";

import React from 'react';
import { FormattedText, EducationItem, CertificationItem } from './SharedComponents';

export const ATSAcademic = ({ data, themeColor, atsMode, sectionThemingEnabled }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? '' : ''}`}>
    {/* Centered Header */}
    {/* Centered Header */}
    <header className="text-center mb-8">
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
          <div className="space-y-4">
            {data.education?.map((edu, idx) => (
              <EducationItem key={edu.id || idx} edu={edu} atsMode={atsMode} path={`education.${idx}`} />
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section aria-label="Work Experience">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Work Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[13px]">
                  <span>{exp.company}, <span className="font-normal">{exp.location || ''}</span>, <span className="italic font-normal">{exp.role}</span></span>
                  <span>{exp.duration}</span>
                </div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mb-4">
                    {client.name && <div className="text-[12px] font-bold mb-1 opacity-70 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>Project: {client.name}</div>}
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
        <section aria-label="Leadership">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Leadership</h2>
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
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Skills & Interests</h2>
          <div className="space-y-1.5 text-[12px]">
            {data.skills?.map((skill) => (
              <div key={skill.id}>
                <span className="font-bold underline">{skill.category}:</span> <FormattedText text={skill.items} />
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-wider transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Certifications</h2>
          <div className="space-y-3">
            {data.certifications?.map((cert, idx) => (
              <CertificationItem key={cert.id || idx} cert={cert} atsMode={atsMode} path={`certifications.${idx}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
);

