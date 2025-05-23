import { format, subDays, eachDayOfInterval } from 'date-fns';
import { TaskData, ChartData } from '../../../shared/types';
import { chartColors, categoryColors, categoryBorderColors } from '../../../shared/lib/chart-config';

export const generateProductivityTrendData = (tasks: TaskData[]): ChartData => {
  const days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });

  const data = days.map(day => {
    const tasksOnDay = tasks.filter(task => 
      task.completedDate && 
      format(task.completedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    return tasksOnDay.length;
  });

  return {
    labels: days.map(day => format(day, 'EEE')),
    datasets: [
      {
        label: 'Tasks Completed',
        data,
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primaryLight,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

export const generateCategoryDistributionData = (tasks: TaskData[]): ChartData => {
  const categoryCount = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: categoryColors,
        borderColor: categoryBorderColors,
        borderWidth: 2,
      },
    ],
  };
};

export const generatePriorityAnalysisData = (tasks: TaskData[]): ChartData => {
  const priorities = ['low', 'medium', 'high'];
  const completedByPriority = priorities.map(priority => 
    tasks.filter(task => task.priority === priority && task.completed).length
  );
  const totalByPriority = priorities.map(priority => 
    tasks.filter(task => task.priority === priority).length
  );

  return {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Completed',
        data: completedByPriority,
        backgroundColor: chartColors.successAlpha,
        borderColor: chartColors.success,
        borderWidth: 1,
      },
      {
        label: 'Total',
        data: totalByPriority,
        backgroundColor: chartColors.grayAlpha,
        borderColor: chartColors.gray,
        borderWidth: 1,
      },
    ],
  };
};

export const generatePerformanceRadarData = (): ChartData => {
  return {
    labels: ['Completion Rate', 'Consistency', 'Priority Focus', 'Time Management', 'Variety'],
    datasets: [
      {
        label: 'Performance',
        data: [85, 70, 90, 75, 80],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: chartColors.primary,
        borderWidth: 2,
        pointBackgroundColor: chartColors.primary,
      },
    ],
  };
}; 