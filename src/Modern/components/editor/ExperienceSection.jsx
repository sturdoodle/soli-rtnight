"use client";

import React from 'react';
import { Briefcase, Plus, Trash2, ChevronRight, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';
import AdSenseAd from '../../../AdsenseAdsBlock.jsx';
import { ADSENSE_CLIENT_ID, ADSENSE_INBETWEEN_SLOT_ID } from '../../../MainConstant.js';

const ExperienceSection = () => {
  const { resumeData, updateSection } = useResume();

  const handleUpdateExp = (id, field, value) => {
    const updatedExp = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateSection('experience', updatedExp);
  };

  const handleAddExp = () => {
    const newExp = {
      id: Date.now(),
      company: 'New Company',
      role: 'Software Engineer',
      duration: 'Present',
      clients: [{ id: Date.now() + 1, name: 'Client Name', bulletPoints: ['Accomplishment 1'] }]
    };
    updateSection('experience', [...resumeData.experience, newExp]);
  };

  const handleRemoveExp = (id) => {
    updateSection('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const handleUpdateClient = (expId, clientId, field, value) => {
    const updatedExp = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        const updatedClients = exp.clients.map(client =>
          client.id === clientId ? { ...client, [field]: value } : client
        );
        return { ...exp, clients: updatedClients };
      }
      return exp;
    });
    updateSection('experience', updatedExp);
  };

  const handleUpdateBullets = (expId, clientId, value) => {
    const updatedExp = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        const updatedClients = exp.clients.map(client =>
          client.id === clientId ? { ...client, bulletPoints: value.split('\n') } : client
        );
        return { ...exp, clients: updatedClients };
      }
      return exp;
    });
    updateSection('experience', updatedExp);
  };

  const handleAddClient = (expId) => {
    const updatedExp = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        return {
          ...exp,
          clients: [
            ...exp.clients,
            { id: Date.now(), name: '', bulletPoints: [''] }
          ]
        };
      }
      return exp;
    });
    updateSection('experience', updatedExp);
  };

  const handleRemoveClient = (expId, clientId) => {
    const updatedExp = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        return {
          ...exp,
          clients: exp.clients.filter(c => c.id !== clientId)
        };
      }
      return exp;
    });
    updateSection('experience', updatedExp);
  };

  return (
    <GlassCard title="Work Experience" icon={Briefcase} isCollapsible={true}>
      <div className="space-y-4">
        <div className="px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 mb-2 animate-in fade-in duration-300">
          <Sparkles size={14} className="text-blue-500/50" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Smart Section: This will be automatically removed from your resume if left empty.
          </p>
        </div>
        {(resumeData.experience || []).map((exp, index) => (
          <React.Fragment key={exp.id}>
            <div className="p-3 sm:p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Briefcase size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Experience Unit</span>
                </div>
                <PillButton 
                  variant="danger" 
                  className="z-20 scaled-icon"
                  onClick={() => handleRemoveExp(exp.id)}
                  icon={Trash2}
                />
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mb-3">
                <MinimalistInput 
                  id={`v5-exp-${exp.id}-company`}
                  label="Company" 
                  value={exp.company} 
                  onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)} 
                />
                <MinimalistInput 
                  id={`v5-exp-${exp.id}-role`}
                  label="Role" 
                  value={exp.role} 
                  onChange={(e) => handleUpdateExp(exp.id, 'role', e.target.value)} 
                />
                <MinimalistInput 
                  id={`v5-exp-${exp.id}-duration`}
                  label="Duration" 
                  value={exp.duration} 
                  onChange={(e) => handleUpdateExp(exp.id, 'duration', e.target.value)} 
                />
              </div>

              <div className="pl-2 sm:pl-6 border-l-2 border-sage-200/50 space-y-2">
                {exp.clients.map(client => (
                  <div key={client.id} className="space-y-2 relative group/client">
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2 text-sage-600">
                        <ChevronRight size={16} />
                        <h4 className="font-semibold text-sm uppercase tracking-wider">Client / Project</h4>
                      </div>
                      <button 
                        onClick={() => handleRemoveClient(exp.id, client.id)}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover/client:opacity-100"
                        title="Remove Client"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <MinimalistInput 
                      id={`v5-exp-client-${client.id}-name`}
                      label="Client / Project Name"
                      value={client.name} 
                      onChange={(e) => handleUpdateClient(exp.id, client.id, 'name', e.target.value)}
                      placeholder="Global Fintech Alliance"
                    />
                    <MinimalistInput 
                      id={`v5-exp-client-${client.id}-bullets`}
                      textarea 
                      label="Bullet Points (One per line)" 
                      value={client.bulletPoints.join('\n')} 
                      onChange={(e) => handleUpdateBullets(exp.id, client.id, e.target.value)}
                      showFormatTip={true}
                      placeholder="Architected a micro-frontend architecture..."
                    />
                  </div>
                ))}

                  <button
                    onClick={() => handleAddClient(exp.id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-sage-50 text-sage-600 hover:bg-sage-100 border border-sage-200/50 transition-all font-black text-[9px] uppercase tracking-[0.2em] w-fit"
                  >
                  <Plus size={14} />
                  Add Project / Client
                </button>
              </div>
            </div>

            {/* In-Section Intelligent Ad Injection */}
            {index === 1 && (resumeData.experience || []).length > 2 && (
              <div className="p-6 rounded-2xl bg-[var(--v5-card)]/30 border border-black/5 dark:border-white/5 overflow-hidden ads-block animate-in fade-in zoom-in-95 duration-300 my-2 flex items-center justify-center min-h-[150px]">
                 <AdSenseAd client={ADSENSE_CLIENT_ID} slot={ADSENSE_INBETWEEN_SLOT_ID} format="auto" minHeight="150px" />
              </div>
            )}
          </React.Fragment>
        ))}
        
        <PillButton 
          variant="add" 
          icon={Plus} 
          onClick={handleAddExp} 
          className="w-full py-4 mt-6"
        >
          Add New Experience
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default ExperienceSection;

