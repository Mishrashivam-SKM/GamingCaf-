import React from 'react';
import { KPIPill } from '../common/KPIPill';

export const TopNavBar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full h-[64px] z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center px-gutter">
      <div className="flex items-center gap-8">
        <span className="font-headline-sm text-headline-sm font-bold text-primary">OMNI COMMAND</span>
        
        <div className="hidden lg:flex items-center gap-3">
          <KPIPill label="Active PCs" value="12/20" />
          <KPIPill label="Available" value="8" valueColorClass="text-tertiary" />
          <KPIPill label="Today's Revenue" value="₹8,450" />
          <KPIPill label="Pending" value="₹1,200" valueColorClass="text-error" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-on-surface-variant">
          <button className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors bg-transparent border-none p-0">notifications</button>
          <button className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors bg-transparent border-none p-0">settings</button>
        </div>
        <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/20">
          <div className="text-right">
            <p className="font-label-md text-label-md text-on-surface m-0">Operator</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest m-0 leading-tight">Zone Alpha</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant/20">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary material-symbols-outlined text-[16px]">person</div>
          </div>
        </div>
      </div>
    </header>
  );
};
