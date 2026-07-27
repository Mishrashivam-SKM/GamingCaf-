import React from 'react';

type Status = 'green' | 'red' | 'orange';

interface StatusRingProps {
  status: Status;
  className?: string;
}

export const StatusRing: React.FC<StatusRingProps> = ({ status, className = '' }) => {
  const getStatusClasses = (status: Status) => {
    switch (status) {
      case 'green':
        return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse';
      case 'red':
        return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse';
      case 'orange':
        return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] animate-pulse';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`w-3 h-3 rounded-full ${getStatusClasses(status)} ${className}`} 
    />
  );
};
