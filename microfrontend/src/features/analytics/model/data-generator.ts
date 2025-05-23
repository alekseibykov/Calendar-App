import { subDays } from 'date-fns';
import { TaskData, AnalyticsMetrics } from '../../../shared/types';

export const generateMockTaskData = (): TaskData[] => {
  const categories = ['Work', 'Personal', 'Health', 'Learning', 'Projects'];
  const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const tasks: TaskData[] = [];

  for (let i = 0; i < 50; i++) {
    const createdDate = subDays(new Date(), Math.floor(Math.random() * 30));
    const completed = Math.random() > 0.3;
    const completedDate = completed ? 
      new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : 
      undefined;

    tasks.push({
      id: `task-${i}`,
      name: `Task ${i + 1}`,
      completed,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      completedDate,
      createdDate,
      estimatedTime: 15 + Math.floor(Math.random() * 120), // 15-135 minutes
    });
  }
  return tasks;
};

export const calculateMetrics = (tasks: TaskData[]): AnalyticsMetrics => {
  const completedTasks = tasks.filter(task => task.completed);
  const totalTimeSpent = completedTasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  
  return {
    totalTasks: tasks.length,
    completedTasks: completedTasks.length,
    completionRate: (completedTasks.length / tasks.length) * 100,
    avgCompletionTime: totalTimeSpent / completedTasks.length || 0,
    totalTimeSpent,
    streak: 5, // Mock streak - could be calculated from actual completion dates
  };
}; 