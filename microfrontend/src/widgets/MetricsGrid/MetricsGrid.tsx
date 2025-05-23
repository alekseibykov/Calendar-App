import React from 'react';
import { MetricCard } from '../../shared/ui/MetricCard';
import { AnalyticsMetrics } from '../../shared/types';
import './MetricsGrid.css';

interface MetricsGridProps {
  metrics: AnalyticsMetrics;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="metrics-grid">
      <MetricCard value={metrics.totalTasks} label="Total Tasks" />
      <MetricCard value={metrics.completedTasks} label="Completed" />
      <MetricCard value={`${metrics.completionRate.toFixed(1)}%`} label="Completion Rate" />
      <MetricCard value={`${Math.round(metrics.totalTimeSpent / 60)}h`} label="Time Invested" />
    </div>
  );
}; 