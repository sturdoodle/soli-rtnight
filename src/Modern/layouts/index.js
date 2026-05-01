"use client";

import { LeafLivePremium } from './LeafLivePremium';
import { StandardATS } from './StandardATS';
import { ModernProfessional } from './ModernProfessional';
import { TechEngineer } from './TechEngineer';
import { ElegantIndigo } from './ElegantIndigo';
import { MinimalClean } from './MinimalClean';
import { RefinedMinimalist } from './RefinedMinimalist';
import { MarketingCreative } from './MarketingCreative';
import { ATSAcademic } from './ATSAcademic';
import { ATSProfessional } from './ATSProfessional';
import { ATSTech } from './ATSTech';
import { ATSCreative } from './ATSCreative';
import { ATSEngineering } from './ATSEngineering';
import { LeafDesign2 } from './LeafDesign2';

export const templates = {
  'template-1': { id: 'template-1', name: 'Leaf Live Premium', component: LeafLivePremium, thumbnail: '🌿' },
  'template-2': { id: 'template-2', name: 'Standard ATS', component: StandardATS, thumbnail: '🤖' },
  'template-3': { id: 'template-3', name: 'Modern Professional', component: ModernProfessional, thumbnail: '💼' },
  'template-4': { id: 'template-4', name: 'Tech Engineer', component: TechEngineer, thumbnail: '💻' },
  'template-5': { id: 'template-5', name: 'Elegant Indigo', component: ElegantIndigo, thumbnail: '🟣' },
  'template-6': { id: 'template-6', name: 'Minimal Clean', component: MinimalClean, thumbnail: '🧊' },
  'template-7': { id: 'template-7', name: 'Refined Minimalist', component: RefinedMinimalist, thumbnail: '✨' },
  'template-8': { id: 'template-8', name: 'Marketing Creative', component: MarketingCreative, thumbnail: '🎨' },
  'template-9': { id: 'template-9', name: 'ATS Academic', component: ATSAcademic, thumbnail: '🎓' },
  'template-10': { id: 'template-10', name: 'ATS Professional', component: ATSProfessional, thumbnail: '🏢' },
  'template-11': { id: 'template-11', name: 'ATS Tech', component: ATSTech, thumbnail: '⚡' },
  'template-12': { id: 'template-12', name: 'ATS Creative', component: ATSCreative, thumbnail: '🎭' },
  'template-13': { id: 'template-13', name: 'ATS Engineering', component: ATSEngineering, thumbnail: '🛠️' },
  'template-14': { id: 'template-14', name: 'Leaf Design 2', component: LeafDesign2, thumbnail: '🍀' }
};
