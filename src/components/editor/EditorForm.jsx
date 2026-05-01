import React from 'react';
import PersonalDetails from '../../Modern/components/editor/PersonalDetails';
import SummarySection from '../../Modern/components/editor/SummarySection';
import ExperienceSection from '../../Modern/components/editor/ExperienceSection';
import ProjectsSection from '../../Modern/components/editor/ProjectsSection';
import EducationSection from '../../Modern/components/editor/EducationSection';
import CertificationsSection from '../../Modern/components/editor/CertificationsSection';
import SkillsSection from '../../Modern/components/editor/SkillsSection';
import FormattingTip from '../../Modern/components/editor/FormattingTip';

const EditorForm = ({ showFormattingTip = true, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {showFormattingTip && <FormattingTip />}
      <PersonalDetails />
      <SummarySection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <SkillsSection />
    </div>
  );
};

export default EditorForm;
