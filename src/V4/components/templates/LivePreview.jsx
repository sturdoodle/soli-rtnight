import { ArrowLeft, Printer } from 'lucide-react';
import { processTextFormatting } from '../utils/dataHelper';
const LivePreview = ({ formData, back }) => {
    // Helper to flatten skills for display (based on the original data structure)
    const getSkillsList = () => {
        return formData.skills.map((skill) => (
            <li key={skill.id}>
                <span className="bold-category">{skill.category ? (<b> {skill.category}: </b>) : ''}</span>
                {skill.items}
            </li>
        ));
    };

    // Function to handle printing the component
    const handlePrint = () => {
        window.print();
    };

    // Style for the main container to ensure it takes full available width on screen
    const previewBoxStyle = {
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        padding: '15px',
        boxSizing: 'border-box'
    };

    // Style for the print button on screen
    const printButtonStyle = {
        padding: '10px 20px',
        margin: '10px 0',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'block',
        textAlign: 'center'
    };

    // UPDATED printStyles: Added print-specific styling for .project-card
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
            }

            /* 3. Adjust the position of the printable area to the top-left of the page */
            .printable-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                box-shadow: none !important;
                border: none !important;
                padding: 0;
                margin: 0; 
                padding: 0.5in; /* Standard print margin */
                color: #000;
            }

            /* 4. Hide elements that should not appear on the printout */
            .print-button, .preview-label {
                display: none !important;
            }
            
            /* ======================================================= */
            /* PAGE BREAK CONTROL */
            /* ======================================================= */
            
            .resume-section {
                margin-top: 15px;
            }
            
            /* Prevent the section header from being orphaned */
            .resume-section-head {
                border-bottom: 1px solid #333; 
                display: block; 
                orphans: 3; 
                widows: 3;  
                page-break-after: avoid; 
            }
            .tech-span { display: inline-block; font-size: 11px; background-color: #a32b2bff; border-radius: 4px; padding: 2px 5px; margin-right: 4px; margin-bottom: 4px; }

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
            
            /* For Education/Skills/Certifications: Keep the item (LI) together */
            .resume-list > li {
                page-break-inside: avoid;
            }

            /* Keep Project Cards together AND ADD VISIBLE BORDER FOR CONSISTENCY */
            .project-card {
                page-break-inside: avoid;
                border: 1px solid #ddd; /* Added to retain visual separation in print */
                box-shadow: none; /* Remove shadows if any were present, but keep the border */
                padding: 10px; /* Ensure padding is kept */
            }
            
            /* Add print styling for the grid layout if necessary */
            .projects-grid {
                 display: flex; /* Maintain side-by-side layout */
                 flex-wrap: wrap;
                 gap: 20px;
            }
        }
    `;
    
    return (
        <>
            {/* INLINE CSS BLOCK: Used for @media print styles which cannot be applied inline */}
            <style dangerouslySetInnerHTML={{ __html: printStyles }} />

            {/* Print Button */}
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

            {/* Main Preview Container */}
            <div className="preview-box printable-area" style={previewBoxStyle}>
                {/* <p className="preview-label">Live Preview</p> */}

                {/* Header Info */}
                <div>
                    <h1 className="resume-name">{formData.fullName || 'Your Name'}</h1>
                    <p className="resume-title">{formData.jobTitle}</p>
                    <p className="resume-contact">
                        {formData.location}
                        {formData.phone && ` | ${formData.phone}`}
                        {formData.email && ` | ${formData.email}`}
                        {formData.github && ` | ${formData.github}`}
                    </p>
                </div>
        
                {/* Summary Block */}
                {formData.summary && (
                    <div className="resume-section">
                        <h3 className="resume-section-head">Professional Summary</h3>
                        <p className="resume-text" dangerouslySetInnerHTML={{ __html: processTextFormatting(formData.summary) }}/>
                    </div>
                )}

                {/* Skills Block */}
                <div className="resume-section">
                    <h3 className="resume-section-head">Core Skills</h3>
                    <ul className="resume-list">
                        {getSkillsList()}
                    </ul>
                </div>

                {/* PROFESSIONAL EXPERIENCE PREVIEW */}
                {formData.experience.length > 0 && (
                    <div className="resume-section">
                        <h3 className="resume-section-head">Professional Experience</h3>

                        <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '0' }}>
                            {formData.experience.map((company) => (
                                <li key={company.id} style={{ marginBottom: '15px' }}>
                                    <div className="exp-company-head">{company.company} — {company.role} <span className="exp-role-duration exp-duration ">{company.duration}</span></div>

                                    {company.clients.map((client) => (
                                        <div key={client.id} style={{ marginBottom: '5px' }}>
                                            <p className="exp-client-name">Client: {client.name}</p>
                                            <ul className="exp-bullet-list">
                                                {client.bulletPoints.map((point, pointIndex) => (
                                                    point && <li key={pointIndex} dangerouslySetInnerHTML={{ __html: processTextFormatting(point) }}/>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ol>

                    </div>
                )}

                {/* EDUCATION PREVIEW */}
                {formData.education.length > 0 && (
                    <div className="resume-section">
                        <h3 className="resume-section-head">Education</h3>
                        <ul className="resume-list">
                            {formData.education.map((edu) => (
                                <li key={edu.id} style={{ marginBottom: '5px' }}>
                                    <b>{edu.degree}</b>  — {edu.institution}  ({edu.duration})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Projects Preview */}
                {formData.projects.length > 0 && (
                    <div className="resume-section">
                        <h3 className="resume-section-head">Personal Projects / Side Projects</h3>
                        <div className="projects-grid">
                            {formData.projects.map((proj) => (
                                <div key={proj.id} className="project-card">
                                    <h4><span className="icon">{proj.icon}</span> {proj.name}</h4>
                                    <div className="tech-badges">
                                        {proj.tech.split(',').map((t, i) => t.trim() && <span className="tech-span" key={i}>{t.trim()}</span>)}
                                    </div>
                                    <p className="resume-text" style={{ fontSize: '13px', marginTop: '5px' }} dangerouslySetInnerHTML={{ __html: processTextFormatting(proj.description) }}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications Preview */}
                {formData.certifications.length > 0 && (
                    <div className="resume-section">
                        <h3 className="resume-section-head">Certifications</h3>
                        <ul className="resume-list">
                            {formData.certifications.map((cert) => (
                                <li key={cert.id} className='font-medium text-gray-800'>{cert.name}
                                    {cert.expiryDate && (
                                        <span className="text-gray-600 ml-2"> (Expires: {cert.expiryDate})</span>
                                    )}
                                </li>

                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default LivePreview;