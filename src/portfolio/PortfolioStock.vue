<script setup>
import { defineProps } from 'vue';

// Props로 portfolio_quantity 데이터를 받습니다.
const props = defineProps({
  portfolioQuantity: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <h6 class="m-0 font-weight-bold text-primary">Portfolio Stocks</h6>
    <ul class="list-group mt-3">
      <!-- portfolioQuantity 객체를 순회하며 각 종목과 수량을 표시 -->
      <li v-for="(quantity, stock) in portfolioQuantity" :key="stock" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ stock }}</span>
        <span class="badge bg-primary rounded-pill">{{ quantity }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>


@import '../common/sb-admin-2.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';

    .card-row {
      flex-direction: row;
    }

    .container-fluid {
      margin-top: 10vmax;
    }

    .border {
      border: 1px;
      border-width: 2px;
      padding: 2px;
      /* border-radius: 1.5rem; */
      overflow: hidden; /* border-radius 영역을 넘어가는 콘텐츠를 숨김 */

    }

    .btn-border {
      border: 10px;
      border-color: black;
      background-color: #F0F0F0;
      border-radius: 0.5rem;
    }

    .container-btn {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    .comment-btn {
      margin-left: auto;
      border-radius: 8px;
      background-color: #4f74df;
      border: 1px solid #bbb;
    }

    @media (max-width:992px) {
      .container-fluid {
        margin-top: 20vh;
      }
    }
</style>