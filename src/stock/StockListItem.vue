<script setup>
import { defineProps } from 'vue';
// import { useStockListStore } from '../../stores/stockListStore.js';

// const stockListStore = useStockListStore();
const props = defineProps({
  information: String,
});

</script>

<template>
  <div class="stockListBox">
    <div class="stockListBox-inner-left">
      <div class="listbox-item">
        {{ JSON.parse(information).name }}
      </div>
      <div class="listbox-item small-info">
        {{ JSON.parse(information).code }}
      </div>
    </div>
    <!-- TODO: 그래프? -->
    <div class="stockListBox-inner-right bold-weight">
      <div class="listbox-item">
        {{ JSON.parse(information).price }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.stockListBox {
  display: inline-flex;
  text-align: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 84vw;
  height: 240px;
  background-color: #f9f9f9;
  border: 1px solid blue;
  border-radius: 0.4rem;
  margin: 1rem;
}

.stockListBox-inner-left {
  width: 160px;
  color: #f9f9f9;
  padding-right: 1.2rem;
  background: linear-gradient(to right, #4e73df 0%, #4e73df 90%, #f9f9f9 100%);
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
}

.stockListBox-inner-right {
  width: 160px;
  color: #f9f9f9;
  padding-left: 1.2rem;
  background: linear-gradient(to left, #4e73df 0%, #4e73df 90%, #f9f9f9 100%);
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}

.listbox-item {
  margin: 2rem 1rem
}

.small-info {
  font-size: small;
}

.bold-weight {
  font-weight: bold;
}
</style>