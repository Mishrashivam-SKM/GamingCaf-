import React from 'react';
import { PCStationCard, type PCStatus } from '../../components/specific/PCStationCard';

const mockStations = Array.from({ length: 20 }, (_, i) => {
  const isOccupied = Math.random() > 0.4;
  const status: PCStatus = isOccupied ? 'red' : Math.random() > 0.7 ? 'orange' : 'green';
  const progress = Math.floor(Math.random() * 90) + 5;
  const games = ["Valorant", "CS2", "League of Legends", "Apex Legends", "GTA V"];

  return {
    nodeId: `Node-${(i + 1).toString().padStart(2, '0')}`,
    status,
    userName: status !== 'green' ? `User ${i + 1}` : undefined,
    gameName: status === 'red' ? games[Math.floor(Math.random() * games.length)] : undefined,
    timeRemaining: status === 'red' ? `01:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00` : undefined,
    progressPercent: status === 'red' ? progress : undefined,
    reservationTime: status === 'orange' ? '16:30' : undefined,
  };
});

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-end mb-8 relative z-20">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Station Monitor</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Live overview of all terminal nodes across Zone Alpha.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/10 px-4 py-2 rounded">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse"></div> Available
          </div>
          <div className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/10 px-4 py-2 rounded">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse"></div> Occupied
          </div>
          <div className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/10 px-4 py-2 rounded">
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] animate-pulse"></div> Reserved
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-20">
        {mockStations.map((station) => (
          <PCStationCard key={station.nodeId} {...station} />
        ))}
      </div>
    </>
  );
};
