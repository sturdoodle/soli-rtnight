import React from 'react';
import { Award, Plus, Trash2, Calendar, ShieldCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

const CertificationsSection = () => {
  const { resumeData, updateSection } = useResume();

  const handleUpdateCert = (id, field, value) => {
    const updatedCerts = (resumeData.certifications || []).map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateSection('certifications', updatedCerts);
  };

  const handleAddCert = () => {
    const newCert = {
      id: Date.now(),
      name: 'New Certification',
      expiryDate: null, // null = Never Expires
    };
    updateSection('certifications', [...(resumeData.certifications || []), newCert]);
  };

  const handleRemoveCert = (id) => {
    updateSection('certifications', (resumeData.certifications || []).filter(cert => cert.id !== id));
  };

  return (
    <GlassCard title="Certifications" icon={Award} isCollapsible={true}>
      <div className="space-y-6">
        {(resumeData.certifications || []).map((cert) => (
          <div key={cert.id} className="p-4 sm:p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Award size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Certification Unit</span>
              </div>
              <PillButton 
                variant="danger" 
                className="z-20 scaled-icon"
                onClick={() => handleRemoveCert(cert.id)}
                icon={Trash2}
              />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
              <div className="xl:col-span-7">
                <MinimalistInput 
                  label="Certificate Name" 
                  icon={ShieldCheck}
                  value={cert.name} 
                  onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)} 
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div className="xl:col-span-5">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <MinimalistInput 
                      label="Date or Status" 
                      icon={Calendar}
                      value={cert.expiryDate === null ? 'Never Expires' : cert.expiryDate} 
                      onChange={(e) => handleUpdateCert(cert.id, 'expiryDate', e.target.value === 'Never Expires' ? null : e.target.value)} 
                      placeholder="Never Expires"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-[-8px]">
                    <input 
                      type="checkbox" 
                      id={`never-expires-${cert.id}`}
                      checked={cert.expiryDate === null}
                      onChange={(e) => handleUpdateCert(cert.id, 'expiryDate', e.target.checked ? null : 'Present')}
                      className="w-4 h-4 rounded-md text-sage-600 border-sage-300 focus:ring-sage-400 bg-white dark:bg-zinc-800"
                    />
                    <label htmlFor={`never-expires-${cert.id}`} className="text-[10px] font-bold text-sage-500 uppercase tracking-widest cursor-pointer hover:text-sage-700 transition-colors">
                      Never Expires
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <PillButton 
          variant="glass" 
          icon={Plus} 
          onClick={handleAddCert} 
          className="w-full py-6 mt-10 border-dashed border-2 border-sage-200/50 dark:border-sage-800/50 hover:border-sage-400"
        >
          Add New Certification
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default CertificationsSection;
