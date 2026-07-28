import React, { useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { CheckoutDrawer } from '../specific/CheckoutDrawer';
import { POSModal } from '../specific/POSModal';
import { CommandPalette } from '../common/CommandPalette';
import { CustomerFormModal } from '../specific/CustomerFormModal';

export const AppLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isCheckoutOpen = searchParams.has('checkout');
  const checkoutStation = searchParams.get('checkout') || undefined;
  
  const isPosOpen = searchParams.has('pos') || searchParams.has('recharge');
  const posStation = searchParams.get('pos') || undefined;

  const isNewMemberOpen = searchParams.has('new_member');

  const closeOverlays = useCallback(() => {
    setSearchParams(prev => {
      prev.delete('checkout');
      prev.delete('pos');
      prev.delete('recharge');
      prev.delete('new_member');
      return prev;
    });
  }, [setSearchParams]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setSearchParams(prev => {
          prev.set('pos', 'GLOBAL');
          return prev;
        });
      }
      
      if (e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setSearchParams(prev => {
          prev.set('checkout', 'GLOBAL');
          return prev;
        });
      }

      if (e.key === 'Escape') {
        closeOverlays();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchParams, closeOverlays]);

  return (
    <>
      <div className="grid-bg">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-black text-[20vw] uppercase tracking-tighter opacity-[0.03] select-none text-on-surface">
            CRAFT
          </span>
        </div>
      </div>
      <div className="scanlines" />
      
      <TopNavBar />
      <SideNavBar />
      
      <main className="ml-[240px] pt-[64px] min-h-screen bg-transparent relative z-10">
        <div className="p-[2rem]">
          <Outlet />
        </div>
      </main>

      <CheckoutDrawer 
        isOpen={isCheckoutOpen} 
        stationId={checkoutStation} 
        onClose={closeOverlays} 
      />
      <POSModal 
        isOpen={isPosOpen} 
        stationId={posStation} 
        onClose={closeOverlays} 
      />
      <CustomerFormModal
        isOpen={isNewMemberOpen}
        onClose={closeOverlays}
      />
      
      <CommandPalette />
      <Toaster 
        theme="dark" 
        position="bottom-right" 
        toastOptions={{
          className: 'bg-surface-container-high border-outline-variant/10 text-on-surface glass-panel backdrop-blur-md shadow-premium-soft rounded-xl'
        }} 
      />
    </>
  );
};
