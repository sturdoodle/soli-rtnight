import React from 'react';
import SectionHeader from './shared/SectionHeader';
import SummaryCard from './shared/SummaryCard';
import InputField from './shared/InputField';
import { Plus, Save, Trash2 } from 'lucide-react';
import ItemButton from './shared/ItemButton';

const EducationSection = ({
    formData,
    setFormData,
    editMode,
    enterEditMode,
    exitEditMode,
    isOpen,
    toggle
}) => {

    // Handlers specific to Education
    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...formData.education];
        updatedEducation[index][field] = value;
        setFormData(prev => ({ ...prev, education: updatedEducation }));
    };

    const addEducation = () => {
        const newEntry = { id: Date.now(), degree: '', institution: '', duration: '' };
        setFormData(prev => ({ ...prev, education: [...prev.education, newEntry] }));
        enterEditMode('education', formData.education.length);
    };

    const removeEducation = (index) => {
        const updatedEducation = formData.education.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, education: updatedEducation }));
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
                title="Education"
                isOpen={isOpen}
                toggle={toggle}
            />
            {isOpen && (
                <div className="pt-4 px-2 sm:px-4">
                    {formData.education.map((edu, index) => (
                        <React.Fragment key={edu.id}>
                            {editMode.type === 'education' && editMode.index === index ? (
                                <div className="dynamic-row px-4 py-2 border border-blue-200 bg-blue-50 rounded-xl mb-4">
                                    <div className="flex gap-3 justify-end">
                                        {/* <button className="flex gap-2 text-sm font-semibold mb-2 p-1.5 hover:bg-green-50  text-gray-400 hover:text-green-400 transition-colors" onClick={exitEditMode}><Save size={20}/>Save</button>
                                        <button className="flex gap-2 text-sm font-semibold mb-2 p-1.5 hover:bg-red-50  text-gray-400 hover:text-red-500 transition-colors" onClick={()=>removeEducation(index)}><Trash2 size={20}/> Remove</button> */}
                                        <ItemButton onclick={exitEditMode} type="save" buttonText="Save"/>
                                        {/* <ItemButton onclick={() => removeEducation(index)} type="Delete" buttonText="Delete"/> */}
                                    </div>
                                    <InputField
                                        label="Degree/Certification Name"
                                        placeholder="B.Tech in Computer Engineering"
                                        value={edu.degree}
                                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    />
                                    <InputField
                                        label="Institution / Board"
                                        placeholder="ABC Institute of Technology"
                                        value={edu.institution}
                                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                    />
                                    <InputField
                                        label="Duration (e.g., 2010-2020)"
                                        placeholder="2010-2020"
                                        value={edu.duration}
                                        onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                                    />
                                    <div className='flex justify-end'>
                                        <button
                                            className=" flex items-center gap-2 text-red-600 font-semibold text-sm hover:bg-red-50 mb-2 p-1.5 rounded-lg transition-colors"
                                            onClick={() => removeEducation(index)}>
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                <SummaryCard
                                    title={edu.degree || 'New Education Entry'}
                                    subtitle={edu.institution}
                                    date={edu.duration}
                                    onDelete={() => removeEducation(index)}
                                    onEdit={() => enterEditMode('education', index)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <AddButton onClick={addEducation}>Add education</AddButton>
                </div>
            )}
        </section>
    );
}

export default EducationSection;