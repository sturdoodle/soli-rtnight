import React from 'react';
import { Briefcase, Plus, Trash2, ChevronRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import PillButton from '../ui/PillButton';
import { useResume } from '../../context/ResumeContext';

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

  return (
    <GlassCard title="Work Experience" icon={Briefcase} isCollapsible={true}>
      <div className="space-y-6 sm:space-y-8">
        {(resumeData.experience || []).map((exp) => (
          <div key={exp.id} className="p-4 sm:p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
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
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
              <MinimalistInput 
                label="Company" 
                value={exp.company} 
                onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)} 
              />
              <MinimalistInput 
                label="Role" 
                value={exp.role} 
                onChange={(e) => handleUpdateExp(exp.id, 'role', e.target.value)} 
              />
              <MinimalistInput 
                label="Duration" 
                value={exp.duration} 
                onChange={(e) => handleUpdateExp(exp.id, 'duration', e.target.value)} 
              />
            </div>

            <div className="pl-2 sm:pl-6 border-l-2 border-sage-200/50 space-y-4 sm:space-y-6">
              {exp.clients.map(client => (
                <div key={client.id} className="space-y-4">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <ChevronRight size={16} />
                    <h4 className="font-semibold text-sm uppercase tracking-wider">Client / Project</h4>
                  </div>
                  <MinimalistInput 
                    value={client.name} 
                    onChange={(e) => handleUpdateClient(exp.id, client.id, 'name', e.target.value)}
                    placeholder="Global Fintech Alliance"
                  />
                  <MinimalistInput 
                    textarea 
                    label="Bullet Points (One per line)" 
                    value={client.bulletPoints.join('\n')} 
                    onChange={(e) => handleUpdateBullets(exp.id, client.id, e.target.value)}
                    placeholder="Architected a micro-frontend architecture..."
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <PillButton 
          variant="glass" 
          icon={Plus} 
          onClick={handleAddExp} 
          className="w-full py-6 mt-10 border-dashed border-2 border-sage-200/50 dark:border-sage-800/50 hover:border-sage-400"
        >
          Add New Experience
        </PillButton>
      </div>
    </GlassCard>
  );
};

export default ExperienceSection;
