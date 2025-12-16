import React from 'react';
import SectionHeader from './shared/SectionHeader';
import SummaryCard from './shared/SummaryCard';
import InputField, { TextAreaField } from './shared/InputField';
import { Plus, Trash2, Save } from 'lucide-react';
import BoldTip from './shared/BoldTip';

const ExperienceSection = ({
    formData,
    setFormData,
    editMode,
    enterEditMode,
    exitEditMode,
    isOpen,
    toggle
}) => {

    // Handlers specific to Experience
    const handleCompanyChange = (companyIndex, name, value) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[companyIndex][name] = value;
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
    };

    // Add a new client/project block within a company
    const addClient = (companyIndex) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[companyIndex].clients.push({ id: Date.now(), name: 'New Client/Project', bulletPoints: [''] });
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
    };

    // Remove a client/project block within a company
    const removeClient = (companyIndex, clientIndex) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[companyIndex].clients = updatedExperience[companyIndex].clients.filter((_, i) => i !== clientIndex);
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
    };

    // Handle client name change
    const handleClientNameChange = (companyIndex, clientIndex, value) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[companyIndex].clients[clientIndex].name = value;
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
    };


    const handleClientBulletPointsChange = (companyIndex, clientIndex, value) => {
        const updatedExperience = [...formData.experience];
        const pointsArray = value.split('\n').filter(p => p.trim() !== '');
        updatedExperience[companyIndex].clients[clientIndex].bulletPoints = pointsArray;
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
    };

    const addCompany = () => {
        const newEntry = {
            id: Date.now(),
            company: '',
            role: '',
            duration: '',
            clients: [{ id: Date.now() + 1, name: 'Client/Project Name', bulletPoints: [''] }]
        };
        setFormData(prev => ({ ...prev, experience: [...prev.experience, newEntry] }));
        enterEditMode('experience', formData.experience.length);
    };

    const removeCompany = (companyIndex) => {
        const updatedExperience = formData.experience.filter((_, i) => i !== companyIndex);
        setFormData(prev => ({ ...prev, experience: updatedExperience }));
        exitEditMode();
    };

    // Reusable Add Button
    const AddButton = ({ onClick, children }) => (
        <button
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors -ml-4"
            onClick={onClick}
        >
            <Plus size={20} /> {children}
        </button>
    );
    const AddNestedButton = ({ onClick, children }) => (
        <button className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs mt-2 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            onClick={onClick}>
            <Plus size={14} /> {children}
        </button>
    );

    return (
        <section className="card-container">
            <SectionHeader
                title="Work experience"
                isOpen={isOpen}
                toggle={toggle}
            />
            {isOpen && (
                <div className="pt-4 px-2 sm:px-4">
                    {formData.experience.map((company, companyIndex) => (
                        <React.Fragment key={company.id}>
                            {editMode.type === 'experience' && editMode.index === companyIndex ? (
                                <div className="dynamic-row p-4 border border-blue-200 bg-blue-50 rounded-xl mb-4">
                                    <div className="flex justify-end">
                                        {/* <button className="text-sm text-blue-600 font-semibold mb-2" onClick={exitEditMode}>Done</button> */}
                                        <button className="flex gap-2 text-sm font-semibold mb-2 p-1.5 hover:bg-green-50  text-gray-400 hover:text-green-400 transition-colors" onClick={exitEditMode}><Save size={20} />Save</button>
                                    </div>
                                    <InputField label="Company Name" name="company" value={company.company} onChange={(e) => handleCompanyChange(companyIndex, 'company', e.target.value)} />
                                    <div className="flex gap-4">
                                        <InputField label="Role/Title" name="role" value={company.role} onChange={(e) => handleCompanyChange(companyIndex, 'role', e.target.value)} flex />
                                        <InputField label="Duration" name="duration" value={company.duration} onChange={(e) => handleCompanyChange(companyIndex, 'duration', e.target.value)} flex />
                                    </div>

                                    <h4 className="text-sm font-bold text-gray-700 mt-6 mb-3">Client/Project Experience</h4>

                                    {/* Client/Project Details within Company (Loop) */}
                                    {company.clients.map((client, clientIndex) => (
                                        <div key={client.id} className="nested-row p-4 border border-gray-300 bg-white rounded-lg my-4 relative">

                                            {/* Remove Button for Nested Client */}
                                            <button
                                                className="flex absolute top-2 right-2 p-1.5 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-500 transition-colors"
                                                onClick={() => removeClient(companyIndex, clientIndex)}
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            {/* Client Name Input */}
                                            <InputField
                                                label="Client/Project Name"
                                                value={client.name}
                                                onChange={(e) => handleClientNameChange(companyIndex, clientIndex, e.target.value)}
                                                placeholder="e.g., Global Fintech Platform"
                                            />

                                            {/* Bullet Points Input */}
                                            <TextAreaField
                                                label={`Bullet Points (One point per line)`}
                                                value={client.bulletPoints.join('\n')}
                                                placeholder="Developed X feature.\nIntegrated Y API.\nOptimized Z process."
                                                onChange={(e) => handleClientBulletPointsChange(companyIndex, clientIndex, e.target.value)}
                                                minHeight="h-32"
                                            />
                                            <BoldTip/>
                                        </div>
                                    ))}

                                    {/* Add Client/Project Button */}
                                    <AddNestedButton onClick={() => addClient(companyIndex)}>
                                        Add New Client/Project
                                    </AddNestedButton>


                                    <div className='flex justify-end'>
                                        <button
                                            className=" flex items-center gap-2 text-red-600 font-semibold text-sm hover:bg-red-50 mb-2 p-1.5 rounded-lg transition-colors"
                                            onClick={() => removeCompany(companyIndex)}>
                                            <Trash2 size={16} /> Remove Company
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <SummaryCard
                                    title={company.role || 'New Role'}
                                    subtitle={company.company}
                                    date={company.duration}
                                    onDelete={() => removeCompany(companyIndex)}
                                    onEdit={() => enterEditMode('experience', companyIndex)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <AddButton onClick={addCompany}>Add employment</AddButton>
                </div>
            )}
        </section>
    );
}

export default ExperienceSection;