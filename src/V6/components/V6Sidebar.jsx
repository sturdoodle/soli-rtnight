import React, { useState } from 'react';
import {
  User, FileText, Code, Settings, Briefcase, GraduationCap, Layout, Award, ChevronLeft, ChevronRight, Zap, Search,
  History, X, Palette, Type, Grid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../../Modern/context/ResumeContext';

const V6Sidebar = ({ activeSection, onSectionChange, isCollapsed, onToggleCollapse, isMobile, onClose }) => {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const step1Items = [
    { id: 'contact', label: 'Contact Details', icon: User },
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Tools', icon: Code },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const step2Items = [
    { id: 'templates', label: 'Choose Template', icon: Grid },
    { id: 'typography', label: 'Typeface & Fonts', icon: Type },
    { id: 'appearance', label: 'Theme & Colors', icon: Palette },
  ];

  const filterItems = (items) => items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStep1 = filterItems(step1Items);
  const filteredStep2 = filterItems(step2Items);

  const themeColor = resumeData.themeColor || '#4f46e5';

  return (
    <motion.aside
      layout
      initial={false}
      animate={{ width: isCollapsed && !isMobile ? 64 : isMobile ? '100%' : 256 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={`border-r border-slate-200 dark:border-white/[0.06] bg-[#f9fafb] dark:bg-[#08080a] h-full flex flex-col overflow-y-auto shrink-0 z-50 shadow-xl shadow-black/[0.02] ${isMobile ? 'w-full' : ''}`}
    >
      <div className={`p-4 border-b border-slate-200 dark:border-white/[0.06] flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'}`}>
        {(!isCollapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
            <h2 className="font-black text-sm text-slate-900 dark:text-white tracking-tight uppercase">qpkendra</h2>
          </motion.div>
        )}

        {isMobile ? (
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-xl transition-colors text-slate-400 flex items-center gap-1"
          >
            <span className="text-[10px] font-black uppercase tracking-widest mr-1">Close</span>
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-lg transition-colors text-slate-400"
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
              <ChevronLeft size={16} />
            </motion.div>
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="relative group flex justify-center">
          <AnimatePresence>
            {(!isSearchFocused && !searchQuery) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`${isCollapsed && !isMobile ? '' : 'absolute left-3'} top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10`}
              >
                <Search size={14} />
              </motion.div>
            )}
          </AnimatePresence>

          {(!isCollapsed || isMobile) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSearchFocused ? "" : "      Search tools..."}
                className="w-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-xl py-2.5 pl-3 pr-8 text-xs font-semibold focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400"
                style={{
                  boxShadow: isSearchFocused ? `0 0 0 2px ${themeColor}33` : 'none',
                  borderColor: isSearchFocused ? themeColor : undefined
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={12} />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 px-3 space-y-8 pb-6 overflow-x-hidden pt-2">
        {/* Step 1: Content */}
        <div className="space-y-1">
          {(!isCollapsed || isMobile) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 py-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Step 1: Content</span>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/[0.05] ml-4" />
            </motion.div>
          )}
          {filteredStep1.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              title={isCollapsed && !isMobile ? item.label : ''}
              className={`w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group relative ${activeSection === item.id
                  ? 'bg-blue-50/50 dark:bg-white/[0.02]'
                  : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-white'
                }`}
              style={{ color: activeSection === item.id ? themeColor : undefined }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} style={{ color: activeSection === item.id ? themeColor : undefined }} className={activeSection === item.id ? '' : 'text-slate-400 group-hover:text-slate-500'} />
                {(!isCollapsed || isMobile) && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap">{item.label}</motion.span>}
              </div>
              {activeSection === item.id && (
                <motion.div layoutId="active-nav-indicator" className="absolute left-[-12px] top-1.5 bottom-1.5 w-1 rounded-r-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
              )}
            </button>
          ))}
        </div>

        {/* Step 2: Design */}
        <div className="space-y-1">
          {(!isCollapsed || isMobile) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 py-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Step 2: Design</span>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/[0.05] ml-4" />
            </motion.div>
          )}
          {filteredStep2.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              title={isCollapsed && !isMobile ? item.label : ''}
              className={`w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group relative ${activeSection === item.id
                  ? 'bg-blue-50/50 dark:bg-white/[0.02]'
                  : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-white'
                }`}
              style={{ color: activeSection === item.id ? themeColor : undefined }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} style={{ color: activeSection === item.id ? themeColor : undefined }} className={activeSection === item.id ? '' : 'text-slate-400 group-hover:text-slate-500'} />
                {(!isCollapsed || isMobile) && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap">{item.label}</motion.span>}
              </div>
              {activeSection === item.id && (
                <motion.div layoutId="active-nav-indicator" className="absolute left-[-12px] top-1.5 bottom-1.5 w-1 rounded-r-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
              )}
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-1">
          {(!isCollapsed || isMobile) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 py-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">System</span>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/[0.05] ml-4" />
            </motion.div>
          )}
          <button
            onClick={() => onSectionChange('settings')}
            className={`w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group relative ${activeSection === 'settings'
                ? 'bg-blue-50/50 dark:bg-white/[0.02]'
                : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-white'
              }`}
            style={{ color: activeSection === 'settings' ? themeColor : undefined }}
          >
            <div className="flex items-center gap-3">
              <Settings size={18} style={{ color: activeSection === 'settings' ? themeColor : undefined }} className={activeSection === 'settings' ? '' : 'text-slate-400 group-hover:text-slate-500'} />
              {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Settings</span>}
            </div>
            {activeSection === 'settings' && (
              <motion.div layoutId="active-nav-indicator" className="absolute left-[-12px] top-1.5 bottom-1.5 w-1 rounded-r-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
            )}
          </button>
          <button
            onClick={() => navigate('/v5')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all group"
            title={isCollapsed && !isMobile ? "Legacy Editor (V5)" : ""}
          >
            <History size={18} className="text-slate-400 group-hover:text-rose-500" />
            {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Legacy V5</span>}
          </button>
        </div>
      </div>


    </motion.aside>
  );
};

export default V6Sidebar;
