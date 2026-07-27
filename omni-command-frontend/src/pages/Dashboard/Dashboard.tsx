import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Activity } from 'lucide-react';
import { PCStationCard, type PCStatus } from '../../components/specific/PCStationCard';
import { Ambient3D } from '../../components/specific/Ambient3D';
import { DashboardWidgets } from '../../components/specific/DashboardWidgets';
import { useStations } from '../../hooks/queries/useStations';
import { useSessions } from '../../hooks/queries/useSessions';
import { useCustomers } from '../../hooks/queries/useCustomers';

import { StationManagerModal } from '../../components/specific/StationManagerModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const Dashboard: React.FC = () => {
  const { data: stations, isLoading: loadingStations, refetch: refetchStations } = useStations();
  const { data: sessions, refetch: refetchSessions } = useSessions();
  const { data: customers } = useCustomers();

  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  const mappedStations = useMemo(() => {
    if (!stations) return [];

    return stations.map(station => {
      let status: PCStatus = 'green';
      if (station.status === 'IN_USE') status = 'red';
      else if (station.status === 'RESERVED') status = 'orange';
      
      let userName, timeRemaining, progressPercent, gameName, reservationTime;
      
      if (station.status === 'IN_USE' && station.currentSessionId && sessions) {
        const session = sessions.find(s => s.id === station.currentSessionId);
        if (session) {
          if (session.customerId && customers) {
            const customer = customers.find(c => c.id === session.customerId);
            userName = customer?.name;
          } else {
            userName = session.guestName || 'Guest';
          }
          
          const start = new Date(session.startTime).getTime();
          const now = Date.now();
          const elapsedMin = Math.floor((now - start) / 60000);
          
          if (session.durationMinutes) {
            const remainingMin = Math.max(0, session.durationMinutes - elapsedMin);
            const hrs = Math.floor(remainingMin / 60);
            const mins = remainingMin % 60;
            timeRemaining = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
            progressPercent = Math.min(100, Math.floor((elapsedMin / session.durationMinutes) * 100));
          } else {
            const hrs = Math.floor(elapsedMin / 60);
            const mins = elapsedMin % 60;
            timeRemaining = `+${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
            progressPercent = (elapsedMin % 60) / 60 * 100;
          }
          
          const games = ["Valorant", "CS2", "League of Legends", "Apex Legends"];
          gameName = games[Math.floor(Math.random() * games.length)];
        }
      } else if (station.status === 'RESERVED') {
        reservationTime = '16:30';
        userName = 'Reserved User';
      }

      return {
        id: station.id,
        nodeId: station.name,
        status,
        userName,
        gameName,
        timeRemaining,
        progressPercent,
        reservationTime,
      };
    });
  }, [stations, sessions, customers]);

  const stats = useMemo(() => {
    return {
      available: mappedStations.filter(s => s.status === 'green').length,
      occupied: mappedStations.filter(s => s.status === 'red').length,
      reserved: mappedStations.filter(s => s.status === 'orange').length,
    };
  }, [mappedStations]);

  const handleUpdate = () => {
    refetchStations();
    refetchSessions();
  };

  const selectedStation = stations?.find(s => s.id === selectedStationId) || null;
  const activeSession = selectedStation?.currentSessionId 
    ? sessions?.find(s => s.id === selectedStation?.currentSessionId) || null 
    : null;

  return (
    <div className="pb-12 max-w-[1600px] mx-auto relative min-h-screen">
      <Ambient3D />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 relative z-20 gap-6"
      >
        <div>
          <h1 className="font-headline-lg text-[36px] text-on-surface m-0 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Monitor className="w-6 h-6 text-primary" />
            </div>
            Station Monitor
          </h1>
          <p className="font-body-md text-on-surface-variant m-0 mt-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500 animate-pulse-slow" />
            Live overview of all terminal nodes across Zone Alpha.
          </p>
        </div>
        
        <div className="flex gap-3 bg-surface-container-high/40 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-label-md font-bold text-on-surface bg-surface-container px-4 py-2 rounded-lg border border-white/5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow-green animate-pulse-slow"></div> 
            <span className="text-on-surface-variant">Available</span>
            <span className="ml-1 text-green-400">{stats.available}</span>
          </div>
          <div className="flex items-center gap-2 text-label-md font-bold text-on-surface bg-surface-container px-4 py-2 rounded-lg border border-white/5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-glow-red animate-pulse-slow"></div> 
            <span className="text-on-surface-variant">Occupied</span>
            <span className="ml-1 text-red-400">{stats.occupied}</span>
          </div>
          <div className="flex items-center gap-2 text-label-md font-bold text-on-surface bg-surface-container px-4 py-2 rounded-lg border border-white/5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-glow-orange animate-pulse-slow"></div> 
            <span className="text-on-surface-variant">Reserved</span>
            <span className="ml-1 text-orange-400">{stats.reserved}</span>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-8 relative z-20">
        <div className="flex-1">
          {loadingStations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[220px] bg-surface-container animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
            >
              {mappedStations.map((station) => (
                <PCStationCard 
                  key={station.id} 
                  {...station} 
                  onClick={() => setSelectedStationId(station.id)}
                />
              ))}
            </motion.div>
          )}
        </div>

        <DashboardWidgets />
      </div>

      <StationManagerModal
        isOpen={!!selectedStationId}
        onClose={() => setSelectedStationId(null)}
        stationId={selectedStationId}
        station={selectedStation}
        activeSession={activeSession}
        onUpdate={handleUpdate}
      />
    </div>
  );
};
