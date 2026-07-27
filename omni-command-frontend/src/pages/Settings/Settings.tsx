import React from 'react';
import { MatteCard } from '../../components/common/MatteCard';
import { PremiumInput } from '../../components/common/PremiumInput';

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)]">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">System Settings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Configure global parameters and security overrides.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">save</span>
            SAVE CHANGES
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-20 overflow-y-auto custom-scrollbar pb-8 pr-2">
        <MatteCard>
          <h3 className="font-headline-sm text-on-surface mb-6 border-b border-outline-variant/20 pb-4 m-0 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">security</span>
            Security Policy
          </h3>
          <div className="space-y-6">
            <PremiumInput label="SESSION TIMEOUT (MINUTES)" defaultValue="30" type="number" />
            <PremiumInput label="2FA REQUIREMENT" defaultValue="Administrators Only" />
            <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg border border-outline-variant/10">
              <div>
                <p className="font-label-md text-on-surface m-0">STRICT IP LOCKING</p>
                <p className="font-body-sm text-on-surface-variant m-0 mt-1">Only allow logins from designated cafe subnets.</p>
              </div>
              <div className="w-10 h-5 rounded-full bg-primary relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(173,198,255,0.4)]">
                <div className="absolute right-1 top-0.5 w-4 h-4 rounded-full bg-on-primary" />
              </div>
            </div>
          </div>
        </MatteCard>

        <MatteCard>
          <h3 className="font-headline-sm text-on-surface mb-6 border-b border-outline-variant/20 pb-4 m-0 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            Billing Configuration
          </h3>
          <div className="space-y-6">
            <PremiumInput label="BASE HOURLY RATE (₹)" defaultValue="150" type="number" />
            <PremiumInput label="WEEKEND MULTIPLIER" defaultValue="1.2" type="number" step="0.1" />
            <PremiumInput label="TAX RATE (%)" defaultValue="18" type="number" />
          </div>
        </MatteCard>
      </div>
    </div>
  );
};
