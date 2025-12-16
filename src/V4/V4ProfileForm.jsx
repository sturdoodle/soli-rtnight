import { useState } from 'react';
import PersonalDetailsSection from './components/PersonalDetailsSection.jsx';
import SummarySection from './components/SummarySection.jsx';
import EducationSection from './components/EducationSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import CertificationsSection from './components/CertificationsSection.jsx';
import Header from './components/shared/Header.jsx';
import ImportExport from './components/shared/ImportExport.jsx';
import TemplateCollectionList from './components/TemplateCollectionList.jsx';
import Footer from '../Footer.jsx';
import { SAMPLE_JSON_DATA } from './components/utils/constat.js';

function V4ProfileForm() {
    const [formData, setFormData] = useState(SAMPLE_JSON_DATA);

    // State for controlling the accordion and edit mode
    const [openSection, setOpenSection] = useState('personal');
    const [editMode, setEditMode] = useState({ type: null, index: null, clientIndex: null });


    // Global Simple Change Handler (for Header/Summary)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
        setEditMode({ type: null, index: null, clientIndex: null });
    };

    const enterEditMode = (type, index, clientIndex = null) => {
        setEditMode({ type, index, clientIndex });
    };

    const exitEditMode = () => {
        setEditMode({ type: null, index: null, clientIndex: null });
    };



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                {/* Main Content Area - Responsive Container */}
                {/* First Section */}
                <div className="w-full md:w-1/2 p-2 bg-white border-b md:border-r border-gray-200 shadow-lg">
                    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 pb-32">
                        <PersonalDetailsSection
                            formData={formData}
                            handleChange={handleChange}
                            isOpen={openSection === 'personal'}
                            toggle={() => toggleSection('personal')}
                        />

                        <SummarySection
                            summary={formData.summary}
                            handleChange={handleChange}
                            isOpen={openSection === 'summary'}
                            toggle={() => toggleSection('summary')}
                            setOpenSection={setOpenSection}
                        />

                        <EducationSection
                            formData={formData}
                            setFormData={setFormData}
                            editMode={editMode}
                            enterEditMode={enterEditMode}
                            exitEditMode={exitEditMode}
                            isOpen={openSection === 'education' || editMode.type === 'education'}
                            toggle={() => toggleSection('education')}
                        />

                        <ExperienceSection
                            formData={formData}
                            setFormData={setFormData}
                            editMode={editMode}
                            enterEditMode={enterEditMode}
                            exitEditMode={exitEditMode}
                            isOpen={openSection === 'work' || editMode.type === 'experience'}
                            toggle={() => toggleSection('work')}
                        />

                        <SkillsSection
                            skills={formData.skills}
                            setFormData={setFormData}
                            isOpen={openSection === 'skills'}
                            toggle={() => toggleSection('skills')}
                        />

                        <ProjectsSection
                            projects={formData.projects}
                            setFormData={setFormData}
                            editMode={editMode}
                            enterEditMode={enterEditMode}
                            exitEditMode={exitEditMode}
                            isOpen={openSection === 'projects' || editMode.type === 'project'}
                            toggle={() => toggleSection('projects')}
                        />

                        <CertificationsSection
                            certifications={formData.certifications}
                            setFormData={setFormData}
                            editMode={editMode}
                            enterEditMode={enterEditMode}
                            exitEditMode={exitEditMode}
                            isOpen={openSection === 'certifications' || editMode.type === 'certification'}
                            toggle={() => toggleSection('certifications')}
                        />

                        <ImportExport formData={formData} setFormData={setFormData} />
                    </main>
                </div>

                {/* Second Section */}
                <div className="w-full md:w-1/2 p-6 bg-gray-50 shadow-inner">
                    <TemplateCollectionList formData={formData}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default V4ProfileForm