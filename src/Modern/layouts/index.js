import dynamic from "next/dynamic";

// Standard loading component for templates
const TemplateLoader = () => (
  <div className="w-full h-[800px] flex items-center justify-center bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 animate-pulse">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Blueprint...</span>
    </div>
  </div>
);

export const templates = {
  'template-1': { 
    id: 'template-1', 
    name: 'Leaf Live Premium', 
    component: dynamic(() => import('./LeafLivePremium').then(m => m.LeafLivePremium), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🌿' 
  },
  'template-2': { 
    id: 'template-2', 
    name: 'Standard ATS', 
    component: dynamic(() => import('./StandardATS').then(m => m.StandardATS), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🤖' 
  },
  'template-3': { 
    id: 'template-3', 
    name: 'Modern Professional', 
    component: dynamic(() => import('./ModernProfessional').then(m => m.ModernProfessional), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '💼' 
  },
  'template-4': { 
    id: 'template-4', 
    name: 'Tech Engineer', 
    component: dynamic(() => import('./TechEngineer').then(m => m.TechEngineer), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '💻' 
  },
  'template-5': { 
    id: 'template-5', 
    name: 'Elegant Indigo', 
    component: dynamic(() => import('./ElegantIndigo').then(m => m.ElegantIndigo), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🟣' 
  },
  'template-6': { 
    id: 'template-6', 
    name: 'Minimal Clean', 
    component: dynamic(() => import('./MinimalClean').then(m => m.MinimalClean), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🧊' 
  },
  'template-7': { 
    id: 'template-7', 
    name: 'Refined Minimalist', 
    component: dynamic(() => import('./RefinedMinimalist').then(m => m.RefinedMinimalist), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '✨' 
  },
  'template-8': { 
    id: 'template-8', 
    name: 'Marketing Creative', 
    component: dynamic(() => import('./MarketingCreative').then(m => m.MarketingCreative), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🎨' 
  },
  'template-9': { 
    id: 'template-9', 
    name: 'ATS Academic', 
    component: dynamic(() => import('./ATSAcademic').then(m => m.ATSAcademic), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🎓' 
  },
  'template-10': { 
    id: 'template-10', 
    name: 'ATS Professional', 
    component: dynamic(() => import('./ATSProfessional').then(m => m.ATSProfessional), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🏢' 
  },
  'template-11': { 
    id: 'template-11', 
    name: 'ATS Tech', 
    component: dynamic(() => import('./ATSTech').then(m => m.ATSTech), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '⚡' 
  },
  'template-12': { 
    id: 'template-12', 
    name: 'ATS Creative', 
    component: dynamic(() => import('./ATSCreative').then(m => m.ATSCreative), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🎭' 
  },
  'template-13': { 
    id: 'template-13', 
    name: 'ATS Engineering', 
    component: dynamic(() => import('./ATSEngineering').then(m => m.ATSEngineering), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🛠️' 
  },
  'template-14': { 
    id: 'template-14', 
    name: 'Leaf Design 2', 
    component: dynamic(() => import('./LeafDesign2').then(m => m.LeafDesign2), { ssr: false, loading: TemplateLoader }), 
    thumbnail: '🍀' 
  }
};
