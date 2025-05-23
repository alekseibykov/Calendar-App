import React from 'react';
import { AnalyticsMetrics } from '../../shared/types';
import './InsightsContent.css';

interface InsightsContentProps {
  metrics: AnalyticsMetrics;
}

export const InsightsContent: React.FC<InsightsContentProps> = ({ metrics }) => {
  return (
    <div className="insights-detailed">
      <div className="insight-card">
        <h3>📊 Weekly Summary</h3>
        <p>
          You completed <strong>{metrics.completedTasks}</strong> tasks this week, 
          which is <strong>15% better</strong> than last week!
        </p>
      </div>
      <div className="insight-card">
        <h3>🎯 Recommendations</h3>
        <ul>
          <li>Focus on high-priority tasks during your peak hours (9-11 AM)</li>
          <li>Break down large tasks into smaller, manageable chunks</li>
          <li>Consider time-blocking for better focus</li>
        </ul>
      </div>
      <div className="insight-card">
        <h3>🏆 Achievements</h3>
        <div className="achievements">
          <span className="achievement">🔥 5-Day Streak</span>
          <span className="achievement">🎯 90% Completion Rate</span>
          <span className="achievement">⚡ Speed Demon</span>
        </div>
      </div>
    </div>
  );
}; 