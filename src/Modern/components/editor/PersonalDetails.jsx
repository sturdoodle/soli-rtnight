import React from 'react';
import { User } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MinimalistInput from '../ui/MinimalistInput';
import { useResume } from '../../context/ResumeContext';

const PersonalDetails = () => {
  const { resumeData, updateField } = useResume();

  const handleChange = (e) => {
    updateField(e.target.name, e.target.value);
  };

  return (
    <GlassCard title="Personal Details" icon={User} isCollapsible={true}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6 px-2">
        <MinimalistInput
          label="Full Name"
          name="fullName"
          value={resumeData.fullName}
          onChange={handleChange}
          placeholder="e.g. Jane Doe"
        />
        <MinimalistInput
          label="Job Title"
          name="jobTitle"
          value={resumeData.jobTitle}
          onChange={handleChange}
          placeholder="e.g. Senior Software Engineer"
        />
        <MinimalistInput
          label="Location"
          name="location"
          value={resumeData.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore, India"
        />
        <MinimalistInput
          label="Phone"
          name="phone"
          value={resumeData.phone}
          onChange={handleChange}
          placeholder="e.g. +91 9876543210"
        />
        <MinimalistInput
          label="Email"
          name="email"
          value={resumeData.email}
          onChange={handleChange}
          placeholder="e.g. jane@example.com"
        />
        <MinimalistInput
          label="GitHub / Portfolio"
          name="github"
          value={resumeData.github}
          onChange={handleChange}
          placeholder="e.g. github.com/janedoe"
        />
      </div>
    </GlassCard>
  );
};

export default PersonalDetails;
