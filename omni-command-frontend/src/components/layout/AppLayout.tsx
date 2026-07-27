import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';

export const AppLayout: React.FC = () => {
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
    </>
  );
};
