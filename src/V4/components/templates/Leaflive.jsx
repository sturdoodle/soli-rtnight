import { ArrowLeft, Printer, Phone, Mail, MapPin, Github, CheckCircle, Award } from 'lucide-react';
import { getISTFormatDate, processTextFormatting } from '../utils/dataHelper';
import { BLOCK_ON_PRINT_CSS } from '../../../MainConstant';


const SectionHeader = ({ title }) => (
  <h2 className="text-lg font-bold text-gray-800 tracking-wider mt-4 mb-2 pb-1 border-b border-gray-600 resume-section-head"> {/* ADDED resume-section-head CLASS */}
    {title}
  </h2>
);

const DetailItem = ({ label, items, className = '' }) => (
  <div className={`flex flex-wrap ${className}`}>
    <span className="font-semibold text-gray-700 mr-2 min-w-[90px]">{label}:</span>
    <span className="text-gray-700 flex-1">
      {items}
    </span>
  </div>
);

// --- Header Component ---
const Header = ({ personal }) => {
  const IconDetail = ({ Icon, children }) => (
    <div className="flex items-center">
      <Icon size={12} className="mr-1 text-gray-500" />
      {children}
    </div>
  );

  return (
    <header className="pb-1 border-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 tracking-wider mb-1">{personal.fullName}</h1>
      <h2 className="text-lg font-medium text-gray-600 mb-2">{personal.jobTitle}</h2>

      <div className="flex flex-wrap text-sm text-gray-600 gap-x-4">
        {personal.phone && (
          <IconDetail Icon={Phone}>
            <span>{personal.phone}</span>
          </IconDetail>
        )}
        {personal.email && (
          <IconDetail Icon={Mail}>
            <span>{personal.email}</span>
          </IconDetail>
        )}
        {personal.github && (
          <IconDetail Icon={Github}>
            <span>{personal.github}</span>
          </IconDetail>
        )}
        {personal.location && (
          <IconDetail Icon={MapPin}>
            <span>{personal.location}</span>
          </IconDetail>
        )}
      </div>
    </header>
  );
};

// --- Skills Component ---
const TechnicalSkills = ({ skills }) => (
  <div className="resume-section"> {/* ADDED resume-section CLASS */}
    <SectionHeader title="Skills" />
    <div className="text-sm space-y-1">
      {skills.map((skill) => (
        <DetailItem
          key={skill.id}
          label={skill.category}
          items={skill.items}
          className="ml-1 resume-list-item" /* ADDED resume-list-item CLASS */
        />
      ))}
    </div>
  </div>
);

