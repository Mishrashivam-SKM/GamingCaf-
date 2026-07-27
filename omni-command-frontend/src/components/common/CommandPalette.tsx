import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, Monitor, Users, Calendar, Settings, Package, Activity, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh] bg-background/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-surface-container border border-white/10 shadow-premium-soft glass-panel"
          >
            <div className="flex items-center border-b border-white/5 px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-on-surface-variant" />
              <Command.Input 
                autoFocus
                placeholder="Search commands, stations, or players..." 
                className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant/50 outline-none font-body-md"
              />
              <div className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                <kbd>esc</kbd>
              </div>
            </div>
            
            <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-hide">
              <Command.Empty className="py-6 text-center text-sm text-on-surface-variant">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-semibold text-on-surface-variant/70 mb-1">
                <Command.Item onSelect={() => runCommand(() => navigate('/'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Monitor className="h-4 w-4" />
                  <span>Dashboard (Station Monitor)</span>
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => navigate('/bookings'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Bookings</span>
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => navigate('/customers'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => navigate('/inventory'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Inventory</span>
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => navigate('/analytics'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Activity className="h-4 w-4" />
                  <span>Analytics</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Quick Actions" className="px-2 py-1 text-xs font-semibold text-on-surface-variant/70 mb-1 mt-2">
                <Command.Item onSelect={() => runCommand(() => navigate('/?pos=quick'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Terminal className="h-4 w-4" />
                  <span>Quick POS Sale</span>
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => navigate('/settings'))} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-on-surface transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>System Settings</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
};
