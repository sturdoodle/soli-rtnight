import React from 'react';
import V6Card from '../../ui/V6Card';
import { useResume } from '../../../Modern/context/ResumeContext';
import AdUnit from '../../../components/AdUnit';
import { User, Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';

const V6ContactEditor = () => {
  const { resumeData, updateField } = useResume();

  const inputClasses = "w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-3.5 px-5 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all outline-none shadow-sm";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Contact Details</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Tell us how employers can reach you.
        </p>
      </div>

      <V6Card title="Full Name" description="Your name as it should appear." icon={User} horizontal={true}>
        <div className="sm:w-[320px]">
          <input 
            type="text" 
            value={resumeData.fullName || ''} 
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="John Doe"
            className={inputClasses}
          />
        </div>
      </V6Card>

      <V6Card title="Job Title" description="Your professional headline." icon={Briefcase} horizontal={true}>
        <div className="sm:w-[320px]">
          <input 
            type="text" 
            value={resumeData.jobTitle || ''} 
            onChange={(e) => updateField('jobTitle', e.target.value)}
            placeholder="Senior Software Engineer"
            className={inputClasses}
          />
        </div>
      </V6Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <V6Card title="Email" description="Primary contact." icon={Mail}>
          <input 
            type="email" 
            value={resumeData.email || ''} 
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="jane.doe@example.com"
            className={inputClasses}
          />
        </V6Card>
        <V6Card title="Phone" description="Mobile number." icon={Phone}>
          <input 
            type="tel" 
            value={resumeData.phoneNumber || ''} 
            onChange={(e) => updateField('phoneNumber', e.target.value)}
            placeholder="+1 234 567 890"
            className={inputClasses}
          />
        </V6Card>
      </div>

      <V6Card title="Location" description="City, State, or Remote." icon={MapPin} horizontal={true}>
        <div className="sm:w-[320px]">
          <input 
            type="text" 
            value={resumeData.location || ''} 
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="New York, NY"
            className={inputClasses}
          />
        </div>
      </V6Card>

      <V6Card title="Social Presence" description="Your professional links online." icon={Globe}>
        <div className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 w-24 shrink-0">LinkedIn</span>
            <input 
              type="text" 
              value={resumeData.linkedin || ''} 
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 w-24 shrink-0">GitHub</span>
            <input 
              type="text" 
              value={resumeData.github || ''} 
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="github.com/username"
              className={inputClasses}
            />
          </div>
        </div>
      </V6Card>

      <div className="pt-6">
        <AdUnit 
            slot="8331566456" 
            minHeight="120px" 
            className="rounded-[2rem]"
        />
      </div>
    </div>
  );
};

export default V6ContactEditor;
