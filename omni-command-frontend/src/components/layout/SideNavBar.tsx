import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/bookings', label: 'Bookings', icon: 'calendar_month' },
  { path: '/customers', label: 'Users', icon: 'group' },
  { path: '/inventory', label: 'Inventory', icon: 'inventory_2' },
  { path: '/analytics', label: 'Reports', icon: 'analytics' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export const SideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] z-40 transition-all duration-300 bg-surface-container-low/80 backdrop-blur-xl border-r border-outline-variant/10 flex flex-col pt-[64px] pb-4">
      <div className="px-6 py-8 flex flex-col items-center border-b border-outline-variant/5">
        <div className="w-12 h-12 mb-3 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">terminal</span>
        </div>
        <h3 className="font-headline-sm text-[16px] font-black text-on-surface m-0">System Admin</h3>
        <p className="font-label-md text-label-md text-on-surface-variant m-0 mt-1">Zone Alpha</p>
      </div>
      
      <nav className="flex-1 mt-4 overflow-y-auto px-2 space-y-1 relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out ${
                isActive
                  ? 'text-primary border-l-4 border-primary bg-primary/5 backdrop-blur-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface rounded-r-lg border-l-4 border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="px-2 pt-4 border-t border-outline-variant/5 relative z-10">
        <NavLink
          to="/auth"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface transition-all duration-200 ease-in-out rounded-r-lg border-l-4 border-transparent"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-md text-label-md">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};
