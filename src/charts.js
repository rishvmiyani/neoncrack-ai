import Chart from 'chart.js/auto';

export function initCharts() {
  let compositionChart = null;
  
  return {
    updateComposition(composition) {
      const ctx = document.getElementById('compositionChart')?.getContext('2d');
      if (!ctx) return;
      
      if (compositionChart) {
        compositionChart.destroy();
      }
      
      const total = composition.length;
      const data = [
        { label: 'Lower', value: Math.round((composition.lowercase / total) * 100) },
        { label: 'Upper', value: Math.round((composition.uppercase / total) * 100) },
        { label: 'Numbers', value: Math.round((composition.numbers / total) * 100) },
        { label: 'Symbols', value: Math.round((composition.symbols / total) * 100) }
      ];
      
      compositionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: ['#3b82f6', '#eab308', '#f97316', '#ef4444'],
            borderWidth: 0,
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                color: '#e2e8f0'
              }
            }
          },
          animation: {
            animateRotate: true,
            duration: 1200
          }
        }
      });
    }
  };
}
