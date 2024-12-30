<script setup>
// 경윤: 이 모듈은 아직 완벽하게 작동하지 않습니다.
import { Line } from "vue-chartjs";
import { computed, ref, reactive, onMounted } from "vue";
import axios from "axios";

import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

let labelList = reactive([]);
let dataList = reactive([]);

const chartData = computed(() => {
  return {
    labels: ["No Data", "One Data"],
    datasets: [
      {
        label: "",
        data: [0, 1],
        pointStyle: false,
        tension: 0,
        padding: 0,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    aspectRatio: 8,
  },
});

onMounted(() => {
  // 차트 데이터 가져오기
  // 적용하기
});
</script>
<template>
  <div style="position: relative; height: 50vh; width: 100vw">
    <Line id="graphchart" :data="chartData" :options="chartOptions" />
  </div>
</template>
<style scoped></style>
