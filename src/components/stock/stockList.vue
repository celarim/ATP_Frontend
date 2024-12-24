<script setup>
import { defineProps } from 'vue';
import stockListItem from './stockListItem.vue';
import { useStockListStore } from '../../stores/stockListStore.js';

// TODO: API에 offset을 파라미터로 넘겨 페이지네이션을 구현할 것
const props = defineProps({
  offset: Number,
  sectionAction: String,
});

const stockListStore = useStockListStore();

// TODO: stocklistStore.getStockList 액션으로 교체
const listResult = stockListStore.stockListResult.map((value) => JSON.stringify(value, null, 1));
</script>

<template>
  <div class="container">
    <h1>{{ props.sectionAction }} 결과</h1>
    <div v-for="item in listResult">
      <stockListItem :information="item" />
    </div>
  </div>
</template>
<style scoped>
.container>h1 {
  margin-top: 80px;
}
</style>