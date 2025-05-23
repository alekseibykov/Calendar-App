import React from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { ChartData } from '../../types';
import './ChartWrapper.css';

interface ChartWrapperProps {
  type: 'line' | 'bar' | 'doughnut' | 'radar';
  data: ChartData;
  options: any;
  title: string;
  uniqueKey: string;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  type,
  data,
  options,
  title,
  uniqueKey,
  className = ''
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line key={uniqueKey} data={data} options={options} />;
      case 'bar':
        return <Bar key={uniqueKey} data={data} options={options} />;
      case 'doughnut':
        return <Doughnut key={uniqueKey} data={data} options={options} />;
      case 'radar':
        return <Radar key={uniqueKey} data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className={`chart-container ${className}`}>
      <h3>{title}</h3>
      <div className="chart-wrapper">
        {renderChart()}
      </div>
    </div>
  );
}; 