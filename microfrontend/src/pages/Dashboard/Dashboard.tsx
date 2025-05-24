import React, { useState, useEffect } from 'react';
import { MetricsGrid } from '../../widgets/MetricsGrid';
import { TabNavigation } from '../../widgets/TabNavigation';
import { ChartsSection } from '../../widgets/ChartsSection';
import { TaskData, AnalyticsMetrics, TabType } from '../../shared/types';
import { generateMockTaskData, calculateMetrics } from '../../features/analytics/model/data-generator';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [taskData, setTaskData] = useState<TaskData[]>([]);

  useEffect(() => {
    // Initialize chart configuration (imported in shared/lib/chart-config)
    // This ensures Chart.js is properly configured
    
    const mockTasks = generateMockTaskData();
    setTaskData(mockTasks);
    setMetrics(calculateMetrics(mockTasks));
  }, []);

  if (!metrics) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Analytics Dashboard</h1>
        <p>Comprehensive insights into your productivity patterns</p>
        <a href="/" className="back-link">← Back to Main App</a>
      </header>

      <MetricsGrid metrics={metrics} />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <ChartsSection activeTab={activeTab} taskData={taskData} metrics={metrics} />
    </div>
  );
}; 