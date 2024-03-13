<template>
  <div id="barDiv">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useResultsStore } from '../stores/results.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'gemiddelde punten voor elk vak'
          }
        },
      }
    }
  },
  computed: {
    chartData() {
      const resultsStore = useResultsStore();
      const results = resultsStore.results;
      const grouped = results.reduce((acc, result) => {
        if (!acc[result.vak]) {
          acc[result.vak] = {
            vak: result.vak,
            totalCijfer: 0,
            count: 0
          };
        }
        acc[result.vak].totalCijfer += result.cijfer;
        acc[result.vak].count++;
        return acc;
      }, {});

      // Calculate average cijfer for each group
      for (const vak in grouped) {
        grouped[vak].average = grouped[vak].totalCijfer / grouped[vak].count;
      }

      // Prepare chart data
      const labels = Object.keys(grouped);
      const data = labels.map(vak => grouped[vak].average);

      return {
        labels: labels,
        datasets: [
            {
              label: 'gemiddelde punten',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }
        ],
      };
    }
  },
  async created() {
    const resultsStore = useResultsStore();
    await resultsStore.fetchResults();
  }
}
</script>

<style>
  #barDiv{
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
  }
</style>
