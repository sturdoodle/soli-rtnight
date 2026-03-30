import React from 'react';
import { SectionTitle, ExperienceItem, EducationItem, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const GoogleDocsStyle = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white p-12 max-w-[800px] mx-auto text-black min-h-[1122px] w-full ${atsMode ? 'font-sans' : 'font-serif'}`}>
    <header className="text-center mb-6">
      <h1 className="text-2xl font-bold uppercase mb-1">{data.fullName}</h1>
      <div className="text-[12px] flex flex-wrap justify-center gap-x-2">
        <span>{data.location}</span>
        <span>•</span>
        <span>{data.phone}</span>
        <span>•</span>
        <span>{data.email}</span>
        {data.github && (
          <>
            <span>•</span>
            <span>{data.github}</span>
          </>
        )}
      </div>
    </header>

    <div className="space-y-6">
      {data.summary && (
        <section aria-label="Summary">
          <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Summary</SectionTitle>
          <div className="text-[12px] leading-relaxed">
            <FormattedText text={data.summary} />
          </div>
        </section>
      )}

      <section aria-label="Experience">
        <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Experience</SectionTitle>
        <div className="space-y-4">
          {data.experience?.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-[12px]">
                <span>{exp.company}</span>
                <span>{exp.duration}</span>
              </div>
              <div className="flex justify-between italic text-[12px] mb-1">
                <span>{exp.role}</span>
                <span>{exp.location}</span>
              </div>
              {exp.clients?.map((client) => (
                <div key={client.id} className="mb-2">
                  <ul className="list-disc ml-4 text-[11px] space-y-1">
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

      {data.projects && data.projects.length > 0 && (
        <section aria-label="Projects">
          <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Projects</SectionTitle>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[12px]">
                  <span>{proj.name}</span>
                  <span className="font-normal italic">{proj.tech}</span>
                </div>
                <div className="text-[11px] leading-relaxed mt-1">
                  <FormattedText text={proj.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-label="Education">
        <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Education</SectionTitle>
        <div className="space-y-2">
          {data.education?.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start text-[12px]">
              <div>
                <span className="font-bold">{edu.institution}</span>
                <span className="italic"> — {edu.degree}</span>
              </div>
              <span>{edu.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Skills">
        <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Skills</SectionTitle>
        <div className="space-y-1">
          {data.skills?.map((skill) => (
            <div key={skill.id} className="text-[11px]">
              <span className="font-bold">{skill.category}:</span> {skill.items}
            </div>
          ))}
        </div>
      </section>

      {data.certifications && data.certifications.length > 0 && (
        <section aria-label="Certifications">
          <SectionTitle className="text-[13px] font-bold uppercase border-b border-black mb-2" themeColor="black" atsMode={atsMode}>Certifications</SectionTitle>
          <ul className="list-disc ml-4 text-[11px] space-y-1">
            {data.certifications.map((cert) => (
              <li key={cert.id}>{cert.name} {cert.expiryDate && `(${cert.expiryDate})`}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </main>
);
