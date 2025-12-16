import React, { useState } from 'react';
import { Plus, Trash2, X, Edit2 } from 'lucide-react';

const TagInputModal = ({ currentItemsString, onSave, onClose }) => {
    // Convert the comma-separated string to an array of trimmed tags
    const initialTags = currentItemsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const [tags, setTags] = useState(initialTags);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSave = () => {
        // Convert the array back to the comma-separated string for the parent state
        const newItemsString = tags.join(', ');
        onSave(newItemsString);
        onClose();
    };

    return (
        <>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Edit2 size={18} className="text-blue-500" /> Manage Skill Tags
            </h4>
            
            {/* Input Field for New Tag */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 p-2.5 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                    onClick={handleAddTag}
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-r-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                    <Plus size={18} /> Add
                </button>
            </div>

            {/* Existing Tags Display */}
            <div className="flex flex-wrap gap-2 mb-6 max-h-40 overflow-y-auto">
                {tags.length > 0 ? (
                    tags.map((tag, index) => (
                        <div 
                            key={index} 
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t pt-4">
                <button
                    onClick={onClose}
                    className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                    Save & Close
                </button>
            </div>
        </>
    );
};

export default TagInputModal;