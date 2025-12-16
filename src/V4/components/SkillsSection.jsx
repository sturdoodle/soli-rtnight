import React, { useState } from 'react';
import SectionHeader from './shared/SectionHeader';
import InputField, { TextAreaField } from './shared/InputField';
import { X, Plus, Trash2, Pencil, Edit2 } from 'lucide-react';
import ItemButton from './shared/ItemButton';

// Reusing the SkillTag component for display
const SkillTag = ({ label, onDelete }) => (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors group">
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{label}</span>
        <button className="p-0.5" onClick={onDelete}>
            <X size={14} className="text-gray-400 group-hover:text-blue-500" />
        </button>
    </div>
);

// --- Component to Edit/Add a Skill Category (Inline Tag Editing) ---
const SkillCategoryEditor = ({ skill, index, handleSkillChange, removeSkill, isNew = false, exitEdit }) => {
    
    // 1. Local state for the tag input box
    const [tagInput, setTagInput] = useState('');

    // Convert string to array for dynamic display/manipulation
    const tagsArray = skill.items.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    // Function to update the parent state string after adding/removing a tag
    const updateParentItems = (newTags) => {
        const newItemsString = newTags.join(', ');
        handleSkillChange(index, 'items', newItemsString);
    };

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tagsArray.includes(newTag)) {
            const newTags = [...tagsArray, newTag];
            updateParentItems(newTags);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const newTags = tagsArray.filter(tag => tag !== tagToRemove);
        updateParentItems(newTags);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl mb-4 relative">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-bold text-gray-800">{isNew ? "New Skill Category" : `Edit ${skill.category} Skills`}</h4>
                {/* <button className="text-sm text-blue-600 font-semibold" onClick={exitEdit}>Done</button> */}
                <ItemButton onclick={exitEdit} type="save" buttonText="Save"/>
            </div>

            {/* Category Name Input */}
            <InputField 
                label="Category Name (e.g., Frontend, Backend)" 
                placeholder="Category Name" 
                value={skill.category} 
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)} 
            />
            
            {/* --- INLINE TAG MANAGEMENT PANEL --- */}
            <h4 className="block text-sm font-medium text-gray-500 mb-1.5">Manage Skills ({tagsArray.length} items)</h4>
            
            {/* 2. Input Field for New Tag (similar to the modal input) */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a skill and press Enter to add"
                    className="flex-1 p-2.5 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                    onClick={handleAddTag}
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-r-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                    <Plus size={18} /> Add
                </button>
            </div>

            {/* 3. Existing Tags Display (inline) */}
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2">
                {tagsArray.length > 0 ? (
                    tagsArray.map((tag, tagIndex) => (
                        <div 
                            key={tagIndex} 
                            className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                        >
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)} className="p-0.5 ml-1 hover:bg-red-100 rounded-full">
                                <X size={12} className="text-gray-500 hover:text-red-600" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 italic">No skills added yet.</p>
                )}
            </div>

            {/* Remove Category Button */}
            <div className="flex justify-center">
                <button
                    className="flex items-center gap-1.5 text-red-600 font-semibold text-xs hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    onClick={() => { removeSkill(index); exitEdit(); }}
                >
                    <Trash2 size={14} /> Remove Category
                </button>
            </div>
        </div>
    );
};


const SkillsSection = ({ skills, setFormData, isOpen, toggle }) => {
    // ... (rest of the component remains the same)

    const [categoryEditIndex, setCategoryEditIndex] = useState(null);
    // --- Handlers for the Core Data Structure (Category/Items) ---
    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const addSkillCategory = () => {
        const newCategory = { id: Date.now(), category: 'New Category', items: '' };
        setFormData(prev => ({ ...prev, skills: [...prev.skills, newCategory] }));
        setCategoryEditIndex(skills.length); // Open the new category in edit mode
    };
    
    const removeSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
    };


    return (
        <section className="card-container">
            {/* ... SectionHeader ... */}
            <SectionHeader
                title="Key skills"
                isOpen={isOpen}
                toggle={toggle}
            />
            {isOpen && (
                <div className="pt-4 px-2 sm:px-4">
                    
                    
                    {/* 3. Skill Category Editor (Conditional Render) */}
                    {categoryEditIndex !== null ? (
                        <SkillCategoryEditor
                            skill={skills[categoryEditIndex]}
                            index={categoryEditIndex}
                            handleSkillChange={handleSkillChange}
                            removeSkill={removeSkill}
                            isNew={skills[categoryEditIndex]?.category === 'New Category'}
                            exitEdit={() => setCategoryEditIndex(null)}
                        />
                    ) : (
                        // 4. List of Categories/Add Button
                        <>
                            {skills.map((skill, index) => (
                                <div 
                                    key={skill.id} 
                                    className="group border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all rounded-xl p-3 mb-2 flex justify-between items-center cursor-pointer"
                                    
                                >
                                    <h5 className="font-semibold text-gray-900 text-sm">{skill.category || 'Untitled Category'}</h5>
                                    <span className="text-xs text-gray-500">
                                        {skill.items.split(',').filter(item => item.trim() !== '').length} items
                                    </span>
                                    <div className='flex gap-2'>
                                        <button className="p-1 hover:bg-blue-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors" onClick={() => setCategoryEditIndex(index)}>
                                        <Pencil size={16} />
                                    </button>
                                    <button className="p-1  rounded-full hover:text-red-600  text-gray-400 hover:bg-red-100 transition-colors" onClick={() => removeSkill(index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    </div>
                                </div>
                            ))}
                            
                            <button 
                                className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors -ml-4" 
                                onClick={addSkillCategory}
                            >
                                <Plus size={20} /> Add New Skill Category
                            </button>
                        </>
                    )}
                </div>
            )}
        </section>
    );
}

export default SkillsSection;