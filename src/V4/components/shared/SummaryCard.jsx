import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const SummaryCard = ({ title, subtitle, date, onDelete, onEdit }) => (
    <div className="group border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all rounded-xl p-5 mb-4 relative">
        <div className="flex justify-between items-start">
            <div className="pr-10">
                <h4 className="font-bold text-gray-900 text-base">{title}</h4>
                {subtitle && <p className="text-gray-700 text-sm mt-1">{subtitle}</p>}
                {date && <p className="text-gray-500 text-xs mt-2 font-medium">{date}</p>}
            </div>
            <div className="flex gap-3 absolute top-5 right-5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button 
                    className="p-1.5 hover:bg-blue-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                >
                    <Pencil size={18} />
                </button>
                <button 
                    className="p-1.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors" 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    </div>
);

export const AddButton = ({ onClick, children }) => (
    <button 
        className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors -ml-4" 
        onClick={onClick}
    >
        <Plus size={20} /> {children}
    </button>
);

export default SummaryCard;