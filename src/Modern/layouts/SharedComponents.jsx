import React from 'react';
import { Mail, Phone, MapPin, Github, Globe, ChevronRight, ExternalLink, Award, ShieldCheck, FolderCode, User, FileText, Briefcase, GraduationCap, Code } from 'lucide-react';
import { formatMarkdown } from '../utils/formatters';
import { useResume } from '../context/ResumeContext';

/**
 * safeMarkdownParser: Parses markdown-like strings and returns React elements.
 * Avoids dangerouslySetInnerHTML for security and better performance.
 */
const safeMarkdownParser = (text) => {
  if (!text || typeof text !== 'string') return text;

  // Split by bold (**), italics (*), underline (__), and links ([text](url))
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|__.*?__|\[.*?\]\(.*?\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic opacity-90">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('__') && part.endsWith('__')) {
      return <u key={index} className="underline decoration-1 underline-offset-2">{part.slice(2, -2)}</u>;
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [_, label, url] = match;
        const href = url.match(/^(https?:\/\/|mailto:|tel:)/i) ? url : `https://${url}`;
        return (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="underline opacity-80 hover:opacity-100 transition-opacity">
            {label}
          </a>
        );
      }
    }
    return part;
  });
};

/**
 * EditableText: A simplified wrapper that renders formatted text.
 * Live editing has been removed in favor of a stable preview environment.
 */
export const EditableText = ({ text, className = "", style = {} }) => {
  return (
    <span className={className} style={style}>
      {safeMarkdownParser(text)}
    </span>
  );
};

export const FormattedText = ({ text, className = "", style = {}, onUpdate, path }) => {
  if (!text && !onUpdate && !path) return null;
  return <EditableText text={text} onUpdate={onUpdate} path={path} className={className} style={style} isMultiline={true} />;
};

export const ContactItem = ({ icon: Icon, text, href, atsMode }) => {
  if (!text) return null;
  const content = (
    <div className="flex items-center gap-2">
      {!atsMode && Icon && <Icon size={14} className="opacity-70 print:opacity-100" />}
      <EditableText text={text} />
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={atsMode ? "underline" : "hover:opacity-80 transition-opacity print:opacity-100 flex items-center gap-1"}>
      {content}
      {!atsMode && <ExternalLink size={10} className="opacity-50" />}
    </a>
  ) : content;
};

export const SectionTitle = ({ children, className = "", style = {}, atsMode, themeColor }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <h2 
      className={`relative text-sm font-bold mb-4 print:mb-2 transition-colors flex items-center justify-between ${atsMode ? 'text-black border-b-2 border-black pb-1' : 'uppercase tracking-[0.2em] ' + className}`}
      style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit', ...style }}
    >
      <EditableText text={children} />
    </h2>
  );
};

