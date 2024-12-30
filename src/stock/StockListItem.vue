<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
  information: String,
});
let id = ref(0);
let code = ref("d");
let name = ref("d");
let market = ref("d");
let price = ref("d");

const response = JSON.parse(props.information);
id.value = response.id;
code.value = response.code;
name.value = response.name.replace(' Common Stock', "");
market.value = response.market;
price.value = response.price;

const scrollToTop = () => {
  window.scrollTo(0, 0);
}

</script>

<template>
  <div class="stockListBox card card-row shadow" style="">
    <div class="card-header" style="min-width:200px;max-width: 200px;">
      <div class="listbox-item">
        <router-link :to="`/stock/${id}`" @click="scrollToTop">{{ name }}</router-link>
      </div>
      <div class="listbox-item small-info">
        {{ code }}
      </div>
      <div class="listbox-item small-info">
        {{ market }}
      </div>
    </div>
    <!-- TODO: 그래프? -->
    <div class="card-body bold-weight stockListBox-inner-right" style="max-width:160px;">
      <div class="listbox-item">
        최근 가격:<br>
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
  margin: 1rem 1rem
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