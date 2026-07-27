import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, Package, Activity, Settings, LogOut, TerminalSquare } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/bookings', label: 'Bookings', icon: Calendar },
  { path: '/customers', label: 'Users', icon: Users },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/analytics', label: 'Reports', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const SideNavBar: React.FC = () => {
  const location = useLocation();

  return (
    <aside aria-label="Sidebar Navigation" className="fixed left-0 top-0 h-full w-[240px] z-40 transition-all duration-300 bg-surface-container-low/60 backdrop-blur-2xl border-r border-white/5 flex flex-col pt-[64px] pb-4 shadow-xl">
      <div className="px-6 py-8 flex flex-col items-center border-b border-white/5 relative group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 mb-3 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl flex items-center justify-center text-primary shadow-glow-primary"
          aria-hidden="true"
        >
          <TerminalSquare className="w-6 h-6" />
        </motion.div>
        <h3 className="font-headline-sm text-[16px] font-black text-on-surface m-0 tracking-wide">SYSTEM ADMIN</h3>
        <p className="font-label-md text-label-md text-primary/70 m-0 mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-glow-green animate-pulse-slow" aria-hidden="true" />
          Zone Alpha
        </p>
      </div>
      
      <nav aria-label="Main Navigation" className="flex-1 mt-6 overflow-y-auto px-3 space-y-2 relative z-10 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to ${item.label}`}
              className={`relative flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-out rounded-xl group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container ${
                isActive
                  ? 'text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {!isActive && (
                <div className="absolute inset-0 bg-surface-container-high/0 group-hover:bg-surface-container-high/50 rounded-xl transition-colors duration-200" />
              )}

              <div className="relative z-10 flex items-center gap-3 w-full">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} aria-hidden="true" />
                <span className="font-label-md text-sm">{item.label}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="px-3 pt-4 border-t border-white/5 relative z-10">
        <NavLink
          to="/auth"
          aria-label="Logout from system"
          className="relative flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-all duration-200 ease-out rounded-xl group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container"
        >
          <div className="absolute inset-0 bg-error/0 group-hover:bg-error/10 rounded-xl transition-colors duration-200" />
          <div className="relative z-10 flex items-center gap-3">
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            <span className="font-label-md text-sm">Logout</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
