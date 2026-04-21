import { useMemo } from 'react';

export const useAtsScore = (resumeData) => {
  const atsScore = useMemo(() => {
    if (!resumeData.atsMode) return 0;
    let score = 0;
    const data = resumeData;

    // Pillar A: Content Integrity (85% Max)
    // 1. Professional Identity (20%) - 4% each for essentials
    if (data.fullName) score += 4;
    if (data.jobTitle) score += 4;
    if (data.location) score += 4;
    if (data.email) score += 4;
    if (data.phone) score += 4;

    // 2. Career Narrative (25%) - Increased weight for universal experience
    if (data.experience && data.experience.length > 0) {
      score += 10; // Foundational entry
      if (data.experience.length > 1) score += 10; // Career progression
      const hasDetailedBullets = data.experience.some(exp => exp.clients?.some(c => c.bulletPoints?.length > 0));
      if (hasDetailedBullets) score += 5; // Descriptive depth
    }

    // 3. Core Competencies (15%) - Skills & Expertise
    if (data.skills && data.skills.length > 0) {
      score += 10; // Skill categorization
      const totalSkillsCount = data.skills.reduce((acc, cat) => acc + (cat.items?.split(',').filter(i => i.trim()).length || 0), 0);
      if (totalSkillsCount > 8) score += 5; // Skill density
    }

    // 4. Academic Foundation (10%) - Education
    if (data.education && data.education.length > 0) {
      score += 5; // Institutional presence
      if (data.education.length > 1) score += 5; // Academic progression
    }

    // 5. Professional Summary (10%) - Strategic Narrative
    if (data.summary) {
      score += 5; // Existence
      if (data.summary.length > 120) score += 5; // Strategic depth
    }

    // 6. External Validation (5%) - Evidence & Supplemental
    if (data.github || (data.projects && data.projects.length > 0) || (data.certifications && data.certifications.length > 0)) {
      score += 5; // Validating proof
    }

    // Pillar B: Structural Optimization (15% Max)
    if (data.atsMode) {
      score += 15; // Machine-Readability Bonus
    }

    return Math.min(score, 100);
  }, [resumeData, resumeData.atsMode]);

  return atsScore;
};
