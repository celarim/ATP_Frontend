<script setup>
// 경윤: 이 모듈은 아직 완벽하게 작동하지 않습니다.
import { Line } from "vue-chartjs";
import { defineProps, computed, ref, shallowRef, shallowReactive, reactive, onMounted } from "vue";
import axios from "axios";

import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { useLoadingStore } from "../stores/useLoadingStore.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps({
  id: Number,
});

let id = props.id ? props.id : 0;

let labelList = reactive([]);
let dataList = reactive([]);

const loadingStore = useLoadingStore();

const chartData = computed(() => {
  return {
    labels: labelList,
    datasets: [
      {
        label: "",
        data: dataList,
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

onMounted(async () => {
  // 차트 데이터 가져오기
  loadingStore.startLoading();
  const response = await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/history?id=${id}`);
  const result = Object.entries(Object.entries(response.data)[0][1]).sort((a, b) => (b > a ? -1 : 1));
  const result_data = result.map((value) => parseFloat(value[1]["4. close"]));
  const result_label = result.map((value) => value[0]);
  const length = result_label.length;
  // 적용하기
  let chart = ChartJS.getChart(document.getElementsByClassName("graphchart")[id - 1]);
  for (let i = 0; i < length; i++) {
    labelList.push(result_label[i]);
  }
  chart.data.datasets[0].data = result_data;
  chart.update();
  loadingStore.stopLoading();
});
</script>
<template>
  <div class="chart" style="position: relative; width: 50vw; vertical-align: center;">
    <Line class="graphchart" ref="linechart" :data="chartData" :options="chartOptions" :width="800" :height="160" />
  </div>
</template>
<style scoped></style>
