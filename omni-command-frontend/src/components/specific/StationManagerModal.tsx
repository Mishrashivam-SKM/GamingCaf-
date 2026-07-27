import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Square, Clock, Monitor } from 'lucide-react';
import type { Station, Session } from '../../types/models';
import { db } from '../../services/db';
import { toast } from 'sonner';

interface StationManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string | null;
  station: Station | null;
  activeSession: Session | null;
  onUpdate: () => void;
}

export const StationManagerModal: React.FC<StationManagerModalProps> = ({
  isOpen, onClose, station, activeSession, onUpdate
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !station) return null;

  const handleStartSession = async () => {
    setIsLoading(true);
    try {
      const newSession = await db.create('sessions', {
        stationId: station.id,
        guestName: 'Guest Gamer',
        startTime: new Date().toISOString(),
        cost: 0,
        status: 'ACTIVE'
      });
      await db.update('stations', station.id, {
        status: 'IN_USE',
        currentSessionId: newSession.id
      });
      toast.success('Session started successfully');
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      toast.error('Failed to start session');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    setIsLoading(true);
    try {
      await db.update('sessions', activeSession.id, {
        status: 'COMPLETED',
        endTime: new Date().toISOString(),
        cost: 15.00 // mock cost
      });
      await db.update('stations', station.id, {
        status: 'AVAILABLE',
        currentSessionId: null
      });
      toast.success('Session ended successfully');
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      toast.error('Failed to end session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface-container-high rounded-2xl border border-white/10 shadow-premium-hard overflow-hidden flex flex-col z-10"
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container-highest/50">
            <h2 className="text-[20px] font-headline-sm text-on-surface flex items-center gap-3 m-0">
              <Monitor className="w-5 h-5 text-primary" />
              Manage Terminal {station.name}
            </h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-surface-container rounded-xl p-4 border border-white/5 flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${station.status === 'AVAILABLE' ? 'bg-green-500 shadow-glow-green' : station.status === 'IN_USE' ? 'bg-red-500 shadow-glow-red' : 'bg-orange-500 shadow-glow-orange'}`} />
              <div>
                <p className="text-[14px] text-on-surface-variant m-0">Current Status</p>
                <p className="text-[16px] font-bold text-on-surface m-0 uppercase tracking-wider">{station.status.replace('_', ' ')}</p>
              </div>
            </div>

            {station.status === 'AVAILABLE' && (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleStartSession}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-md py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Play className="w-5 h-5" /> Start Guest Session
                </button>
                <button 
                  disabled={isLoading}
                  className="bg-surface-container-highest hover:bg-white/10 border border-white/5 text-on-surface font-label-md py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                   Assign Member
                </button>
              </div>
            )}

            {station.status === 'IN_USE' && activeSession && (
              <div className="space-y-4">
                <div className="bg-surface-container p-4 rounded-xl border border-white/5">
                  <p className="text-[14px] text-on-surface-variant mb-1">Active Player</p>
                  <p className="text-[16px] text-on-surface font-bold">{activeSession.guestName || 'Member'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={isLoading}
                    className="bg-surface-container-highest hover:bg-white/10 border border-white/5 text-on-surface font-label-md py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Clock className="w-5 h-5 text-tertiary" /> Add Time
                  </button>
                  <button 
                    onClick={handleEndSession}
                    disabled={isLoading}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-label-md py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Square className="w-5 h-5 fill-current" /> End Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
