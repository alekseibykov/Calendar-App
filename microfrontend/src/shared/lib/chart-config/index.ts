import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Common chart options
export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#f8fafc',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#cbd5e1',
      },
      grid: {
        color: 'rgba(203, 213, 225, 0.1)',
      },
    },
    y: {
      ticks: {
        color: '#cbd5e1',
      },
      grid: {
        color: 'rgba(203, 213, 225, 0.1)',
      },
    },
  },
};

// Radar chart specific options
export const radarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#f8fafc',
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { 
        color: 'rgb(255, 255, 255)',
        stepSize: 20,
      },
      grid: { 
        color: 'rgba(203, 213, 225, 0.1)',
      },
      pointLabels: { 
        color: '#f8fafc',
      },
    },
  },
};

// Chart color palette
export const chartColors = {
  primary: 'rgb(99, 102, 241)',
  primaryAlpha: 'rgba(99, 102, 241, 0.8)',
  primaryLight: 'rgba(99, 102, 241, 0.1)',
  secondary: 'rgb(139, 92, 246)',
  secondaryAlpha: 'rgba(139, 92, 246, 0.8)',
  success: 'rgb(16, 185, 129)',
  successAlpha: 'rgba(16, 185, 129, 0.8)',
  warning: 'rgb(245, 158, 11)',
  warningAlpha: 'rgba(245, 158, 11, 0.8)',
  error: 'rgb(239, 68, 68)',
  errorAlpha: 'rgba(239, 68, 68, 0.8)',
  gray: 'rgb(156, 163, 175)',
  grayAlpha: 'rgba(156, 163, 175, 0.8)',
};

export const categoryColors = [
  chartColors.primaryAlpha,
  chartColors.secondaryAlpha,
  chartColors.successAlpha,
  chartColors.warningAlpha,
  chartColors.errorAlpha,
];

export const categoryBorderColors = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.success,
  chartColors.warning,
  chartColors.error,
]; 