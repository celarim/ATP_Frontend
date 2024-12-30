<script setup>
import { defineProps, ref, reactive, onMounted, computed, onBeforeMount } from "vue";
import stockListItem from "./component/StockListItem.vue";
import { useStockListStore } from "../stores/useStockListStore.js";
import { useLoadingStore } from "../stores/useLoadingStore.js";

// TODO: API에 offset을 파라미터로 넘겨 페이지네이션을 구현할 것
const props = defineProps({
  offset: Number,
  sectionAction: String,
  text: String,
});
// 어쩔 수 없이 삼항 연산자 사용
const offset = ref(!props.offset ? 0 : props.offset);
const text = ref(!props.text ? "" : props.text);

const stockListStore = useStockListStore();
const loadingStore = useLoadingStore();
let itemlist = reactive(stockListStore.stockListResult);
let totalLength = ref(stockListStore.stockListOffset);

let canMoveLeft = computed(() => {
  return ref(offset > 1);
});
let canMoveRight = computed(() => {
  return ref(offset < Math.floor(totalLength / 30));
});

onMounted(async () => {
  loadingStore.startLoading();
  await stockListStore.getStockList(offset, text);
  loadingStore.stopLoading();
});
</script>

<template>
  <div class="container">
    <h1>{{ props.sectionAction }} 결과</h1>
    <div v-for="item in itemlist">
      <stockListItem :information="item" />
    </div>
    <span class="pagination">
      <button :disabled="canMoveRight">&lt;</button>
      <div>&nbsp; {{ Math.floor(offset / 30) }} &nbsp;</div>
      <button :disabled="canMoveLeft">&gt;</button>
    </span>
  </div>
</template>
<style scoped>
.container > h1 {
  margin-top: 6rem;
}

.pagination {
  text-align: center;
  justify-self: center;
}

.inverted-color {
  color: cornflowerblue;
}
</style>
