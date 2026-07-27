import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Gamepad2, Clock, User } from 'lucide-react';
import { StatusRing } from '../common/StatusRing';

export type PCStatus = 'green' | 'red' | 'orange';

export interface PCStationCardProps {
  nodeId: string;
  status: PCStatus;
  userName?: string;
  gameName?: string;
  timeRemaining?: string;
  progressPercent?: number;
  reservationTime?: string;
  onClick?: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const PCStationCard: React.FC<PCStationCardProps> = ({
  nodeId,
  status,
  userName,
  gameName,
  timeRemaining,
  progressPercent,
  reservationTime,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGlowColor = () => {
    switch (status) {
      case 'red': return 'rgba(239, 68, 68, 0.15)';
      case 'orange': return 'rgba(249, 115, 22, 0.15)';
      case 'green': return 'rgba(34, 197, 94, 0.15)';
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'red': return 'rgba(239, 68, 68, 0.3)';
      case 'orange': return 'rgba(249, 115, 22, 0.3)';
      case 'green': return 'rgba(34, 197, 94, 0.3)';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative rounded-2xl bg-surface-container/60 backdrop-blur-xl border overflow-hidden transition-colors duration-300"
      style={{
        borderColor: isHovered ? getBorderColor() : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered 
          ? `0 12px 40px 0 ${getGlowColor()}, inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`
          : `0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono-data text-[13px] font-bold text-on-surface-variant uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
            {nodeId}
          </span>
          <StatusRing status={status} />
        </div>

        {status === 'red' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-4">
              <p className="font-headline-sm text-[18px] text-on-surface m-0 flex items-center gap-2">
                <User className="w-4 h-4 text-on-surface-variant" />
                {userName}
              </p>
              {gameName && (
                <p className="font-label-md text-[13px] text-primary mt-2 flex items-center gap-2 m-0 bg-primary/10 w-fit px-2 py-1 rounded-md border border-primary/20">
                  <Gamepad2 className="w-4 h-4" />
                  {gameName}
                </p>
              )}
            </div>
            <div className="space-y-3 mt-auto">
              <div className="flex justify-between text-label-md font-label-md text-on-surface-variant items-center">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Remaining</span>
                <span className="text-primary font-mono-data bg-surface-container-highest px-1.5 py-0.5 rounded text-[13px]">{timeRemaining || '00:00:00'}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent || 0}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-container shadow-glow-primary rounded-full"
                />
              </div>
            </div>
          </div>
        )}

        {status === 'orange' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-4">
              <p className="font-headline-sm text-[18px] text-on-surface m-0 flex items-center gap-2">
                <User className="w-4 h-4 text-on-surface-variant" />
                {userName}
              </p>
              <p className="font-label-md text-[13px] text-tertiary mt-2 flex items-center gap-2 m-0 bg-tertiary/10 w-fit px-2 py-1 rounded-md border border-tertiary/20">
                <Clock className="w-4 h-4" />
                {reservationTime ? `Check-in at ${reservationTime}` : 'Pending Check-in'}
              </p>
            </div>
            <div className="space-y-3 opacity-30 mt-auto grayscale">
              <div className="flex justify-between text-label-md font-label-md text-on-surface-variant items-center">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Remaining</span>
                <span className="font-mono-data bg-surface-container-highest px-1.5 py-0.5 rounded text-[13px]">--:--:--</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full border border-white/5"></div>
            </div>
          </div>
        )}

        {status === 'green' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-4 h-[60px] flex items-center">
              <p className="font-label-md text-[14px] text-green-400/80 m-0 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></span>
                Terminal Ready
              </p>
            </div>
            <div className="space-y-3 opacity-20 mt-auto grayscale">
              <div className="flex justify-between text-label-md font-label-md text-on-surface-variant items-center">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Remaining</span>
                <span className="font-mono-data bg-surface-container-highest px-1.5 py-0.5 rounded text-[13px]">--:--:--</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full border border-white/5"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
