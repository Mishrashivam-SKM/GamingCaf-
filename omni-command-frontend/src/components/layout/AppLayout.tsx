import React, { useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { CheckoutDrawer } from '../specific/CheckoutDrawer';
import { POSModal } from '../specific/POSModal';

export const AppLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isCheckoutOpen = searchParams.has('checkout');
  const checkoutStation = searchParams.get('checkout') || undefined;
  
  const isPosOpen = searchParams.has('pos');
  const posStation = searchParams.get('pos') || undefined;

  const closeOverlays = useCallback(() => {
    setSearchParams(prev => {
      prev.delete('checkout');
      prev.delete('pos');
      return prev;
    });
  }, [setSearchParams]);

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
    </>
  );
};
