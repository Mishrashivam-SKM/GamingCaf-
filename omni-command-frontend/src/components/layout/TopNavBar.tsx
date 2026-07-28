import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KPIPill } from '../common/KPIPill';
import { Bell, Settings, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

export const TopNavBar: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <header className="fixed top-0 w-full h-[64px] z-50 bg-surface/60 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center px-gutter shadow-sm transition-all duration-300">
      <div className="flex items-center gap-8">
        <span className="font-headline-sm text-[20px] font-black text-primary tracking-widest drop-shadow-[0_0_8px_rgba(173,198,255,0.4)]">
          OMNI COMMAND
        </span>
        
        <div className="hidden lg:flex items-center gap-3">
          <KPIPill label="Active PCs" value="12/20" />
          <KPIPill label="Available" value="8" valueColorClass="text-tertiary" />
          {role === 'ADMIN' && (
            <>
              <KPIPill label="Today's Revenue" value="₹8,450" />
              <KPIPill label="Pending" value="₹1,200" valueColorClass="text-error" />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <button 
            onClick={() => toast('System Update Available', { description: 'Version 2.4.1 is ready to be installed.' })}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 hover:text-primary transition-all duration-200 relative group"
          >
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-glow-primary animate-pulse-slow"></span>
          </button>
          {role === 'ADMIN' && (
            <button 
              onClick={() => navigate('/settings')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 hover:text-primary transition-all duration-200 group"
            >
              <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 pl-6 border-l border-white/10 h-10">
          <div className="text-right">
            <p className="font-label-md text-label-md text-on-surface m-0 font-bold">{role === 'ADMIN' ? 'Administrator' : 'Operator'}</p>
            <p className="text-[10px] text-primary uppercase tracking-widest m-0 leading-tight font-medium">Zone Alpha</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary/20 shadow-glow-primary cursor-pointer hover:border-primary transition-colors"
            onClick={() => toast.info('Operator profile coming soon!')}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
