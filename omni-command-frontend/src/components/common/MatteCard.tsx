import React from 'react';

interface MatteCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MatteCard: React.FC<MatteCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`matte-card p-5 rounded-lg border border-outline-variant/5 ${className}`}
    >
      {children}
    </div>
  );
};
