import React from 'react';
import SectionHeader from './shared/SectionHeader';
import { TextAreaField } from './shared/InputField';
import { Sparkles } from 'lucide-react';
import BoldTip from './shared/BoldTip';

const SummarySection = ({ summary, handleChange, isOpen, toggle, setOpenSection }) => (
    <section className="card-container">
        <SectionHeader
            title="Profile summary"
            // isAiPowered={true}
            isOpen={isOpen}
            toggle={toggle}
        />
        {isOpen && (
            <div className="pt-4 px-2 sm:px-4">
                {/* <div className="border border-purple-200 bg-purple-50 rounded-xl p-4 mb-4 flex justify-between items-center cursor-pointer hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                        <Sparkles size={18} /> Generate with AI
                    </div>
                    <span className="text-xs font-medium bg-white px-2 py-1 rounded-md text-purple-600 shadow-sm">2 credits left</span>
                </div> */}

                <TextAreaField
                    name="summary"
                    label="Summary Text"
                    value={summary}
                    onChange={handleChange}
                    minHeight="h-50"
                    placeholder="Write a compelling summary about your professional experience..."
                    
                />
                <BoldTip/>
                
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 shadow-md hover:shadow-lg transition-all" 
                        onClick={() => setOpenSection(null)}
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        )}
    </section>
);

export default SummarySection;