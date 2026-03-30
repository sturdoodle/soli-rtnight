import React from 'react';
import { SectionTitle, ExperienceItem, EducationItem, FormattedText, ProjectItem, CertificationItem } from './SharedComponents';

export const HarvardStandard = ({ data, themeColor, atsMode }) => (
  <main className={`bg-white p-10 max-w-[800px] mx-auto text-black min-h-[1122px] w-full ${atsMode ? 'font-sans' : 'font-serif'}`}>
    <header className="text-center mb-8 border-b-2 border-black pb-4">
      <h1 className="text-3xl font-black mb-1">{data.fullName}</h1>
      <div className="text-[11px] leading-tight flex flex-wrap justify-center gap-x-3">
        <span>{data.email} | {data.phone}</span>
        <span>{data.location}</span>
        {data.github && <span> | {data.github}</span>}
      </div>
    </header>

    <div className="space-y-6">
      <section aria-label="Education">
        <SectionTitle className="text-[12px] font-bold uppercase border-b border-black mb-3" themeColor="black" atsMode={atsMode}>Education</SectionTitle>
        <div className="space-y-3">
          {data.education?.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between font-bold text-[11px]">
                <span>{edu.institution}, {edu.location}</span>
                <span>{edu.duration}</span>
              </div>
              <div className="text-[11px] italic">{edu.degree}</div>
              <ul className="list-disc ml-5 text-[11px] mt-1 space-y-0.5">
                {edu.courses && <li>Relevant Coursework: {edu.courses}</li>}
                {edu.achievements && <li>{edu.achievements}</li>}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Experience">
        <SectionTitle className="text-[12px] font-bold uppercase border-b border-black mb-3" themeColor="black" atsMode={atsMode}>Professional Experience</SectionTitle>
        <div className="space-y-4">
          {data.experience?.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-[11px]">
                <span>{exp.company}, {exp.location}</span>
                <span>{exp.duration}</span>
              </div>
              <div className="text-[11px] italic mb-1">{exp.role}</div>
              {exp.clients?.map((client) => (
                <div key={client.id} className="mb-2">
                  <ul className="list-disc ml-5 text-[11px] space-y-0.5">
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
          <SectionTitle className="text-[12px] font-bold uppercase border-b border-black mb-3" themeColor="black" atsMode={atsMode}>Projects & Leadership</SectionTitle>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[11px]">
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

      <section aria-label="Skills & Interests">
        <SectionTitle className="text-[12px] font-bold uppercase border-b border-black mb-3" themeColor="black" atsMode={atsMode}>Skills & Interests</SectionTitle>
        <div className="space-y-1.5 text-[11px]">
          {data.skills?.map((skill) => (
            <div key={skill.id}>
              <span className="font-bold">{skill.category}:</span> {skill.items}
            </div>
          ))}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <span className="font-bold">Certifications:</span> {data.certifications.map(c => c.name).join(', ')}
            </div>
          )}
        </div>
      </section>
    </div>
  </main>
);
