import React from 'react';
import SectionHeader from './shared/SectionHeader';
import InputField from './shared/InputField';
import { Pencil } from 'lucide-react';

const PersonalDetailsSection = ({ formData, handleChange, isOpen, toggle }) => (
    // <section className="bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-300 sm:p-3 mb-2">
    <section className="card-container">
        <SectionHeader
            title="Personal details"
            isOpen={isOpen}
            toggle={toggle}
        />
        {isOpen && (
            <div className="pt-4 px-2 sm:px-2 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    <div className="relative group cursor-pointer">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                            <img src="https://i.pravatar.cc/150?u=author" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pencil size={20} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <button className="text-blue-600 font-semibold text-sm hover:underline">Replace photo</button>
                        <p className="text-xs text-gray-400 mt-1">File formats: PNG, JPG, JPEG (Max 2MB)</p>
                    </div>
                </div> */}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <InputField label="Full name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField label="Professional Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                    <InputField label="Email address" name="email" value={formData.email} onChange={handleChange} type="email" />
                    <InputField label="Mobile number" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                    <InputField label="Current city" name="location" value={formData.location} onChange={handleChange} />
                    <InputField label="GitHub / Portfolio" name="github" value={formData.github} onChange={handleChange} />
                </div>

                {/* <div className="mt-4 mb-2">
                    <label className="block text-sm font-medium text-gray-500 mb-3">Experience level (Placeholder)</label>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">Fresher</button>
                        <button className="px-6 py-2.5 rounded-full bg-gray-900 border border-gray-900 text-white font-medium text-sm shadow-lg transform hover:scale-105 transition-all">Experienced</button>
                    </div>
                </div> */}
            </div>
        )}
    </section>
);

export default PersonalDetailsSection;