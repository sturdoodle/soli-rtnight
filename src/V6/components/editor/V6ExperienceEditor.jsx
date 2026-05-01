import React from 'react';
import { Briefcase, Plus, Trash2, User, Calendar, Terminal, Globe } from 'lucide-react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';

const V6ExperienceEditor = () => {
  const { resumeData, updateSection } = useResume();
  const experience = resumeData.experience || [];

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";
  const textareaClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-4 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[140px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all resize-none shadow-sm selection:bg-blue-500/20";

  const handleUpdateExp = (id, field, value) => {
    const updatedExp = experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateSection('experience', updatedExp);
  };

  const handleAddExp = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      role: '',
      duration: '',
      clients: [{ id: Date.now() + 1, name: '', bulletPoints: [''] }]
    };
    updateSection('experience', [...experience, newExp]);
  };

  const handleRemoveExp = (id) => {
    updateSection('experience', experience.filter(exp => exp.id !== id));
  };

  const handleUpdateClient = (expId, clientId, field, value) => {
    const updatedExp = experience.map(exp => {
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
    const updatedExp = experience.map(exp => {
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
    const updatedExp = experience.map(exp => {
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
    const updatedExp = experience.map(exp => {
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Work Experience</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          List your professional history, starting with your most recent role.
        </p>
      </div>

      <div className="space-y-12">
        {experience.map((exp, expIndex) => (
          <React.Fragment key={exp.id}>
            <div className="relative p-1 bg-gradient-to-br from-slate-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] sm:rounded-[2.5rem]">
              <div className="bg-white dark:bg-[#0c0c0e] p-4 sm:p-10 rounded-[1.8rem] sm:rounded-[2.4rem] shadow-sm border border-slate-200 dark:border-white/[0.05]">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{exp.company || 'New Position'}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">{exp.role || 'Designation'}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">{exp.duration || 'Period'}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveExp(exp.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all border border-slate-100 dark:border-white/[0.05] hover:border-red-100 dark:hover:border-red-900/30 shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
                      <V6Card title="Company Name" description="Employer or organization." icon={Globe} horizontal={true}>
                        <div className="w-full">
                          <input 
                            type="text" 
                            value={exp.company} 
                            onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)}
                            placeholder="e.g. Google"
                            className={inputClasses}
                          />
                        </div>
                      </V6Card>

                      <V6Card title="Period / Duration" description="Timeframe of employment." icon={Calendar} horizontal={true}>
                        <div className="w-full">
                          <input 
                            type="text" 
                            value={exp.duration} 
                            onChange={(e) => handleUpdateExp(exp.id, 'duration', e.target.value)}
                            placeholder="e.g. 2022 - Present"
                            className={inputClasses}
                          />
                        </div>
                      </V6Card>
                    </div>

                    <V6Card title="Professional Designation" description="Your specific role or title." icon={User} horizontal={true}>
                      <div className="w-full">
                        <input 
                          type="text" 
                          value={exp.role} 
                          onChange={(e) => handleUpdateExp(exp.id, 'role', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className={inputClasses}
                        />
                      </div>
                    </V6Card>

                    <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Terminal size={14} className="text-blue-500" />
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Projects & Contributions</h4>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {exp.clients.map((client, clientIdx) => (
                          <React.Fragment key={client.id}>
                            <V6Card 
                              title={client.name || "Contribution Name"} 
                              description="Outline specific impact or technical achievements."
                              icon={Terminal}
                              className="!shadow-none bg-slate-50/50 dark:bg-white/[0.01] border-dashed border-slate-200 dark:border-white/[0.08] hover:border-blue-500/30"
                              action={
                                <button 
                                  onClick={() => handleRemoveClient(exp.id, client.id)}
                                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              }
                            >
                              <div className="space-y-4 w-full">
                                <input 
                                  type="text" 
                                  value={client.name} 
                                  onChange={(e) => handleUpdateClient(exp.id, client.id, 'name', e.target.value)}
                                  placeholder="e.g. System Performance Optimization"
                                  className={inputClasses}
                                />
                                <textarea 
                                  value={client.bulletPoints.join('\n')} 
                                  onChange={(e) => handleUpdateBullets(exp.id, client.id, e.target.value)}
                                  placeholder="• Improved response times by 40% through lazy loading..."
                                  className={textareaClasses}
                                />
                              </div>
                            </V6Card>

                            <div className="py-2">
                              <AdUnit slot="8331566456" minHeight="100px" className="rounded-[1.5rem]" />
                            </div>
                          </React.Fragment>
                        ))}
                      </div>

                      <button 
                        onClick={() => handleAddClient(exp.id)}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/[0.08] hover:border-blue-500/30 hover:text-blue-500 transition-all shadow-sm group"
                      >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        Add New Contribution
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section-Level Ad Injection (Between companies) */}
            <div className="py-4">
              <AdUnit slot="8331566456" minHeight="120px" className="rounded-[2.5rem]" />
            </div>
          </React.Fragment>
        ))}

        <button 
          onClick={handleAddExp}
          className="w-full py-10 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/[0.02] transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
            <Plus size={28} />
          </div>
          Register Experience Unit
        </button>
      </div>
    </div>
  );
};

export default V6ExperienceEditor;
