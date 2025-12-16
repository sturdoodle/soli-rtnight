import React, { useState } from 'react';
import { Pencil, FileText, Code, GraduationCap, Briefcase, Award, ArrowLeft, Plus, X, Trash2 } from 'lucide-react';

// --- Static Data for Section Cards (Derived from your JSON) ---
const STATIC_SECTIONS = [
    { key: 'Skills', title: 'Technical Skills', items: 3, icon: Code },
    { key: 'Experience', title: 'Work Experience', items: 1, icon: Briefcase },
    { key: 'Education', title: 'Education', items: 2, icon: GraduationCap },
    { key: 'Certifications', title: 'Certifications', items: 2, icon: Award },
    { key: 'Projects', title: 'Projects/Side Projects', items: 2, icon: FileText },
];

// --- Editor Placeholder Components (Rendered on Selection) ---

const SkillsEditorPlaceholder = ({ exitEdit }) => {
    // Static data derived from the provided JSON's 'Frontend' category
    const categoryName = "Frontend";
    const tagsArray = ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "SASS", "Webpack"];

    return (
        <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl mb-4 w-full">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
                <button onClick={exitEdit} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Sections
                </button>
                <h4 className="text-xl font-bold text-gray-800">Edit Skill Category</h4>
                <button className="text-sm text-blue-600 font-semibold pointer-events-none">Done</button>
            </div>
            
            {/* --- Replicating image_eba5f1.png structure --- */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500 mb-1.5">Category Name (e.g., Frontend, Backend)</label>
                <input type="text" value={categoryName} readOnly className="w-full p-2.5 border border-gray-300 rounded-lg text-base bg-white outline-none" />
            </div>

            <div className="border border-gray-300 bg-white rounded-lg p-3 mt-4">
                <h4 className="block text-sm font-medium text-gray-500 mb-1.5">Type a skill and press Enter (e.g. Java, SQL)</h4>
                <div className="flex mb-3">
                    <input type="text" placeholder="Type a skill and press Enter" readOnly className="flex-1 p-2 border border-gray-300 rounded-l-lg text-sm outline-none" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-medium pointer-events-none">Add</button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-10">
                    {tagsArray.map((tag, tagIndex) => (
                         <div key={tagIndex} className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
                             <span>{tag}</span><X size={12} className="text-gray-500" />
                         </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-end mt-4 border-t pt-3">
                <button className="flex items-center gap-1.5 text-red-600 font-semibold text-sm">
                    <Trash2 size={14} /> Remove Category
                </button>
            </div>
        </div>
    );
};

const CertificationEditorPlaceholder = ({ exitEdit }) => {
    // Static data derived from the JSON's certifications
    const certName = "AWS Certified Solutions Architect – Associate";
    const displayDate = "15-08-2027"; 

    return (
        <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl mb-4 w-full">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
                <button onClick={exitEdit} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Sections
                </button>
                <h4 className="text-xl font-bold text-gray-800">Edit Certification</h4>
                <button className="text-sm text-blue-600 font-semibold pointer-events-none">Done</button>
            </div>

            {/* Certificate Name Input */}
            <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1.5">Certificate Name</label>
                <input type="text" value={certName} readOnly className="w-full p-2.5 border border-gray-300 rounded-lg text-base bg-white outline-none" />
            </div>

            {/* --- Replicating image_ea4fde.png structure (Aligned Expiry) --- */}
            <div className="flex gap-4 items-center">
                <div className="flex-1" style={{ flexBasis: '40%' }}>
                    <label className="block text-sm font-medium text-gray-500 mb-1.5 opacity-0 pointer-events-none select-none">Expiry Date</label> 
                    <div className="flex items-center pt-1">
                        <input type="checkbox" readOnly className="w-4 h-4 text-blue-600 border-gray-400 rounded flex-shrink-0" />
                        <label className="ml-3 text-sm font-medium text-gray-700 select-none leading-tight">
                            This certificate<br/>never expires
                        </label>
                    </div>
                </div>

                <div className="flex-1" style={{ flexBasis: '60%' }}>
                    <div className="form-group mb-0">
                        <label className="block text-sm font-medium text-gray-500 mb-1.5">Expiry Date</label>
                        <input type="text" value={displayDate} readOnly className="w-full p-2.5 border border-gray-300 rounded-lg text-base outline-none pr-8 bg-white" />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-start mt-4 border-t pt-3">
                <button className="flex items-center gap-1.5 text-red-600 font-semibold text-sm">
                    <Trash2 size={14} /> Remove Certification
                </button>
            </div>
        </div>
    );
};

// --- Main Navigation Component ---

const SectionCard = ({ section, onClick }) => {
    const Icon = section.icon;
    
    return (
        <div 
            className="group border border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all rounded-xl p-4 mb-3 flex justify-between items-center cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <Icon size={24} className="text-gray-500 group-hover:text-blue-600" />
                <h5 className="font-semibold text-gray-900 text-lg">{section.title}</h5>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="text-base font-medium text-gray-600">{section.items} items</span>
                <Pencil size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
        </div>
    );
};


const EditorNavigationPage = () => {
    const [selectedSection, setSelectedSection] = useState(null); 

    const renderEditor = () => {
        switch (selectedSection) {
            case 'Skills':
                return <SkillsEditorPlaceholder exitEdit={() => setSelectedSection(null)} />;
            case 'Certifications':
                return <CertificationEditorPlaceholder exitEdit={() => setSelectedSection(null)} />;
            // Add other cases here (Experience, Education, Projects)
            default:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Sections</h2>
                        {STATIC_SECTIONS.map(section => (
                            <SectionCard 
                                key={section.key} 
                                section={section} 
                                onClick={() => setSelectedSection(section.key)}
                            />
                        ))}
                        <button className="flex items-center gap-2 text-blue-600 font-semibold text-base mt-8 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors -ml-4"> 
                            <Plus size={20} /> Add New Section
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-50 p-6 sm:p-10 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
                {renderEditor()}
            </div>
        </div>
    );
};

export default EditorNavigationPage;