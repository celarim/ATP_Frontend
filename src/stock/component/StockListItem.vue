<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  information: String, // 종목 칸을 채우는 객체형 정보
});
let id = ref(0);
let code = ref("d");
let name = ref("d");
let market = ref("d");
let price = ref("d");
let likes = ref(0);
let doILikeThis = ref(false);

// information으로부터 정보 추출해서 대입
const response = JSON.parse(props.information);
id.value = response.id;
code.value = response.code;
name.value = response.name.replace(" Common Stock", "");
market.value = response.market;
price.value = response.price;
likes.value = response.likes;

const scrollToTop = () => {
  // 이게 있어야 라우팅 후 맨 위로 자동 스크롤 됨
  window.scrollTo(0, 0);
};
</script>

<template>
  <div class="stockListBox card card-row shadow" style="">
    <div class="card-header" style="min-width: 200px; max-width: 200px">
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
    <div class="card-body bold-weight" style="max-width: 160px">
      <div class="listbox-item">
        최근 가격:<br />
        {{ price }}
      </div>
      <div style="display: inline-flex; margin-left: 1rem">
        <!-- 좋아요 수 -->
        <div>
          <div>❤</div>
        </div>
        <div class="small-info">
          {{ likes }}
        </div>
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
  margin: 1rem 1rem;
}

.small-info {
  font-size: small;
}

.bold-weight {
  font-weight: bold;
}
</style>

<style>
@import "/src/common/sb-admin-2.min.css";
</style>
