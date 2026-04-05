import { Mail, Phone, MapPin, Github, Globe, ChevronRight, ExternalLink, Award, ShieldCheck, FolderCode, User, FileText, Briefcase, GraduationCap, Code } from 'lucide-react';
import { formatMarkdown } from '../utils/formatters';
import { useResume } from '../context/ResumeContext';

export const FormattedText = ({ text, className = "", style = {} }) => {
  if (!text) return null;
  return (
    <span 
      className={className} 
      style={style}
      dangerouslySetInnerHTML={{ __html: formatMarkdown(text) }} 
    />
  );
};

export const ContactItem = ({ icon: Icon, text, href, atsMode }) => {
  if (!text) return null;
  const content = (
    <div className="flex items-center gap-2">
      {!atsMode && Icon && <Icon size={14} className="opacity-70 print:opacity-100" />}
      <span>{text}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={atsMode ? "text-blue-700 underline" : "hover:opacity-80 transition-opacity print:opacity-100"}>
      {content}
    </a>
  ) : content;
};

export const SectionTitle = ({ children, className = "", style = {}, atsMode, themeColor }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <h2 
      className={`text-sm font-bold mb-4 print:mb-2 transition-colors ${atsMode ? 'text-black border-b-2 border-black pb-1' : 'uppercase tracking-[0.2em] ' + className}`}
      style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit', ...style }}
    >
      {children}
    </h2>
  );
};

export const ExperienceItem = ({ exp, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="group">
      <div className={`flex justify-between items-baseline mb-1 print:break-after-avoid print:[page-break-after:avoid] ${atsMode ? 'border-b border-gray-100' : ''}`}>
        <h3 className="text-lg font-bold transition-colors" style={atsMode ? { color: 'black' } : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>{exp.role}</h3>
        <span className={`text-sm font-medium ${atsMode ? 'text-black' : 'opacity-60 italic print:opacity-100'}`}>{exp.duration}</span>
      </div>
    <p className={`font-semibold mb-3 print:mb-1 print:break-after-avoid print:[page-break-after:avoid] ${atsMode ? 'text-black uppercase text-xs' : 'opacity-80 print:opacity-100'}`}>{exp.company}</p>
    
    {exp.clients && exp.clients.map(client => (
      <div key={client.id} className="mb-4 print:mb-2 last:mb-0">
        {client.name && (
          <p className={`text-sm font-bold mb-2 print:mb-1 print:break-after-avoid print:[page-break-after:avoid] flex items-center gap-2 transition-colors ${atsMode ? 'text-black' : 'print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
            {!atsMode && <ChevronRight size={14} />}
            {client.name}
          </p>
        )}
        <ul className={`list-disc list-inside space-y-1.5 print:space-y-0.5 text-sm ml-4 ${atsMode ? 'text-black' : 'opacity-90 print:opacity-100'}`}>
          {client.bulletPoints.map((point, idx) => (
            <li key={idx} className="leading-relaxed">
              <FormattedText text={point} />
            </li>
          ))}
        </ul>
      </div>
    ))}
    </div>
  );
};

export const EducationItem = ({ edu, atsMode }) => (
  <div>
    <h3 className={`font-bold ${atsMode ? 'text-black' : 'opacity-90 print:opacity-100'}`}>{edu.degree}</h3>
    <p className={`text-sm ${atsMode ? 'text-black' : 'opacity-70 print:opacity-100'}`}>{edu.institution}</p>
    <p className={`text-xs ${atsMode ? 'text-black' : 'opacity-50 italic print:opacity-100'}`}>{edu.duration}</p>
  </div>
);

export const SkillCategory = ({ skill, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="mb-4 print:mb-2 last:mb-0">
      <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 print:mb-0.5 print:break-after-avoid print:[page-break-after:avoid] transition-colors ${atsMode ? 'text-black' : 'opacity-50 print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
        {skill.category}
      </h3>
      <p className={`text-sm leading-relaxed ${atsMode ? 'text-black font-medium' : 'opacity-80 print:opacity-100'}`}>
        <FormattedText text={skill.items} />
      </p>
    </div>
  );
};

export const ProjectItem = ({ proj, themeColor, atsMode }) => {
  const { resumeData } = useResume();
  const sectionThemingEnabled = resumeData?.sectionThemingEnabled ?? true;

  return (
    <div className="mb-6 print:mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1 print:mb-0 print:break-after-avoid print:[page-break-after:avoid]">
        <h3 className={`font-bold flex items-center gap-2 transition-colors ${atsMode ? 'text-black' : ''}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>
          {!atsMode && <span className="text-lg">{proj.icon || '🚀'}</span>}
          {proj.name}
        </h3>
        {proj.link && (
          <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-xs ${atsMode ? 'text-blue-700 underline' : 'opacity-50 hover:opacity-100 flex items-center gap-1'}`}>
            {!atsMode && <ExternalLink size={12} />} {atsMode ? proj.link : 'Live Demo'}
          </a>
        )}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider mb-2 print:break-after-avoid print:[page-break-after:avoid] transition-colors" style={atsMode ? { color: 'black' } : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>{proj.tech}</p>
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
    <div className="flex items-start gap-3 mb-4 print:mb-2 last:mb-0">
      {!atsMode && (
        <div className="mt-1 opacity-50 transition-colors" style={{ color: sectionThemingEnabled ? themeColor : 'inherit' }}>
          <ShieldCheck size={16} className="print:opacity-100" />
        </div>
      )}
      <div>
        <h3 className={`text-sm font-bold ${atsMode ? 'text-black' : 'opacity-90 print:opacity-100'}`} style={atsMode ? {} : { color: sectionThemingEnabled ? themeColor : 'inherit' }}>{cert.name}</h3>
        <p className={`text-[10px] ${atsMode ? 'text-black' : 'opacity-50 italic print:opacity-100'}`}>{cert.expiryDate || 'Never Expires'}</p>
      </div>
    </div>
  );
};
