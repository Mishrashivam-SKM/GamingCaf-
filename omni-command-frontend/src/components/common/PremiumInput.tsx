import React, { InputHTMLAttributes } from 'react';

interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            {icon}
          </span>
        )}
        <input 
          className={`w-full bg-background border border-surface-container-highest rounded-md px-4 py-2.5 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
};
