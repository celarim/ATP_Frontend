<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  information: String,
});

const { id, name, code, market, price } = JSON.parse(props.information);

</script>

<template>
  <div class="stockListBox card card-row shadow" style="">
    <div class="card-header" style="min-width:160px;">
      <div class="listbox-item">
        <router-link :to="`/stock/${id}`">{{ name }}</router-link>
      </div>
      <div class="listbox-item small-info">
        {{ code }}
      </div>
      <div class="listbox-item small-info">
        {{ market }}
      </div>
    </div>
    <!-- TODO: 그래프? -->
    <div class="card-body bold-weight stockListBox-inner-right" style="max-width:120px;">
      <div class="listbox-item">
        {{ price }}
      </div>
    </div>
  </div>

</template>
<style scoped>
.stockListBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
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

<style>
@import '/src/common/sb-admin-2.min.css';
</style>