import React from 'react';
import { MatteCard } from '../common/MatteCard';
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
}

export const PCStationCard: React.FC<PCStationCardProps> = ({
  nodeId,
  status,
  userName,
  gameName,
  timeRemaining,
  progressPercent,
  reservationTime,
}) => {
  return (
    <MatteCard>
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-tighter">
          {nodeId}
        </span>
        <StatusRing status={status} />
      </div>

      {status === 'red' && (
        <>
          <div className="mb-4">
            <p className="font-headline-sm text-[18px] text-on-surface m-0">{userName}</p>
            {gameName && (
              <p className="font-label-md text-label-md text-primary mt-1 flex items-center gap-2 m-0">
                <span className="material-symbols-outlined text-[14px]">sports_esports</span>
                {gameName}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-label-md font-label-md text-on-surface-variant">
              <span>Time Remaining</span>
              <span className="text-primary">{timeRemaining || '00:00:00'}</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/10">
              <div
                className="h-full bg-primary glow-primary"
                style={{ width: `${progressPercent || 0}%` }}
              ></div>
            </div>
          </div>
        </>
      )}

      {status === 'orange' && (
        <>
          <div className="mb-4">
            <p className="font-headline-sm text-[18px] text-on-surface m-0">{userName}</p>
            <p className="font-label-md text-label-md text-tertiary mt-1 m-0">
              {reservationTime ? `Check-in at ${reservationTime}` : 'Pending Check-in'}
            </p>
          </div>
          <div className="space-y-3 opacity-20">
            <div className="flex justify-between text-label-md font-label-md text-on-surface-variant">
              <span>Time Remaining</span>
              <span>--:--:--</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full"></div>
          </div>
        </>
      )}

      {status === 'green' && (
        <>
          <div className="mb-4 h-[52px] flex items-center">
            <p className="font-label-md text-label-md text-on-surface-variant italic m-0">Terminal Ready</p>
          </div>
          <div className="space-y-3 opacity-20">
            <div className="flex justify-between text-label-md font-label-md text-on-surface-variant">
              <span>Time Remaining</span>
              <span>--:--:--</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full"></div>
          </div>
        </>
      )}
    </MatteCard>
  );
};
