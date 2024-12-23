<script setup>
import { stockListStore } from '../../stores/stockListStore.js'
const stockList = stockListStore();

</script>
<script>
export default {
  name: "stockList",
  computed: {
    ...mapStores(stockListStore)
  }
}
</script>
<template>
  <div class="stock_list" v-for="item in stockListStore.stockList" :key="item">
    {{ JSON.parse(item, null, 1) }}
  </div>
</template>
<style></style>