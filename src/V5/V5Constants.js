import { FileText, Layout, Zap } from 'lucide-react';

// export const isDevelopmentMode = false
export const isDevelopmentMode = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.') || window.location.hostname === '127.0.0.1');

export const TAB_META = {
  content: { title: "Personal Info", subtitle: "Enter your contact and professional details" },
  layout: { title: "Layout", subtitle: "Select a professional structure for your resume" },
  typography: { title: "Fonts", subtitle: "Choose professional fonts for maximum readability" },
  snapshots: { title: "Backups", subtitle: "Save and manage your resume drafts" },
  history: { title: "Backups", subtitle: "Save and manage your resume drafts" },
  help: { title: "Help & Guidance", subtitle: "Documentation & support for the Resume Builder." },
  about: { title: "About Us", subtitle: "Privacy First: Your data remains secure and private." }
};

export const ONBOARDING_STEPS = [
  { icon: FileText, title: "1. Personal Info", desc: "Build your profile with real-time formatting.", color: "blue" },
  { icon: Layout, title: "2. Layout", desc: "Switch structures and fonts instantly.", color: "indigo" },
  { icon: Zap, title: "3. Print/Save", desc: "Click the 'Resume' button to save as PDF, or use Ctrl+P.", color: "amber" }
];

