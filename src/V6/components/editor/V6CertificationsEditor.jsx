import React from 'react';
import { Award, Plus, Trash2, ShieldCheck, Landmark } from 'lucide-react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';

const V6CertificationsEditor = () => {
  const { resumeData, updateSection } = useResume();
  const certifications = resumeData.certifications || [];

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";

  const handleUpdateCert = (id, field, value) => {
    const updatedCerts = certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateSection('certifications', updatedCerts);
  };

  const handleAddCert = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      issuer: '',
    };
    updateSection('certifications', [...certifications, newCert]);
  };

  const handleRemoveCert = (id) => {
    updateSection('certifications', certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Certifications</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          List your professional certifications, licenses, and honors.
        </p>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <React.Fragment key={cert.id}>
            <V6Card 
              title={cert.name || "New Certification"} 
              description={cert.issuer ? `Issued by: ${cert.issuer}` : "Detail the issuing organization and license name."}
              icon={Award}
              action={
                <button 
                  onClick={() => handleRemoveCert(cert.id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                >
                  <Trash2 size={18} />
                </button>
              }
            >
              <div className="space-y-5 w-full">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <ShieldCheck size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Certification Name</label>
                  </div>
                  <input 
                    type="text" 
                    value={cert.name} 
                    onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className={inputClasses}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 ml-1">
                    <Landmark size={12} className="text-slate-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Issuing Organization</label>
                  </div>
                  <input 
                    type="text" 
                    value={cert.issuer} 
                    onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className={inputClasses}
                  />
                </div>
              </div>
            </V6Card>

            {/* Dynamic Ad Injection: Show after EACH certification item */}
            <div className="py-2">
              <AdUnit slot="8331566456" minHeight="120px" className="rounded-[2.5rem]" />
            </div>
          </React.Fragment>
        ))}

        <button 
          onClick={handleAddCert}
          className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-[2rem] flex flex-col items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/[0.02] transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
            <Plus size={24} />
          </div>
          Add New Certification
        </button>
      </div>
    </div>
  );
};

export default V6CertificationsEditor;