// --- Experience Component ---
const Experience = ({ experiences }) => (
  <div className="resume-section"> {/* ADDED resume-section CLASS */}
    <SectionHeader title="Experience" />
    {experiences.map((exp) => (
      <div key={exp.id} className="mb-4 experience-entry"> {/* ADDED experience-entry CLASS */}
        {/* Company, Role, and Duration */}
        <div className="flex justify-between items-start text-sm exp-company-head"> {/* ADDED exp-company-head CLASS */}
          <div className="flex flex-col">
            <div className="font-bold text-gray-800">{exp.company}</div>
            <div className="text-gray-700 italic">{exp.role}</div>
          </div>
          <div className="text-gray-600 font-medium">{exp.duration}</div>
        </div>

        {/* Handling nested 'clients' data structure */}
        {exp.clients && exp.clients.map(client => (
          <div key={client.id} className="mt-1">
            {/* Optional client/project name if available */}
            {client.name && (
              <div className="text-sm font-semibold text-gray-700 underline mb-1 exp-client-name"> {/* ADDED exp-client-name CLASS */}
                {client.name}
              </div>
            )}

            {/* Bullet Points with dynamic bolding */}
            <ul className="list-disc ml-5 mt-0.5 text-sm text-gray-700 space-y-0.5 exp-bullet-list"> {/* ADDED exp-bullet-list CLASS */}
              {client.bulletPoints.map((detail, dIndex) => (
                <li key={dIndex} className="pl-1 leading-snug">
                  <span
                    dangerouslySetInnerHTML={{ __html: processTextFormatting(detail) }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// --- Education Component ---
const Education = ({ education }) => (
  <div className="resume-section"> {/* ADDED resume-section CLASS */}
    <SectionHeader title="Education" />
    {education.map((edu) => (
      <div key={edu.id} className="flex justify-between items-start text-sm mt-1 resume-list-item"> {/* ADDED resume-list-item CLASS */}
        <div className="flex flex-col">
          <div className="font-bold text-gray-800">{edu.degree}</div>
          <div className="text-gray-700">{edu.institution}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-600 font-medium">{edu.duration}</div>
        </div>
      </div>
    ))}
  </div>
);

// --- Projects Component ---
const Projects = ({ projects }) => (
  <div className="resume-section"> {/* ADDED resume-section CLASS */}
    <SectionHeader title="Projects" />
    <div className="space-y-3">
      {projects.map((project) => (
        <div key={project.id} className="text-sm resume-list-item"> {/* ADDED resume-list-item CLASS */}
          <div className="flex items-center text-gray-800 font-semibold">
            <CheckCircle size={14} className="mr-2 text-blue-600" />
            {project.name}
          </div>
          <div className="ml-5 mt-0.5">
            <div className="text-xs font-medium text-gray-600 italic">Tech Stack: {project.tech}</div>
            <div className="text-sm text-gray-700">
              <span
                dangerouslySetInnerHTML={{ __html: processTextFormatting(project.description) }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Certifications Component ---
const Certifications = ({ certifications }) => (
  <div className="resume-section"> {/* ADDED resume-section CLASS */}
    <SectionHeader title="Certifications" />
    <ul className="list-disc ml-5 mt-1 text-sm text-gray-700 space-y-1">
      {certifications.map((cert) => (

        <li key={cert.id} className="pl-1 leading-snug flex items-start resume-list-item"> {/* ADDED resume-list-item CLASS */}
          <Award size={14} className="flex shrink-0 mr-2 mt-0.5 text-yellow-600" />
          <div>
            <span className="font-medium text-gray-800">{cert.name}</span>
            {cert.expiryDate && (
              <span className="text-gray-600 ml-2 text-sm"> ( Expires: {getISTFormatDate(cert.expiryDate)} ) </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Template Component (Wrapped for Printing) ---
const Leaflive = ({ data }) => {
  if (!data) return <div>Loading resume data...</div>;

  const { summary, skills, experience, education, projects, certifications } = data;

  return (
    <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto font-serif text-gray-800 printable-area"> {/* ADDED printable-area CLASS */}

      <Header personal={data} />

      {/* Summary */}
      {summary && (
        <div className="mt-4 resume-section"> {/* ADDED resume-section CLASS */}
          <SectionHeader title="Summary" />
          <p className="text-sm text-gray-700 leading-relaxed indent-1"
            dangerouslySetInnerHTML={{ __html: processTextFormatting(summary) }} />

        </div>
      )}

      {/* Skills */}
      {skills && <TechnicalSkills skills={skills} />}

      {/* Experience */}
      {experience && <Experience experiences={experience} />}

      {/* Projects */}
      {projects && <Projects projects={projects} />}

      {/* Certifications */}
      {certifications && <Certifications certifications={certifications} />}

      {/* Education */}
      {education && <Education education={education} />}
    </div>
  );
};


// --- New Wrapper Component for Print Functionality ---

const PrintableLeaflive = ({ data, back }) => {
  // Function to handle printing the component
  const handlePrint = () => {
    // 1. Store the original title
    const originalTitle = document.title;
    document.title = "Resume-Data.pdf";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 50);
  };

  // Style for the print button on screen
  const printButtonStyle = {
    padding: '10px 20px',
    margin: '20px auto 10px auto', // Center the button below the resume
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'block',
    textAlign: 'center',
    maxWidth: '200px', // Restrict button width
  };

  // Print-specific CSS using a template literal for @media print rules
  const printStyles = `
        /* Styles that only apply when printing */
        @media print {
            /* 1. Hide everything on the page by default */
            body * {
                visibility: hidden;
            }

            /* 2. Make the printable content visible and position it */
            .printable-area, .printable-area * {
                visibility: visible;
                box-shadow: none !important; /* Remove shadows for clean print */
            }

            /* 3. Adjust the position of the printable area to the top-left of the page */
            .printable-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                /* Clear screen-specific padding/margins/shadows */
                padding: 0;
                margin: 0; 
                /* Add standard print margins and force max width for centering */
                padding: 0.3in; 
                max-width: 100% !important; 
                color: #000;
            }

            /* 4. Hide elements that should not appear on the printout */
            .print-button {
                display: none !important;
            }
                ${BLOCK_ON_PRINT_CSS}
            
            /* ======================================================= */
            /* PAGE BREAK CONTROL */
            /* ======================================================= */
            
            /* Allow long sections (Experience) to break naturally */
            .resume-section {
                margin-top: 15px;
            }
            
            /* Prevent the section header from being orphaned */
            .resume-section-head {
                display: block; 
                orphans: 3; 
                widows: 3;  
                page-break-after: avoid; 
            }

            /* ---------------------------------------------------- */
            /* PROFESSIONAL EXPERIENCE BREAK RULES (Allow Breaking) */
            /* ---------------------------------------------------- */
            
            /* Ensure the Company/Role header stays with the content below it */
            .exp-company-head, .exp-client-name {
                page-break-after: avoid;
            }
            
            /* Ensure single bullet points within experience do not break */
            .exp-bullet-list > li {
                page-break-inside: avoid;
            }
            
            /* ---------------------------------------------------- */
            /* OTHER SECTIONS BREAK RULES (Prevent Breaking) */
            /* ---------------------------------------------------- */
            
            /* For Education/Skills/Certifications/Projects: Keep the item together */
            .resume-list-item {
                page-break-inside: avoid;
            }
        }
    `;

  return (
    <>
      {/* INLINE CSS BLOCK: Used for @media print styles */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="w-full px-4 h-16 flex items-center justify-between">
        <button
          onClick={back}
          className="pl-2 pr-2 py-2 hover:bg-gray-300 rounded-xl transition-colors flex hover:border gap-2"
        // className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
        >
          <ArrowLeft className="text-gray-600 " /> Back to Template
        </button>
        <button
          onClick={handlePrint}
          className="pl-2 pr-2 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-xl transition-colors flex  gap-2"
        // style={printButtonStyle}
        >

          <Printer className="text-white sm" />  Print Resume
        </button>

      </div>

      {/* Render the core Leaflive template */}
      <Leaflive data={data} />
    </>
  );
}

// Export the printable wrapper component as the main export
export default PrintableLeaflive;