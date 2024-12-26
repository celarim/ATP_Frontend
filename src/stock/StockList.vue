<script setup>
import { defineProps, ref, reactive } from 'vue';
import stockListItem from './stockListItem.vue';
import { useStockListStore } from '../stores/useStockListStore.js';
// import LineChart from '../components/LineChart.vue';

// TODO: API에 offset을 파라미터로 넘겨 페이지네이션을 구현할 것
const props = defineProps({
  offset: Number,
  sectionAction: String,
  text: String,
});

const stockListStore = useStockListStore();
let itemlist = reactive([]);
// TODO: stocklistStore.getStockList 액션으로 교체
const response = async () => {
  const response = await stockListStore.getStockList(offset, text);
  for (let item of response) {
    itemlist.push(JSON.stringify(item));
  }
  console.log(itemlist);
};
response();

</script>

<template>
  <div class="container">
    <h1>{{ props.sectionAction }} 결과</h1>
    <div v-for="item in itemlist">
      <stockListItem :information="item" />
    </div>
  </div>
</template>
<style scoped>
.container>h1 {
  margin-top: 6rem;
}
</style>