import React from 'react';

interface KPIPillProps {
  label: string;
  value: string;
  valueColorClass?: string;
}

export const KPIPill: React.FC<KPIPillProps> = ({ label, value, valueColorClass = 'text-primary' }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/50 border border-outline-variant/10 backdrop-blur-sm">
      <span className="text-label-md font-label-md text-on-surface-variant">{label}</span>
      <span className={`text-label-md font-label-md ${valueColorClass}`}>{value}</span>
    </div>
  );
};
