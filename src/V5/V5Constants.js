import { FileText, Layout, Zap } from 'lucide-react';

// export const isDevelopmentMode = false
export const isDevelopmentMode = window.location.hostname === 'localhost' ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname === '127.0.0.1';

export const TAB_META = {
  content: { title: "Identity", subtitle: "Create a compelling professional profile" },
  layout: { title: "Layout", subtitle: "Select a professional structure for your resume" },
  typography: { title: "Typography", subtitle: "Choose professional fonts for maximum readability" },
  snapshots: { title: "Backups", subtitle: "Save and manage your resume drafts" },
  history: { title: "Backups", subtitle: "Save and manage your resume drafts" },
  help: { title: "Help & Guidance", subtitle: "Master the V5 Resume Builder Ecosystem." },
  about: { title: "About Us", subtitle: "Privacy First: Your data remains secure and private." }
};

export const ONBOARDING_STEPS = [
  { icon: FileText, title: "1. Identity", desc: "Build your profile with real-time markdown formatting.", color: "blue" },
  { icon: Layout, title: "2. Refine", desc: "Switch structures and typography instantly.", color: "indigo" },
  { icon: Zap, title: "3. Deploy", desc: "Click the 'Resume' button to save as PDF, or use Ctrl+P.", color: "amber" }
];
