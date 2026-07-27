import React from 'react';
import { MatteCard } from '../../components/common/MatteCard';

export const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)]">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Executive Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Revenue breakdowns, occupancy rates, and system performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface px-4 py-2 rounded-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            EXPORT REPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 z-20 relative">
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">TODAY'S REVENUE</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">₹12,450</h2>
          <p className="text-green-500 font-label-md text-xs mt-2 m-0">+14% vs last week</p>
        </MatteCard>
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">AVG OCCUPANCY</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">82%</h2>
          <p className="text-green-500 font-label-md text-xs mt-2 m-0">+5% vs last week</p>
        </MatteCard>
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">NEW SIGNUPS</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">18</h2>
          <p className="text-on-surface-variant font-label-md text-xs mt-2 m-0">Steady</p>
        </MatteCard>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        <MatteCard className="flex flex-col">
          <h3 className="font-headline-sm text-on-surface mb-6 m-0">Revenue Trend</h3>
          <div className="flex-1 flex items-center justify-center border border-outline-variant/10 bg-background/50 rounded-lg min-h-[200px]">
            <p className="text-on-surface-variant font-body-sm italic m-0 flex items-center gap-2">
              <span className="material-symbols-outlined">bar_chart</span>
              Chart Placeholder (Recharts)
            </p>
          </div>
        </MatteCard>
        <MatteCard className="flex flex-col">
          <h3 className="font-headline-sm text-on-surface mb-6 m-0">Popular Games</h3>
          <div className="flex-1 flex items-center justify-center border border-outline-variant/10 bg-background/50 rounded-lg min-h-[200px]">
            <p className="text-on-surface-variant font-body-sm italic m-0 flex items-center gap-2">
              <span className="material-symbols-outlined">pie_chart</span>
              Chart Placeholder (Recharts)
            </p>
          </div>
        </MatteCard>
      </div>
    </div>
  );
};
