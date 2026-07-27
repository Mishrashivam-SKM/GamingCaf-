import React, { useState, useEffect } from 'react';
import { MatteCard } from '../../components/common/MatteCard';
import { PremiumInput } from '../../components/common/PremiumInput';
import { useSettings, useUpdateSettings } from '../../hooks/queries/useSettings';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isLoading: isSaving } = useUpdateSettings();

  const [formState, setFormState] = useState<{
    theme: 'light' | 'dark' | 'system';
    currency: string;
    taxRate: number;
    storeName: string;
  }>({
    theme: 'dark',
    currency: 'USD',
    taxRate: 0.08,
    storeName: 'OmniCommand HQ'
  });

  useEffect(() => {
    if (settings) {
      setFormState({
        theme: settings.theme,
        currency: settings.currency,
        taxRate: settings.taxRate,
        storeName: settings.storeName
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings(formState);
      toast.success('Settings saved successfully');
    } catch (e) {
      console.error(e);
      toast.error('Failed to save settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)]">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">System Settings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Configure global parameters and security overrides.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[18px]">save</span>}
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
            <PremiumInput 
              label="STORE NAME" 
              value={formState.storeName} 
              onChange={(e: any) => setFormState(s => ({ ...s, storeName: e.target.value }))}
            />
            <PremiumInput 
              label="CURRENCY" 
              value={formState.currency} 
              onChange={(e: any) => setFormState(s => ({ ...s, currency: e.target.value }))}
            />
            <PremiumInput 
              label="TAX RATE (%)" 
              type="number"
              value={(formState.taxRate * 100).toString()} 
              onChange={(e: any) => setFormState(s => ({ ...s, taxRate: Number(e.target.value) / 100 }))}
            />
          </div>
        </MatteCard>
      </div>
    </div>
  );
};
