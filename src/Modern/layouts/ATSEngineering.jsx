"use client";

import React from 'react';
import { FormattedText, EducationItem, CertificationItem } from './SharedComponents';

export const ATSEngineering = ({ data, themeColor, atsMode, sectionThemingEnabled }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full print:p-0 print:max-w-none ${atsMode ? '' : ''}`}>
    {/* Centered Header */}
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold uppercase mb-2 tracking-widest transition-colors" style={atsMode ? { color: '#111827' } : { color: sectionThemingEnabled ? themeColor : '#111827' }}>{data.fullName}</h1>
      <div className="flex flex-col items-center text-sm font-medium space-y-1">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span>{data.phone}</span>
          <span>|</span>
          <span className="text-black/70 underline decoration-black/10">{data.email}</span>
          {data.location && (
            <>
              <span>|</span>
              <span className="text-gray-600 font-normal">{data.location}</span>
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
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-3 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Professional Summary</h2>
          <div className="text-[13px] leading-relaxed text-gray-800">
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section aria-label="Education">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Education</h2>
          <div className="space-y-4">
            {data.education?.map((edu, idx) => (
              <EducationItem key={edu.id || idx} edu={edu} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}

      {/* Engineering Experience */}
      {data.experience && data.experience.length > 0 && (
        <section aria-label="Engineering Experience">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Engineering Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[13px]">
                  <span>{exp.company}, <span className="font-normal italic text-gray-700">{exp.location || ''}</span></span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-[12px] text-gray-800 font-medium mb-2">{exp.role}</div>
                {exp.clients?.map((client) => (
                  <div key={client.id} className="mt-1 mb-3 last:mb-0">
                    {client.name && <div className="text-[12px] font-bold text-gray-600 mb-1 transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black' }}>Activity/Lab: {client.name}</div>}
                    <ul className="list-disc ml-5 text-[12px] text-gray-700 space-y-1">
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

      {/* Relevant Projects */}
      {data.projects && data.projects.length > 0 && (
        <section aria-label="Relevant Projects">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Projects & Research</h2>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id} className="text-[13px]">
                <div className="flex justify-between font-bold">
                  <span>{proj.name}, <span className="font-normal italic text-gray-700">{proj.tech}</span></span>
                  <span>{proj.duration || ''}</span>
                </div>
                <div className="mt-1 text-[12px] text-gray-700 leading-relaxed">
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
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Skills</h2>
          <div className="space-y-1.5 text-[12px] text-gray-800">
            {data.skills?.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <span className="font-bold shrink-0">{skill.category}:</span>
                <span><FormattedText text={skill.items} /></span>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-widest transition-colors" style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'black', borderColor: sectionThemingEnabled ? themeColor : 'black' }}>Certifications & Rewards</h2>
          <div className="space-y-3">
            {data.certifications?.map((cert, idx) => (
              <CertificationItem key={cert.id || idx} cert={cert} themeColor={themeColor} atsMode={atsMode} />
            ))}
          </div>
        </section>
      )}
    </div>
  </main>
);

