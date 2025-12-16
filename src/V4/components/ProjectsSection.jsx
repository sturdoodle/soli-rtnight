import React from 'react';
import SectionHeader from './shared/SectionHeader';
import SummaryCard from './shared/SummaryCard';
import InputField, { TextAreaField } from './shared/InputField';
import { Plus } from 'lucide-react';
import ItemButton from './shared/ItemButton';
import BoldTip from './shared/BoldTip';

const ProjectsSection = ({ 
    projects, 
    setFormData, 
    editMode, 
    enterEditMode, 
    exitEditMode, 
    isOpen, 
    toggle 
}) => {
    
    // Handlers specific to Projects
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects]; 
        newProjects[index][field] = value; 
        setFormData(prev => ({ ...prev, projects: newProjects }));
    };

    const addProject = () => {
        const newEntry = { id: Date.now(), name: '', icon: '💻', tech: '', description: '' };
        setFormData(prev => ({ ...prev, projects: [...prev.projects, newEntry] }));
        enterEditMode('project', projects.length);
    };

    const removeProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, projects: updatedProjects }));
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

    return (
        <section className="card-container">
            <SectionHeader
                title="Personal Projects"
                isOpen={isOpen}
                toggle={toggle}
            />
            {isOpen && (
                <div className="pt-4 px-2 sm:px-4">
                    {projects.map((proj, index) => (
                        <React.Fragment key={proj.id}>
                            {editMode.type === 'project' && editMode.index === index ? (
                                <div className="dynamic-row p-4 border border-blue-200 bg-blue-50 rounded-xl mb-4">
                                    <div className="flex justify-end">
                                        {/* <button className="text-sm text-blue-600 font-semibold mb-2" onClick={exitEditMode}>Done</button> */}
                                        <ItemButton onclick={exitEditMode} type="save" buttonText="Save"/>
                                    </div>
                                    <div className="flex gap-4">
                                        <InputField 
                                            label="Project Name" 
                                            value={proj.name} 
                                            onChange={(e) => handleProjectChange(index, 'name', e.target.value)} 
                                            flex 
                                        />
                                        <InputField 
                                            label="Icon" 
                                            placeholder="💻" 
                                            value={proj.icon} 
                                            onChange={(e) => handleProjectChange(index, 'icon', e.target.value)} 
                                            style={{ flex: '0.2' }} 
                                        />
                                    </div>
                                    <InputField 
                                        label="Tech Stack (Comma separated)" 
                                        placeholder="React, Node, etc." 
                                        value={proj.tech} 
                                        onChange={(e) => handleProjectChange(index, 'tech', e.target.value)} 
                                    />
                                    <TextAreaField 
                                        label="Description" 
                                        value={proj.description} 
                                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)} 
                                        minHeight="h-20" 
                                    />
                                    <BoldTip/>
                                </div>
                            ) : (
                                <SummaryCard
                                    title={proj.name || 'New Project'}
                                    subtitle={proj.description}
                                    date={proj.tech}
                                    onDelete={() => removeProject(index)}
                                    onEdit={() => enterEditMode('project', index)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <AddButton onClick={addProject}>Add project</AddButton>
                </div>
            )}
        </section>
    );
}

export default ProjectsSection;