import React from 'react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active, onClick, disabled, activeColor, collapsed }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'lg:justify-start justify-center'} gap-4 py-2 px-4 rounded-xl transition-all group relative ${disabled ? 'opacity-20 cursor-not-allowed' : ''}`}
    title={label}
    style={{ color: active ? activeColor : 'inherit' }}
  >
    {active && (
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 rounded-xl z-0"
        style={{ backgroundColor: `${activeColor}15`, border: `1px solid ${activeColor}20` }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    
    <div className="relative z-10 flex items-center gap-4">
      <Icon size={18} className={`shrink-0 transition-all ${active ? 'scale-110 text-[var(--v5-heading)]' : 'group-hover:scale-110 text-slate-500 group-hover:text-[var(--v5-heading)]'}`} />
      {!collapsed && <span className={`text-[10px] font-black uppercase tracking-[0.2em] hidden lg:block whitespace-nowrap ${active ? 'text-[var(--v5-heading)]' : 'text-slate-500'}`}>{label}</span>}
    </div>
  </button>
);


export default SidebarItem;
