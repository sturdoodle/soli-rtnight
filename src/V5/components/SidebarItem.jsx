import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick, disabled, activeColor, collapsed }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'lg:justify-start justify-center'} gap-4 py-2.5 px-4 rounded-2xl transition-all group ${disabled ? 'opacity-20 cursor-not-allowed' : ''}`}
    style={active ? {
      backgroundColor: `${activeColor}15`,
      color: activeColor,
      borderColor: `${activeColor}20`,
      borderWidth: '1px'
    } : {}}
    title={label}
  >
    <Icon size={18} className={`shrink-0 transition-all ${active ? 'scale-110 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'group-hover:scale-110 text-slate-500 group-hover:text-[var(--v5-heading)]'}`} />
    {!collapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden lg:block whitespace-nowrap">{label}</span>}
  </button>
);

export default SidebarItem;
