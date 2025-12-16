import React from 'react';
import SectionHeader from './shared/SectionHeader';
import SummaryCard from './shared/SummaryCard';
import InputField from './shared/InputField';
import { Plus, Trash2 } from 'lucide-react';
import ItemButton from './shared/ItemButton';

// New component for editing the certificate details
const CertificationEditor = ({ cert, index, handleCertificationChange, removeCertification, exitEdit }) => {
    
    // Determine the checked state for "Never Expires" based on the expiryDate value
    const neverExpires = cert.expiryDate === null;
    
    const handleExpiryToggle = (e) => {
        const checked = e.target.checked;
        const newExpiryDate = checked ? null : new Date().toISOString().substring(0, 10); // Default to today's date if enabling expiry
        handleCertificationChange(index, 'expiryDate', newExpiryDate);
    };

    const handleDateChange = (e) => {
        handleCertificationChange(index, 'expiryDate', e.target.value);
    };

    return (
        <div className="dynamic-row p-4 border border-blue-200 bg-blue-50 rounded-xl mb-4">
            <div className="flex justify-end">
                {/* <button className="text-sm text-blue-600 font-semibold mb-2" onClick={exitEdit}>Done</button> */}
                <ItemButton onclick={exitEdit} type="save" buttonText="Save"/>
            </div>

            <InputField 
                label="Certificate Name" 
                placeholder="AWS Certified Cloud Practitioner" 
                value={cert.name} 
                onChange={(e) => handleCertificationChange(index, 'name', e.target.value)} 
            />

            {/* Checkbox for Never Expires */}
            {/* <div className="mb-4 flex items-center">
                <input
                    id={`never-expires-${index}`}
                    type="checkbox"
                    checked={neverExpires}
                    onChange={handleExpiryToggle}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`never-expires-${index}`} className="ml-2 text-sm font-medium text-gray-700">
                    This certificate never expires
                </label>
            </div> */}

            {/* Expiry Date Input (Conditional) */}
            {/* <InputField 
                label="Expiry Date" 
                type="date"
                value={neverExpires ? '' : cert.expiryDate || ''}
                onChange={handleDateChange}
                disabled={neverExpires}
                placeholder="Select date"
                className={neverExpires ? 'bg-gray-100 cursor-not-allowed' : ''}
            /> */}

            <div className="flex  gap-2 ">
                
                

                {/* 2. Expiry Date Input (Takes about 60% width) */}
                <div className="mb-2 flex-1" style={{ flexBasis: '40%' }}>
                    <InputField 
                        label="Expiry Date" 
                        type="date"
                        // Display the date only if it's not null (not neverExpires)
                        value={neverExpires ? '' : cert.expiryDate || ''}
                        onChange={handleDateChange}
                        disabled={neverExpires}
                        placeholder="Select date"
                        className={neverExpires ? 'bg-gray-100 cursor-not-allowed' : ''}
                    />
                </div>

                {/* 1. Checkbox and Label Container (Takes about 40% width) */}
                <div className="mb-2 flex-1" style={{ flexBasis: '60%' }}>
                    {/* Placeholder for vertical alignment */}
                    <label className="block text-sm font-medium text-gray-500 mb-1.5 opacity-0">Expiry</label> 
                    
                    <div className="flex items-center">
                        <input
                            id={`never-expires-${index}`}
                            type="checkbox"
                            checked={neverExpires}
                            onChange={handleExpiryToggle}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`never-expires-${index}`} className="ml-2 text-sm font-medium text-gray-700">
                            This certificate never expires
                        </label>
                    </div>
                </div>
            </div>
            {/* --- END: Modified Row --- */}

            
{/* 
             <button 
                className="mt-4 rounded-lg" 
                // className="mt-4 flex items-center gap-2 text-red-600 font-semibold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-colors" 
                onClick={() => removeCertification(index)}>
                <Trash2 size={16} /> Remove Certification
            </button> */}
            <ItemButton onclick={() => removeCertification(index)} type="Delete" buttonText="Remove Certification"/>
        </div>
    );
};


const CertificationsSection = ({ 
    certifications, 
    setFormData, 
    editMode, 
    enterEditMode, 
    exitEditMode, 
    isOpen, 
    toggle 
}) => {
    
    // --- Handlers specific to Certifications ---
    
    // Unified handler for both name and expiryDate field
    const handleCertificationChange = (index, field, value) => {
        const newCerts = [...certifications]; 
        newCerts[index][field] = value; 
        setFormData(prev => ({ ...prev, certifications: newCerts }));
    };

    const addCertification = () => {
        // Default new entry: name is empty, expiryDate is null (never expires)
        const newEntry = { id: Date.now(), name: '', expiryDate: null };
        setFormData(prev => ({ ...prev, certifications: [...certifications, newEntry] }));
        enterEditMode('certification', certifications.length);
    };

    const removeCertification = (index) => {
        const updatedCerts = certifications.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, certifications: updatedCerts }));
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

    // Helper function for the Summary Card subtitle
    const getExpiryStatus = (date) => {
        if (date === null) {
            return "Never Expires";
        }
        const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return `Expires: ${formattedDate}`;
    };

    return (
        <section className="card-container">
            <SectionHeader 
                title="Certifications" 
                isOpen={isOpen}
                toggle={toggle} 
            />
            {isOpen && (
                <div className="pt-4 px-2 sm:px-4">
                    {certifications.map((cert, index) => (
                        <React.Fragment key={cert.id}>
                            {editMode.type === 'certification' && editMode.index === index ? (
                                <CertificationEditor 
                                    cert={cert}
                                    index={index}
                                    handleCertificationChange={handleCertificationChange}
                                    removeCertification={removeCertification}
                                    exitEdit={exitEditMode}
                                />
                            ) : (
                                <SummaryCard
                                    title={cert.name || 'New Certification'}
                                    subtitle={getExpiryStatus(cert.expiryDate)}
                                    onDelete={() => removeCertification(index)}
                                    onEdit={() => enterEditMode('certification', index)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <AddButton onClick={addCertification}>Add certification</AddButton>
                </div>
            )}
        </section>
    );
}

export default CertificationsSection;