export const ExperienceItem = ({ exp, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="relative">
      <div className={`flex justify-between items-baseline mb-1 print:break-after-avoid print:[page-break-after:avoid] ${atsMode ? 'border-b border-gray-100' : ''}`}>
        <h3 className="text-lg font-bold transition-colors" style={atsMode ? { color: 'black' } : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
          <EditableText text={exp.role} />
        </h3>
        <span className={`text-sm font-medium ${atsMode ? 'text-black' : 'opacity-60 italic print:opacity-100'}`}>
          <EditableText text={exp.duration} />
        </span>
      </div>
      <div className="flex justify-between items-center mb-3 print:mb-1">
        <p className={`font-semibold print:break-after-avoid print:[page-break-after:avoid] ${atsMode ? 'text-black uppercase text-xs' : 'opacity-80 print:opacity-100'}`}>
          <EditableText text={exp.company} />
        </p>
      </div>
      
      {exp.clients && exp.clients.map((client, cidx) => (
        <div key={client.id || cidx} className="mb-4 print:mb-2 last:mb-0">
          {client.name && (
            <div className="flex justify-between items-center mb-2 print:mb-1">
              <p className={`text-sm font-bold print:break-after-avoid print:[page-break-after:avoid] flex items-center gap-2 transition-colors ${atsMode ? 'text-black' : 'print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
                {!atsMode && <ChevronRight size={14} className="shrink-0" />}
                <EditableText text={client.name} />
              </p>
            </div>
          )}
          <ul className="list-disc ml-5 space-y-1">
            {client.bulletPoints?.map((point, idx) => (
              <li key={idx} className={`text-sm leading-relaxed ${atsMode ? 'text-black' : 'opacity-80 print:opacity-100'}`}>
                <FormattedText text={point} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const EducationItem = ({ edu, atsMode }) => {
  return (
    <div className="relative">
      {/* Line 1: Institution & Duration (Right) */}
      <div className={`flex justify-between items-baseline ${atsMode ? 'mb-0.5' : ''}`}>
        <p className={`font-bold ${atsMode ? 'text-sm text-black' : 'text-sm opacity-90'}`}>
          <EditableText text={edu.institution} />
        </p>
        <p className={`text-xs ${atsMode ? 'text-black font-bold' : 'opacity-50 italic'}`}>
          <EditableText text={edu.duration} />
        </p>
      </div>

      {/* Line 2: Degree & GPA (Right) */}
      <div className="flex justify-between items-baseline">
        <h3 className={`text-sm ${atsMode ? 'text-black' : 'font-bold opacity-90'}`}>
          <EditableText text={edu.degree} />
        </h3>
        {edu.gpaValue && (
          <p className={`text-xs ${atsMode ? 'text-black font-medium' : 'opacity-70'}`}>
            <span className="font-bold"><EditableText text={edu.gpaLabel || 'Marks'} />:</span> <EditableText text={edu.gpaValue} />
          </p>
        )}
      </div>
      
      {edu.description && (
        <div className={`mt-1 text-[12px] ${atsMode ? 'text-black' : 'opacity-70'}`}>
          <FormattedText text={edu.description} />
        </div>
      )}
    </div>
  );
};

export const SkillCategory = ({ skill, themeColor, atsMode, vertical = false }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className={`mb-3 print:mb-1 last:mb-0 relative flex ${atsMode ? 'flex-row items-baseline gap-2' : (vertical ? 'flex-col gap-1' : 'flex-col md:flex-row md:items-baseline md:gap-3')}`}>
      <h3 className={`text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors ${atsMode ? 'text-black' : 'opacity-60 print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
        <EditableText text={skill.category} />:
      </h3>
      <p className={`text-sm leading-relaxed flex-1 ${atsMode ? 'text-black font-medium' : 'opacity-80 print:opacity-100'}`}>
        <FormattedText text={skill.items} />
      </p>
    </div>
  );
};

export const ProjectItem = ({ proj, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="mb-6 print:mb-3 last:mb-0 relative">
      <div className="flex justify-between items-center mb-1 print:mb-0 print:break-after-avoid print:[page-break-after:avoid]">
        <h3 className={`font-bold flex items-center gap-2 transition-colors ${atsMode ? 'text-black' : ''}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
          {!atsMode && (
            proj.icon ? (
              <span className="text-lg">{proj.icon}</span>
            ) : (
              <Briefcase size={16} className="opacity-70" style={{ color: sectionThemingEnabled ? themeColor : 'inherit' }} />
            )
          )}
          <EditableText text={proj.name} />
        </h3>
        {proj.link && (
          <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-xs ${atsMode ? 'underline' : 'hover:opacity-80 flex items-center gap-1.5 transition-all'}`}>
            {atsMode ? proj.link : <><EditableText text="Live Demo" /> <ExternalLink size={12} /></>}
          </a>
        )}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider mb-2 print:break-after-avoid print:[page-break-after:avoid] transition-colors" style={atsMode ? { color: 'black' } : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
        <EditableText text={proj.tech} />
      </p>
      <p className={`text-sm leading-relaxed ${atsMode ? 'text-black' : 'opacity-80'}`}>
        <FormattedText text={proj.description} />
      </p>
    </div>
  );
};

export const CertificationItem = ({ cert, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="flex items-start gap-3 mb-4 print:mb-2 last:mb-0 relative">
      {!atsMode && (
        <div className="mt-1 opacity-50 transition-colors shrink-0" style={{ color: sectionThemingEnabled ? themeColor : 'inherit' }}>
          <ShieldCheck size={16} className="print:opacity-100" />
        </div>
      )}
      <div className="flex-1">
        <div className={`flex ${atsMode ? 'justify-between items-baseline gap-4' : 'flex-col'}`}>
          <h3 className={`text-sm font-bold ${atsMode ? 'text-black' : 'opacity-90 print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
            <EditableText text={cert.name} />
          </h3>
          <p className={`${atsMode ? 'text-[11px] text-black font-medium' : 'text-[10px] opacity-50 italic print:opacity-100'}`}>
            <EditableText text={cert.expiryDate || 'Never Expires'} />
          </p>
        </div>
        {cert.credentialId && (
          <p className="text-[10px] mt-1 opacity-60">
            <span className="font-bold">Credential ID:</span> <EditableText text={cert.credentialId} />
          </p>
        )}
      </div>
    </div>
  );
};
