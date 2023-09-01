import { Chart, ArcElement } from 'chart.js';

// Register Chart.js plugins and set default configurations
Chart.register(ArcElement);
Chart.defaults.plugins.legend.display = true;
