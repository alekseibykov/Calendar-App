import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ value, label, className = '' }) => {
  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}; 