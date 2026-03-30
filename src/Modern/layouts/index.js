import { LeafLivePremium } from './LeafLivePremium';
import { StandardATS } from './StandardATS';
import { ModernProfessional } from './ModernProfessional';
import { TechEngineer } from './TechEngineer';
import { ElegantIndigo } from './ElegantIndigo';
import { MinimalClean } from './MinimalClean';
import { RefinedMinimalist } from './RefinedMinimalist';
import { MarketingCreative } from './MarketingCreative';

export const templates = {
  'template-1': { id: 'template-1', name: 'Leaf Live Premium', component: LeafLivePremium, thumbnail: '🌿' },
  'template-2': { id: 'template-2', name: 'Standard ATS', component: StandardATS, thumbnail: '🤖' },
  'template-3': { id: 'template-3', name: 'Modern Professional', component: ModernProfessional, thumbnail: '💼' },
  'template-4': { id: 'template-4', name: 'Tech Engineer', component: TechEngineer, thumbnail: '💻' },
  'template-5': { id: 'template-5', name: 'Elegant Indigo', component: ElegantIndigo, thumbnail: '🟣' },
  'template-6': { id: 'template-6', name: 'Minimal Clean', component: MinimalClean, thumbnail: '🧊' },
  'template-7': { id: 'template-7', name: 'Refined Minimalist', component: RefinedMinimalist, thumbnail: '✨' },
  'template-8': { id: 'template-8', name: 'Marketing Creative', component: MarketingCreative, thumbnail: '🎨' }
};
