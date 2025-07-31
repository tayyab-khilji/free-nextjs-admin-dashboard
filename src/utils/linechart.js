import { Box } from '@mui/material';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const LineChart = ({ isGreen = true }) => {
  const gradientColor = isGreen
    ? 'rgba(0, 255, 0, 0.5)' // Green shadow
    : 'rgba(255, 0, 0, 0.5)'; // Red shadow

  const borderColor = isGreen ? 'green' : 'red';

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Labels won't display as axes are hidden
    datasets: [
      {
        label: 'Performance',
        data: isGreen
          ? [10, 20, 15, 30, 25, 40]
          : [40, 25, 30, 15, 20, 10], // Downward for red
        borderColor: borderColor,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Wait for chartArea to be available
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, gradientColor);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          return gradient;
        },
        fill: true,
        tension: 0.4, // Smooth line
        pointRadius: 0 // Hide points
      }
    ]
  };
  // chart

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide legend
      }
    },
    scales: {
      x: {
        display: false // Hide x-axis completely
      },
      y: {
        display: false // Hide y-axis completely
      }
    }
  };

  return (
    <Box sx={{ height: '60px', width: '60%' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineChart;
