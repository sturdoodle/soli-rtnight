import React, { lazy, Suspense } from 'react';

// Granular Lazy Loading for Performance Optimization on 4G Networks
const PersonalDetails = lazy(() => import('../../Modern/components/editor/PersonalDetails'));
const SummarySection = lazy(() => import('../../Modern/components/editor/SummarySection'));
const ExperienceSection = lazy(() => import('../../Modern/components/editor/ExperienceSection'));
const ProjectsSection = lazy(() => import('../../Modern/components/editor/ProjectsSection'));
const EducationSection = lazy(() => import('../../Modern/components/editor/EducationSection'));
const CertificationsSection = lazy(() => import('../../Modern/components/editor/CertificationsSection'));
const SkillsSection = lazy(() => import('../../Modern/components/editor/SkillsSection'));
const FormattingTip = lazy(() => import('../../Modern/components/editor/FormattingTip'));

// Premium Shimmer for Individual Sections
const SectionLoading = () => (
  <div className="w-full h-20 rounded-[2rem] bg-slate-100/50 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
);

const EditorForm = ({ showFormattingTip = true, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <Suspense fallback={<SectionLoading />}>
        {showFormattingTip && <FormattingTip />}
        <PersonalDetails />
        <SummarySection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <SkillsSection />
      </Suspense>
    </div>
  );
};

export default EditorForm;
