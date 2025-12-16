import React from 'react';
import { ChevronDown, AudioWaveform, Trash2 } from 'lucide-react';

const SectionHeader = ({ title, isOpen, toggle, isAiPowered, onDelete }) => (
    <div 
        className={`card-section-header ${isOpen ? 'bg-blue-100/50' : ''}`} 
        onClick={toggle}
    >
        <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {isAiPowered && (
                <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold shadow-sm">
                    <AudioWaveform size={18} fill="currentColor" />
                    AI-powered
                </span>
            )}
        </div>
        <div className="flex items-center gap-4">
            {onDelete && (
                <button 
                    className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                >
                    <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
                </button>
            )}
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-gray-600" />
            </div>
        </div>
    </div>
);

export default SectionHeader;