"use client";

import React from 'react';
import { Award, Plus, Trash2, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import SmartSectionNote from './SmartSectionNote';
import { useResume } from '../../context/ResumeContext';
import AdSenseAd from '../../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../../MainConstant.js';

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
      <div className="space-y-2">
        <div className="px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 mb-2 animate-in fade-in duration-700">
          <Sparkles size={14} className="text-blue-500/50" />
          <p className="text-[8.5px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Smart Section: This will be automatically removed from your CV if left empty.
          </p>
        </div>
        {(resumeData.certifications || []).map((cert, index) => (
          <React.Fragment key={cert.id}>
            <div className="p-3 sm:p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-2">
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
              
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
                <div className="xl:col-span-7">
                  <MinimalistInput 
                    id={`v5-cert-${cert.id}-name`}
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
                        id={`v5-cert-${cert.id}-expiry`}
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
                <SmartSectionNote 
                  text="Important: If Credential ID or Link left empty, they will not be shown in the PDF." 
                  color="blue" 
                />

                <div className="xl:col-span-6">
                  <MinimalistInput 
                    id={`v5-cert-${cert.id}-credentialId`}
                    label="Credential ID / Number" 
                    icon={ShieldCheck}
                    value={cert.credentialId || ''} 
                    onChange={(e) => handleUpdateCert(cert.id, 'credentialId', e.target.value)} 
                    placeholder="e.g. AWS-123456789"
                  />
                </div>
                <div className="xl:col-span-6">
                  <MinimalistInput 
                    id={`v5-cert-${cert.id}-link`}
                    label="Verification Link" 
                    icon={Sparkles}
                    value={cert.link || ''} 
                    onChange={(e) => handleUpdateCert(cert.id, 'link', e.target.value)} 
                    placeholder="e.g. Credly, LinkedIn, or direct URL"
                  />
                </div>
              </div>
            </div>

            {/* In-Section Intelligent Ad Injection */}
            {index === 1 && (resumeData.certifications || []).length > 2 && (
              <div className="p-6 rounded-2xl bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-300 my-2 flex items-center justify-center min-h-[150px]">
                 <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" minHeight="150px" />
              </div>
            )}
          </React.Fragment>
        ))}
        
        <PillButton 
          variant="add" 
          icon={Plus} 
          onClick={handleAddCert} 
          className="w-full py-4 mt-6"
        >
          Add New Certification
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default CertificationsSection;

