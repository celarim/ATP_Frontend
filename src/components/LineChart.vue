<script setup>
// import { defineProps } from 'vue';
// mport { usePortfolioDetailsStore } from '../stores/usePortfolioDetailsStore.js';
// let portfolioStore = usePortfolioDetailsStore();
// let rawdata = portfolioStore.getportfolioDetail(idx);
// TODO: rawdata를 가공해서 종목 별로 항목과 현 가치를 계산해 labels와 datasets.data에 삽입
</script>
<script>
// Alert: 작동하지 않습니다! 이 모듈로 라우트하지 마세요!
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

// import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: 'LineChart',
  components: { Line },
  computed: {
    chartData() {
      return {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12], tension: 0, pointStyle: false }],
      }; /* mutable chart data */
    },
    chartOptions() {
      return {
        responsive: true,
      };
    },
  }
}
</script>
<template>
  <LineChart :data="chartData" :options="chartOptions" />
</template>
<style scoped></style>