"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FormattedText, EditableText } from './SharedComponents';

// --- Local Static Components for LeafDesign2 (No Live Interaction) ---

const LeafSectionTitle = ({ children }) => (
  <div className="mb-2 mt-4 first:mt-0 flex flex-col print:break-after-avoid">
    <div className="flex justify-between items-end">
      <h2 className="text-[14px] font-bold uppercase tracking-wide">
        {children}
      </h2>
    </div>
    <div className="w-full h-[1.5px] bg-black mt-0.5" />
  </div>
);

const LeafExperienceItem = ({ exp }) => (
  <div className="mb-3 last:mb-0 print:break-inside-avoid">
    <div className="flex justify-between items-baseline">
      <div className="flex gap-1 flex-wrap">
        <span className="font-bold text-[13px]">{exp.company}</span>
        {exp.role && (
          <span className="text-[13px]">
            , <span className="italic">{exp.role}</span>
          </span>
        )}
      </div>
      <div className="text-[12px] font-normal text-right whitespace-nowrap ml-4">
        {exp.duration}
        {exp.location && <> | {exp.location}</>}
      </div>
    </div>
    <ul className="list-disc ml-5 mt-0.5 space-y-0.5">
      {exp.clients && exp.clients[0]?.bulletPoints.map((point, idx) => (
        <li key={idx} className="text-[12px] leading-[1.3] pl-1 text-justify">
          <FormattedText text={point} />
        </li>
      ))}
    </ul>
  </div>
);

const LeafSkillCategory = ({ skill }) => (
  <div className="text-[13px] leading-[1.4] flex gap-1 print:break-inside-avoid">
    <span className="font-bold whitespace-nowrap">{skill.category}:</span>
    <span className="font-normal">
      — <FormattedText text={skill.items} />
    </span>
  </div>
);

const LeafEducationItem = ({ edu }) => (
  <div className="mb-3 last:mb-0 print:break-inside-avoid">
    <div className="flex justify-between items-baseline">
      <span className="font-bold text-[13px]">{edu.degree}</span>
      <div className="text-[12px] font-normal text-right whitespace-nowrap ml-4">
        {edu.duration}
        {edu.location && <> | {edu.location}</>}
      </div>
    </div>
    <div className="text-[12px] mt-0.5">{edu.institution}</div>
    {edu.gpaValue && (
      <div className="text-[12px] mt-0.5">
        • <span className="font-bold">{edu.gpaLabel || 'Marks'} :</span> {edu.gpaValue}
      </div>
    )}
  </div>
);

/**
 * LeafDesign2: A pixel-perfect recreation of the classic academic/professional
 * single-column layout as seen in the provided PDF reference.
 * Note: Live interaction is disabled for this template as requested.
 */
export const LeafDesign2 = ({ data }) => {
  const fontStack = "'Times New Roman', Times, serif";

  return (
    <main 
      className="bg-white p-[0.75in] pb-[1in] w-full min-h-[11in] text-black flex flex-col"
      style={{ fontFamily: fontStack }}
    >
      <div className="flex-grow">
        {/* Header Section */}
        <header className="text-center mb-5 print:break-after-avoid">
          <h1 className="text-[32px] font-bold mb-1 tracking-tight">
            {data.fullName}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-2 text-[13px] font-normal">
            {data.email && <span>{data.email}</span>}
            {data.phone && (
              <>
                <span className="mx-0.5">|</span>
                <span>{data.phone}</span>
              </>
            )}
            {data.linkedin && (
              <>
                <span className="mx-0.5">|</span>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Linkedin <ExternalLink size={10} className="opacity-70" />
                </a>
              </>
            )}
            {data.leetcode && (
              <>
                <span className="mx-0.5">|</span>
                <a href={data.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  LeetCode <ExternalLink size={10} className="opacity-70" />
                </a>
              </>
            )}
            {data.github && (
              <>
                <span className="mx-0.5">|</span>
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Github <ExternalLink size={10} className="opacity-70" />
                </a>
              </>
            )}
            {data.portfolio && (
              <>
                <span className="mx-0.5">|</span>
                <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Portfolio <ExternalLink size={10} className="opacity-70" />
                </a>
              </>
            )}
          </div>
        </header>

        <div className="space-y-3">
          {/* Objective */}
          {data.summary && (
            <section className="print:break-inside-avoid">
              <LeafSectionTitle>OBJECTIVE</LeafSectionTitle>
              <div className="text-[13px] leading-[1.4] text-justify">
                <FormattedText text={data.summary} />
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="print:break-inside-avoid">
              <LeafSectionTitle>SKILLS</LeafSectionTitle>
              <div className="space-y-0.5">
                {data.skills.map((skill, idx) => (
                  <LeafSkillCategory key={skill.id || idx} skill={skill} />
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <LeafSectionTitle>WORK EXPERIENCE</LeafSectionTitle>
              <div className="space-y-3">
                {data.experience.map((exp, idx) => (
                  <LeafExperienceItem key={exp.id || idx} exp={exp} />
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <LeafSectionTitle>PROJECTS</LeafSectionTitle>
              <div className="space-y-3">
                {data.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="mb-2 last:mb-0 print:break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-bold text-[13px] flex items-center gap-1.5">
                        {proj.name}
                        {proj.link && <ExternalLink size={11} className="opacity-70" />}
                      </a>
                    </div>
                    <ul className="list-disc ml-5 space-y-0.5">
                      <li className="text-[12px] leading-[1.3] pl-1 text-justify">
                        <FormattedText text={proj.description} />
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {data.certifications && data.certifications.length > 0 && (
            <section className="print:break-inside-avoid">
              <LeafSectionTitle>CERTIFICATES</LeafSectionTitle>
              <div className="space-y-2">
                {data.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="text-[13px] leading-tight">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="font-bold flex items-center gap-1.5 w-fit">
                      {cert.name}
                      {cert.link && <ExternalLink size={11} className="opacity-70" />}
                    </a>
                    {cert.issuer && (
                      <div className="text-[12px] mt-0.5">{cert.issuer}</div>
                    )}
                    {cert.credentialId && (
                      <div className="text-[11px] mt-0.5 opacity-80 italic">Credential ID: {cert.credentialId}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <LeafSectionTitle>EDUCATION</LeafSectionTitle>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <LeafEducationItem key={edu.id || idx} edu={edu} />
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.achievements && data.achievements.length > 0 && (
            <section className="print:break-inside-avoid">
              <LeafSectionTitle>ACHIEVEMENTS</LeafSectionTitle>
              <ul className="list-disc ml-5 space-y-1">
                {data.achievements.map((ach, idx) => (
                  <li key={idx} className="text-[12px] leading-[1.3] pl-1">
                    <FormattedText text={ach} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Footer for PDF - Not sticky, part of flow at the bottom */}
      <footer 
        className="mt-8 pt-4 border-t border-gray-100 flex justify-between text-[11px] text-gray-500 print:mt-12"
      >
        <span>{data.fullName}</span>
        <span>{data.email}</span>
      </footer>
    </main>
  );
};

