import React from 'react';
import { ChartWrapper } from '../../shared/ui/Chart';
import { TaskData, TabType, AnalyticsMetrics } from '../../shared/types';
import { baseChartOptions, radarChartOptions } from '../../shared/lib/chart-config';
import {
  generateProductivityTrendData,
  generateCategoryDistributionData,
  generatePriorityAnalysisData,
  generatePerformanceRadarData,
} from '../../features/analytics/lib/chart-data-generators';
import { InsightsContent } from '../../features/insights/InsightsContent';
import './ChartsSection.css';

interface ChartsSectionProps {
  activeTab: TabType;
  taskData: TaskData[];
  metrics: AnalyticsMetrics;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ activeTab, taskData, metrics }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="charts-grid">
            <ChartWrapper
              type="doughnut"
              data={generateCategoryDistributionData(taskData)}
              options={{
                ...baseChartOptions,
                plugins: {
                  ...baseChartOptions.plugins,
                  legend: {
                    position: 'bottom' as const,
                    labels: { color: '#f8fafc' }
                  }
                }
              }}
              title="Task Categories"
              uniqueKey="category-chart"
            />
            <ChartWrapper
              type="bar"
              data={generatePriorityAnalysisData(taskData)}
              options={baseChartOptions}
              title="Priority Analysis"
              uniqueKey="priority-chart"
            />
          </div>
        );

      case 'trends':
        return (
          <div className="charts-grid">
            <ChartWrapper
              type="line"
              data={generateProductivityTrendData(taskData)}
              options={baseChartOptions}
              title="7-Day Productivity Trend"
              uniqueKey="trends-chart"
              className="full-width"
            />
          </div>
        );

      case 'productivity':
        return (
          <div className="charts-grid">
            <ChartWrapper
              type="radar"
              data={generatePerformanceRadarData()}
              options={radarChartOptions}
              title="Performance Radar"
              uniqueKey="radar-chart"
            />
            <div className="insights-panel">
              <h3>Productivity Insights</h3>
              <div className="insight-item">
                <span className="insight-icon">🔥</span>
                <div>
                  <strong>Current Streak:</strong> {metrics.streak} days
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">⏱️</span>
                <div>
                  <strong>Avg. Task Time:</strong> {Math.round(metrics.avgCompletionTime)} minutes
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">📈</span>
                <div>
                  <strong>Best Day:</strong> Monday (32% more productive)
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <div>
                  <strong>Focus Area:</strong> High-priority tasks need attention
                </div>
              </div>
            </div>
          </div>
        );

      case 'insights':
        return <InsightsContent metrics={metrics} />;

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-content">
      {renderContent()}
    </div>
  );
}; 