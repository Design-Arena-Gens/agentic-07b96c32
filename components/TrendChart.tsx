"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function TrendChart({ labels, data }: { labels: string[]; data: number[] }) {
  const dataset = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          fill: true,
          borderColor: '#6366f1',
          backgroundColor: (ctx: any) => {
            const { chart } = ctx;
            const { ctx: c } = chart;
            const gradient = c.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(99,102,241,0.35)');
            gradient.addColorStop(1, 'rgba(99,102,241,0.02)');
            return gradient;
          },
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    }),
    [labels, data]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { intersect: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    }),
    []
  );

  return (
    <div className="h-40">
      <Line data={dataset} options={options as any} />
    </div>
  );
}
