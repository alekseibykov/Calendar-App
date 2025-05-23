// Task entity types
export interface TaskData {
  id: string;
  name: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completedDate?: Date;
  createdDate: Date;
  estimatedTime: number; // in minutes
}

// Analytics metrics types
export interface AnalyticsMetrics {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgCompletionTime: number;
  totalTimeSpent: number;
  streak: number;
}

// Tab navigation types
export type TabType = 'overview' | 'trends' | 'productivity' | 'insights';

// Time range types
export type TimeRange = 'week' | 'month' | 'year';

// Chart data types
export interface ChartDataset {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointBackgroundColor?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
} 