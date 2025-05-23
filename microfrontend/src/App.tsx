import React from 'react';
import { Dashboard } from './pages/Dashboard';
// Import to ensure Chart.js is registered
import './shared/lib/chart-config';

const App: React.FC = () => {
  return <Dashboard />;
};

export default App; 